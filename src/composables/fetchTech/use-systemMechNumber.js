import { usemechStore } from '@/stores/tilemechanicalNumber';
import { useFetch } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

export default function useMechNumber() {
    const mechNumberStore = usemechStore();
    // const plainNoa = (arr) => (Array.isArray(arr) ? [...toRaw(unref(arr))] : []);

    const errors = ref('');
    // const localNoa = ref([]); // string[]

    const url = 'https://mczqlparb6o6umu7j4ct7pv4vi0jrnat.lambda-url.us-east-1.on.aws/';
    const parseJSON = (s, fallback = null) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };

    /**
     * Normalizes Lambda responses that may look like:
     *  - { body: "[...]" }
     *  - { body: [...] }
     *  - [...]
     */
    const normalizeNoaList = (ctxData) => {
        let body = ctxData?.body ?? ctxData;

        if (typeof body === 'string') {
            body = parseJSON(body, []);
        }

        if (!Array.isArray(body)) return [];

        // ✅ plain array of strings
        return body.map(String).slice();
    };

    const {
        error: fetchError,
        isFetching,
        execute
    } = useFetch(url, {
        immediate: false,
        afterFetch(ctx) {
            const list = normalizeNoaList(ctx.data);

            if (list.length) {
                mechNumberStore.addSystem({
                    noa: list, // already plain
                    fetchedAt: Date.now()
                });
            }

            return ctx;
        }
    })
        .get()
        .json();

    // keep errors synced
    watch(fetchError, (v) => {
        errors.value = v ? String(v) : '';
    });

    const callNumber = async () => {
        errors.value = '';
        return await execute();
    };

    // ✅ Always return a plain array to callers
    const tileMechNumber = computed(() => mechNumberStore.latestNoa);

    return {
        tileMechNumber, // <-- plain array (computed)
        callNumber,
        isFetching,
        errors,
        mechNumberStore
    };
}
