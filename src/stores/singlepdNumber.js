import { defineStore } from 'pinia';

export const useSinglepdStore = defineStore('singlepdInput', {
    //state
    state: () => ({
        singlepdInput: [],
        id: 0
    }),

    //actions
    actions: {
        addSingle(singlepdNumber) {
            this.singlepdInput.push({ singlepdNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        singlepdNumber: (state) => state.singlepdNumber
    }

    // persist: true
});
