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
        // shibleNoaNumber
        // return 'https://p81006fgcd.execute-api.us-east-1.amazonaws.com/shingleNoaNumber';
        return  'https://p6dx88bicl.execute-api.us-east-1.amazonaws.com/shinglenoaNumberStaging'
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
