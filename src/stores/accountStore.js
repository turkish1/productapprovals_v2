// import { defineStore } from 'pinia';

// export const userStore = defineStore('inputuser', {
//     //state
//     state: () => ({
//         inputuser: [],
//         id: 0
//     }),

//     //actions
//     actions: {
//         addData(accountUser) {
//             this.inputuser.push({ accountUser });
//         }
//     },
//     getters: {
//         acctData: (state) => state.accountUser
//     }

// });
import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const accountUsers = ref([]);

    // getters
    const getUser = computed(() => accountUsers.value);

    // actions
    function addUser(account) {
        accountUsers.value.push(account);
    }

    return { accountUsers, getUser, addUser };
});
