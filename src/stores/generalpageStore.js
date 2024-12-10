import { defineStore } from 'pinia';

export const useGeneralpdfStore = defineStore('generalpdfinput', {
    //state
    state: () => ({
        generalpdfinput: [],
        id: 0
    }),

    //actions
    actions: {
        addgeneralpdfData(generalpdfData) {
            this.generalpdfinput.push({ generalpdfData, completed: false });
        }
    },

    getters: {
        generalpdfData: (state) => state.generalpdfData
    }
    // persist: true
});
