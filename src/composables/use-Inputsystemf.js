import { usesystemfStore } from '@/stores/systemfStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useSystemf() {
    const inputsystem = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const store = usesystemfStore();
    const num = ref();
    const error = ref('');

    let url = 'https://p24rurxvuyt5spbou3rcljgheq0ftxgq.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const systemData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: '',
        description: '',
        expiration_date: '',
        Description_F1: '',
        Description_F2: '',
        Description_F3: '',
        Description_F4: '',
        Description_F5: '',
        Description_F6: '',
        Description_F7: '',
        Description_F8: '',
        Description_F9: '',
        Description_F10: '',
        Description_F11: '',
        Description_F11: '',
        Description_F12: '',

        Description_F13: '',
        Description_F14: '',
        Description_F15: '',

        pdfSystemValue: '',
        arraySystem: [],
        maps: [],
        systemCheck: []
    });
    const systemCheck = ref([]);
    async function takef(saNoa) {
        inputsystem.value = saNoa;
        num.value = Number(inputsystem.value);

        await fetchData();
    }

    // Assumes `execute` is from useAxios/useFetch w/ manual execute()
    // and `num` is a ref, `mechStore.addNoa` accepts a plain object.
    const toArray = (resp) => {
        let data = resp?.data ?? resp;

        // If whole payload is a string, parse it
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch {
                return [];
            }
        }

        // Lambda-style: { statusCode, body }
        if (data && typeof data === 'object' && 'body' in data) {
            let b = data.body;
            if (typeof b === 'string') {
                try {
                    b = JSON.parse(b);
                } catch {
                    return [];
                }
            }
            console.log(Array.isArray(b) ? b : b ? [b] : []);
            return Array.isArray(b) ? b : b ? [b] : [];
        }

        return Array.isArray(data) ? data : data ? [data] : [];
    };

    const fetchData = async () => {
        try {
            // 1) Call the endpoint and normalize the top-level payload
            const resp = await execute({ params: { NOA: num.value } });
            const hits = toArray(resp); // e.g. [{ value: { body: "[...]" } }, ...]
            console.log(resp, hits);
            if (!hits.length) return [];

            // 2) Extract the first hit's body (stringified array) and parse it
            const rawBody = hits[0]?.value?.body ?? hits[0]?.body ?? hits[0];
            const arr = typeof rawBody === 'string' ? parseJSON(rawBody, []) : Array.isArray(rawBody) ? rawBody : rawBody ? [rawBody] : [];
            console.log(arr?.[0].value[0]);
            if (!arr.length) return [];

            // 3) Use the first entry
            // const entry = arr?.[0].value[0];
            const values = arr?.[0]?.value ?? [];
            const entry = values[values.length - 1];
            console.log(entry);
            // 4) Map fields (handle alternate key names defensively)
            const systemData = {
                noa: entry.NOA ?? entry.noa,
                manufacturer: (entry.Manufacturer ?? entry.applicant)?.trim?.(),
                material: entry.Material ?? entry.material,
                description: entry.Description,
                system: entry.System,
                systemCheck: entry.System
            };

            console.log(systemData);
            // 6) Persist and return
            store.addData(systemData);
            return systemData;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    };

    return { inputsystem, fetchData, takef, noaNum, error, results, ...toRefs(systemData), store };
}
