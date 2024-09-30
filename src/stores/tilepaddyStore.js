import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const tilenoas = ref([]);

    // getters
    const getNumber = computed(() => tilenoas.value);

    // actions
    function addNoa(number) {
        tilenoas.value.push(number);
    }
    function resetSingle() {
        tilenoas.value = [];
    }

    return { tilenoas, getNumber, addNoa, resetSingle };
});
