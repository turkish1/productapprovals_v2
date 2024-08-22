import { reactive, ref } from 'vue';

import { useAxios } from '@vueuse/integrations/useAxios';

export default function useburAxios() {
    const systemHM = ref([]);
    const systemHW = ref([]);
    const systemSA = ref([]);
    const loading = ref(false);
    const bMaters = ref([]);
    const Perimeters = reactive({
        p1_one: '',
        p2_one: '',
        p1_two: '',
        p2_two: '',
        p1_three: '',
        p2_three: '',
        p1_four: '',
        p2_four: '',
        p1_five: '',
        p2_five: ''
    });
    const tMaters = ref([]);
    const error = ref('');
    const results = ref([]);

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/burmaterials';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    results.value = execute().then((result) => {
        systemHM.value = data.value[0].systemHM;
        systemHW.value = data.value[0].systemHW;
        systemSA.value = data.value[0].systemSA;

        Perimeters.p1_one = data.value[0].p1_one;
        Perimeters.p2_one = data.value[0].p2_one;
        Perimeters.p1_two = data.value[0].p1_two;
        Perimeters.p2_two = data.value[0].p2_two;
        Perimeters.p1_three = data.value[0].p1_three;
        Perimeters.p2_three = data.value[0].p2_three;
        Perimeters.p1_four = data.value[0].p1_four;
        Perimeters.p2_four = data.value[0].p2_four;
        Perimeters.p1_five = data.value[0].p1_five;
        Perimeters.p2_five = data.value[0].p2_five;

        bMaters.value = data.value[0].material;

        return bMaters.value, systemHM.value, systemHW.value, systemSA.value, Perimeters;
    });

    // loading.value = false;

    return { tMaters, bMaters, results, systemHW, systemHM, systemSA, loading, error, Perimeters };
}
