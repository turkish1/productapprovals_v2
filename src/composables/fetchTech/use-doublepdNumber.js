import { useDoublepdStore } from '@/stores/doublepdNumberStore';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useDouble() {
    const input = ref();
    const errors = ref('');
    let results = ref([]);
    const doubleStore = useDoublepdStore();

    const pdNumbers = reactive({
        noa: []
    });
    function callFunctions() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://ri9i5jkcs5.execute-api.us-east-1.amazonaws.com/doublePaddyNumber/doublePaddyNumber';
    });
    const { data, error: fetchError } = useFetch(url).get().json();

    const fetchData = async () => {
        if (fetchError.value) {
            errors.value = fetchError.value;
            return;
        } else {
            pdNumbers.noa = data;

            doubleStore.addNoas(pdNumbers);
        }
    };

    return { input, fetchData, callFunctions, errors, results, ...toRefs(pdNumbers), doubleStore };
}
