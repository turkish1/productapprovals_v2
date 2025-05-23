import { usesysFStore } from '@/stores/tilesysFNumber';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useFNumber() {
    let results = ref([]);
    const systemFStore = usesysFStore();

    const errors = ref('');

    const sysFNumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }

    // systemfNumber pulls noas
    const url = computed(() => {
        return 'https://26lhch4lepyjqultfyzq6dqoju0jectd.lambda-url.us-east-1.on.aws/'
        // 'https://sq4a0wyu4a.execute-api.us-east-1.amazonaws.com/systemFNOAsdev';
        // 'https://sq4a0wyu4a.execute-api.us-east-1.amazonaws.com/systemFNOAsdev';
        // 'https://okyj0au1z5.execute-api.us-east-1.amazonaws.com/systemFNOAstaging'
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        console.log(data);
        sysFNumber.noa = data;
        systemFStore.addSystem(sysFNumber);
    };

    return { sysFNumber, fetchData, callFunction, errors, results, ...toRefs(sysFNumber), systemFStore };
}
