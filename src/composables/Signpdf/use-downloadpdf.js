import { usedownloadStore } from '@/stores/downloadpdfStore';

import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function useDownloadpdf(dnumber) {
    const inp = ref();
    const sendProcessnumber = ref('');
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

        // procNum.value = Number(inp.value);
        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProcessnumber.value } }).then((response) => {
                console.log(response);
                zip_download_url.value = data.value.download_url;

                result.status = response.response.value.status;
                result.download_url = response.data.value.download_url;
                result.message = response.data.value.message;
                result.isFinished = response.isFinished;
                result.isLoading = response.isLoading;

                console.log(response.data.value.download_url);
                console.log(response.data.value.message);
                console.log(result, response);
                return response;
            });
            store.addDownload(result);

            return result;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
    };

    return { error, result, sentInputs, getNumber, zip_download_url, store, fetchData };
}
