import { defineStore } from 'pinia';

export const useShingleStore = defineStore('inputshingle', {
    //state
    state: () => ({
        inputshingle: [],
        id: 0
    }),

    //actions
    actions: {
        addShingle(shingleData) {
            this.inputshingle.push({ shingleData, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        shingleData: (state) => state.shingleData
    }

    // persist: true
});
