import { defineStore } from 'pinia';

export const usevalueStore = defineStore('tileInputvalues', {
    //state
    state: () => ({
        tileInputvalues: [],
        id: 0
    }),

    //actions
    actions: {
        addSystemvalues(tileValues) {
            this.tileInputvalues.push({ tileValues, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        tileValues: (state) => state.tileValues
    }

    // persist: true
});
