import { usePolynoaStore } from '@/stores/polynoaNumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useInputPoly() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);

    const polyStores = usePolynoaStore();
    const errors = ref('');

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

        polyStores.addData(polyNoaNumber);

        console.log('System added');
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(polyNoaNumber), polyStores };
}
