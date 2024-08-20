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
        }
    },

    //getters
    getters: {
        noaInfo(state) {
            return state.inputshingle.shingleData;
        }
    }
    // persist: true
});
