import { defineStore } from 'pinia';

export const usecccStore = defineStore('cccinput', {
    //state
    state: () => ({
        cccinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(cccAccounts) {
            this.cccinput.push({ cccAccounts, completed: false });
        }
    },
    getters: {
        cccData: (state) => state.cccAccounts
    }
    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
