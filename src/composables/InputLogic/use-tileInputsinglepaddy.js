import { usePaddyStore } from '@/stores/singlepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

// This picks the individual NOAs (SINGLE paddy)
export default function useTileInputSingle() {
    const input = ref();
    const loading = ref(false);

    const num = ref();
    const responseMessage = ref('');
    const error = ref('');

    const paddyStore = usePaddyStore();

    const url = 'https://bndobvdmx2hlyfu7pbizohgova0aefyp.lambda-url.us-east-1.on.aws/';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const parseJSON = (s, fallback = null) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };

    const normalizeList = (resp) => {
        let x = resp?.data ?? resp;

        // vueuse/useAxios often wraps refs: { value: { body: "..." } }
        x = x?.value?.body ?? x?.body ?? x;

        if (typeof x === 'string') x = parseJSON(x, []);

        // if it’s still an object with body string
        if (x && typeof x === 'object' && typeof x.body === 'string') {
            x = parseJSON(x.body, []);
        }

        if (Array.isArray(x)) return x;
        return x ? [x] : [];
    };

    async function getTilenoa(number) {
        input.value = number;

        const n = Number(String(number).trim());
        if (!Number.isFinite(n)) {
            error.value = 'Invalid NOA number';
            return null;
        }

        num.value = n;
        return await fetchData();
    }
    const buildPayload = (entry) => {
        const isMultiple = entry?.Table2?.content === 'multiple';
        console.log(entry);

        if (isMultiple) {
            return {
                noa: entry.NOA ?? entry.noa ?? '',
                manufacturer: (entry.Manufacturer ?? entry.applicant ?? '').trim?.() ?? '',
                material: entry.AdhesiveMaterial ?? '',
                description: entry.description ?? '',
                Table2: entry.Table2 ?? '',
                Table3: entry.Table3 ?? '',
                content: entry.content ?? '',
                mfMap: entry.AdhesiveMaterials ?? '',
                select_tile: entry.Select_Tile ?? '',
                tile_map: entry.Tile_Map ?? '',
                Table2_Map: entry.Table2_Map ?? '',
                resistance: entry.Resistance ?? '',
                paddy_cat: entry.paddy_category ?? ''
            };
        }

        return {
            noa: entry.NOA ?? entry.noa ?? '',
            manufacturer: (entry.applicant ?? entry.Manufacturer ?? '').trim?.() ?? '',
            material: entry.material ?? entry.Material ?? '',
            description: entry.description ?? '',
            Table2: entry.Table2 ?? '',
            Table3: entry.Table3 ?? '',
            select_tile: entry.Select_Tile ?? '',
            tile_map: entry.Tile_Map ?? '',
            Table2_Map: entry.Table2_Map ?? '',
            resistance: entry.Resistance ?? '',
            paddy_cat: entry.paddy_category ?? '',
            selection: entry.AdhesiveMaterials ?? entry.AdhesiveMaterial ?? ''
        };
    };

    const fetchData = async () => {
        if (loading.value) return null;
        loading.value = true;

        try {
            error.value = '';
            responseMessage.value = '';

            // NOTE: your lambda expects NOA (uppercase) in params
            const resp = await execute({ params: { NOA: num.value } });

            const list = normalizeList(resp);
            const entry = list[0];

            console.log('entry:', entry);

            if (!entry || typeof entry !== 'object') {
                responseMessage.value = 'No record found';
                return null;
            }

            const payload = buildPayload(entry);

            console.log('payload:', payload);

            // store plain clone (avoid accidental reactive refs)
            const toStore = structuredClone(payload);
            paddyStore.addtileData(toStore);

            return payload;
        } catch (e) {
            console.error('Error fetching data:', e);
            error.value = String(e?.message ?? e);
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        getTilenoa,
        fetchData,
        responseMessage,
        error,
        paddyStore
    };
}
