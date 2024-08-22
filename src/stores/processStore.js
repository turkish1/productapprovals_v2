import { defineStore } from 'pinia';

export const useprocStore = defineStore('processinput', {
    //state
    state: () => ({
        processinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(procData) {
            this.processinput.push({ procData, completed: false });
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
