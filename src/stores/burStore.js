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
    }

    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
