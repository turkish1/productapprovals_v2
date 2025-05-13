// import DataService from '@/services/DataService';
import { useSbsStore } from '@/stores/sbsStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useSbs() {
    const inputs = ref();

    const noaNum = ref([]);
    const num = ref();
    let results = ref([]);
    const store = useSbsStore();

    const error = ref('');

    let url = 'https://p24rurxvuyt5spbou3rcljgheq0ftxgq.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const sbsData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: ''
    });
    function takeValues(saNoa) {
        inputs.value = saNoa;
        console.log(inputs.value);
        num.value = Number(inputs.value);
        fetchData();
    }
    const fetchData = async () => {
        try {
            const response = await execute({ params: { noa: num.value } }).then((response) => {
                noaNum.value = data.value;
                console.log(noaNum.value);
                return noaNum.value;
            });
            console.log(response);
            if (response.length === 0) {
                alert('No data found!');
            } else {
                sbsData.noa = noaNum.value[0].noa;
                sbsData.applicant = noaNum.value[0].applicant;
                sbsData.material = noaNum.value[0].material;
                sbsData.description = noaNum.value[0].description;
                sbsData.expiration_date = noaNum.value[0].expiration_date;

                if (sbsData.length === 0) {
                    return;
                }
                store.addData(sbsData);

                console.log(sbsData, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            alert('An error occurred while fetching data.');
        }
        return results;
    };
    // 18061905

    return { inputs, takeValues, fetchData, noaNum, error, results, ...toRefs(sbsData), store };
}
