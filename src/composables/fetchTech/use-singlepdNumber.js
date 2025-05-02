import { useSinglepdStore } from '@/stores/singlepdNumberStore';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useSingle() {
    const input = ref(null);
    const results = ref([]);
    const errors = ref('');
    const singleStore = useSinglepdStore();

    const pdNumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }

    const url = computed(() => {
        return 'https://i6qdxr9dsg.execute-api.us-east-1.amazonaws.com/singlepdNumber/singlepdNumber';
    });

    // Destructure error so we can handle any fetch errors
    const { data, error: fetchError } = useFetch(url).get().json();

    const fetchData = async () => {
        if (fetchError.value) {
            errors.value = fetchError.value;
            return;
        } else {
            pdNumber.noa = data;
            singleStore.addNoas(pdNumber);
        }
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(pdNumber), singleStore };
}
