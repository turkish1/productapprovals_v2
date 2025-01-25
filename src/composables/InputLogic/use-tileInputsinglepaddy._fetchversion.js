import { useGlobalState } from '@/stores/tilepaddyStore';

// import { useAxios } from '@vueuse/integrations/useAxios';
import { useFetch } from '@vueuse/core';
import { computed, reactive, ref, toRefs } from 'vue';

export default function useSingle() {
    const input = ref();
    const noaNum = ref([]);
    let results = ref([]);
    const num = ref();
    const responseMessage = ref('');
    const tileDatas = reactive({
        noa: '',
        applicant: '',
        material: [],
        description: '',
        Table2: [],
        Table3: [],
        expiration_date: '',
        resistance: [],
        selection: '',
        select_tile: [],
        tile_map: [],
        table2_map: []
    });

    const { tilenoas, getNoa, addNoa, resetSingle } = useGlobalState();

    const errors = ref('');

    function getTilenoas(number) {
        input.value = number;
        console.log(input.value);
        num.value = Number(input.value);
        console.log(num.value);

        fetchData();
    }
    const url = computed(() => {
        return `https://q5vantupjl.execute-api.us-east-1.amazonaws.com/singlepd/singlepd/${num.value}`;
    });
    const { data } = useFetch(url, { immediate: false }).get().json();

    const fetchData = async () => {
        // try {
        console.log(data);
        tileDatas.noa = data.value[0].NOA;
        tileDatas.applicant = data.value[0].applicant;
        tileDatas.material = data.value[0].AdhesiveMaterial;
        tileDatas.selection = data.value[0].AdhesiveMaterials;
        tileDatas.description = data.value[0].description;
        tileDatas.Table2 = data.value[0].Table2;
        tileDatas.Table3 = data.value[0].Table3;
        tileDatas.select_tile = data.value[0].Select_Tile;
        tileDatas.tile_map = data.value[0].Tile_Map;
        tileDatas.table2_map = data.value[0].Table2_Map;
        tileDatas.resistance = data.value[0].Resistance;
        tileDatas.data = data;
        console.log(data);
        // for (let i = 0;)
        // const response = await execute({ params: { noa: num.value } }).then((response) => {

        // });

        addNoa(tileDatas);

        console.log(tileDatas, 'System added');
    };

    return { input, fetchData, getNoa, tilenoas, errors, results, ...toRefs(tileDatas), getTilenoas };
}
