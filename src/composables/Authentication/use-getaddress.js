import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function useMech() {
    const input = ref();

    const address = ref([]);
    let results = ref([]);

    const num = ref();
    const error = ref('');

    // let url = 'https://8c6racnaj6.execute-api.us-east-1.amazonaws.com/mechanicalTile/mechanicalTile';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    // const mechanicalData = reactive({
    //     noa: '',
    //     manufacturer: '',
    //     material: '',
    //     description: '',
    //     Table2: [],
    //     Table3: [],
    //     expiration_date: '',
    //     resistance: [],
    //     selection: '',
    //     select_tile: [],
    //     tile_map: [],
    //     table2_map: [],
    //     two_ten_d_RS_Nails: null,
    //     one_number_eight_screw: null,
    //     two_number_eight_screw: null,
    //     mechanicaltilefastener: [],
    //     fastenerValues: [],
    //     height: '',
    //     area: '',
    //     slope: '',
    //     perimeter: '',
    //     decktype: '',
    //     savedfastener: '',
    //     tiletype: ''
    // });
    function getAddress(addr) {
        input.value = inputAddr;

        num.value = Number(input.value);
        fetchData();
    }
    const fetchData = async () => {
        const url = `${base1URL}&Address=${encodeURIComponent(addr.value)}&to=200`;
        try {
            const response = await execute({ params: { NOA: num.value } }).then((response) => {
                noaNum.value = data.value;

                return noaNum.value;
            });
            console.log(response.length);
            if (response.length === 0) {
                // alert('No data found!');
            } else {
                mechStore.addNoa(mechanicalData);
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { input, fetchData, takeMechInput, noaNum, error, results, ...toRefs(mechanicalData), mechStore };
}
