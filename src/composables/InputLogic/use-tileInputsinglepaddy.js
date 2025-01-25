// import DataService from '@/services/DataService';
// import { usetileStore } from '@/stores/tileStore';
import { usePaddyStore } from '@/stores/singlepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usetileInputsingle() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const num = ref();
    const responseMessage = ref('');
    const error = ref('');
    const { tileData, addtileData } = usePaddyStore();

    let url = 'https://q5vantupjl.execute-api.us-east-1.amazonaws.com/singlepd/singlepd';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const tileDatas = reactive({
        noa: '',
        applicant: '',
        material: [],
        description: '',
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        table2_map: [],
        height: '',
        area: '',
        slope: '',
        Decktype: '',
        perimeter: ''
    });

    async function getTilenoas(number) {
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
            console.log(response);
            if (response.length === 0) {
                // alert('No data found!');
            } else {
                console.log(noaNum.value, response);
                tileDatas.noa = noaNum.value[0].NOA;
                tileDatas.applicant = noaNum.value[0].applicant;
                tileDatas.material = noaNum.value[0].AdhesiveMaterial;
                tileDatas.selection = noaNum.value[0].AdhesiveMaterials;
                tileDatas.description = noaNum.value[0].description;
                tileDatas.Table2 = noaNum.value[0].Table2;
                tileDatas.Table3 = noaNum.value[0].Table3;
                tileDatas.select_tile = noaNum.value[0].Select_Tile;
                tileDatas.tile_map = noaNum.value[0].Tile_Map;
                tileDatas.table2_map = noaNum.value[0].Table2_Map;
                tileDatas.resistance = noaNum.value[0].Resistance;

                console.log(tileDatas, 'System added');

                addtileData(tileDatas);

                console.log(tileData, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { getTilenoas, tileData, responseMessage, noaNum, error, results, tileDatas };
}
