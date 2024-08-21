import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function usedripAxios() {
    const hold = ref([]);
    const holdSize = ref([]);
    const results = ref([]);
    const typeSize = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const type = ref([]);
    loading.value = true;
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/dripmaterials';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        holdSize.value = data.value.result;
        hold.value = data.value.result.Drip_Edge_Material_Type;
        for (let i = 0; i < hold.value.length; i++) {
            type.value.push(hold.value[i]);
        }
        typeSize.value.push(holdSize.value.size1, holdSize.value.size2, holdSize.value.size3, holdSize.value.size4);
        console.log(hold.value, data.value);
        return hold.value;
    });

    loading.value = false;

    return { type, error, loading, hold, results, typeSize, holdSize };
}
