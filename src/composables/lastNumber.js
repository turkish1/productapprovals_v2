import { useprocdataStore } from '@/stores/processDataStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useLast() {
    const resNum = ref('');
    const results = ref([]);

    const lastNum = ref();

    let url = 'https://c3lu7umllmtcgfr456v3e6ajmi0dmpcz.lambda-url.us-east-1.on.aws/';
   
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const processStore = useprocdataStore();

    results.value = execute().then((result) => {
        lastNum.value = result.data.value[0];

        if (result.data.value[0] === 0) {
            // alert('No data found!');
        } else {
            resNum.value = JSON.stringify(lastNum.value);

            processStore.addData(resNum.value);
        }
    });

    return { resNum, lastNum, results, processStore };
}
