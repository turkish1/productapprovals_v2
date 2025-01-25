import { defineStore } from 'pinia';

export const usedripedgemtileStore = defineStore('dripinputmetal', {
    //state
    state: () => ({
        dripinputmetal: [],
        id: 4
    }),

    //actions
    actions: {
        addMetalDrip(dripMetalData) {
            this.dripinputmetal.push({ dripMetalData, completed: false });
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
