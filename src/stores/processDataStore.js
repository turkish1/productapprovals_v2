import { defineStore } from 'pinia';

export const useprocdataStore = defineStore('procdatainput', {
    //state
    state: () => ({
        procdatainput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(lastNum) {
            this.procdatainput.push({ lastNum, completed: false });
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
