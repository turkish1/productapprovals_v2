import { defineStore } from 'pinia';

export const usedripedgemtileStore = defineStore('dripinputmecht', {
    //state
    state: () => ({
        dripinputmecht: [],
        id: 2
    }),

    //actions
    actions: {
        addMTileDrip(dripMTileData) {
            this.dripinputmecht.push({ dripMTileData, completed: false });
        },
        reset() {
            this.$reset();
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
