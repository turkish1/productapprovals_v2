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

    // let url = 'https://45ocd2dvi7.execute-api.us-east-1.amazonaws.com/shinglenoa/shinglenoa';
    // const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

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

        // for (let i = 0;)
        // const response = await execute({ params: { noa: num.value } }).then((response) => {
        //     noaNum.value = data.value;

        //     return noaNum.value;
        // });

        noaStore.addShingle(shingleNoaNumber);

        console.log(shingleNoaNumber, 'System added');
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(shingleNoaNumber), noaStore };
}
