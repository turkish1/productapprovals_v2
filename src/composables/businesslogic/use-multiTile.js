import { usemultiStore } from '@/stores/multitileStore';
import { useGlobalState } from '@/stores/tilemechanicalStore';
import { reactive, ref } from 'vue';

export default function usemuliTile() {
    const selected = ref([]);
    const dt = ref([]);
    const multiTiles = reactive({
        select_tile: [],
        tile_map: [],
        table2_map: [],
        table2: '',
        noa: '',
        manufacturer: '',
        material: '',
        description: '',
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        tileType: '',
        table2_map: [],
        two_ten_d_RS_Nails: null,
        one_number_eight_screw: null,
        two_number_eight_screw: null,
        savedfastener: '',
        fastenerValues: [],
        height: null,
        area: null,
        slope: null,
        perimeter: null,
        decktype: null
    });
    const getmechStore = useGlobalState();
    const multiStore = usemultiStore();
    function workoutData(data, selectTiles) {
        dt.value = data.value;
        selected.value = selectTiles;
        console.log(data, selectTiles);
        console.log(getmechStore);
        console.log(dt.value[0].Table2.content);
        multiTiles.table2 = dt.value[0].Table2.content;
        multiTiles.select_tile = dt.value[0].select_tile;
        multiTiles.table2_map = dt.value[0].table2_map;
        multiTiles.tile_map = dt.value[0].tile_map;

        // multiTiles.noa = getmechStore.value[0].noa;
        // multiTiles.manufacturer = getmechStore.value[0].applicant;
        // multiTiles.material = getmechStore.value[0].material;
        // multiTiles.description = getmechStore.value[0].description;
        // multiTiles.select_tile = getmechStore.value[0].Select_Tile;
        // multiTiles.tile_map = getmechStore.value[0].Tile_Map;
        // // multiTiles.table2_map = getmechStore.value[0].Table2_Map;

        // multiTiles.Table2 = getmechStore.value[0].Table2;
        // multiTiles.Table3 = getmechStore.value[0].Table3;
        // multiTiles.resistance = getmechStore.value[0].Resistance;
        // multiTiles.expiration_date = getmechStore.value[0].expiration_date;
        // multiTiles.two_ten_d_RS_Nails = getmechStore.value[0].two_ten_d_RS_Nails;
        // multiTiles.one_number_eight_screw = getmechStore.value[0].one_number_eight_screw;
        // multiTiles.two_number_eight_screw = getmechStore.value[0].two_number_eight_screw;
        // multiTiles.savedfastener= getmechStore.value[0].mechanicaltilefastener;
        // multiTiles.fastenerValues = getmechStore.value[0].fastenerValues;
        console.log(multiTiles);
        multiStore.addData(multiTiles);
    }

    return { multiTiles, workoutData, multiStore, getmechStore };
}
