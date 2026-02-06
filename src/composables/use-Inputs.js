import { useShingleStore } from '@/stores/shingleStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRaw, toRefs } from 'vue';

export default function useInputs() {
    const input = ref('');
    const num = ref(null);

    const noaNum = ref([]); // holds raw list from API
    const error = ref('');
    const loading = ref(false);

    const store = useShingleStore();

    const url = 'https://dpgwx6bm5l6jt6jeqawiuv3dz40golxg.lambda-url.us-east-1.on.aws/';
    const { execute } = useAxios(url, { method: 'GET' }, { immediate: false });

    const shingleData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: '',
        slope: 0,
        height: 0,
        dripEdgeMaterial: [],
        dripEdgeSize: [],
        deckType: '',
        prescriptiveSelection: ''
    });
    const parseJSON = (s, fallback = null) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };

    const normalizeList = (resp) => {
        // resp could be: execute() return or resp.data
        let x = resp?.data ?? resp;

        // if axios gives { value: { body: "..." } }
        x = x?.value?.body ?? x?.body ?? x;

        // if string -> parse
        if (typeof x === 'string') x = parseJSON(x, []);

        // if still has body string -> parse again
        if (x && typeof x === 'object' && typeof x.body === 'string') {
            x = parseJSON(x.body, []);
        }

        if (Array.isArray(x)) return x;
        return x ? [x] : [];
    };

    async function takeValue(inputNoa) {
        input.value = inputNoa;
        const n = Number(String(inputNoa).trim());
        if (!Number.isFinite(n)) {
            error.value = 'Invalid NOA number';
            return null;
        }
        num.value = n;
        return await fetchData();
    }

    const fetchData = async () => {
        if (loading.value) return null;
        loading.value = true;

        try {
            error.value = '';

            const resp = await execute({ params: { noa: num.value } });
            const list = normalizeList(resp);
            const record = list[0];

            console.log('record:', record);

            if (record) {
                shingleData.noa = record.noa ?? '';
                shingleData.applicant = record.applicant ?? '';
                shingleData.material = record.material ?? '';
                shingleData.description = record.description ?? '';
                shingleData.expiration_date = record.expiration_date ?? '';
            }
            console.log(shingleData);
            // ✅ store a plain clone (avoid leaking reactivity into Pinia)
            const toStore = structuredClone(toRaw(shingleData));
            store.addShingle(toStore);

            // return payload;
        } catch (e) {
            console.error('Error fetching data:', e);
            error.value = String(e?.message ?? e);
            return null;
        }
    };

    return {
        input,
        takeValue,
        fetchData,
        noaNum,
        error,
        ...toRefs(shingleData),
        store
    };
}
