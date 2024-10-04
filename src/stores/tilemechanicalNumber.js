import { defineStore } from 'pinia';

export const usemechStore = defineStore('tileMechInput', {
    //state
    state: () => ({
        tileMechInput: [],
        id: 0
    }),

    //actions
    actions: {
        addSystem(tileMechNumber) {
            this.tileMechInput.push({ tileMechNumber, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        tileMechNumber: (state) => state.tileMechNumber
    }

    // persist: true
});
