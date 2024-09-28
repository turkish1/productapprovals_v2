import { defineStore } from 'pinia';

export const usesysEStore = defineStore('sysEInput', {
    //state
    state: () => ({
        sysEInput: [],
        id: 0
    }),

    //actions
    actions: {
        addSystem(sysENumber) {
            this.sysEInput.push({ sysENumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        sysENumber: (state) => state.sysENumber
    }

    // persist: true
});
