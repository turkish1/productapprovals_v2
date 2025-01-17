// import { useburDetailStore } from '@/stores/burDetaildocs';
import { usePermitappStore } from '@/stores/permitapp';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs, computed } from 'vue';

export default function useBurDetails() {
    const des_key = ref('');

    const permitStore = usePermitappStore();

    const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
    // const processnumber = ref(processNumber.value);

    const results = ref('');

    const errors = ref('');

    function calldetailsdoc(objkey) {
        des_key.value = objkey;

        console.log(des_key.value);
        fetchData();
    }

    const url = 'https://0b5oj9drpk.execute-api.us-east-1.amazonaws.com/burdetails/burdetails';
    // const url = computed(() => {
    //     return 'https://0b5oj9drpk.execute-api.us-east-1.amazonaws.com/burdetails/burdetails?';
    // });

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const fetchData = async () => {
        try {
            const response = await execute({ params: { processnumber: processNumber.value, destination_objkey: des_key.value } }).then((response) => {
                console.log(response);
                console.log(data);
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
