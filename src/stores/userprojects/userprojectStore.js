import { defineStore } from 'pinia';

export const useprojectStore = defineStore('userpinput', {
    //state
    state: () => ({
        userpinput: [],
        id: 0
    }),

    //actions
    actions: {
        addData(userProject) {
            this.userpinput.push({ userProject, completed: false });
        }
    },
    getters: {
        projectData: (state) => state.userProject
    }
    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
