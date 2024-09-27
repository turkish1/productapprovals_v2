import { usePolynoaStore } from '@/stores/polynoaNumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useInputPoly() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);

    const polyStores = usePolynoaStore();
    const errors = ref('');

    // let url = 'https://45ocd2dvi7.execute-api.us-east-1.amazonaws.com/shinglenoa/shinglenoa';
    // const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const polyNoaNumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://s0fcmqq38a.execute-api.us-east-1.amazonaws.com/polynoaNumber/polynoaNumber';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        // try {

        polyNoaNumber.noa = data;

        console.log(polyNoaNumber.noa);
        // for (let i = 0;)
        // const response = await execute({ params: { noa: num.value } }).then((response) => {
        //     noaNum.value = data.value;

        //     return noaNum.value;
        // });

        polyStores.addData(polyNoaNumber);

        console.log(polyNoaNumber, 'System added');
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(polyNoaNumber), polyStores };
}
