import { ref } from 'vue';
export default function useShingle() {
    const proccesedValue = ref();

    const noaNum = ref([]);
    const loading = ref(false);
    const noa = ref(null);
    const results = ref([]);
    const containerNoa = ref(null);

    const error = ref(null);

    function processInput() {
        containerNoa.value = proccesedValue.value;
        console.log(containerNoa.value);
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
    // callServerlessFunction,
    return { error, loading, results, processInput, proccesedValue, processData, noa };
}
