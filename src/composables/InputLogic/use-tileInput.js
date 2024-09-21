// import DataService from '@/services/DataService';
// import { usetileStore } from '@/stores/tileStore';
import { useGlobalState } from '@/stores/tilenoaStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usetileInputs() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const num = ref();
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
    let url = 'https://jtk1qa20ul.execute-api.us-east-1.amazonaws.com/doublepd/doublepd';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: true });

    function getTilenoa(number) {
        console.log(number);

        input.value = number;
        num.value = Number(input.value);
        const result = execute({ params: { NOA: num.value } }).then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value[0]);
            tileData.applicant = noaNum.value[0].applicant;
            tileData.material = noaNum.value[0].AdhesiveMaterial;
            tileData.selection = noaNum.value[0].AdhesiveMaterials;
            tileData.description = noaNum.value[0].description;
            tileData.Table2 = noaNum.value[0].Table2;
            tileData.Table3 = noaNum.value[0].Table3;
            tileData.resistance = noaNum.value[0].Resistance;
            console.log(noaNum.value[0].AdhesiveMaterial);
            // if (tileData.length === 0) {
            //     return;
            // }
            addNoa(tileData);

            // area.value = '';
            // type.value = '';
            console.log(tileData, 'System added');

            return results;
        });
    }

    return { getTilenoa, tilenoa, getNoa, addNoa, responseMessage, noaNum, error, results, tileData };
}
