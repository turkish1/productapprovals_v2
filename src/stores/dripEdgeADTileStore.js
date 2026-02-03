import { defineStore } from 'pinia';

export const usedripADStore = defineStore('dripinputadmaterial', {
    //state
    state: () => ({
        dripinputadmaterial: [],
        dripTileMaterial: [],
        dripinputsize: [],
        inputselectedTileDripEdge: [],
        selectedDripSize: [],
        // id: 3
        dripinput: [],
        dripMaterial: [],
        id: 0
    }),

    //actions
    actions: {
        addMaterialDrip(dripTileData) {
            this.dripinputadmaterial.push({ dripTileData, completed: false });
        },
        addSizeDrip(selectedDripSizenew) {
            this.dripinputsize.push({ selectedDripSizenew, completed: false });
        },

        addUseritems(dripSelection) {
            this.inputselectedTileDripEdge.push({ dripSelection, completed: false });
        },
        resetState() {
            // console.log('reset was called: ', this.inputselectedTileDripEdge);

            this.inputselectedTileDripEdge = [];
            // console.log('reset was called: ', this.inputselectedTileDripEdge);
        }
    }
});
