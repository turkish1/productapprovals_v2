import { defineStore } from 'pinia';

export const useDoublePaddyStore = defineStore('doublePaddy', {
    state: () => ({
        inputdatas: [],
        id: 0
    }),

    actions: {
        addtileDatas(payload) {
            this.inputdatas.push({ doublepaddyData: payload, completed: false });
        },

        reset() {
            this.inputdatas = [];
            this.id = 0;
        }
    },

    getters: {
        tileDatas: (state) => state.inputdatas, // ✅ return the array you actually store in
        latest: (state) => state.inputdatas[state.inputdatas.length - 1]?.doublepaddyData ?? null
    }
});

// import storeReset from '@/composables/Reset/reset-store';
// import { createPinia, defineStore } from 'pinia';
// export const useDoublePaddyStore = defineStore('inputdatas', {
//     //state
//     state: () => ({
//         inputdatas: [],
//         id: 0
//     }),

//     //actions
//     actions: {
//         addtileDatas(doublepaddyData) {
//             this.inputdatas.push({ doublepaddyData, completed: false });
//         },
//         reset() {
//             this.doublepaddyData = [];
//         }
//     },

//     //getters

//     getters: {
//         tileDatas: (state) => state.doublepaddyData
//     }

//     // persist: true
// });

// const store = createPinia();
// store.use(storeReset);

// export default store;
