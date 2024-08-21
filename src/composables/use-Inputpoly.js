// import DataService from '@/services/DataService';
import { usePolyStore } from '@/stores/polyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function usePoly() {
    const inp = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    const store = usePolyStore();

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/shinglepoly';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const polyData = reactive({
        noa: '',
        applicant: '',
        material: '',
        description: '',
        expiration_date: ''
    });
    function takp(udlInput) {
        inp.value = udlInput;
        console.log(inp.value);
        const result = execute().then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value, data.value);

            results.value = noaNum.value.forEach((item, index) => {
                let num = Number(inp.value);

                if (item.noa === num) {
                    polyData.applicant = item.applicant;
                    polyData.material = item.material;
                    polyData.description = item.description;

                    console.log(polyData.applicant);
                    if (polyData.length === 0) {
                        return;
                    }
                    store.addData(polyData);
                    // area.value = '';
                    // type.value = '';
                    console.log(polyData, 'System added');
                }
            });
            return results;
        });
    }

    // 18061905

    return { inp, takp, noaNum, error, results, ...toRefs(polyData), store };
}
