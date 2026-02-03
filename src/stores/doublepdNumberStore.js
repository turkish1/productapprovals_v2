import { defineStore } from 'pinia';

export const useDoublepdStore = defineStore('doublepd', {
    state: () => ({
        noaRaw: null
    }),

    getters: {
        noaList: (state) => {
            const src = state.noaRaw;

            if (Array.isArray(src)) return src.map(String);

            if (typeof src === 'string') {
                return src
                    .split(',')
                    .map((s) => s.replace(/[[\]"']/g, '').trim())
                    .filter(Boolean);
            }

            return [];
        }
    },

    actions: {
        addNoas(payload) {
            this.noaRaw = payload?.noa ?? null;
        }
    }
});
