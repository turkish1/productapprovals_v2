import { usedownloadStore } from '@/stores/downloadpdfStore';

import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function useDownloadpdf(dnumber) {
    const inp = ref();
    const sendProcessnumber = ref('');
    const sendProc = ref('');
    const sentInputs = ref(dnumber);
    const result = reactive({
        status: '',
        message: '',
        download_url: '',
        isFinished: '',
        isLoading: ''
    });

    const zip_download_url = ref();
    const error = ref('');
    let url = 'https://iovfrep3fext25yjg3o4i45aha0txkav.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const store = usedownloadStore();
    function getNumber() {
        sendProcessnumber.value = sentInputs.value + '/';
        console.log(sendProcessnumber.value);
        // procNum.value = Number(inp.value);
        if (sendProcessnumber.value === 'undefined/') {
            return '';
        } else {
            fetchData();
        }
    }
    async function secondFetch(processNumber) {
        console.log(processNumber);
        sendProc.value = processNumber.processNumber + '/';
        console.log(sendProc.value);
        console.log(processNumber.processNumber);

        // procNum.value = Number(inp.value);
        await fetchDataDownload();
    }
    const fetchData = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProcessnumber.value } }).then((res) => {
                result.status = res.response.value.status;
                result.download_url = res.data.value.download_url;

                result.message = res.data.value.message;
                result.isFinished = res.isFinished;
                result.isLoading = res.isLoading;

                // store.addDownload(zip_download_url.value);
                return res;
            });
            store.addDownload(result);

            return result;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
    };
    const fetchDataDownload = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProc.value } }).then((res) => {
                result.status = res.response.value.status;
                result.download_url = res.data.value.download_url;

                result.message = res.data.value.message;
                result.isFinished = res.isFinished;
                result.isLoading = res.isLoading;

                return res;
            });
            store.addDownload(result);

            return result;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
    };
    return { error, result, secondFetch, fetchDataDownload, sentInputs, getNumber, zip_download_url, store, fetchData };
}
