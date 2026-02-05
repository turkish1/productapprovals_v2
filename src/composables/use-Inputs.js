import { useShingleStore } from '@/stores/shingleStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRaw, toRefs } from 'vue';

export default function useInputs() {
    const input = ref('');
    const num = ref(null);

    const noaNum = ref([]); // holds raw list from API
    const error = ref('');
    const loading = ref(false);

    const store = useShingleStore();

    const url = 'https://dpgwx6bm5l6jt6jeqawiuv3dz40golxg.lambda-url.us-east-1.on.aws/';
    const { execute } = useAxios(url, { method: 'GET' }, { immediate: false });

    const shingleData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: '',
        slope: 0,
        height: 0,
        dripEdgeMaterial: [],
        dripEdgeSize: [],
        deckType: '',
        prescriptiveSelection: ''
    });
    const parseJSON = (s, fallback = null) => {
        try {
            return JSON.parse(s);
        } catch {
            return fallback;
        }
    };

    const normalizeList = (resp) => {
        // resp could be: execute() return or resp.data
        let x = resp?.data ?? resp;

        // if axios gives { value: { body: "..." } }
        x = x?.value?.body ?? x?.body ?? x;

        // if string -> parse
        if (typeof x === 'string') x = parseJSON(x, []);

        // if still has body string -> parse again
        if (x && typeof x === 'object' && typeof x.body === 'string') {
            x = parseJSON(x.body, []);
        }

        if (Array.isArray(x)) return x;
        return x ? [x] : [];
    };

    async function takeValue(inputNoa) {
        input.value = inputNoa;
        const n = Number(String(inputNoa).trim());
        if (!Number.isFinite(n)) {
            error.value = 'Invalid NOA number';
            return null;
        }
        num.value = n;
        return await fetchData();
    }

    const fetchData = async () => {
        if (loading.value) return null;
        loading.value = true;

        try {
            error.value = '';

            // execute() returns { data, ... } depending on vueuse version,
            // so safely normalize:
            // const resp = await execute({ params: { noa: num.value } });
            // const payload = resp?.data ?? resp;

            const resp = await execute({ params: { noa: num.value } });
            const list = normalizeList(resp);
            const record = list[0];

            console.log('record:', record);
            // handle either shape
            // If lambda returns stringified JSON, parse it
            // const list = typeof payload === 'string' ? JSON.parse(payload) : payload;
            // console.log(list);
            // noaNum.value = Array.isArray(list) ? list : list ? [list] : [];
            // if (!noaNum.value.length) return null;

            // const first = noaNum.value[0];
            // const bodyStr = first.value?.body ?? first.body ?? '';
            // const arr = typeof bodyStr === 'string' ? JSON.parse(bodyStr) : bodyStr;
            // const record = Array.isArray(arr) ? arr[0] : arr;

            if (record) {
                shingleData.noa = record.noa ?? '';
                shingleData.applicant = record.applicant ?? '';
                shingleData.material = record.material ?? '';
                shingleData.description = record.description ?? '';
                shingleData.expiration_date = record.expiration_date ?? '';
            }
            console.log(shingleData);
            // ✅ store a plain clone (avoid leaking reactivity into Pinia)
            const toStore = structuredClone(toRaw(shingleData));
            store.addShingle(toStore);

            // return payload;
        } catch (e) {
            console.error('Error fetching data:', e);
            error.value = String(e?.message ?? e);
            return null;
        }
    };

    // const fetchData = async () => {
    //     if (loading.value) return null;
    //     loading.value = true;
    //     try {
    //         const resp = await execute({ params: { noa: num.value } });
    //         // ...
    //           const payload = resp?.data ?? resp; // handle either shape

    //           // If lambda returns stringified JSON, parse it
    //           const list = typeof payload === 'string' ? JSON.parse(payload) : payload;

    //           noaNum.value = Array.isArray(list) ? list : list ? [list] : [];

    //           if (!noaNum.value.length) return null;

    //           const first = noaNum.value[0];

    //           // Map fields
    //           shingleData.noa = first.noa ?? '';
    //           shingleData.applicant = first.applicant ?? '';
    //           shingleData.material = first.material ?? '';
    //           shingleData.description = first.description ?? '';
    //           shingleData.expiration_date = first.expiration_date ?? '';

    //           // ✅ store a plain clone (avoid leaking reactivity into Pinia)
    //           const toStore = structuredClone(toRaw(shingleData));
    //           store.addShingle(toStore);

    //           return toStore;
    //         return payload;
    //     } catch (e) {
    //         if (e?.code === 'ERR_CANCELED' || e?.name === 'CanceledError') return null;
    //         throw e;
    //     } finally {
    //         loading.value = false;
    //     }
    // };

    return {
        input,
        takeValue,
        fetchData,
        noaNum,
        error,
        ...toRefs(shingleData),
        store
    };
}

// import { useShingleStore } from '@/stores/shingleStore';
// import { useAxios } from '@vueuse/integrations/useAxios';
// import { reactive, ref, toRefs } from 'vue';

// export default function useInputs() {
//     const input = ref();

//     const noaNum = ref([]);
//     let results = ref([]);
//     const store = useShingleStore();
//     const num = ref();
//     const error = ref('');

//     let url = 'https://dpgwx6bm5l6jt6jeqawiuv3dz40golxg.lambda-url.us-east-1.on.aws/';
//     const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

//     const shingleData = reactive({
//         noa: '',
//         applicant: '',
//         material: '',
//         description: '',
//         expiration_date: '',
//         slope: 0,
//         height: 0,
//         dripEdgeMaterial: [],
//         dripEdgeSize: [],
//         deckType: '',
//         prescriptiveSelection: ''
//     });
//     async function takeValue(inputNoa) {
//         input.value = inputNoa;
//         console.log(inputNoa, input.value);
//         num.value = Number(input.value);
//         console.log(num.value);
//         await fetchData();
//     }

//     const fetchData = async () => {
//         try {
//             const response = await execute({ params: { noa: num.value } }).then((response) => {
//                 noaNum.value = data.value;
//                 console.log(data.value, noaNum.value);
//                 return noaNum.value;
//             });
//             console.log(response.length);
//             if (response.length === 0) {
//                 // alert('No data found!');
//             } else {
//                 console.log(noaNum.value);
//                 shingleData.noa = noaNum.value[0].noa;
//                 shingleData.applicant = noaNum.value[0].applicant;
//                 shingleData.material = noaNum.value[0].material;
//                 shingleData.description = noaNum.value[0].description;
//                 shingleData.expiration_date = noaNum.value[0].expiration_date;

//                 store.addShingle(shingleData);

//                 console.log(shingleData, 'System added');
//             }
//         } catch (error) {
//             console.log('Error, fectching data', error);
//             // alert('An error occurred while fetching data.');
//         }
//         return results;
//     };

//     return { input, fetchData, takeValue, noaNum, error, results, ...toRefs(shingleData), store };
// }
