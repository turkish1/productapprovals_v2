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
