import { useDoublepdStore } from '@/stores/doublepdNumberStore';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, watch } from 'vue';

export default function useDouble() {
    const input = ref();
    const errors = ref('');
    const results = ref([]);
    const doubleStore = useDoublepdStore();

    const url = computed(() => {
        return 'https://fcnamqr5pm5p2mqiwlliryrdli0voxkb.lambda-url.us-east-1.on.aws/';
    });

    // Trigger fetch immediately
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
            console.log(data.value);
            console.log('[double fetch] data.value:', val);
            const body = val?.body ?? val; // fallback if lambda returns list directly
            if (!body) return;

            doubleStore.addNoas({ noa: body });
        },
        { immediate: true }
    );
    const callFunctions = async () => {
        await fetchData();
    };
    const fetchData = async () => {
        errors.value = '';
        console.log('[double fetch] execute() starting');
        await execute();
        console.log('[double fetch] execute() done');
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
