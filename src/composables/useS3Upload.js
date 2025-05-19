import { usePermitappStore } from '@/stores/permitapp';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ref } from 'vue';

export function useS3Upload({ region, credentials, bucket }) {
    const permitStore = usePermitappStore();
    const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
    const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');
    const percent = ref(0);
    const isLoading = ref(false);
    const error = ref(null);

    async function upload(file) {
        isLoading.value = true;
        error.value = null;

        const client = new S3Client({ region, credentials });
        const uploader = new Upload({
            client,
            params: {
                Bucket: bucket,
                Key: `pdf/${muniProcessNumber}.pdf`,
                Body: file,
                ContentType: 'application/pdf',
                // enable automatic server‑side encryption:
                ServerSideEncryption: 'AES256'
            },
            queueSize: 4, // 4 parts in parallel
            partSize: 5 * 1024 * 1024, // 5 MB
            leavePartsOnError: false
        });

        uploader.on('httpUploadProgress', (p) => {
            if (p.total) percent.value = Math.round((p.loaded / p.total) * 100);
        });

        try {
            await uploader.done();
        } catch (e) {
            error.value = e;
        } finally {
            isLoading.value = false;
        }
    }

    return { upload, percent, isLoading, error };
}
