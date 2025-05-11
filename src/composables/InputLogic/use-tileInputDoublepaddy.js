// import { useGlobalStates } from '@/stores/tilenoaStore';

import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usetileInputdouble() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const num = ref();
    const responseMessage = ref('');
    const error = ref('');

    const useDoublepaddy = useDoublePaddyStore();

    let url = 'https://ewa5ibqdkpzvdvtynh2z7agljm0epptp.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const tileData = reactive({
        noa: '',
        applicant: '',
        material: '',
        content: '',
        description: [],
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        table2_map: [],
        slope: 0,
        height: 0,
        dripEdgeMaterial: [],
        dripEdgeSize: [],
        deckType: '',
        expiration_date: '',
        prescriptiveSelection: ''
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
            const response = await execute({ params: { NOA: num.value } }).then((data) => {
                console.log(data.data.value[0]);
                noaNum.value = data.data.value;
                console.log(noaNum.value);
                return noaNum.value;
            });
            // console.log(noaNum.value[0].Table2.content);
            // noaNum.value[0].Table2.content) || noaNum.value[0].Table3.content
            if (response.length > 0 && noaNum.value[0].Table2.content === 'multiple') {
                // alert('No data found!');
                // (data.value.length > 0 && noaNum.value[0].Table2.content) || noaNum.value[0].Table3.content;
                console.log(noaNum.value);
                tileData.noa = noaNum.value[0].NOA;
                tileData.applicant = noaNum.value[0].applicant;
                tileData.content = noaNum.value[0].Table2.content;
                tileData.material = noaNum.value[0].AdhesiveMaterial;
                tileData.selection = noaNum.value[0].AdhesiveMaterials;
                tileData.description = noaNum.value[0].description;
                tileData.Table2 = noaNum.value[0].Table2;
                tileData.Table3 = noaNum.value[0].Table3;
                tileData.select_tile = noaNum.value[0].Select_Tile;
                tileData.tile_map = noaNum.value[0].Tile_Map;
                tileData.table2_map = noaNum.value[0].Table2_Map;
                tileData.resistance = noaNum.value[0].Resistance;
                useDoublepaddy.addtileDatas(tileData);
            } else if (response.length > 0) {
                console.log(noaNum.value);
                tileData.noa = noaNum.value[0].NOA;
                tileData.applicant = noaNum.value[0].applicant;

                tileData.material = noaNum.value[0].AdhesiveMaterial;
                tileData.selection = noaNum.value[0].AdhesiveMaterials;
                tileData.description = noaNum.value[0].description;
                tileData.Table2 = noaNum.value[0].Table2;
                tileData.Table3 = noaNum.value[0].Table3;
                tileData.select_tile = noaNum.value[0].Select_Tile;
                tileData.tile_map = noaNum.value[0].Tile_Map;
                tileData.table2_map = noaNum.value[0].Table2_Map;
                tileData.resistance = noaNum.value[0].Resistance;

                useDoublepaddy.addtileDatas(tileData);

                console.log(tileData, 'System added');
            } else {
                console.warn('No data found!');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { getTilenoa, fetchData, useDoublepaddy, responseMessage, noaNum, error, results, tileData };
}
