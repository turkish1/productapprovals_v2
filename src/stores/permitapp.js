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
        // addr, municipality, Folio, Contractorname, MasterPermit, processnumber, phone, email
        addSystem(formdt, permType, miamibeach) {
            this.permitapp.push({ formdt, miamibeach, permType, id: this.id++, completed: false });
        }
    },
    //getters
    getters: {
        form: (state) => state.formdt,
        folio: (state) => state.miamibeach
    }
    // persist: true
});
