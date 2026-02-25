import { useShinglenoaStore } from '@/stores/shinglenoaNumber';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';

export default function useInputs() {
    const input = ref('');
    const results = ref([]);
    const errors = ref('');

    const noaStore = useShinglenoaStore();

    const shingleNoaNumber = reactive({ noa: [] });

    const url = computed(() => {
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

    watch(data, (val) => {
        if (!val) return;

        // val is already the parsed JSON from the Lambda 'body'
        // If Lambda returns json.dumps(["A", "B"]), val is ["A", "B"]
        let arr = Array.isArray(val) ? val : [];
        console.log(arr, data);
        // If it's still a string for some reason, parse it once
        if (typeof val === 'string') {
            try {
                arr = JSON.parse(val);
            } catch (e) {
                arr = [];
            }
        }

        // Save strictly as an array of strings to the store
        noaStore.addShingle({ noa: arr });

        console.log('[Composable] Saved to store, count:', arr.length);
    });
    const callFunction = async () => {
        await fetchData();
    };

    const fetchData = async () => {
        errors.value = '';
        await execute();
        console.log('[shingle fetch] execute() done');
    };

    return { input, fetchData, callFunction, errors, results, noaStore, shingleNoaNumber };
}
