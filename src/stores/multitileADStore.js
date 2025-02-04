import { defineStore } from 'pinia';

export const usemultiAdStore = defineStore('multiAdinput', {
    //state
    state: () => ({
        multiAdinput: [],
        id: 0
    }),

    //actions
    actions: {
        addAdhData(multiAdData) {
            this.multiAdinput.push({ multiAdData, completed: false });
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
