// import DataService from '@/services/DataService';
import { useSbsStore } from '@/stores/sbsStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useSbs() {
    const inputs = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    const store = useSbsStore();

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/shinglesbs';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const sbsData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: ''
    });
    function takeValues(saNoa) {
        inputs.value = saNoa;
        console.log(inputs.value);
        const result = execute().then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value, data.value);

            results.value = noaNum.value.forEach((item, index) => {
                let num = Number(inputs.value);

                if (item.noa === num) {
                    sbsData.applicant = item.applicant;
                    sbsData.material = item.material;
                    sbsData.description = item.description;

                    console.log(sbsData.applicant);
                    if (sbsData.length === 0) {
                        return;
                    }
                    store.addData(sbsData);
                    // area.value = '';
                    // type.value = '';
                    console.log(sbsData, 'System added');
                }
            });
            return results;
        });
    }

    // 18061905

    return { inputs, takeValues, noaNum, error, results, ...toRefs(sbsData), store };
}
