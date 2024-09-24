import { defineStore } from 'pinia';

export const usesystemfStore = defineStore('systeminput', {
    //state
    state: () => ({
        systeminput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(systemData) {
            this.systeminput.push({ systemData, completed: false });
            console.log(systemData, this.systeminput);
        }
    },

    //getters
    getters: {
        sysData: (state) => state.systemData
    },
    reset() {
        this.systeminput = [];
    }
    // persist: true
});
