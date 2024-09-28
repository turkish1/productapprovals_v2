// import DataService from '@/services/DataService';
import { useSinglepdStore } from '@/stores/singlepdNumber';
// import { useAxios } from '@vueuse/integrations/useAxios';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useSingle() {
    const input = ref();

    let results = ref([]);
    const singleStore = useSinglepdStore();

    const errors = ref('');

    const singlepdNumber = reactive({
        noa: []
    });
    function callFunction() {
        fetchData();
    }
    const url = computed(() => {
        return 'https://i6qdxr9dsg.execute-api.us-east-1.amazonaws.com/singlepdNumber/singlepdNumber';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        // try {

        singlepdNumber.noa = data;

        // for (let i = 0;)
        // const response = await execute({ params: { noa: num.value } }).then((response) => {

        // });

        singleStore.addSingle(singlepdNumber);

        console.log(singlepdNumber, 'System added');
    };

    return { input, fetchData, callFunction, errors, results, ...toRefs(singlepdNumber), singleStore };
}
