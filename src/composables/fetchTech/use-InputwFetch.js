import { useShinglenoaStore } from '@/stores/shinglenoaNumber';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';

export default function useInputs() {
    const input = ref();

    let results = ref([]);
    const noaStore = useShinglenoaStore();

    const errors = ref('');

    const shingleNoaNumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }
    const url = computed(() => {
        // shibleNoaNumber

        return 'https://iio4t6dcc6hgc2omqvg4lovh5a0mzkpl.lambda-url.us-east-1.on.aws/';
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
            shingleNoaNumber.noa = arr.body; // Keep local reactive
            // console.log(arr.body);
            noaStore.addShingle({ noa: arr.body }); // Store correct shape
        }
    });

    return { input, fetchData, callFunction, errors, results, noaStore };
}
