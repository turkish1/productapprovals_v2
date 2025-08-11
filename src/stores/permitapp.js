import { defineStore } from 'pinia';
export const usePermitappStore = defineStore('permitapp', {
    //state
    state: () => ({
        permitapp: [],
        id: 0
    }),
    //getters

    //actions
    actions: {
        addSystem(formdt, mbId) {
            this.permitapp.push({ formdt, mbId, id: this.id++, completed: false });
        }
    },
    //getters
    getters: {
        form: (state) => state.formdt,
        folio: (state) => state.mbId,
        muniNum: (state) => state.muniNum
    }
    // persist: true
});
