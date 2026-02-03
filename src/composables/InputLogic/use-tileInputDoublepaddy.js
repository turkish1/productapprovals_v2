import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function usetileInputdouble() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const num = ref();
    const responseMessage = ref('');
    const error = ref('');

    const useDoublepaddy = useDoublePaddyStore();

    let url = 'https://ewa5ibqdkpzvdvtynh2z7agljm0epptp.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    // const tileData = reactive({
    //     noa: '',
    //     applicant: '',
    //     material: '',
    //     content: '',
    //     description: [],
    //     Table2: [],
    //     Table3: [],
    //     expiration_date: '',
    //     resistance: [],
    //     selection: '',
    //     select_tile: [],
    //     tile_map: [],
    //     table2_map: [],
    //     slope: 0,
    //     height: 0,
    //     dripEdgeMaterial: [],
    //     dripEdgeSize: [],
    //     deckType: '',
    //     mfMap: [],
    //     prescriptiveSelection: '',
    //     paddy_category: ''
    // });
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
    async function getTilenoas(number) {
        console.log(number);

        input.value = number;
        num.value = Number(input.value);
        console.log(num.value);
        await fetchData();
    }

    const fetchData = async () => {
        try {
            const resp = await execute({ params: { NOA: num.value } });
            const hits = toArray(resp);
            if (!hits.length) return [];

            const rawBody = hits[0]?.value?.body ?? hits[0]?.body ?? hits[0];
            const arr = typeof rawBody === 'string' ? parseJSON(rawBody, []) : Array.isArray(rawBody) ? rawBody : rawBody ? [rawBody] : [];

            if (!arr.length) return [];

            const entry = arr?.[0] ?? {};
            if (!entry || typeof entry !== 'object') return [];

            // ✅ declare once, assign later
            let payload = null;

            if (entry?.Table2?.content === 'multiple') {
                payload = {
                    noa: entry.NOA ?? entry.noa,
                    manufacturer: (entry.Manufacturer ?? entry.applicant)?.trim?.(),
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
                    paddy_cat: entry.paddy_category
                };
            } else {
                payload = {
                    noa: entry.NOA ?? entry.noa,
                    manufacturer: (entry.applicant ?? entry.Manufacturer)?.trim?.(),
                    material: entry.material ?? entry.Material,
                    description: entry.description,
                    Table2: entry.Table2,
                    Table3: entry.Table3,
                    select_tile: entry.Select_Tile,
                    tile_map: entry.Tile_Map,
                    Table2_Map: entry.Table2_Map,
                    resistance: entry.Resistance,
                    paddy_cat: entry.paddy_category,
                    selection: entry.AdhesiveMaterials ?? entry.AdhesiveMaterial
                };
            }

            // persist
            useDoublepaddy.addtileDatas(payload);

            // ✅ now this is valid
            return payload;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    };

    return { getTilenoas, fetchData, useDoublepaddy, responseMessage, noaNum, error, results };
}
