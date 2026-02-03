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
    const callFunction = () => {
        fetchData();
    };
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
    const fetchData = async () => {
        errors.value = '';
        await execute(); // This triggers the GET request
    };

    // Watch for data arrival

    watch(data, (arr) => {
        console.log(data, arr);
        if (arr?.body) {
            pdNumber.noa = arr.body; // Keep local reactive
            console.log(arr.body);
            singleStore.addNoas({ noa: arr.body }); // Store correct shape
        }
    });

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
