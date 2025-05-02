import { usesysFStore } from '@/stores/tilesysFNumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useFNumber() {
    let results = ref([]);
    const systemFStore = usesysFStore();

    const errors = ref('');

    const sysFNumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://9i7w1lhq0f.execute-api.us-east-1.amazonaws.com/systemf/systemf';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        sysFNumber.noa = data;
        systemFStore.addSystem(sysFNumber);
    };

    return { sysFNumber, fetchData, callFunction, errors, results, ...toRefs(sysFNumber), systemFStore };
}
