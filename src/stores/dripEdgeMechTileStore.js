import { defineStore } from 'pinia';

export const usedripMStore = defineStore('dripinputmaterial', {
    //state
    state: () => ({
        dripinputmaterial: [],
        dripMTileMaterial: [],
        dripinputsize: [],
        inputselectedUserDripEdge: [],
        selectedDripSize: [],
        id: 2
    }),

    //actions
    actions: {
        addMTileDrip(dripMTileData) {
            this.dripinputmaterial.push({ dripMTileData, completed: false });
        },
        addSTileDrip(selectedDripSizenew) {
            this.dripinputsize.push({ selectedDripSizenew, completed: false });
        },
        insertDripAtIndex(index, dripMTileMaterial) {
            this.dripinputmaterial.splice(index, 0, {
                dripMTileMaterial,
                completed: false
            });
        },
        addUseritems(dripSelection) {
            this.inputselectedUserDripEdge.push({ dripSelection, completed: false });
        },
        resetState() {
            // this.$reset();
            console.log('reset was called: ', this.inputselectedUserDripEdge);
            // this.dripMTileMaterial = [];
            this.inputselectedUserDripEdge = [];
            console.log('reset was called: ', this.inputselectedUserDripEdge);
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
