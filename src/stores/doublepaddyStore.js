import storeReset from '@/composables/Reset/reset-store';
import { createPinia, defineStore } from 'pinia';
export const useDoublePaddyStore = defineStore('inputdatas', {
    //state
    state: () => ({
        inputdatas: [],
        id: 0
    }),

    //actions
    actions: {
        addtileDatas(doublepaddyData) {
            this.inputdatas.push({ doublepaddyData, completed: false });
        },
        reset() {
            this.doublepaddyData = [];
        }
    },

    //getters

    getters: {
        tileDatas: (state) => state.doublepaddyData
    }

    // persist: true
});

const store = createPinia();
store.use(storeReset);

export default store;
