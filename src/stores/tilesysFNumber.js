import { defineStore } from 'pinia';

export const usesysFStore = defineStore('sysFInput', {
    //state
    state: () => ({
        sysFInput: [],
        id: 0
    }),

    //actions
    actions: {
        addSystem(sysFNumber) {
            this.sysFInput.push({ sysFNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        sysFNumber: (state) => state.sysFNumber
    }

    // persist: true
});
