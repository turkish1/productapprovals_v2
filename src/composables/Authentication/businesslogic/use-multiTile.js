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


  
        console.log(multiTiles);
        multiStore.addData(multiTiles);
    }

    return { multiTiles, workoutData, multiStore, getmechStore };
}
