import { defineStore } from 'pinia';

export const useacctStore = defineStore('accountinput', {
    //state
    state: () => ({
        accountinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(Data) {
            this.accountinput.push({ Data, completed: false });
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
