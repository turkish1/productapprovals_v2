import { createGlobalState } from '@vueuse/core';
import { computed, ref } from 'vue';

export const useGlobalState = createGlobalState(() => {
    // state
    const slopes = ref([]);
    const heights = ref([]);
    const zones = ref([]);

    // getters
    const getSlopes = computed(() => slopes.value);
    const getHeight = computed(() => heights.value);
    const getZones = computed(() => zones.value);

    const getNumber = computed(() => tilenoa.value);
    // actions
    function addDimslope(slope) {
        slopes.value.push(slope);
    }
    function addDimheight(height) {
        heights.value.push(height);
    }

    function addDimzones(zone) {
        zones.value.push(zone);
    }

    return { slopes, heights, getSlopes, getZones, getHeight, zones, addDimzones, addDimslope, addDimheight };
});
