// import DataService from '@/services/DataService';
// import { usetileStore } from '@/stores/tileStore';
import { useGlobalState } from '@/stores/tilepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usetileInputsingle() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const num = ref();
    const responseMessage = ref('');
    const error = ref('');
    const { tilenoas, getNoa, addNoa, resetSingle } = useGlobalState();
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
        table2_map: []
    });

    function getTilenoas(number) {
        input.value = number;
        console.log(input.value);
        num.value = Number(input.value);
        const result = execute({ params: { NOA: num.value } }).then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value[0]);
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
            console.log(noaNum.value[0].AdhesiveMaterial);

            addNoa(tileDatas);

            console.log(tileDatas, 'System added');

            return results;
        });
    }

    // 18061905 input,

    return { getTilenoas, tilenoas, getNoa, addNoa, resetSingle, responseMessage, noaNum, error, results, tileDatas };
}
