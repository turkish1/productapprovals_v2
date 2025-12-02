import { usePermitappStore } from '@/stores/permitapp';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useBurDetails() {
    const des_key = ref('');

    const permitStore = usePermitappStore();

    const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
    const muniNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');
    const results = ref('');

    const errors = ref('');

    function calldetailsdoc(objkeys) {
        des_key.value = objkeys;
        console.log(objkeys);

        fetchData();
    }

    const url = 'https://gmckvkc7vyhj3a5qj7uosghkwm0jmipz.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const fetchData = async () => {
        try {
            // console.log(muniNumber.value);
            const response = await execute({ params: { processnumber: muniNumber.value, objkey: des_key.value } }).then((response) => {
                console.log(data, response);
                results.status = response.response;
            });

            return results;
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
    };

    return { des_key, fetchData, processNumber, calldetailsdoc, errors, results };
}
