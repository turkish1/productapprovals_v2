// import DataService from '@/services/DataService';
// import { usetileStore } from '@/stores/tileStore';
import { useGlobalState } from '@/stores/tilenoaStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usetileInputs() {
    const input = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    // const store = usetileStore();
    const responseMessage = ref('');
    const error = ref('');
    const { tilenoa, getNoa, addNoa } = useGlobalState();

    const tileData = reactive({
        noa: '',
        applicant: '',
        material: [],
        description: '',
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: ''
    });
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilenoa';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: true });

    function getTilenoa(number) {
        console.log(number);

        input.value = number;
        console.log(input.value);
        const result = execute().then((result) => {
            noaNum.value = data.value.result;

            results.value = noaNum.value.forEach((item, index) => {
                let num = Number(input.value);

                if (item.NOA === num) {
                    console.log('In am In...');
                    tileData.applicant = item.applicant;
                    tileData.material = item.AdhesiveMaterial;
                    tileData.selection = item.AdhesiveMaterials;
                    tileData.description = item.description;
                    tileData.Table2 = item.Table2;
                    tileData.Table3 = item.Table3;
                    tileData.resistance = item.Resistance;
                    console.log(item.AdhesiveMaterial);
                    if (tileData.length === 0) {
                        return;
                    }
                    addNoa(tileData);

                    // area.value = '';
                    // type.value = '';
                    console.log(tileData, 'System added');
                }
            });
            return results;
        });
    }

    return { getTilenoa, tilenoa, getNoa, addNoa, responseMessage, noaNum, error, results, tileData };
}
