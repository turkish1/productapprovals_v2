import { usetilesysfStore } from '@/stores/tilesysfStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemF() {
    const inputSystem = ref('');
    const noaNum = ref([]);
    const error = ref('');
    const results = ref([]);

    const store = usetilesysfStore();
    const endpoint = 'https://43vqeorx5nvviet4vwvdewfcwe0tqdtt.lambda-url.us-east-1.on.aws/';
    const { execute, data } = useAxios(endpoint, { method: 'GET' }, { immediate: false });

    const systemData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: '',
        designPressure: '',
        description: '',
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
        Description_F12: '',
        Description_F13: '',
        arraySystem: [],
        systemCheck: [],
        expiration_date: '',
        prescriptiveSelection: ''
    });
    const systemCheck = ref([]);
    const parseJSON = (s, fallback = null) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };

    const noaNumber = ref(0);
    async function takef(saNoa) {
        inputSystem.value = saNoa;
        console.log(saNoa, inputSystem.value);
        noaNumber.value = Number(inputSystem.value);
        console.log(noaNumber.value);
        // if (isNaN(noaNumber)) {
        //     alert('Invalid NOA number.');
        //     return;
        // }
        await fetchData();
    }

    const toArray = (resp) => {
        let data = resp?.data ?? resp;
        if (typeof data === 'string') data = parseJSON(data, []);
        if (Array.isArray(data)) return data;

        if (data && typeof data === 'object') {
            if ('body' in data) {
                const b = typeof data.body === 'string' ? parseJSON(data.body, []) : data.body;
                return Array.isArray(b) ? b : b ? [b] : [];
            }
            return [data];
        }
        return [];
    };

    const fetchData = async () => {
        try {
            // 1) Call the endpoint and normalize the top-level payload
            const resp = await execute({ params: { NOA: noaNumber.value } });
            const hits = toArray(resp); // e.g. [{ value: { body: "[...]" } }, ...]
            console.log(resp, hits);
            if (!hits.length) return [];

            // 2) Extract the first hit's body (stringified array) and parse it
            const rawBody = hits[0]?.value?.body ?? hits[0]?.body ?? hits[0];
            const arr = typeof rawBody === 'string' ? parseJSON(rawBody, []) : Array.isArray(rawBody) ? rawBody : rawBody ? [rawBody] : [];
            console.log(rawBody, arr);
            if (!arr.length) return [];

            // 3) Use the first entry
            const entry = arr[0];
            console.log(entry);
            // 4) Map fields (handle alternate key names defensively)
            const systemData = {
                noa: entry.NOA ?? entry.noa,
                manufacturer: (entry.Manufacturer ?? entry.applicant)?.trim?.(),
                material: entry.Material ?? entry.material,
                designPressure: entry.DesignPressure,
                system: entry.System
            };

            // 5) Copy Description_F1..F15 if present (prefers TileCap_Sheet_* source, falls back to direct)
            for (let i = 1; i <= 15; i++) {
                const key = `Description_F${i}`;
                const src = `TileCap_Sheet_${key}`;
                if (entry[src] != null && entry[src] !== '') {
                    systemData[key] = entry[src];
                } else if (entry[key] != null && entry[key] !== '') {
                    systemData[key] = entry[key];
                }
            }
            console.log(systemData);
            // 6) Persist and return
            store.addData(systemData);
            return systemData;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    };

    return {
        inputSystem,
        noaNum,
        toArray,
        error,
        results,
        takef,
        store,
        fetchData,
        ...toRefs(systemData)
    };
}
