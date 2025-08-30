// import DataService from '@/services/DataService';
import { useGlobalState } from '@/stores/tilemechanicalStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function useMech() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const mechStore = useGlobalState();
    const num = ref('');
    const error = ref('');

    let url = 'https://2dz45lw4aeav6valksiiquuwqq0ejsio.lambda-url.us-east-1.on.aws/';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const mechanicalData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        description: '',
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        table2_map: [],
        two_ten_d_RS_Nails: null,
        one_number_eight_screw: null,
        two_number_eight_screw: null,
        mechanicaltilefastener: [],
        fastenerValues: [],
        height: '',
        area: '',
        slope: '',
        perimeter: '',
        decktype: '',
        savedfastener: '',
        tiletype: ''
    });

    const onlyDigits = (s) => String(s ?? '').replace(/\D/g, '');
    const pad8 = (s) => s.padStart(8, '0');
    const ensureArr = (x) => (Array.isArray(x) ? x : x ? [x] : []);
    // Assumes `execute` is from useAxios/useFetch w/ manual execute()
    // and `num` is a ref, `mechStore.addNoa` accepts a plain object.
    function parseJSONSafe(s) {
        try {
            return JSON.parse(s);
        } catch {
            return null;
        }
    }

    // Normalizes typical Lambda shapes into an array of records
    function normalize(raw) {
        // axios response
        const data = raw?.data ?? raw;
        console.log(data, raw);
        if (typeof data === 'string') {
            const parsed = parseJSONSafe(data);
            return ensureArr(parsed);
        }
        if (data && typeof data === 'object' && 'body' in data) {
            const body = typeof data.body === 'string' ? parseJSONSafe(data.body) : data.body;
            return ensureArr(body);
        }
        // sometimes lambdas return [{ value: { body: '...' } }]
        if (Array.isArray(data) && data[0]?.value?.body) {
            const body = parseJSONSafe(data[0].value.body);
            console.log(body);
            return ensureArr(body);
        }
        return ensureArr(data);
    }

    async function takeMechInput(inputMech) {
        input.value = onlyDigits(inputMech);
        num.value = pad8(input.value); // <- keep 8-digit string
        console.log(num.value, inputMech);
        return await fetchData();
    }
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
            // 1) Call the endpoint
            const resp = await execute({ params: { NOA: num.value } });
            const payload = toArray(resp);

            console.log(JSON.parse(payload[0].value.body));
            // 2) Normalize payload:

            // const payload = Array.isArray(raw) ? raw : typeof raw?.body === 'string' ? JSON.parse(raw.body) : Array.isArray(raw?.body) ? raw.body : [];
            // console.log(payload);
            if (!payload.length) {
                // No results — bail early
                return [];
            }

            // 3) Take the first record and map exactly what you need
            const r = JSON.parse(payload[0].value.body);
            console.log(r);
            const mechanical = {
                noa: r[0].NOA,
                manufacturer: typeof r[0].applicant === 'string' ? r[0].applicant.trim() : r[0].applicant,
                material: r[0].material,
                selection: r[0].AdhesiveMaterials ?? r[0].AdhesiveMaterial, // handle both keys
                description: r[0].description,
                select_tile: r[0].Select_Tile,
                tile_map: r[0].Tile_Map,
                table2_map: r[0].Table2_Map,

                Table2: r[0].Table2,
                Table3: r[0].Table3,
                resistance: r[0].Resistance,
                expiration_date: r[0].expiration_date,

                two_ten_d_RS_Nails: r[0].two_ten_d_RS_Nails,
                one_number_eight_screw: r[0].one_number_eight_screw,
                two_number_eight_screw: r[0].two_number_eight_screw,
                mechanicaltilefastener: r[0].mechanicaltilefastener,
                fastenerValues: r[0].fastenerValues
            };
            console.log(mechanical);
            // 4) Persist once
            mechStore.addNoa(mechanical);

            // 5) Return something useful to the caller
            return mechanical;
        } catch (e) {
            // user typed again / double submit: old request got canceled
            if (e?.code === 'ERR_CANCELED' || e?.name === 'CanceledError') {
                return null; // ignore silently
            }
            console.error('Error fetching data:', e);
            error.value = 'Failed to load NOA';
            return null;
        }
    };

    return { input, fetchData, takeMechInput, error, ...toRefs(mechanicalData), mechStore };
}
