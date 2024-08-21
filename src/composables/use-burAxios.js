import { ref } from 'vue';

import { useAxios } from '@vueuse/integrations/useAxios';

export default function useburAxios() {
    const systemHM = ref([]);
    const systemHW = ref([]);
    const systemSA = ref([]);
    const loading = ref(false);
    const bMaters = ref([]);
    const materials = ref([]);
    const tMaters = ref([]);
    const error = ref('');
    const results = ref([]);

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/burmaterials';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        systemHM.value = data.value[0].systemHM;
        systemHW.value = data.value[0].systemHW;
        systemSA.value = data.value[0].systemSA;

        bMaters.value = data.value[0].material;
        console.log(systemHM.value, bMaters.value);
        // for (let i = 0; i < bMaters.value.length; i++) {
        //     tMaters.value.push(bMaters.value[i]);
        // }
        console.log(systemHW.value, systemHW.value, systemSA.value, bMaters.value);
        return bMaters.value, systemHM.value, systemHW.value, systemSA.value;
    });

    // loading.value = false;

    return { tMaters, bMaters, results, systemHW, systemHM, systemSA, loading, error };
}
