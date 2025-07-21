import { defineStore } from 'pinia';

export const useroofCheckStore = defineStore('roofinput', {
    //state
    state: () => ({
        roofinput: [],
        id: 0
    }),

    //actions
    actions: {
        addCheck(roofCheckdata) {
            this.roofinput.push({ roofCheckdata, completed: false });
        },
        reset() {
            this.roofinput = [];
        },
        persist: true
    }
});
