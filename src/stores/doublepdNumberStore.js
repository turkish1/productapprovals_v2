import { defineStore } from 'pinia';

export const useDoublepdStore = defineStore('pdInputs', {
    //state
    state: () => ({
        pdInputs: [],
        id: 0
    }),

    //actions
    actions: {
        addNoas(pdNumbers) {
            this.pdInputs.push({ pdNumbers, completed: false });
        },
        reset() {
            // this.$reset();

            this.pdNumbers = [];
        }
    },

    //getters

    getters: {
        pdNumbers: (state) => state.pdNumbers
    }

    // persist: true
});
