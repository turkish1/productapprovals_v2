import { usedripedgeshingleStore } from '@/stores/dripEdgeShingleStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useShingleDrip() {
    const hold = ref([]);
    const holdSizeshingle = ref([]);
    const results = ref([]);
    const typeSizeShingle = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const stype = ref([]);
    loading.value = true;
    const dripShingleStore = usedripedgeshingleStore();

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/dripmaterials';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        holdSizeshingle.value = data.value.result;
        hold.value = data.value.result.Drip_Edge_Material_Type;
        for (let i = 0; i < hold.value.length; i++) {
            stype.value.push(hold.value[i]);
        }
        typeSizeShingle.value.push(holdSizeshingle.value.size1, holdSizeshingle.value.size2, holdSizeshingle.value.size3, holdSizeshingle.value.size4);
        dripShingleStore.addMaterialShin(stype);
        dripShingleStore.addSizeShin(typeSizeShingle);
        console.log(typeSizeShingle, holdSizeshingle, stype.value, hold.value);
        return hold.value;
    });
    loading.value = false;

    return { stype, error, loading, hold, results, typeSizeShingle, holdSizeshingle };
}
