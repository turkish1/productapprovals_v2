import { defineStore } from 'pinia';

export const usePolynoaStore = defineStore('noapoly', {
    //state
    state: () => ({
        noapoly: [],
        id: 0
    }),

    //actions
    actions: {
        addData(polyNoaNumber) {
            this.noapoly.push({ polyNoaNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        polyNoaNumber: (state) => state.polyNoaNumber
    }

    // persist: true
});
