import { usemechStore } from '@/stores/tilemechanicalNumber';
import { useFetch } from '@vueuse/core';
import { ref, watch } from 'vue';

export default function useMechNumber() {
    const mechanicalStore = usemechStore();
    const errors = ref('');

    // Use a simple ref for local tracking if needed
    const localNoa = ref([]);

    const url = 'https://mczqlparb6o6umu7j4ct7pv4vi0jrnat.lambda-url.us-east-1.on.aws/';

    const {
        data,
        error: fetchError,
        isFetching,
        execute
    } = useFetch(url, {
        immediate: false, // Manual trigger
        afterFetch(ctx) {
            // This hook is often more reliable than a watcher for processing
            const body = ctx.data?.body;
            if (body) {
                localNoa.value = body;
                // Ensure this matches the key 'tileMechNumber' used in lastNonEmpty
                mechanicalStore.addSystem({
                    tileMechNumber: { noa: body },
                    fetchedAt: Date.now()
                });
            }
            return ctx;
        }
    })
        .get()
        .json();

    // Sync errors
    watch(fetchError, (v) => {
        if (v) errors.value = v;
    });

    const callNumber = async () => {
        errors.value = '';
        return await execute();
    };

    return {
        tileMechNumber: localNoa, // Return the ref directly
        callNumber,
        isFetching,
        errors,
        mechanicalStore
    };
}
