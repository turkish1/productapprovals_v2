import { defineStore } from 'pinia';

export const usedripedgeshingleStore = defineStore('dripinputshin', {
    //state
    state: () => ({
        dripinputshin: [],
        dripShinMaterial: [],
        selectDripEdges: '',
        selectDripEdgeSizes: '',
        id: 1
    }),

    //actions
    actions: {
        addShinDrip(dripShinData) {
            this.dripinputshin.push({ dripShinData, completed: false });
        },

        insertShinDrip(dripShinData, index) {
            const newItem = { dripShinData, completed: false };

            // If an index is provided and it's within the array bounds,
            // we can use splice to insert the item at that position
            if (typeof index === 'number' && index >= 0 && index <= this.dripinputshin.length) {
                this.dripinputshin.splice(index, 0, newItem);
            } else {
                // If no valid index is provided, just push the item to the end of the array
                this.dripinputshin.push(newItem);
            }
        },
        insertShinDripAtIndex(index, dripShinMaterial) {
            this.dripinputshin.splice(index, 0, {
                dripShinMaterial,
                completed: false
            });
        },

        /**
         * Overwrite (update) an existing item at a specific index, rather than inserting.
         */
        updateShinDrip(dripShinData, index) {
            if (typeof index === 'number' && index >= 0 && index < this.dripinputshin.length) {
                this.dripinputshin.splice(index, 1, { dripShinData, completed: false });
            } else {
                console.warn('Index out of bounds, item not updated');
            }
        },

        /**
         * Your original addShinDrip, if you want to keep it to always push.
         */

        resetState() {
            this.$reset();
            this.dripShinMaterial = [];
        }
    }

    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
