import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useExposureD = createGlobalState(() => {
    // state
    const slopes = ref([]);
    const heights = ref([]);
    const zoned = ref([]);

    // getters
    const getSlopes = computed(() => slopes.value);
    const getHeight = computed(() => heights.value);
    const getZoned = computed(() => zoned.value);

    const getNumber = computed(() => tilenoa.value);
    // actions
    function addDimsloped(slope) {
        slopes.value.push(slope);
    }
    function addDimheightd(height) {
        heights.value.push(height);
    }

    function addDimzoned(zoneinput) {
        zoned.value.push(zoneinput);
    }

    return { slopes, heights, getSlopes, getZoned, getHeight, zoned, addDimzoned, addDimsloped, addDimheightd };
});
