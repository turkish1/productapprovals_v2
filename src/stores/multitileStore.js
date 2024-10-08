import { defineStore } from 'pinia';

export const usemultiStore = defineStore('multiinput', {
    //state
    state: () => ({
        multiinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(multiData) {
            this.multiinput.push({ multiData, completed: false });
        },
        reset() {
            this.$reset();
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
