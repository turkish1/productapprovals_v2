// import DataService from '@/services/DataService';

// import { usePermitappStore } from '@/stores/permitapp';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useSignpdf() {
    const inp = ref();
    const sendProcessnumber = ref('');

    let results = ref([]);

    const procNum = ref();
    const error = ref('');

    let url = 'https://681byz7j80.execute-api.us-east-1.amazonaws.com/sendmenumber/sendmenumber';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    function getNumber(Input) {
        console.log(Input);
        inp.value = Input;

        sendProcessnumber.value = inp.value + '/';

        // procNum.value = Number(inp.value);
        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await execute({ params: { processnumber: sendProcessnumber.value } }).then((response) => {
                procNum.value = data.value;
                console.log(data);
            });

            return response;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
    };

    return { error, getNumber, procNum, fetchData };
}
