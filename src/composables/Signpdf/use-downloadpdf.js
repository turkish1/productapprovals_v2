// import DataService from '@/services/DataService';
import { usedownloadStore } from '@/stores/downloadpdfStore';

// import { usePermitappStore } from '@/stores/permitapp';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useDownloadpdf() {
    const inp = ref();
    const sendProcessnumber = ref('');

    let results = ref([]);

    const zip_download_url = ref();
    const error = ref('');

    let url = 'https://9sg5obrcp0.execute-api.us-east-1.amazonaws.com/downloadpdf/downloadpdf';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const store = usedownloadStore();
    function getNumber(Input) {
        inp.value = Input;

        sendProcessnumber.value = inp.value + '/';

        // procNum.value = Number(inp.value);
        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProcessnumber.value } }).then((response) => {
                zip_download_url.value = data.value.download_url;
                console.log(data.value.download_url);

                console.log(zip_download_url.value);
            });
            store.addDownload(zip_download_url.value);

            return response;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
    };

    return { error, getNumber, zip_download_url, store, fetchData };
}
