import { useGlobalState } from '@/stores/tileadhStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usedripAxios() {
    const tables = reactive({
        FourOnePaddy: [],
        FourOnePaddy: [],
        Table_SixOnePaddy: [],
        Table_SixTwoPaddies: [],
        Table_SevenOnePaddy: [],
        AdhesiveMaterial: []
    });
    const results = ref([]);
    const typeSize = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const type = ref([]);
    loading.value = true;
    const hold = ref([]);
    const holdSize = ref([]);
    const { tileadhesive, getMaterial, addMaterial } = useGlobalState();

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tileadhesive';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        hold.value = data.value;

        console.log(hold);
    });

    loading.value = false;

    return { type, error, loading, hold, results, typeSize, holdSize, tileadhesive, getMaterial, addMaterial };
}
