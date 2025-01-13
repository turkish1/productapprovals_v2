import { defineStore } from 'pinia';

export const usedripedgeStore = defineStore('dripinput', {
    //state
    state: () => ({
        dripinput: [],
        id: 0
    }),

    //actions
    actions: {
        addDrip(dripData) {
            this.dripinput.push({ dripData, completed: false });
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
