import { usemultiStore } from '@/stores/multitileStore';
import { reactive } from 'vue';

export default function usemuliTile() {
    const multiTiles = reactive({
        select_tile: [],
        tile_map: [],
        table2_map: [],
        table2: ''
    });
    // const { tilenoa, getNoa } = useGlobalStates();
    const multiStore = usemultiStore();
    function workoutData(data) {
        let dt = data;
        console.log(dt.value[0], data);
        multiTiles.table2 = dt.value[0].Table2.content;
        multiTiles.select_tile = dt.value[0].select_tile;
        multiTiles.table2_map = dt.value[0].table2_map;
        multiTiles.tile_map = dt.value[0].tile_map;
        console.log(multiTiles);
        multiStore.addData(multiTiles);
    }

    return { multiTiles, workoutData, multiStore };
}
