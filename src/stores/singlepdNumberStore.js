import { defineStore } from 'pinia';

export const useSinglepdStore = defineStore('pdInput', {
    //state
    state: () => ({
        pdInput: [],
        id: 0
    }),

    //actions singlepdNumber
    actions: {
        addNoas(pdNumber) {
            this.pdInput.push({ pdNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        pdNumber: (state) => state.pdNumber
    }

    // persist: true
});
