// import DataService from '@/services/DataService';
import { usePolyStore } from '@/stores/polyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function usePoly() {
    const inp = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const store = usePolyStore();
    const num = ref();
    const error = ref('');

    let url = 'https://o2cmgq2w4l.execute-api.us-east-1.amazonaws.com/shinglepoly/shinglepoly';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const polyData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: ''
    });
    function takp(udlInput) {
        inp.value = udlInput;
        console.log(inp.value);
        num.value = Number(inp.value);
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
                // alert('No data found!');
            } else {
                polyData.noa = noaNum.value[0].noa;
                polyData.applicant = noaNum.value[0].applicant;
                polyData.material = noaNum.value[0].material;
                polyData.description = noaNum.value[0].description;
                polyData.expiration_date = noaNum.value[0].expiration_date;
                if (polyData.length === 0) {
                    return;
                }
                store.addData(polyData);

                console.log(polyData, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }

        return results;
    };
    // 18061905

    return { inp, fetchData, takp, noaNum, error, results, ...toRefs(polyData), store };
}
