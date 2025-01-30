import { defineStore } from 'pinia';

export const usedripADStore = defineStore('dripinputadt', {
    //state
    state: () => ({
        dripinputadt: [],
        dripTileMaterial: [],
        selectDripEdges: '',
        selectDripEdgeSizes: '',
        id: 3
    }),

    //actions
    actions: {
        addDripTile(dripTileData) {
            this.dripinputadt.push({ dripTileData, completed: false });
        },
        insertDripAtIndex(index, dripTileMaterial) {
            this.dripinputadt.splice(index, 0, {
                dripTileMaterial,

                completed: false
            });
        },
        resetState() {
            this.$reset();
            this.dripTileMaterial = [];
        }
    }

    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
