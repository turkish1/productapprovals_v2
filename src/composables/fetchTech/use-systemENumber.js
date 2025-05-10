import { usesysEStore } from '@/stores/tilesysENumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useENumber() {
    let results = ref([]);
    const systemEStore = usesysEStore();

    const errors = ref('');

    const sysENumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://5qygih823j.execute-api.us-east-1.amazonaws.com/systemEnumStaging';
        // 'https://0g5mpw7fbb.execute-api.us-east-1.amazonaws.com/systemENOAsdev';
        // 'https://zo1uxebufh.execute-api.us-east-1.amazonaws.com/systeme/systeme';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        sysENumber.noa = data;

        systemEStore.addSystem(sysENumber);
    };

    return { sysENumber, fetchData, callFunction, errors, results, ...toRefs(sysENumber), systemEStore };
}
