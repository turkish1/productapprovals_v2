// import DataService from '@/services/DataService';
import { useShinglenoaStore } from '@/stores/shinglenoaNumber';
// import { useAxios } from '@vueuse/integrations/useAxios';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useInputs() {
    const input = ref();

    const noaNum = ref([]);
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
        return 'https://i88176qin0.execute-api.us-east-1.amazonaws.com/getshinglenoa/getshinglenoa';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        // try {

        shingleNoaNumber.noa = data;

        noaStore.addShingle(shingleNoaNumber);

        console.log(shingleNoaNumber, 'System added');
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(shingleNoaNumber), noaStore };
}
