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
    const num = ref();
    const error = ref('');

    let url = 'https://o2cmgq2w4l.execute-api.us-east-1.amazonaws.com/shinglepoly/shinglepoly';

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
        num.value = Number(inp.value);
        const result = execute({ params: { noa: num.value } }).then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value);

            // results.value = noaNum.value.forEach((item, index) => {

            polyData.applicant = noaNum.value[0].applicant;
            polyData.material = noaNum.value[0].material;
            polyData.description = noaNum.value[0].description;
            polyData.expiration_date = noaNum.value[0].expiration_date;
            // if (item.noa === num) {
            // polyData.applicant = item.applicant;
            // polyData.material = item.material;
            // polyData.description = item.description;

            if (polyData.length === 0) {
                return;
            }
            store.addData(polyData);
            // area.value = '';
            // type.value = '';
            console.log(polyData, 'System added');
            // }
            // });
            return results;
        });
    }

    // 18061905

    return { inp, takp, noaNum, error, results, ...toRefs(polyData), store };
}
