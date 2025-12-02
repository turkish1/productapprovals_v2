// useBurAxios.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { reactive, ref } from 'vue';

const url = 'https://ddvqi4foj5jmnmpunloty5wwvy0ochlq.lambda-url.us-east-1.on.aws/';

export default function useBurAxios() {
    // --- Reactive State ---
    const systemHM = ref([]);
    const systemHW = ref([]);
    const systemSA = ref([]);
    const systemLake = ref('');
    const activeSystemType = ref(null);

    const Perimeters = reactive({
        p1_one: [],
        p2_one: [],
        p1_two: [],
        p2_two: [],
        p1_three: [],
        p2_three: [],
        p1_four: [],
        p2_four: [],
        p1_five: [],
        p2_five: []
    });

    const loading = ref(false);
    const error = ref(null);

    // --- Axios setup ---
    const { execute } = useAxios(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }, axios, { immediate: false });

    // --- System selector ---
    async function callFunction(materialFrmComp) {
        activeSystemType.value = null;
        systemLake.value = materialFrmComp;

        switch (materialFrmComp) {
            case 'Hot-Mopped Applied Systems':
                activeSystemType.value = 'HM';
                break;
            case 'SBS/APP Modified Heat-Weld Bitumen Membrane':
                activeSystemType.value = 'HW';
                break;
            case 'SBS Modified Bitumen Self-Adhered Membrane':
                console.log(materialFrmComp);
                activeSystemType.value = 'SA';
                break;
            default:
                activeSystemType.value = null;
        }

        if (activeSystemType.value) {
            await fetchData(); // <--- add await
        }
    }

    async function fetchData(body = null, label = 'BUR Request') {
        loading.value = true;
        error.value = null;

        try {
            const res = await execute({ data: body });
            console.log('Lambda raw response:', res);

            const rawBody = res?.data?.value?.body;
            if (!rawBody) throw new Error('Lambda response missing body');

            const parsed = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
            const [wrapper] = Array.isArray(parsed) ? parsed : [parsed];

            const { system = {}, perimeter = {} } = wrapper;

            if (activeSystemType.value === 'HM') {
                systemHM.value = system.systemHM || [];
            } else if (activeSystemType.value === 'HW') {
                systemHW.value = system.systemHW || [];
            } else if (activeSystemType.value === 'SA') {
                systemSA.value = system.systemSA || [];
            }

            for (const key in Perimeters) {
                Perimeters[key] = perimeter[key] || [];
            }

            // console.log('Fetched:', activeSystemType.value, { systemHM, systemHW, systemSA, Perimeters });
        } catch (e) {
            console.error(`Lambda ${label} failed:`, {
                message: e?.message,
                code: e?.code,
                status: e?.response?.status,
                data: e?.response?.data
            });
            error.value = e?.message || 'Request failed';
        } finally {
            loading.value = false;
        }
    }

    return {
        // state
        systemHM,
        systemHW,
        systemSA,
        systemLake,
        Perimeters,
        loading,
        error,
        activeSystemType,

        // methods
        callFunction,
        fetchData
    };
}
