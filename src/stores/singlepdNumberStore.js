import { defineStore } from 'pinia';

export const useSinglepdStore = defineStore('singlepd', {
    state: () => ({
        noaRaw: null // array|string|null
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
        addNoas({ noa }) {
            this.noaRaw = noa ?? null;
        }
    }
});
