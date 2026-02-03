import { defineStore } from 'pinia';

export const usePaddyoptionStore = defineStore('paddycatInput', {
    //state
    // state: () => ({
    //     paddycatInput: [],
    //     id: 0
    // }),

    //actions
    // actions: {
    //     addPaddyCatval(paddyValues) {
    //         // this.reset();

    //         this.paddycatInput.push({ paddyValues, completed: false });
    //     },
    //     reset() {
    //         this.paddyValues = [];
    //     }
    // },
    state: () => ({
        // 👇 ADD THIS
        activeCategory: 'single' // 'single' | 'double'
    }),

    actions: {
        setCategory(category) {
            this.activeCategory = category;
        }
    },

    //getters

    getters: {
        getPaddyvalue: (state) => state.paddycatInput
    },
    clear() {
        this.activeCategory = [];
    }

    // persist: true
});

// // @/stores/paddyCatStore.js (or .ts)
// import { defineStore } from 'pinia';

// export const usePaddyoptionStore = defineStore('paddyOption', {
//     state: () => ({
//         // 👇 ADD THIS
//         activeCategory: 'single' // 'single' | 'double'
//     }),

//     actions: {
//         setCategory(category) {
//             this.activeCategory = category;
//         }
//     }
// });
