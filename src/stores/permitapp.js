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
        addSystem(formdt, permType) {
            this.permitapp.push({ formdt, permType, id: this.id++, completed: false });
        }
    }
    // persist: true
});
