import { usesysEStore } from '@/stores/tilesysENumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';
// this pulls all the numbers
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
        return 'https://0g5mpw7fbb.execute-api.us-east-1.amazonaws.com/systemENOAsdev/';
        // 'https://5qygih823j.execute-api.us-east-1.amazonaws.com/systemEnumStaging';
        // 'https://0g5mpw7fbb.execute-api.us-east-1.amazonaws.com/systemENOAsdev/';
        // 'https://5qygih823j.execute-api.us-east-1.amazonaws.com/systemEnumStaging';
        // 'https://0g5mpw7fbb.execute-api.us-east-1.amazonaws.com/systemENOAsdev/';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        sysENumber.noa = data;
        console.log(data);
        systemEStore.addSystem(sysENumber);
    };

    return { sysENumber, fetchData, callFunction, errors, results, ...toRefs(sysENumber), systemEStore };
}
