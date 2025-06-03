import { defineStore } from 'pinia';

export const countStore = defineStore('countinput', {
    //state
    state: () => ({
        countinput: [],
        id: 0
    }),

    //actions
    actions: {
        addCount(countData) {
            this.countinput.push({ countData, completed: false });
        },
        reset() {
            this.countinput = [];
        },
        persist: true
    }
});
