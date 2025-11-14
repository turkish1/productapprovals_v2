import { usedripedgeshingleStore } from '@/stores/dripEdgeShingleStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { computed, reactive, ref } from 'vue';

const url = 'https://n5eq37lnykjzbxixgmuzbuxmiy0mwuef.lambda-url.us-east-1.on.aws/';

export default function useShingleDrip() {
    const hold = ref([]);
    // const holdSizeshingle = ref([]);
    const results = ref([]);
    // const typeSizeShingle = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const stype = ref([]);
    loading.value = true;
    const sizeTypeMetal = reactive({
        galvanized: [],
        stainless: [],
        aluminum: [],
        copper: []
    });

    const dripShingleStore = usedripedgeshingleStore();

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        const doc = result.data.value.body;
        const [wrapper] = JSON.parse(doc);
        const { DripEdge_Data_Types } = wrapper;
        const { size1, size2, size3, size4 } = wrapper;

        const material_data = computed(() => DripEdge_Data_Types.filter((_, i) => i % 2 === 1));
        hold.value = material_data.value;

        for (let i = 0; i < hold.value.length; i++) {
            stype.value.push(hold.value[i]);
        }
        sizeTypeMetal.galvanized = size1;
        sizeTypeMetal.stainless = size2;
        sizeTypeMetal.aluminum = size3;
        sizeTypeMetal.copper = size4;
        // typeSizeShingle.value.push(holdSizeshingle.value.size1, holdSizeshingle.value.size2, holdSizeshingle.value.size3, holdSizeshingle.value.size4);
        dripShingleStore.addMaterialShin(stype);
        dripShingleStore.addSizeShin(sizeTypeMetal);
        // console.log(typeSizeShingle, holdSizeshingle, stype.value, hold.value);
        return hold.value, sizeTypeMetal;
    });
    loading.value = false;
    // typeSizeShingle, holdSizeshingle
    return { sizeTypeMetal, stype, error, loading, hold, results };
}
