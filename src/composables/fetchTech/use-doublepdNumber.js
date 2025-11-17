import { useDoublepdStore } from '@/stores/doublepdNumberStore';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';

export default function useDouble() {
    const input = ref();
    const errors = ref('');
    const results = ref([]);
    const doubleStore = useDoublepdStore();

    const pdNumbers = reactive({
        noa: []
    });

    const url = computed(() => {
        return 'https://fcnamqr5pm5p2mqiwlliryrdli0voxkb.lambda-url.us-east-1.on.aws/';
    });

    // Trigger fetch immediately
    const { data, error: fetchError, isFetching, execute } = useFetch(url, { immediate: false }).get().json();

    watch(data, (arr) => {
        console.log('NOA List:', arr.body);
        if (Array.isArray(arr?.body)) {
            pdNumbers.noa = arr.body; // Keep local reactive
            console.log(arr.body);

            doubleStore.addNoas({ noa: arr.body }); // Store correct shape
        }
    });

    const fetchData = async () => {
        errors.value = '';
        await execute(); // This triggers the GET request
    };

    const callFunctions = () => {
        fetchData();
    };

    return {
        input,
        fetchData,
        callFunctions,
        errors,
        results,
        isFetching,

        doubleStore
    };
}
