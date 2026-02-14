import { useburDetailStore } from '@/stores/burDetaildocs';
import { usePermitappStore } from '@/stores/permitapp';

import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default function useS3upload() {
    const bucketName = 'dsr-pdfupload';
    const region = 'us-east-1';
    const bucket = 'amzn-s3-temp-upload-bucket';

    const uploadUrl = ref('');

    const { permitStore } = usePermitappStore();
    // const { permitapp } = storeToRefs(permitStore);

    const docStore = useburDetailStore();
    const { detailinput } = storeToRefs(docStore);
    const isDownloading = ref(false);
    const uploadProgress = ref(0);
    const sentItem = ref('');

    const fName = ref('');
    const error = ref('');
    const isDetailInput = ref(false);
    const fileData = ref();

    function testdocs() {
        if (detailinput.value.length >= 1) {
            isDetailInput.value = true;
            sentItem.value = detailinput.value[0].detailDocs.document[0];
            fName.value = removeBeforeSlash(sentItem.value);
            fileData.value = `https://digitalsolutionsroofs.s3.us-east-1.amazonaws.com/${sentItem.value}`;
        } else {
            fileData.value = '';
        }
    }

    let results = ref([]);

    function removeBeforeSlash(input) {
        console.log(input);
        return input.split('/').slice(1).join('/');
    }

    const uploadFile = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const fileName = file.name; // Keep original name or generate a new one
        console.log(fileName);
        const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${pdfdir}/${fileName}`;
        console.log(s3Url);
        // try {
        const response = await fetch(s3Url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file
        });

        console.log(response);

        if (response.ok) {
            uploadUrl.value = s3Url;
            console.log(s3Url);
            alert('File uploaded successfully!');
        } else {
            alert(`Failed to upload file. Status: ${response.status}`);
        }
        // } catch (error) {
        //     console.error('Error uploading file:', error);
        //     alert('An error occurred while uploading the file.');
        // }
    };

    async function upload_bucket() {
        try {
            // Construct the public URL for the file in the bucket
            const url = `https://digitalsolutionsroofs.s3.us-east-1.amazonaws.com/${sentItem.value}`;
            // console.log(url);
            // Fetch the PDF file as a blob
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch file. HTTP status: ${response.status}`);
            }

            const blob = await response.blob();
            console.log(blob);
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fName.value; // This sets the default file name for the download
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

            // console.log('handleDownload called');
            // try {
            //     downloadFile(fileUrl, fileName.value);
            // } catch (error) {
            //     console.error('Error downloading file:', error);
            // }
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }

    return { removeBeforeSlash, testdocs, upload_bucket, upload_bucket, isDownloading, uploadProgress, uploadFile, error, results };
}
