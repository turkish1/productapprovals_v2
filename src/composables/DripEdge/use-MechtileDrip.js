import { usedripMStore } from '@/stores/dripEdgeMechTileStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';
export default function useMechtileDrip() {
    const hold = ref([]);
    const holdSized = ref([]);
    const results = ref([]);
    const typeSize = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const dtype = ref([]);
    loading.value = true;
    const useMStore = usedripMStore();

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/dripmaterials';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        holdSized.value = data.value.result;
        hold.value = data.value.result.Drip_Edge_Material_Type;
        for (let i = 0; i < hold.value.length; i++) {
            dtype.value.push(hold.value[i]);
        }
        typeSize.value.push(holdSized.value.size1, holdSized.value.size2, holdSized.value.size3, holdSized.value.size4);
        useMStore.addMTileDrip(holdSized);
        useMStore.addMTileDrip(typeSize);
        return hold.value;
    });
    loading.value = false;

    return { dtype, error, loading, hold, results, typeSize, holdSized };
}
