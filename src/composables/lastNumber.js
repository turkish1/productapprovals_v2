import { useprocdataStore } from '@/stores/processDataStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useLast() {
    const resNum = ref('');
    const results = ref([]);

    const lastNum = ref();
    // https://lnu3pj9h41.execute-api.us-east-1.amazonaws.com/lastNumber/lastNumber

    let url = 'https://c3lu7umllmtcgfr456v3e6ajmi0dmpcz.lambda-url.us-east-1.on.aws/';
    // 'https://97qmraj7s4.execute-api.us-east-1.amazonaws.com/lastNumberstaging';
    // 'https://bthfaopkrk.execute-api.us-east-1.amazonaws.com/processNumber';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const processStore = useprocdataStore();

    results.value = execute().then((result) => {
        lastNum.value = result.data.value;

        if (result.data.value === 0) {
            // alert('No data found!');
        } else {
            resNum.value = JSON.stringify(lastNum.value.body);

            processStore.addData(resNum.value);
        }
    });

    return { resNum, lastNum };
}
