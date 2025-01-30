import { defineStore } from 'pinia';

export const usedripMStore = defineStore('dripinputmecht', {
    //state
    state: () => ({
        dripinputmecht: [],
        dripMTileMaterial: [],
        selectDripEdges: '',
        selectDripEdgeSizes: '',
        id: 2
    }),

    //actions
    actions: {
        addMTileDrip(dripMTileData) {
            this.dripinputmecht.push({ dripMTileData, completed: false });
        },
        insertDripAtIndex(index, dripMTileMaterial) {
            this.dripinputmecht.splice(index, 0, {
                dripMTileMaterial,
                completed: false
            });
        },

        resetState() {
            this.$reset();
            this.dripMTileMaterial = [];
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
