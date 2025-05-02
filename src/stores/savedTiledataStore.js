import { defineStore } from 'pinia';

export const useSavedStore = defineStore('savedTileinput', {
    //state
    state: () => ({
        savedTileinput: []
        // id: 0
    }),

    //actions
    actions: {
        addSavedvalues(savedValues) {
            this.savedTileinput.push({ savedValues, completed: false });
        },
        reset() {
            this.savedTileinput = [];
        }
    },

    //getters

    getters: {
        getSavedvalues: (state) => state.savedTileinput
    }

    // persist: true
});
