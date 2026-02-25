import { createPinia, defineStore } from 'pinia';

export const useDoublePaddyStore = defineStore('doublePaddy', {
    state: () => ({
        inputdatas: null, // Change from [] to null
        id: 0
    }),

    actions: {
        addtileDatas(val) {
            // val is the object { noa, manufacturer, ... }
            console.log(val);
            this.inputdatas = val;
            console.log('Store updated with:', this.inputdatas);
        },
        reset() {
            this.inputdatas = null;
            this.id = 0;
        }
    }
});
