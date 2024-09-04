import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const tileadhesive = ref([]);

    // getters
    const getMaterial = computed(() => tileadhesive.value);

    // actions
    function addMaterial(material) {
        tileadhesive.value.push(material);
    }

    return { tileadhesive, getMaterial, addMaterial };
});
