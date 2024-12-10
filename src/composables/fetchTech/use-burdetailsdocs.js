import { useburDetailStore } from '@/stores/burDetaildocs';

import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useBurDetails() {
    const input = ref();

    const results = ref('');
    const detailStore = useburDetailStore();

    const errors = ref('');

    const detailDoc = reactive({
        document: []
    });
    function calldetailsdoc(data) {
        input.value = data;
        console.log(data, 'data was called');
        fetchData();
    }
    const url = computed(() => {
        return 'https://0b5oj9drpk.execute-api.us-east-1.amazonaws.com/burdetails/burdetails';
    });
    const { data } = useFetch(url).get().json();

    const fetchData = async () => {
        results.value = data.value.objects;

        if (results.value.length === 0) {
            alert('No data found!');
        } else {
            for (let i = 0; i < results.value.length; i++) {
                if (results.value[i] === `${input.value.toLowerCase()}/`) {
                    detailDoc.document.push(results.value[i + 1]);
                }
            }

            detailStore.addDetail(detailDoc);
        }
    };

    return { input, fetchData, calldetailsdoc, errors, results, ...toRefs(detailDoc), detailStore };
}
