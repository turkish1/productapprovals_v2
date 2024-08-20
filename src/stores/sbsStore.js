import { defineStore } from 'pinia';

export const useSbsStore = defineStore('sbsinput', {
    //state
    state: () => ({
        sbsinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(sbsData) {
            this.sbsinput.push({ sbsData, completed: false });
        }
    },

    //getters
    getters: {
        noaInfo(state) {
            return state.sbsinput.selfadhered;
        }
    }
    // persist: true
});
