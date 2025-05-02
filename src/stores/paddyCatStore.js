import { defineStore } from 'pinia';

export const usePaddyoptionStore = defineStore('paddycatInput', {
    //state
    state: () => ({
        paddycatInput: [],
        id: 0
    }),

    //actions
    actions: {
        addPaddyCatval(paddyValues) {
            // this.reset();

            this.paddycatInput.push({ paddyValues, completed: false });
        },
        reset() {
            this.paddyValues = [];
        }
    },

    //getters

    getters: {
        getPaddyvalue: (state) => state.paddycatInput
    }

    // persist: true
});
