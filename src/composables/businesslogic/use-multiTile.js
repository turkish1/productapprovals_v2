import { usemultiStore } from '@/stores/multitileStore';
import { useGlobalState } from '@/stores/tilenoaStore';
import { reactive } from 'vue';

export default function usemuliTile() {
    const multiTiles = reactive({
        select_tile: [],
        tile_map: [],
        table2_map: []
    });
    const { tilenoa, getNoa } = useGlobalState();
    const multiStore = usemultiStore();
    function workoutData(data) {
        let dt = data;
        console.log(dt, tilenoa);
        multiTiles.select_tile = dt.select_tile;
        multiTiles.table2_map = dt.table2_map;
        multiTiles.tile_map = dt.tile_map;

        multiStore.addData(multiTiles);
    }

    return { multiTiles, workoutData, multiStore };
}
