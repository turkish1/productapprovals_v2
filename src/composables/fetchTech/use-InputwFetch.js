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

    watch(
        () => data.value,
        (val) => {
            if (!val) return;

            let body = val.body ?? val;

            // ✅ parse lambda body if it's JSON string
            if (typeof body === 'string') {
                try {
                    body = JSON.parse(body);
                } catch (e) {}
            }

            // ✅ force array
            const arr = Array.isArray(body) ? body : [];
            shingleNoaNumber.noa = arr;
            // ✅ store consistent shape your component can read
            noaStore.addShingle(shingleNoaNumber);
            // {

            // }
        }
    );

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
