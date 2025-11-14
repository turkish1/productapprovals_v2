import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const accountUsers = ref([]);

    // getters
    const getUser = computed(() => accountUsers.value);

    // actions
    async function addUser(account) {
        accountUsers.value.push(account);
        console.log(accountUsers.value);
    }
    class reset {
        constructor() {
            this.accountUsers = [];
        }
    }
    return { reset, accountUsers, getUser, addUser };
});
