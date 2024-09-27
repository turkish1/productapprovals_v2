import { useGlobalState } from '@/stores/tilenoaStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usetileInputdouble() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const num = ref();
    const responseMessage = ref('');
    const error = ref('');
    const { tilenoa, getNoa, addNoa } = useGlobalState();
    let url = 'https://jtk1qa20ul.execute-api.us-east-1.amazonaws.com/doublepd/doublepd';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const tileData = reactive({
        noa: '',
        applicant: '',
        material: [],
        description: '',
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: ''
    });

    function getTilenoa(number) {
        console.log(number);

        input.value = number;
        num.value = Number(input.value);
        console.log(num.value);
        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await execute({ params: { NOA: num.value } }).then((response) => {
                noaNum.value = data.value;

                return noaNum.value;
            });
            console.log(response.length);
            if (response.length === 0) {
                alert('No data found!');
            } else {
                console.log(noaNum.value);

                tileData.applicant = noaNum.value[0].applicant;
                tileData.material = noaNum.value[0].AdhesiveMaterial;
                tileData.selection = noaNum.value[0].AdhesiveMaterials;
                tileData.description = noaNum.value[0].description;
                tileData.Table2 = noaNum.value[0].Table2;
                tileData.Table3 = noaNum.value[0].Table3;
                tileData.resistance = noaNum.value[0].Resistance;
                console.log(noaNum.value[0].AdhesiveMaterial);

                addNoa(tileData);

                console.log(tileData, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { getTilenoa, fetchData, tilenoa, getNoa, addNoa, responseMessage, noaNum, error, results, tileData };
}
