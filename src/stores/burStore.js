import { defineStore } from 'pinia';

export const useBurStore = defineStore('burinput', {
    //state
    state: () => ({
        burinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(burData) {
            this.burinput.push({ burData, completed: false });
        }
    },

    getters: {
        burData: (state) => state.burData
    }
    // persist: true
});
