import { useGlobalState } from '@/stores/pdfsignStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function useSignpdf() {
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

        isFinished: '',
        isLoading: ''
    });
    // const procNum = ref();
    const error = ref('');

    let url = 'https://4cgf7owinctxji4vx56hnisxh40iskps.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const { confirmResponse, addResponse } = useGlobalState();

    function getSignpdf(processNumber) {
        console.log(processNumber);
        sendProc.value = processNumber + '/';

        fetchSignPdf();
    }

    const fetchSignPdf = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProc.value } }).then((res) => {
                // console.log(res);
                result.status = res.response.value.status;

                result.message = res.data.value;
                result.isFinished = res.isFinished;
                result.isLoading = res.isLoading;

                // return res;
            });
            addResponse(result);

            // return res;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
            // procNum, getNumbers, sentInput,
        }
    };
    return { error, sendProc, getSignpdf, fetchSignPdf, result, confirmResponse, results };
}
