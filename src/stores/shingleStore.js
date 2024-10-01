import storeReset from '@/composables/Reset/reset-store';
import { createPinia, defineStore } from 'pinia';
export const useShingleStore = defineStore('inputshingle', {
    //state
    state: () => ({
        inputshingle: [],
        id: 0
    }),

    //actions
    actions: {
        addShingle(shingleData) {
            this.inputshingle.push({ shingleData, completed: false });
        }
        // reset() {
        //     this.shingleData = [];
        // }
    },

    //getters

    getters: {
        shingleData: (state) => state.shingleData
    }

    // persist: true
});

const store = createPinia();
store.use(storeReset);
console.log(store);
export default store;
