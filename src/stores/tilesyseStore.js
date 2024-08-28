import { defineStore } from 'pinia';

export const usetilesysfStore = defineStore('tilesysEinput', {
    //state
    state: () => ({
        tilesysEinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(systemEData) {
            this.tilesysEinput.push({ systemEData, completed: false });
            console.log(systemEData, this.tilesysEinput);
        }
    },

    //getters
    getters: {
        sysData: (state) => state.systemEData
    }
    // persist: true
});
