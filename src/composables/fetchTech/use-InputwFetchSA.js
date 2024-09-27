// import DataService from '@/services/DataService';
// import { useShinglenoaStore } from '@/stores/shinglenoaNumber';
import { useSAnoaStore } from '@/stores/sanoaNumber';
// import { useAxios } from '@vueuse/integrations/useAxios';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useInputSA() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);

    const saStore = useSAnoaStore();
    const errors = ref('');

    const saNoaNumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://y44vai1808.execute-api.us-east-1.amazonaws.com/saNoaNumber/sanoaNumber';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        // try {

        saNoaNumber.noa = data;

        // for (let i = 0;)
        // const response = await execute({ params: { noa: num.value } }).then((response) => {
        //     noaNum.value = data.value;

        //     return noaNum.value;
        // });

        saStore.addData(saNoaNumber);

        console.log(saNoaNumber, 'System added');
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(saNoaNumber), saStore };
}
