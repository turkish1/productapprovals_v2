import { usemultiAdStore } from '@/stores/multitileADStore';
import { reactive, ref } from 'vue';

export default function usemuliAdTile() {
    const selected = ref([]);
    const dt = ref([]);
    const multiTileAD = reactive({
        select_tile: [],
        tile_map: [],
        table2_map: [],
        table2: ''
    });

    const multiAdStore = usemultiAdStore();
    function workoutDataAD(data, selectTiles) {
        dt.value = data.value;
        selected.value = selectTiles;
        console.log(data, selectTiles);
        console.log(data.value);
        console.log(dt.value.Table2.content);
        multiTileAD.table2 = dt.value[0].Table2.content;
        multiTileAD.select_tile = dt.value[0].select_tile;
        multiTileAD.table2_map = dt.value[0].table2_map;
        multiTileAD.tile_map = dt.value[0].tile_map;
        console.log(multiTileAD);
        multiAdStore.addAdhData(multiTileAD);
    }
    // multiTileAD,
    return { workoutDataAD, multiTileAD, multiAdStore };
}
