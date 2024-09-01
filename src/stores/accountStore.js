import { defineStore } from 'pinia';

export const userStore = defineStore('inputuser', {
    //state
    state: () => ({
        inputuser: [],
        id: 0
    }),

    //actions
    actions: {
        addData(accountUser) {
            this.inputuser.push({ accountUser });
        }
    },
    getters: {
        acctData: (state) => state.accountUser
    }
});
