import { defineStore } from 'pinia';

export const useShinglenoaStore = defineStore('noashingle', {
    //state
    state: () => ({
        noashingle: [],
        id: 0
    }),

    //actions
    actions: {
        addShingle(shingleNoaNumber) {
            this.noashingle.push({ shingleNoaNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        shingleNoaNumber: (state) => state.shingleNoaNumber
    }

    // persist: true
});
