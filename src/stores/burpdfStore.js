import { defineStore } from 'pinia';

export const useBurpdfStore = defineStore('burpdfinput', {
    //state
    state: () => ({
        burpdfinput: [],
        id: 0
    }),

    //actions
    actions: {
        addpdfData(burpdfData) {
            this.burpdfinput.push({ burpdfData, completed: false });
        }
    },

    getters: {
        burpdfData: (state) => state.burpdfData
    }
    // persist: true
});
