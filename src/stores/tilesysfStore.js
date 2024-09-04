import { defineStore } from 'pinia';

export const usetilesysfStore = defineStore('tilefinput', {
    //state
    state: () => ({
        tilefinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(systemData) {
            this.tilefinput.push({ systemData, completed: false });
            console.log(systemData, this.tilefinput);
        }
    },

    //getters
    getters: {
        sysData: (state) => state.systemData
    }
    // persist: true
});
