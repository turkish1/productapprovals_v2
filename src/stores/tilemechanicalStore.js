import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const tilemech = ref([]);

    // getters
    const getNumber = computed(() => tilemech.value);

    // actions
    function addNoa(number) {
        tilemech.value.push(number);
    }

    return { tilemech, getNumber, addNoa };
});
