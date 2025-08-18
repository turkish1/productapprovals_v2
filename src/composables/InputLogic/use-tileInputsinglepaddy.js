import { usePaddyStore } from '@/stores/singlepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
// import { reactive, ref } from 'vue';

import { reactive, ref } from 'vue';

// This picks the individual NOAS
export default function useTileInputSingle() {
    const input = ref(null);
    const noaNum = ref([]);
    const results = ref([]);
    const num = ref('');
    const responseMessage = ref('');
    // const error = ref('');
    const paddyStore = usePaddyStore();

    const tileDatas = reactive({
        noa: '',
        applicant: '',
        material: [],
        content: '',
        description: '',
        Table2: [],
        Table3: [],
        Table2_obj_map: [],
        Table3_obj_map: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        table2_map: [],
        paddy_cat: '',
        height: '',
        area: '',
        slope: '',
        Decktype: '',
        mfMap: [],
        perimeter: ''
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
    async function getTilenoa(number) {
        input.value = number;
        num.value = Number(input.value);
        console.log('Fetching NOA for number:', num.value);
        // await fetchData();
        fetchData();
    }
    const url = 'https://bndobvdmx2hlyfu7pbizohgova0aefyp.lambda-url.us-east-1.on.aws/';

    const { execute, data } = useAxios(url, { method: 'GET' }, { immediate: false });

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
            console.log(rawBody, arr);
            if (!arr.length) return [];

            // 3) Use the first entry
            const entryMultiTile = arr[0];
            console.log(entryMultiTile);
            // 4) Map fields (handle alternate key names defensively)
            if (entryMultiTile.Table2.content === 'multiple') {
                console.log(entryMultiTile.Table2.content);
                const tileDatas = {
                    noa: entryMultiTile.NOA ?? entryMultiTile.noa,
                    manufacturer: (entryMultiTile.Manufacturer ?? entryMultiTile.applicant)?.trim?.(),
                    material: entryMultiTile.AdhesiveMaterial ?? '',
                    description: entryMultiTile.description,
                    Table2: entryMultiTile.Table2,
                    Table3: entryMultiTile.Table3,
                    content: entryMultiTile.content,
                    mfMap: entryMultiTile.AdhesiveMaterials ?? '',
                    select_tile: entryMultiTile.Select_Tile,
                    tile_map: entryMultiTile.Tile_Map,
                    Table2_Map: entryMultiTile.Table2_Map,
                    resistance: entryMultiTile.Resistance,
                    paddy_cat: entryMultiTile.paddy_category
                };
                console.log(tileDatas);
                paddyStore.addtileData(tileDatas);
            } else {
                const entrySingleTile = arr[0];
                console.log(entrySingleTile);
                const tileDatas = await {
                    noa: entrySingleTile.NOA ?? entrySingleTile.noa,
                    manufacturer: (entrySingleTile.applicant ?? entrySingleTile.Manufacturer)?.trim?.(),
                    material: entrySingleTile.material ?? entrySingleTile.Material,
                    description: entrySingleTile.description,
                    Table2: entrySingleTile.Table2,
                    Table3: entrySingleTile.Table3,
                    select_tile: entrySingleTile.Select_Tile,
                    tile_map: entrySingleTile.Tile_Map,
                    Table2_Map: entrySingleTile.Table2_Map,
                    resistance: entrySingleTile.Resistance,
                    paddy_cat: entrySingleTile.paddy_category,
                    selection: entrySingleTile.AdhesiveMaterials ?? entrySingleTile.AdhesiveMaterial
                };
                console.log(tileDatas.noa, tileDatas.manufacturer, tileDatas.selection);
                paddyStore.addtileData(tileDatas);
            }

            return tileDatas;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    };

    return { getTilenoa, responseMessage, fetchData, noaNum, results, tileDatas, paddyStore };
}
