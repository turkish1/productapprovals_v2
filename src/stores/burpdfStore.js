import { defineStore } from 'pinia';

export const useBurpdfStore = defineStore('burpdfinput', {
    //state
    state: () => ({
        burpdfinput: [],
        inputselection: [],
        burSelection: [],
        id: 0
    }),

    //actions
    actions: {
        addpdfData(burpdfData) {
            this.burpdfinput.push({ burpdfData, completed: false });
        },

        addUseritems(lowSelection) {
            this.burSelection.push({ lowSelection, completed: false });
        },
        resetState() {
            console.log('reset was called: ', this.inputselection);

            this.inputselection = [];
            console.log('reset was called: ', this.inputselection);
        }
    },

    getters: {
        burpdfData: (state) => state.burpdfData
    }
    // persist: true
});
