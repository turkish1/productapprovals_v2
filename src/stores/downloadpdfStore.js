import { defineStore } from 'pinia';

export const usedownloadStore = defineStore('downloadinput', {
    //state
    state: () => ({
        downloadinput: [],
        id: 0
    }),

    //actions
    actions: {
        addDownload(downloadData) {
            this.downloadinput.push({ downloadData, completed: false });
        },
        reset() {
            this.$reset();
        }
    }

    //getters
    // getters: {
    //     noaInfo(state) {
    //         return state.inputshingle.shingleData;
    //     }
    // }
    // persist: true
});
