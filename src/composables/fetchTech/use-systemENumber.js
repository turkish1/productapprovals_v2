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
        return 'https://5ximwjuddpk4tgm2swqvqakvnq0nhbub.lambda-url.us-east-1.on.aws/';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        sysENumber.noa = data;
        console.log(data);
        systemEStore.addSystem(sysENumber);
    };

    return { sysENumber, fetchData, callFunction, errors, results, ...toRefs(sysENumber), systemEStore };
}
