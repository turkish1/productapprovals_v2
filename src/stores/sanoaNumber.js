import { defineStore } from 'pinia';

export const useSAnoaStore = defineStore('noasa', {
    //state
    state: () => ({
        noasa: [],
        id: 0
    }),

    //actions
    actions: {
        addData(saNoaNumber) {
            this.noasa.push({ saNoaNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        saNoaNumber: (state) => state.saNoaNumber
    }

    // persist: true
});
