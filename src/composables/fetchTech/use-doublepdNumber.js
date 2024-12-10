import { useDoublepdStore } from '@/stores/doublepdNumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useDouble() {
    const input = ref();

    let results = ref([]);
    const doubleStore = useDoublepdStore();

    const errors = ref('');

    const doublepdNumber = reactive({
        noa: []
    });
    function callFunctions() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://ri9i5jkcs5.execute-api.us-east-1.amazonaws.com/doublePaddyNumber/doublePaddyNumber';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        doublepdNumber.noa = data;
        console.log(doublepdNumber.noa);

        doubleStore.addDouble(doublepdNumber);

        console.log(doublepdNumber, 'System added');
    };

    return { input, fetchData, callFunctions, errors, results, ...toRefs(doublepdNumber), doubleStore };
}
