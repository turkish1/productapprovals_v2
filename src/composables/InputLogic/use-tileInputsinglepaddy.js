import { usePaddyStore } from '@/stores/singlepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
// import { reactive, ref } from 'vue';

import { reactive, ref } from 'vue';

// This picks the individual NOAS
export default function useTileInputSingle() {
    const input = ref(null);
    const noaNum = ref([]);
    const results = ref([]);
    const num = ref('');
    const responseMessage = ref('');
    // const error = ref('');
    const paddyStore = usePaddyStore();

    const tileDatas = reactive({
        noa: '',
        applicant: '',
        material: [],
        content: '',
        description: '',
        Table2: [],
        Table3: [],
        Table2_obj_map: [],
        Table3_obj_map: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        table2_map: [],
        paddy_cat: '',
        height: '',
        area: '',
        slope: '',
        Decktype: '',
        perimeter: ''
    });

    function getTilenoas(number) {
        input.value = number;
        num.value = Number(input.value);
        console.log('Fetching NOA for number:', num.value);
        // await fetchData();
        fetchData();
    }
    const url = 'https://bndobvdmx2hlyfu7pbizohgova0aefyp.lambda-url.us-east-1.on.aws/';

    const { execute, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const fetchData = async () => {
        try {
            const response = await execute({ params: { NOA: num.value } }).then((res) => {
                noaNum.value = data.value[0];

                return noaNum.value;
            });
            // .get()
            // .json();
            console.log(data.value);
            // && data.value[0].Table2.content) || data.value[0].Table3.content
            if (data.value.length > 0 && data.value[0].Table2.content === 'multiple') {
                console.log('Entered due to Table2 and Table3 content multiple');
                // using the data.value[0] to make use of the async await.
                const multiTile = await data.value[0];
                console.log(multiTile);
                tileDatas.noa = await multiTile.NOA;
                tileDatas.content = await multiTile.Table2.content;
                tileDatas.applicant = await multiTile.applicant;
                tileDatas.material = await multiTile.AdhesiveMaterial;
                tileDatas.selection = await multiTile.AdhesiveMaterials;
                tileDatas.description = await multiTile.description;
                tileDatas.select_tile = await multiTile.Select_Tile;
                tileDatas.Table3_obj_map = await multiTile.Tile_Map;
                tileDatas.Table2_obj_map = await multiTile.Table2_Map;
                tileDatas.resistance = await multiTile.Resistance;
                tileDatas.paddy_cat = await multiTile.paddy_category;
                tileDatas.expiration_date = await multiTile.expiration_date;
                console.log('Tile data fetched:', tileDatas);
                paddyStore.addtileData(tileDatas);
            } else if (data.value.length > 0) {
                const fetched = await data.value[0];
                tileDatas.noa = await fetched.NOA;
                tileDatas.applicant = await fetched.applicant;
                tileDatas.material = await fetched.AdhesiveMaterial;
                tileDatas.selection = await fetched.AdhesiveMaterials;
                tileDatas.description = await fetched.description;
                tileDatas.Table2 = await fetched.Table2;
                tileDatas.Table3 = await fetched.Table3;
                tileDatas.select_tile = await fetched.Select_Tile;
                // Tile.Map is for table three conversion change this later
                tileDatas.tile_map = await fetched.Tile_Map;
                tileDatas.table2_map = await fetched.Table2_Map;
                tileDatas.resistance = await fetched.Resistance;
                tileDatas.expiration_date = await fetched.expiration_date;
                tileDatas.paddy_cat = await fetched.paddy_category;

                console.log('Tile data fetched:', tileDatas);
                paddyStore.addtileData(tileDatas);
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { getTilenoas, responseMessage, fetchData, noaNum, results, tileDatas, paddyStore };
}
