import { defineStore } from 'pinia';

export const useburDetailStore = defineStore('detailinput', {
    //state
    state: () => ({
        detailinput: [],
        id: 0
    }),

    //actions
    actions: {
        addDetail(detailDocs) {
            this.detailinput.push({ detailDocs, completed: false });
        },
        reset() {
            this.$reset();
        }
    },

    //getters

    getters: {
        detailDocs: (state) => state.detailDocs
    }

    // persist: true
});
