import { useSinglepdStore } from '@/stores/singlepdNumberStore';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';

export default function useSingle() {
    const input = ref(null);
    const results = ref([]);
    const errors = ref('');

    const singleStore = useSinglepdStore();

    const pdNumber = reactive({
        noa: []
    });

    const url = computed(() => {
        return 'https://kn5yokjdkzi7aylxly7cqo2hm40ezyfl.lambda-url.us-east-1.on.aws/';
    });

    // Enable manual trigger + get execute()
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
            console.log('[single fetch] data.value:', val);
            const body = val?.body ?? val; // fallback if lambda returns list directly
            if (!body) return;

            singleStore.addNoas({ noa: body });
        },
        { immediate: true }
    );

    const callFunction = async () => {
        await fetchData();
    };

    const fetchData = async () => {
        errors.value = '';
        console.log('[single fetch] execute() starting');
        await execute();
        console.log('[single fetch] execute() done');
    };

    return {
        input,
        fetchData,
        callFunction,
        errors,
        results,
        isFetching,
        singleStore
    };
}
