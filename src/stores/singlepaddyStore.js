import storeReset from '@/composables/Reset/reset-store';
import { createPinia, defineStore } from 'pinia';
export const usePaddyStore = defineStore('inputdata', {
    //state
    state: () => ({
        inputdata: [],
        id: 0
    }),

    //actions
    actions: {
        addtileData(singlepaddyData) {
            console.log(singlepaddyData);
            this.inputdata.push({ singlepaddyData, completed: false });
        }
        // reset() {
        //     this.singlepaddyData = [];
        // }
    },

    //getters

    getters: {
        tileData: (state) => state.singlepaddyData
    }

    // persist: true
});

const store = createPinia();
store.use(storeReset);
console.log(store);
export default store;
