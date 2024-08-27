import { defineStore } from 'pinia';

export const useacctStore = defineStore('login', {
    //state
    state: () => ({
        login: [],
        id: 0
    }),

    //actions
    actions: {
        addLogin(accountUser) {
            this.login.push({ accountUser, completed: false });
        }
    },

    getters: {
        loginData: (state) => state.accountUser
    }
    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
