import { onMounted, ref } from 'vue';
import DataService from '../services/DataService.js';

export default function useShingle(initialValue) {
    const proccesedValue = ref(initialValue);
    const noaNum = ref([]);
    const loading = ref(false);
    const noa = ref(null);
    const results = ref([]);
    const containerNoa = ref(null);

    const error = ref(null);

    onMounted(() => {
        const noa = async () =>
            DataService.getNoa()
                .then((response) => {
                    noaNum.value = response.data.result;
                    console.log(noaNum.value);
                })
                .catch((e) => {
                    error.value = e;
                    console.log(error.value);
                });
        noa();
        console.log(noaNum.value);
        return noaNum.value;
    });
    function processInput() {
        containerNoa.value = proccesedValue.value;

        processData();
    }

    function processData() {
        const values = noaNum.value.filter((item) => item.noa === containerNoa.value);
        if (values) {
            console.log(values);

            for (let i = 0; i < values.length; i++) {
                results.value.push({
                    noa: values[i].noa,
                    applicant: values[i].applicant,
                    material: values[i].material,
                    description: values[i].description,
                    expiration_date: values[i].expiration_date
                });
            }
            console.log(results.value);
        } else {
            console.log('No values found');
        }
    }

    return { error, loading, results, processInput, proccesedValue, processData, noa };
}
