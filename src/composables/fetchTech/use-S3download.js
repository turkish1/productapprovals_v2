import { useburDetailStore } from '@/stores/burDetaildocs';
// import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default function useS3download() {
    const docStore = useburDetailStore();
    const { detailinput } = storeToRefs(docStore);
    const isDownloading = ref(false);
    const downloadProgress = ref(0);
    const sentItem = ref('');
    // downloaded-file.pdf
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
        return input.split('/').slice(1).join('/');
    }

    function downloadFile() {
        // fName.value = fileName;

        testdocs();
        if (isDetailInput.value === true) {
            downloadPdfFromS3();
        }
    }

    async function downloadPdfFromS3() {
        try {
            console.log(fName.value, sentItem.value);
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
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    }

    return { removeBeforeSlash, testdocs, downloadFile, downloadPdfFromS3, isDownloading, downloadProgress, error, results };
}
