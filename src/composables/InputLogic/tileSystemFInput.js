import { usetilesysfStore } from '@/stores/tilesysfStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemF() {
    const inputSystem = ref('');
    const noaNum = ref([]);
    const error = ref('');
    const results = ref([]);

    const store = usetilesysfStore();
    const endpoint = 'https://43vqeorx5nvviet4vwvdewfcwe0tqdtt.lambda-url.us-east-1.on.aws/';
    const { execute, data } = useAxios(endpoint, { method: 'GET' }, { immediate: false });

    const systemData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: '',
        designPressure: '',
        description: '',
        Description_F1: '',
        Description_F2: '',
        Description_F3: '',
        Description_F4: '',
        Description_F5: '',
        Description_F6: '',
        Description_F7: '',
        Description_F8: '',
        Description_F9: '',
        Description_F10: '',
        Description_F11: '',
        Description_F12: '',
        Description_F13: '',
        arraySystem: [],
        systemCheck: [],
        expiration_date: '',
        prescriptiveSelection: ''
    });
    const systemCheck = ref([]);

    async function takef(saNoa) {
        inputSystem.value = saNoa;
        const noaNumber = Number(inputSystem.value);
        if (isNaN(noaNumber)) {
            alert('Invalid NOA number.');
            return;
        }

        try {
            await execute({ params: { NOA: noaNumber } });

            const fetchedData = data.value;
            noaNum.value = fetchedData;
            console.log(fetchedData);
            if (!Array.isArray(fetchedData) || fetchedData.length === 0) {
                alert('No data found!');
                return;
            }

            const [entry] = fetchedData;

            Object.assign(systemData, {
                noa: entry.NOA,
                manufacturer: entry.Manufacturer,
                material: entry.Material,
                expiration_date: entry.expiration_date,
                designPressure: entry.DesignPressure,
                system: entry.System
            });

            // Dynamically assign Description_F1 to F9
            for (let i = 1; i <= 15; i++) {
                const key = `Description_F${i}`;
                const sourceKey = `TileCap_Sheet_${key}`;
                if (entry[sourceKey]) {
                    systemData[key] = entry[sourceKey];
                }
            }

            store.addData({ ...systemData });
            console.log('System added:', systemData);
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('An error occurred while fetching data.');
            error.value = 'Failed to fetch NOA data.';
        }
    }

    return {
        inputSystem,
        noaNum,
        error,
        results,
        takef,
        store,
        ...toRefs(systemData)
    };
}
