import { useGlobalState } from '@/stores/pdfsignStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function useSignpdf(proc) {
    const inp = ref();
    const sentInput = ref(proc);
    const sendProcessnumber = ref('');
    // let results = ref([]);

    const results = reactive({
        status: '',
        message: '',

        isFinished: '',
        isLoading: ''
    });

    const procNum = ref();
    const error = ref('');

    let url = 'https://4cgf7owinctxji4vx56hnisxh40iskps.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    function getNumbers(Input) {
        inp.value = Input;

        sendProcessnumber.value = inp.value + '/';

        fetchData();
    }
    const { confirmResponse, addResponse } = useGlobalState();

    const fetchData = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProcessnumber.value } }).then((response) => {
                procNum.value = data.value;
                results.status = response.response.value.status;

                results.message = response.data.value;
                results.isFinished = response.isFinished;
                results.isLoading = response.isLoading;
            });
            addResponse(results);

            return results;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
    };

    return { error, getNumbers, procNum, sentInput, fetchData, confirmResponse, results };
}
