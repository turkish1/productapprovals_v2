import { defineStore } from 'pinia';

export const sessionStore = defineStore('sessioninput', {
    //state
    state: () => ({
        sessioninput: [],
        id: 0
    }),

    //actions
    actions: {
        addSession(sessionData) {
            this.sessioninput.push({ sessionData, completed: false });
        }
    }
});
