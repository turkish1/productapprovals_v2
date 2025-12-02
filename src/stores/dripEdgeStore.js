import { defineStore } from 'pinia';

export const usedripedgeStore = defineStore('dripinput', {
    //state
    state: () => ({
        dripinput: [],
        dripinputsize: [],
        inputselectedDripEdge: [],
        selectedDripSize: [],
        dripMaterial: [],
        id: 0
    }),

    //actions
    actions: {
        addMaterialDrip(dripData) {
            this.dripinput.push({ dripData, completed: false });
        },
        addSizeDrip(selectedDripSizenew) {
            this.dripinputsize.push({ selectedDripSizenew, completed: false });
        },

        addUseritems(dripSelection) {
            this.inputselectedDripEdge.push({ dripSelection, completed: false });
        },
        resetState() {
            // console.log('reset was called: ', this.inputselectedDripEdge);

            this.inputselectedDripEdge = [];
            // console.log('reset was called: ', this.inputselectedDripEdge);
        }
    },
    getters: {
        selectedDripEdgeMaterial: (state) => {
            return state.inputselectedDripEdge[0]?.dripSelection?.dripEdgeMaterial ?? '';
        },
        selectedDripEdgeSize: (state) => {
            return state.inputselectedDripEdge[0]?.dripSelection?.dripEdgeSize ?? '';
        }
    }
});
