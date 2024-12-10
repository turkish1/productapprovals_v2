import { useprocdataStore } from '@/stores/processDataStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useLast() {
    const resNum = ref(null);
    const results = ref([]);

    const lastNum = ref();
    let url = 'https://lnu3pj9h41.execute-api.us-east-1.amazonaws.com/lastNumber/lastNumber';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const processStore = useprocdataStore();

    results.value = execute().then((result) => {
        lastNum.value = result.data.value;
        console.log(result);

        if (result.data.value === 0) {
            // alert('No data found!');
        } else {
            console.log(lastNum.value);
            processStore.addData(lastNum);
        }
    });

    return { resNum, lastNum };
}
