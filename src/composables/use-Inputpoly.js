// import DataService from '@/services/DataService';
import { usePolyStore } from '@/stores/polyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function usePoly() {
    const inp = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const store = usePolyStore();
    const num = ref();
    const error = ref('');

    let url = 'https://kkeraukmso6bxvbc6hksamdmaa0tadyb.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const polyData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: ''
    });
    async function takp(udlInput) {
        inp.value = udlInput;
        console.log(inp.value);
        num.value = Number(inp.value);
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
            // 1) Call the endpoint
            const resp = await execute({ params: { noa: num.value } });
            console.log(resp);
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
            console.log(r[0]);
            const polyData = {
                noa: r[0].noa,
                applicant: r[0].applicant,
                material: r[0].material,
                description: r[0].description,
                expiration_date: r[0].expiration_date
            };
            console.log(polyData, 'System added');
            store.addData(polyData);

            return polyData;
        } catch (err) {
            console.error('Error fetching data:', err);
            return null;
        }
    };
    // 18061905

    return { inp, fetchData, takp, noaNum, error, results, ...toRefs(polyData), store };
}
