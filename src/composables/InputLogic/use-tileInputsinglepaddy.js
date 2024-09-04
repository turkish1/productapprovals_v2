// import DataService from '@/services/DataService';
// import { usetileStore } from '@/stores/tileStore';
import { useGlobalState } from '@/stores/tilepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usetileInputsingle() {
    const input = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    // const store = usetileStore();
    const responseMessage = ref('');
    const error = ref('');
    const { tilenoas, getNoa, addNoa } = useGlobalState();
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilenoasingle';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: true });

    const tileDatas = reactive({
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

    function getTilenoas(number) {
        console.log(number);
        //
        input.value = number;
        console.log(input.value);
        const result = execute().then((result) => {
            noaNum.value = data.value.result;

            results.value = noaNum.value.forEach((item, index) => {
                let num = Number(input.value);

                if (item.NOA === num) {
                    console.log('In am In...');
                    tileDatas.applicant = item.applicant;
                    tileDatas.material = item.AdhesiveMaterial;
                    tileDatas.selection = item.AdhesiveMaterials;
                    tileDatas.description = item.description;
                    tileDatas.Table2 = item.Table2;
                    tileDatas.Table3 = item.Table3;
                    tileDatas.resistance = item.Resistance;
                    console.log(item.AdhesiveMaterial);
                    if (tileDatas.length === 0) {
                        return;
                    }
                    addNoa(tileDatas);

                    // area.value = '';
                    // type.value = '';
                    console.log(tileDatas, 'System added');
                }
            });
            return results;
        });
    }

    // 18061905 input,

    return { getTilenoas, tilenoas, getNoa, addNoa, responseMessage, noaNum, error, results, tileDatas };
}
