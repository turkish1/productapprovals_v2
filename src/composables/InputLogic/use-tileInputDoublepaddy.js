// import { useGlobalStates } from '@/stores/tilenoaStore';

import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

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

    const tileData = reactive({
        noa: '',
        applicant: '',
        material: '',
        content: '',
        description: [],
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        table2_map: [],
        slope: 0,
        height: 0,
        dripEdgeMaterial: [],
        dripEdgeSize: [],
        deckType: '',
        mfMap: [],
        prescriptiveSelection: '',
        paddy_category: ''
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
    async function getTilenoas(number) {
        console.log(number);

        input.value = number;
        num.value = Number(input.value);
        console.log(num.value);
        fetchData();
    }
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

            if (entryMultiTile.Table2.content === 'multiple') {
                console.log(entryMultiTile);
                const tileData = {
                    noa: entryMultiTile.NOA ?? entryMultiTile.noa,
                    manufacturer: (entryMultiTile.Manufacturer ?? entryMultiTile.applicant)?.trim?.(),
                    material: entryMultiTile.AdhesiveMaterial ?? '',
                    description: entryMultiTile.description ?? '',
                    Table2: entryMultiTile.Table2 ?? '',
                    Table3: entryMultiTile.Table3 ?? '',
                    content: entryMultiTile.content ?? '',
                    mfMap: entryMultiTile.AdhesiveMaterials ?? '',
                    select_tile: entryMultiTile.Select_Tile ?? '',
                    tile_map: entryMultiTile.Tile_Map ?? '',
                    Table2_Map: entryMultiTile.Table2_Map ?? '',
                    resistance: entryMultiTile.Resistance ?? '',
                    paddy_cat: entryMultiTile.paddy_category
                };
                console.log(tileData);
                useDoublepaddy.addtileDatas(tileData);
            } else {
                const entrySingleTile = arr[0];
                console.log(entrySingleTile);
                const tileData = await {
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
                console.log(tileData);
                useDoublepaddy.addtileDatas(tileData);
            }

            // 5) Copy Description_F1..F15 if present (prefers TileCap_Sheet_* source, falls back to direct)
            // for (let i = 1; i <= 15; i++) {
            //     const key = `TileCap_Sheet_Description_E${i}`;
            //     const src = `Anchor_Base_Sheet_E${i}`;
            //     console.log(key, src, entry[src]);
            //     if (entry[src] != null && entry[src] !== '') {
            //         tileData[src] = entry[src];
            //         console.log(tileData[src]);
            //         // tileData.AnchorBase = tileData[src]
            //     } else if (entry[key] != null && entry[key] !== '') {
            //         tileData[key] = entry[key];
            //         console.log(tileData[key]);
            //     }
            // }
            console.log(tileData);
            // 6) Persist and return

            return tileData;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    };

    // const fetchData = async () => {
    //     try {
    //         const response = await execute({ params: { NOA: num.value } }).then((data) => {
    //             console.log(data.data.value[0]);
    //             noaNum.value = data.data.value;
    //             console.log(noaNum.value);
    //             return noaNum.value;
    //         });
    //         if (response.length > 0 && noaNum.value[0].Table2.content === 'multiple') {
    //             // alert('No data found!');
    //             // (data.value.length > 0 && noaNum.value[0].Table2.content) || noaNum.value[0].Table3.content;
    //             console.log(noaNum.value);
    //             tileData.noa = noaNum.value[0].NOA;
    //             tileData.applicant = noaNum.value[0].applicant;
    //             tileData.content = noaNum.value[0].Table2.content;
    //             tileData.material = noaNum.value[0].AdhesiveMaterial;
    //             tileData.selection = noaNum.value[0].AdhesiveMaterials;
    //             tileData.description = noaNum.value[0].description;
    //             tileData.Table2 = noaNum.value[0].Table2;
    //             tileData.Table3 = noaNum.value[0].Table3;
    //             tileData.select_tile = noaNum.value[0].Select_Tile;
    //             tileData.tile_map = noaNum.value[0].Tile_Map;
    //             tileData.table2_map = noaNum.value[0].Table2_Map;
    //             tileData.resistance = noaNum.value[0].Resistance;
    //             tileData.expiration_date = noaNum.value[0].expiration_date;
    //             tileData.paddy_category = noaNum.value[0].paddy_category;
    //             useDoublepaddy.addtileDatas(tileData);
    //         } else if (response.length > 0) {
    //             console.log(noaNum.value);
    //             tileData.noa = noaNum.value[0].NOA;
    //             tileData.applicant = noaNum.value[0].applicant;

    //             tileData.material = noaNum.value[0].AdhesiveMaterial;
    //             tileData.selection = noaNum.value[0].AdhesiveMaterials;
    //             tileData.description = noaNum.value[0].description;
    //             tileData.Table2 = noaNum.value[0].Table2;
    //             tileData.Table3 = noaNum.value[0].Table3;
    //             tileData.select_tile = noaNum.value[0].Select_Tile;
    //             tileData.tile_map = noaNum.value[0].Tile_Map;
    //             tileData.table2_map = noaNum.value[0].Table2_Map;
    //             tileData.resistance = noaNum.value[0].Resistance;
    //             tileData.expiration_date = noaNum.value[0].expiration_date;
    //             tileData.paddy_category = noaNum.value[0].paddy_category;
    //             useDoublepaddy.addtileDatas(tileData);

    //             console.log(tileData, 'System added');
    //         } else {
    //             console.warn('No data found!');
    //         }
    //     } catch (error) {
    //         console.log('Error, fectching data', error);
    //         // alert('An error occurred while fetching data.');
    //     }
    //     return results;
    // };

    return { getTilenoas, fetchData, useDoublepaddy, responseMessage, noaNum, error, results, tileData };
}
