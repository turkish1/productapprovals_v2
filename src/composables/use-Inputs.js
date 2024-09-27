// import DataService from '@/services/DataService';
import { useShingleStore } from '@/stores/shingleStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function useInputs() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const store = useShingleStore();
    const num = ref();
    const error = ref('');

    let url = 'https://45ocd2dvi7.execute-api.us-east-1.amazonaws.com/shinglenoa/shinglenoa';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const shingleData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: ''
    });
    function takeValue(inputNoa) {
        input.value = inputNoa;

        num.value = Number(input.value);
        fetchData();
    }
    const fetchData = async () => {
        try {
            const response = await execute({ params: { noa: num.value } }).then((response) => {
                noaNum.value = data.value;

                return noaNum.value;
            });
            console.log(response.length);
            if (response.length === 0) {
                // alert('No data found!');
            } else {
                console.log(noaNum.value);
                shingleData.applicant = noaNum.value[0].applicant;
                shingleData.material = noaNum.value[0].material;
                shingleData.description = noaNum.value[0].description;
                shingleData.expiration_date = noaNum.value[0].expiration_date;
                // }
                store.addShingle(shingleData);

                console.log(shingleData, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { input, fetchData, takeValue, noaNum, error, results, ...toRefs(shingleData), store };
}
