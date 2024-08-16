import { onMounted, ref } from 'vue';
import DataService from '../services/DataService.js';

export default function useShingleattach(valueone, valuetwo) {
    const udlNum = ref([]);
    const sbsNum = ref([]);
    const loading = ref(false);
    let udlInput = ref(valueone);
    let saInput = ref(valuetwo);
    const result = ref([]);
    const resultsa = ref([]);
    const containerUDL = ref(null);
    const containerSA = ref(null);
    const Poly = ref(null);
    const SBS = ref(null);
    const error = ref(null);

    onMounted(() => {
        const Poly = async () =>
            DataService.getPoly()

                .then((response) => {
                    udlNum.value = response.data.result;
                    console.log(udlNum.value);
                })
                .catch((e) => {
                    error.value = e;
                    console.log(error.value);
                });
        const SBS = async () =>
            DataService.getSBS()

                .then((response) => {
                    sbsNum.value = response.data.result;
                    console.log(sbsNum.value);
                })
                .catch((e) => {
                    error.value = e;
                    console.log(error.value);
                });
        console.log(Poly, SBS);
        Poly();
        SBS();
        return udlNum, sbsNum;
    });
    function processInputs() {
        if (udlInput.value !== null) {
            containerUDL.value = containerUDL.value;
        }
        if (saInput.value !== null) {
            containerSA.value = containerSA.value;
        }

        getInfos();
    }

    const getInfos = async () => {
        if (udlInput.value !== null) {
            const values = noaNum.value.filter((item) => item.noa === containerUDL.value);
            if (values) {
                console.log(values[0].noa);

                for (let i = 0; i < values.length; i++) {
                    result.value.push({
                        noa: values[i].noa,
                        applicant: values[i].applicant,
                        material: values[i].material,
                        description: values[i].description,
                        expiration_date: values[i].expiration_date
                    });
                }
                console.log(result.value);
            } else {
                console.log('No values found');
            }
        }
        if (saInput.value !== null) {
            const values = noaNum.value.filter((item) => item.noa === containerSA.value);
            if (values) {
                console.log(values[0].noa);

                for (let i = 0; i < values.length; i++) {
                    resultsa.value.push({
                        noa: values[i].noa,
                        applicant: values[i].applicant,
                        material: values[i].material,
                        description: values[i].description,
                        expiration_date: values[i].expiration_date
                    });
                }
                console.log(resultsa.value);
            } else {
                console.log('No values found');
            }
        }
    };

    return { error, loading, result, resultsa, processInputs, getInfos, Poly, SBS };
}
