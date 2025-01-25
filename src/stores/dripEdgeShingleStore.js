import { defineStore } from 'pinia';

export const usedripedgeshingleStore = defineStore('dripinputshin', {
    //state
    state: () => ({
        dripinputshin: [],
        id: 1
    }),

    //actions
    actions: {
        addShinDrip(dripShinData) {
            this.dripinputshin.push({ dripShinData, completed: false });
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
