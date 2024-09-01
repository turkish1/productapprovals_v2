import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const tilenoa = ref([]);

    // getters
    const getNumber = computed(() => tilenoa.value);

    // actions
    function addNoa(number) {
        tilenoa.value.push(number);
    }

    return { tilenoa, getNumber, addNoa };
});
