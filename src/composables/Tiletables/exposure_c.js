// composables/Tiletables/exposure_c.js
import { useGlobalState } from '@/stores/exposurecStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useExposurec() {
    // basic state
    const loading = ref(false);
    const error = ref(null);

    // inputs
    const slope = ref(0);
    const height = ref(0);

    // debugging/insight
    const tableType = ref(''); // 'table1' | 'table2' | 'table3'
    const zoneData = ref(null); // resolved slope table object
    const zonesRow = ref([]); // [z1, z2, z3]

    // pinia actions
    const { addDimzones, addDimslope, addDimheight } = useGlobalState();
    // client
    const url = 'https://omdu2tnzbwrm6v4ybp6nfr3gyi0tnoqk.lambda-url.us-east-1.on.aws/';
    const { execute, data } = useAxios(
        url,
        { method: 'GET' },
        {
            immediate: false,
            resetOnExecute: false // don't clear data mid-flight (prevents flicker)
        }
    );

    // --- helpers ------------------------------------------------------------
    const parseJSON = (s, fallback = null) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };

    // Normalize top-level shapes coming back from the Lambda
    const normalizeHits = (resp) => {
        // Resp can be: { data: [...] } or { data: { value: [...] }} or a string body…
        let d = resp?.data;
        if (Array.isArray(d)) return d;
        if (d?.value) {
            // vueuse/axios sometimes wraps payload under .value
            if (Array.isArray(d.value)) return d.value;
            // sometimes value.body is a JSON string
            if (typeof d.value.body === 'string') {
                const arr = parseJSON(d.value.body, []);
                if (Array.isArray(arr)) return arr;
            }
            if (Array.isArray(d.value.body)) return d.value.body;
        }
        if (typeof d === 'string') {
            const arr = parseJSON(d, []);
            return Array.isArray(arr) ? arr : [];
        }
        if (d?.body) {
            if (typeof d.body === 'string') {
                const arr = parseJSON(d.body, []);
                return Array.isArray(arr) ? arr : [];
            }
            if (Array.isArray(d.body)) return d.body;
        }
        // As a last resort: wrap object as single hit
        return d ? [d] : [];
    };

    const bucketBySlope = (s) => {
        if (s < 4.5) return 1; // table1: 2–4.5
        if (s < 6) return 2; // table2: 4.5–6
        // console.log(s);
        return 3; // table3: 6–12
    };

    const HEIGHTS = Object.freeze({
        fifteen: 15,
        twenty: 20,
        twentyfive: 25,
        thirty: 30,
        thirtyfive: 35,
        forty: 40
    });

    const pickHeightKey = (h) => {
        // console.log(h);
        if (h < HEIGHTS.fifteen) return 'lessfifteen';
        if (h < HEIGHTS.twenty) return 'fifteen';
        if (h < HEIGHTS.twentyfive) return 'twenty';
        if (h < HEIGHTS.thirty) return 'twentyfive';
        if (h < HEIGHTS.thirtyfive) return 'thirty';
        if (h < HEIGHTS.forty) return 'thirtyfive';
        // console.log(h, HEIGHTS.fifteen);
        return null;
    };

    // --- request mutex to avoid cancellation --------------------------------
    let inflight = null;

    const fetchData = async () => {
        // if a request is already running, await it rather than starting a new one
        if (inflight) {
            try {
                await inflight;
            } catch {
                /* swallow */
            }
            return data.value;
        }

        try {
            loading.value = true;
            error.value = null;

            inflight = execute(); // start request
            const resp = await inflight; // await the *same* promise
            const hits = normalizeHits(resp);
            const root =
                // most common shape: [{...}]
                (Array.isArray(hits) && hits.length ? hits[0] : null) ||
                // fallback: if axios put parsed array under data.value
                (Array.isArray(resp?.data?.value) ? resp.data.value[0] : null) ||
                // fallback: if axios put raw array under data
                (Array.isArray(resp?.data) ? resp.data[0] : null);

            if (!root) throw new Error('No data payload from endpoint');

            // choose slope table
            const b = bucketBySlope(slope.value);
            // console.log(slope.value);
            if (b === 3) {
                tableType.value = 'table3';
                zoneData.value = root.slp_six_twelve ?? null;
            } else if (b === 2) {
                tableType.value = 'table2';
                zoneData.value = root.slp_four_six ?? null;
            } else {
                tableType.value = 'table1';
                zoneData.value = root.slp_two_four ?? null;
                console.log(zoneData.value);
            }

            if (!zoneData.value) throw new Error('Zone table missing for selected slope');

            // choose height row
            const key = pickHeightKey(height.value);
            const bucket = key ? zoneData.value[key] : null;
            const obj = Array.isArray(bucket) ? bucket[0] : bucket;
            // console.log(obj);
            if (!obj || typeof obj !== 'object') {
                throw new Error('Height bucket not supported or missing in zone table');
            }

            // enforce z1,z2,z3 ordering if present
            const arr = ['zone1', 'zone2', 'zone3'].map((k) => Number(obj[k] ?? 0));
            console.log(arr);
            zonesRow.value = arr;

            // push to store
            addDimzones(arr);
            return resp;
        } catch (e) {
            error.value = e instanceof Error ? e : new Error(String(e));
            throw e;
        } finally {
            loading.value = false;
            inflight = null;
        }
    };

    // --- public API ----------------------------------------------------------
    async function getData(slp, hgt) {
        slope.value = Number(slp ?? 0);
        height.value = Number(hgt ?? 0);
        addDimslope(slope.value);
        addDimheight(height.value);

        await fetchData();
    }

    return {
        // state
        loading,
        error,
        slope,
        height,
        tableType,
        zoneData,
        zonesRow,
        // api
        getData
    };
}
