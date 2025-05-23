import { usemechStore } from '@/stores/tilemechanicalNumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useMechNumber() {
    let results = ref([]);
    const mechanicalStore = usemechStore();

    const errors = ref('');

    const tileMechNumber = reactive({
        noa: []
    });
    function callNumber() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://h3gd9z0q32.execute-api.us-east-1.amazonaws.com/mechanicaltileNumberstaging';
        // return 'https://bkv6dsn8v0.execute-api.us-east-1.amazonaws.com/mechanicaltileNumberdev';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        // try {

        tileMechNumber.noa = data;

        mechanicalStore.addSystem(tileMechNumber);

        console.log('System added');
    };

    return { tileMechNumber, fetchData, callNumber, errors, results, ...toRefs(tileMechNumber), mechanicalStore };
}
