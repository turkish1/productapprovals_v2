import { defineStore } from 'pinia';

export const usedripedgeStore = defineStore('dripinput', {
    //state
    state: () => ({
        dripinput: [],
        dripMaterial: [],
        id: 0
    }),

    //actions
    actions: {
        addDrip(dripData) {
            this.dripinput.push({ dripData, completed: false });
        },

        insertDrip(dripData, index) {
            const newItem = { dripData, completed: false };

            // If an index is provided and it's within the array bounds,
            // we can use splice to insert the item at that position
            if (typeof index === 'number' && index >= 0 && index <= this.dripinput.length) {
                this.dripinput.splice(index, 0, newItem);
            } else {
                // If no valid index is provided, just push the item to the end of the array
                this.dripinput.push(newItem);
            }
        },
        insertDripAtIndex(index, dripMaterial) {
            this.dripinput.splice(index, 0, {
                dripMaterial,

                completed: false
            });
        },
        resetState() {
            this.$reset();
            this.dripMaterial = [];
        }
        // reset() {
        //     this.dripMaterial.$reset();
        //     this.dripData.$reset();
        // }
    }

    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
