import { defineStore } from 'pinia';

export const usetilesysEStore = defineStore('tilesysEinput', {
    //state
    state: () => ({
        tilesysEinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(systemDataE) {
            this.tilesysEinput.push({ systemDataE, completed: false });
            console.log(systemDataE, this.tilesysEinput);
        }
    },

    //getters
    getters: {
        sysEData: (state) => state.systemDataE
    }
    // persist: true
});