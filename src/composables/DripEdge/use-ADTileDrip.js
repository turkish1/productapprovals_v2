import { usedripADStore } from '@/stores/dripEdgeADTileStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useADTileDrip() {
    const hold = ref([]);
    const holdSizes = ref([]);
    const results = ref([]);
    const typeSize = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const ttype = ref([]);
    loading.value = true;
    const dripadTileStore = usedripADStore();

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/dripmaterials';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        holdSizes.value = data.value.result;
        hold.value = data.value.result.Drip_Edge_Material_Type;
        for (let i = 0; i < hold.value.length; i++) {
            ttype.value.push(hold.value[i]);
        }
        typeSize.value.push(holdSizes.value.size1, holdSizes.value.size2, holdSizes.value.size3, holdSizes.value.size4);

        dripadTileStore.addMaterialDrip(ttype);
        dripadTileStore.addSizeDrip(typeSize);
        console.log(dripadTileStore);
        console.log(holdSizes, ttype, typeSize.value, hold.value);

        return hold.value;
    });
    loading.value = false;

    return { ttype, error, loading, hold, results, typeSize, holdSizes };
}
