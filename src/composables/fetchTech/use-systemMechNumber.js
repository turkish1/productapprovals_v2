import { usemechStore } from '@/stores/tilemechanicalNumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';

export default function useMechNumber() {
    let results = ref([]);
    const mechanicalStore = usemechStore();

    const errors = ref('');

    const tileMechNumber = reactive({
        noa: []
    });
    function callNumber() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://mczqlparb6o6umu7j4ct7pv4vi0jrnat.lambda-url.us-east-1.on.aws/';
    });

    const {
        data,
        error: fetchError,
        isFetching,
        execute
    } = useFetch(url, {
        immediate: false,
        mode: 'cors', // ← force CORS mode
        credentials: 'omit'
    })
        .get()
        .json();
    const fetchData = async () => {
        errors.value = '';
        await execute(); // This triggers the GET request
    };

    watch(data, (arr) => {
        if (arr?.body) {
            tileMechNumber.noa = arr.body; // Keep local reactive
            console.log(arr.body);
            mechanicalStore.addSystem({ noa: arr.body }); // Store correct shape
        }
    });

    return { tileMechNumber, fetchData, callNumber, errors, results, mechanicalStore };
}
