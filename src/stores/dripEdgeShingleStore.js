import { defineStore } from 'pinia';

export const usedripedgeshingleStore = defineStore('dripShinMaterial', {
    //state
    state: () => ({
        dripShinMaterial: [],
        dripinputshin: [],
        selectDripEdges: [],
        shingleEdgesize: [],
        inputselectedUserDripEdge: [],
        selectedDripSize: [],
        id: 1
    }),

    //actions
    actions: {
        addMaterialShin(dripShinData) {
            this.dripShinMaterial.push({ dripShinData, completed: false });
        },
        addSizeShin(selectedShinglesSizenew) {
            this.shingleEdgesize.push({ selectedShinglesSizenew, completed: false });
        },

        addUseritems(dripSelection) {
            console.log(this.inputselectedUserDripEdge);
            this.inputselectedUserDripEdge.push({ dripSelection, completed: false });
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
            // this.$reset();
            // this.dripShinMaterial = [];
            console.log(this.inputselectedUserDripEdge);

            this.inputselectedUserDripEdge = [];
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
