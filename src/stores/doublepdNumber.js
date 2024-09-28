import { defineStore } from 'pinia';

export const useDoublepdStore = defineStore('doublepdInput', {
    //state
    state: () => ({
        doublepdInput: [],
        id: 0
    }),

    //actions
    actions: {
        addDouble(doublepdNumber) {
            this.doublepdInput.push({ doublepdNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        doublepdNumber: (state) => state.doublepdNumber
    }

    // persist: true
});
