import { defineStore } from 'pinia';

export const usePolyStore = defineStore('polyinput', {
    //state
    state: () => ({
        polyinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(polyData) {
            this.polyinput.push({ polyData, completed: false });
        }
    },

    reset() {
        this.polyinput = [];
    }
    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
