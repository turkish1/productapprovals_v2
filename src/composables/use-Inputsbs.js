// import DataService from '@/services/DataService';
import { useSbsStore } from '@/stores/sbsStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useSbs() {
    const input = ref();
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
    function takeValue(saNoa) {
        input.value = saNoa;
        console.log(input.value);
        const result = execute().then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value, data.value);

            results.value = noaNum.value.forEach((item, index) => {
                let num = Number(input.value);

                if (item.noa === num) {
                    shingleData.applicant = item.applicant;
                    shingleData.material = item.material;
                    shingleData.description = item.description;

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

    return { input, takeValue, noaNum, error, results, ...toRefs(sbsData), store };
}
