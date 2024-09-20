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

    let url = 'https://zx71nazmwi.execute-api.us-east-1.amazonaws.com/prod/shingles';
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
            console.log(noaNum.value);
            console.log(noaNum.value[0].noa);

            shingleData.applicant = noaNum.value[0].applicant;
            shingleData.material = noaNum.value[0].material;
            shingleData.description = noaNum.value[0].description;
            shingleData.expiration_date = noaNum.value[0].expiration_date;
            // }
            store.addShingle(shingleData);

            console.log(shingleData, 'System added');

            return results;
        });
    }

    return { input, takeValue, noaNum, error, results, ...toRefs(shingleData), store };
}
