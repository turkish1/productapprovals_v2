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
        return 'https://d7mp4al3qe74qouvprf6spai4u0uqyps.lambda-url.us-east-1.on.aws/';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        // try {

        polyNoaNumber.noa = data;

        polyStores.addData(polyNoaNumber);

        console.log('System added');
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(polyNoaNumber), polyStores };
}
