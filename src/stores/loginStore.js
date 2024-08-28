import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
    //state
    state: () => ({
        login: []
    }),

    //actions
    actions: {
        addLogin(accountUser) {
            this.login.push({ accountUser });
        }
    },

    getters: {
        loginData: (state) => state.accountUser
    }
});
