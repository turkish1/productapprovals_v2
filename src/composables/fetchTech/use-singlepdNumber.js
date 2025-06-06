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
        return 'https://u839u4s4pi.execute-api.us-east-1.amazonaws.com/singlePaddynoastaging';
        // 'https://ojx7zyxpj4.execute-api.us-east-1.amazonaws.com/singlePaddynoasdev';
        // 'https://u839u4s4pi.execute-api.us-east-1.amazonaws.com/singlePaddynoastaging';
        // 'https://ojx7zyxpj4.execute-api.us-east-1.amazonaws.com/singlePaddynoasdev';
        // https://u839u4s4pi.execute-api.us-east-1.amazonaws.com/singlePaddynoastaging
    });

    // Destructure error so we can handle any fetch errors
    const { data, error: fetchError } = useFetch(url).get().json();

    const fetchData = async () => {
        if (fetchError.value) {
            errors.value = fetchError.value;
            return;
        } else {
            pdNumber.noa = data;
            console.log(data);
            singleStore.addNoas(pdNumber);
        }
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(pdNumber), singleStore };
}
