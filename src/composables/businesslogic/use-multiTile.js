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
        console.log(dt);
        multiTiles.table2 = dt.Table2.content;
        multiTiles.select_tile = dt.select_tile;
        multiTiles.table2_map = dt.table2_map;
        multiTiles.tile_map = dt.tile_map;
        console.log(multiTiles);
        multiStore.addData(multiTiles);
    }

    return { multiTiles, workoutData, multiStore };
}
