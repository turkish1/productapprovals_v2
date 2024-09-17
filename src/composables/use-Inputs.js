// import DataService from '@/services/DataService';
import { useShingleStore } from '@/stores/shingleStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useInputs() {
    const input = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    const store = useShingleStore();
    const num = ref();
    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/shinglenoa';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const shingleData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: ''
    });
    function takeValue(inputNoa) {
        input.value = inputNoa;
        console.log(input.value);
        num.value = Number(input.value);
        const result = execute({ params: { noa: num.value } }).then((result) => {
            noaNum.value = data.value;
            console.log(data.value, result);

            // results.value = noaNum.value.forEach((item, index) => {
            // let num = Number(input.value);
            // if (item.noa === num.value) {
            //     shingleData.applicant = item.applicant;
            //     shingleData.material = item.material;
            //     shingleData.description = item.description;
            //     console.log(shingleData.applicant);
            //     if (shingleData.length === 0) {
            //         return;
            //     }
            //     store.addShingle(shingleData);
            //     // area.value = '';
            //     // type.value = '';
            //     console.log(shingleData, 'System added');
            // }
            // });
            return results;
        });
    }

    // 18061905

    return { input, takeValue, noaNum, error, results, ...toRefs(shingleData), store };
}
