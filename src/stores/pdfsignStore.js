import { createGlobalState } from '@vueuse/core';
// store.js
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const res = ref([]);

    // getters
    const confirmResponse = computed(() => res.value);

    // actions
    function addResponse(rs) {
        res.value.push(rs);
    }

    return { res, confirmResponse, addResponse };
});
