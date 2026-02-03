import { defineStore } from 'pinia';

export const usemechStore = defineStore('tileMechInput', {
    state: () => ({
        // each entry: { noa: string[], fetchedAt: number, completed: boolean }
        tileMechInput: [],
        id: 0
    }),

    actions: {
        /**
         * Accepts either:
         *  - { noa: string[] , fetchedAt?: number }
         *  - string[] (array of NOAs)
         *  - string (json string array)
         */
        addSystem(payload) {
            let noa = [];
            let fetchedAt = Date.now();

            // Normalize payload
            if (Array.isArray(payload)) {
                noa = payload;
            } else if (typeof payload === 'string') {
                // allow addSystem("[\"20043003\", ...]")
                try {
                    const parsed = JSON.parse(payload);
                    noa = Array.isArray(parsed) ? parsed : [];
                } catch {
                    noa = [];
                }
            } else if (payload && typeof payload === 'object') {
                fetchedAt = typeof payload.fetchedAt === 'number' ? payload.fetchedAt : fetchedAt;
                noa = Array.isArray(payload.noa) ? payload.noa : [];
            }

            // ✅ ensure PLAIN array of strings (no Proxy)
            const plainNoa = noa.map(String).slice();

            this.tileMechInput.push({
                noa: plainNoa,
                fetchedAt,
                completed: false
            });
        },

        reset() {
            this.$reset();
        }
    },

    getters: {
        // Latest entry object
        latest(state) {
            return state.tileMechInput.length ? state.tileMechInput[state.tileMechInput.length - 1] : null;
        },

        // Latest NOA array (plain)
        latestNoa(state) {
            const last = state.tileMechInput.length ? state.tileMechInput[state.tileMechInput.length - 1] : null;
            return Array.isArray(last?.noa) ? last.noa.slice() : [];
        }
    }
});

// import { defineStore } from 'pinia';

// export const usemechStore = defineStore('tileMechInput', {
//     state: () => ({
//         tileMechInput: [],
//         id: 0
//     }),

//     actions: {
//         // payload: { noa: string[], fetchedAt: number }
//         addSystem(payload) {
//             this.tileMechInput.push({
//                 ...payload,
//                 completed: false
//             });
//         },
//         reset() {
//             this.$reset();
//         }
//     },

//     getters: {
//         latestNoa: (state) => state.tileMechInput.at(-1)?.noa ?? []
//     }
// });
