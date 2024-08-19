import { defineStore } from 'pinia';

export const useShingleStore = defineStore('inputshingle', {
    //state
    state: () => ({
        inputshingle: [],
        id: 0
    }),
    //getters

    //actions
    actions: {
        addShingle(shingleData) {
            this.inputshingle.push({ shingleData, id: this.id++, completed: false });
        }
    }
    // persist: true
});
