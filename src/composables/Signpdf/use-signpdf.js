import { useGlobalState } from '@/stores/pdfsignStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function useSignpdf() {
    const inp = ref();
    const sentInput = ref('');
    const sendProcessnumber = ref('');
    // let results = ref([]);

    const sendProc = ref('');
    const results = reactive({
        status: '',
        message: '',

        isFinished: '',
        isLoading: ''
    });
    const result = reactive({
        status: '',
        message: '',
        download_url: '',
        isFinished: '',
        isLoading: ''
    });
    // const procNum = ref();
    const error = ref('');

    let url = 'https://4cgf7owinctxji4vx56hnisxh40iskps.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    function getNumbers(Input) {
        inp.value = Input;
        sendProcessnumber.value = inp.value + '/';
        if (sendProcessnumber.value === 'undefined/') {
            return '';
        } else {
            // fetchData();
        }

        // fetchData();
    }
    const { confirmResponse, addResponse } = useGlobalState();

    // const fetchData = async () => {
    //     try {
    //         const response = await execute({ params: { processnumber: sendProcessnumber.value } }).then((response) => {
    //             procNum.value = data.value;
    //             results.status =  response.value.status;

    //             results.message = response.data.value;
    //             results.isFinished = response.isFinished;
    //             results.isLoading = response.isLoading;
    //         });
    //         // addResponse(results);

    //         return results;
    //     } catch (error) {
    //         console.log('Error, fectching data', error);
    //         // alert('An error occurred while fetching data.');
    //     }
    // };
    function getSignpdf(processNumber) {
        console.log(processNumber);
        sendProc.value = processNumber + '/';

        // procNum.value = Number(inp.value);
        fetchSignPdf();
    }

    const fetchSignPdf = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProc.value } }).then((res) => {
                console.log(res);
                result.status = res.response.value.status;

                result.message = res.data.value;
                result.isFinished = res.isFinished;
                result.isLoading = res.isLoading;

                // return res;
            });
            addResponse(res);

            // return res;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
            // procNum,
        }
    };
    return { error, getNumbers, sendProc, getSignpdf, fetchSignPdf, sentInput, result, confirmResponse, results };
}
