import { defineStore } from 'pinia';

export const usedripedgeadtileStore = defineStore('dripinputadt', {
    //state
    state: () => ({
        dripinputadt: [],
        id: 3
    }),

    //actions
    actions: {
        addDripTile(dripTileData) {
            this.dripinputadt.push({ dripTileData, completed: false });
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
