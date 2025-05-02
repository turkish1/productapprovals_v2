import { defineStore } from 'pinia';

export const usevalueStore = defineStore('tileInputvalues', {
    //state
    state: () => ({
        tileInputvalues: []
        // id: 0
    }),

    //actions
    actions: {
        addSystemvalues(tileValues) {
            // this.reset();

            this.tileInputvalues.push({ tileValues, completed: false });
        },
        reset() {
            this.tileInputvalues = [];
        }
    },

    //getters

    getters: {
        getTilevalue: (state) => state.tileInputvalues
    }

    // persist: true
});
