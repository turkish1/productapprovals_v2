import { usetilesysEStore } from '@/stores/tilesysEStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemE() {
    const inputsystem = ref();
    const num = ref();
    const noaNum = ref([]);
    let res = ref([]);
    const store = usetilesysEStore();

    const error = ref('');

    let url = 'https://wt43wiuu3mqdnixsgetrcjriqi0bzqdk.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const systemDataE = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: [],
        designPressure: [],
        Anchor_Base_Sheet: '',
        Anchor_Base_Sheet_E1: '',
        Anchor_Base_Sheet_E2: '',
        Anchor_Base_Sheet_E3: '',
        Anchor_Base_Sheet_E4: '',
        Anchor_Base_Sheet_E5: '',
        Anchor_Base_Sheet_E6: '',
        Anchor_Base_Sheet_E7: '',
        Anchor_Base_Sheet_E8: '',
        Anchor_Base_Sheet_E9: '',
        Anchor_Base_Sheet_E10: '',
        Anchor_Base_Sheet_E11: '',
        Anchor_Base_Sheet_E12: '',
        Anchor_Base_Sheet_E13: '',
        Anchor_Base_Sheet_E14: '',

        Anchor_Base_Sheet_E15: '',

        TileCap_Sheet_Description: '',
        TileCap_Sheet_Description_E1: '',
        TileCap_Sheet_Description_E2: '',
        TileCap_Sheet_Description_E3: '',
        TileCap_Sheet_Description_E4: '',
        TileCap_Sheet_Description_E5: '',
        TileCap_Sheet_Description_E6: '',
        TileCap_Sheet_Description_E7: '',
        TileCap_Sheet_Description_E8: '',
        TileCap_Sheet_Description_E9: '',
        TileCap_Sheet_Description_E10: '',
        TileCap_Sheet_Description_E11: '',
        TileCap_Sheet_Description_E12: '',
        TileCap_Sheet_Description_E13: '',
        TileCap_Sheet_Description_E14: '',

        TileCap_Sheet_Description_E15: '',

        arraySystem: [],
        Maps: [],
        systemCheck: [],
        expiration_date: ''
    });
    const parseJSON = (s, fallback = null) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };
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

    function getV(udlData) {
        inputsystem.value = udlData;
        num.value = Number(inputsystem.value);
        fetchData();
    }

    const fetchData = async () => {
        try {
            // 1) Call the endpoint and normalize the top-level payload
            const resp = await execute({ params: { NOA: num.value } });
            const hits = toArray(resp); // e.g. [{ value: { body: "[...]" } }, ...]
            if (!hits.length) return [];

            // 2) Extract the first hit's body (stringified array) and parse it
            const rawBody = hits[0]?.value?.body ?? hits[0]?.body ?? hits[0];
            const arr = typeof rawBody === 'string' ? parseJSON(rawBody, []) : Array.isArray(rawBody) ? rawBody : rawBody ? [rawBody] : [];
            if (!arr.length) return [];

            // 3) Use the first entry
            const entry = arr[0];
            console.log(entry);
            // 4) Map fields (handle alternate key names defensively)
            const systemDataE = {
                noa: entry.NOA ?? entry.noa,
                manufacturer: (entry.Manufacturer ?? entry.applicant)?.trim?.(),
                material: entry.Material ?? entry.material,
                designPressure: entry.DesignPressure,
                system: entry.System,
                maps: entry.Maps
            };

            //         // 5) Copy Description_F1..F15 if present (prefers TileCap_Sheet_* source, falls back to direct)
            for (let i = 1; i <= 15; i++) {
                const key = `TileCap_Sheet_Description_E${i}`;
                const src = `Anchor_Base_Sheet_E${i}`;
                console.log(key, src, entry[src]);
                if (entry[src] != null && entry[src] !== '') {
                    systemDataE[src] = entry[src];
                    // systemDataE.AnchorBase = systemDataE[src]
                }
                if (entry[key] != null && entry[key] !== '') {
                    systemDataE[key] = entry[key];
                }
            }
            console.log(systemDataE);
            // 6) Persist and return
            store.addData(systemDataE);
            return systemDataE;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    };

    // 18061905
    return { inputsystem, fetchData, getV, noaNum, error, ...toRefs(systemDataE), store };
}
