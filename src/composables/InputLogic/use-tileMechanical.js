// import DataService from '@/services/DataService';
import { useGlobalState } from '@/stores/tilemechanicalStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function useMech() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const mechStore = useGlobalState();
    const num = ref();
    const error = ref('');

    let url = 'https://8c6racnaj6.execute-api.us-east-1.amazonaws.com/mechanicalTile/mechanicalTile';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const mechanicalData = reactive({
        noa: '',
        manufacturer: '',
        material: [],
        description: '',
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        two_ten_d_RS_Nails: null,
        one_number_eight_screw: null,
        two_number_eight_screw: null,
        mechanicaltilefastener: []
    });
    function takeMechInput(inputMech) {
        input.value = inputMech;
        console.log(input.value);
        num.value = Number(input.value);
        fetchData();
    }
    const fetchData = async () => {
        try {
            const response = await execute({ params: { noa: num.value } }).then((response) => {
                noaNum.value = data.value;
                console.log(data.value);
                return noaNum.value;
            });
            console.log(response.length);
            if (response.length === 0) {
                // alert('No data found!');
            } else {
                console.log(noaNum.value);
                mechanicalData.manufacturer = noaNum.value[0].applicant;
                mechanicalData.material = noaNum.value[0].material;
                mechanicalData.selection = noaNum.value[0].AdhesiveMaterials;
                mechanicalData.description = noaNum.value[0].description;
                mechanicalData.Table2 = noaNum.value[0].Table2;
                mechanicalData.Table3 = noaNum.value[0].Table3;
                mechanicalData.resistance = noaNum.value[0].Resistance;
                mechanicalData.two_ten_d_RS_Nails = noaNum.value[0].two_ten_d_RS_Nails;
                mechanicalData.one_number_eight_screw = noaNum.value[0].one_number_eight_screw;
                mechanicalData.two_number_eight_screw = noaNum.value[0].two_number_eight_screw;
                mechanicalData.mechanicaltilefastener = noaNum.value[0].mechanicaltilefastener;
                // }
                mechStore.addNoa(mechanicalData);

                console.log(mechanicalData, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { input, fetchData, takeMechInput, noaNum, error, results, ...toRefs(mechanicalData), mechStore };
}
