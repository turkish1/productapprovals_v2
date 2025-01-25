import { usemultiStore } from '@/stores/multitileStore';
import { reactive, ref } from 'vue';

export default function usemuliTile() {
    // const tileData = reactive({
    //     noa: '',
    //     applicant: '',
    //     material: '',
    //     description: [],
    //     Table2: [],
    //     Table3: [],
    //     expiration_date: '',
    //     resistance: [],
    //     selection: '',
    //     select_tile: [],
    //     tile_map: [],
    //     table2_map: [],
    //     slope: 0,
    //     height: 0,
    //     dripEdgeMaterial: [],
    //     dripEdgeSize: [],
    //     deckType: '',
    //     expiration_date: '',
    //     prescriptiveSelection: ''
    // });
    const dt = ref([]);
    const multiTiles = reactive({
        select_tile: [],
        tile_map: [],
        table2_map: [],
        table2: ''
    });
    // const { tilenoa, getNoa } = useGlobalStates();
    const multiStore = usemultiStore();
    function workoutData(data) {
        dt.value = data;
        console.log(data);
        console.log(dt.value);
        multiTiles.table2 = dt.value.Table2.content;
        multiTiles.select_tile = dt.value.select_tile;
        multiTiles.table2_map = dt.value.table2_map;
        multiTiles.tile_map = dt.value.tile_map;
        console.log(multiTiles);
        multiStore.addData(multiTiles);
    }

    return { multiTiles, workoutData, multiStore };
}
