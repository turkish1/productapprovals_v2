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
        },
        reset() {
            this.$reset();
        }
    },

    //getters
    getters: {
        sysData: (state) => state.systemData
    }

    // persist: true
});
