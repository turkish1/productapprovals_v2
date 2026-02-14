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
