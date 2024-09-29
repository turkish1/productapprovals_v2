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
        return 'https://zo1uxebufh.execute-api.us-east-1.amazonaws.com/systeme/systeme';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        // try {

        sysENumber.noa = data;

        // for (let i = 0;)
        // const response = await execute({ params: { noa: num.value } }).then((response) => {

        // });

        systemEStore.addSystem(sysENumber);

        console.log('System added');
    };

    return { sysENumber, fetchData, callFunction, errors, results, ...toRefs(sysENumber), systemEStore };
}
