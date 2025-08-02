import usePostGeneralpageLambda from '@/composables/Postdata/usePostGeneralpageLambda';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

export default function useGeneral() {
    const roofStore = useRoofListStore();
    const { roofList } = storeToRefs(roofStore);

    const generalStore = useGeneralpdfStore();
    const { postGeneral } = usePostGeneralpageLambda();
    const roofType = ref(null);
    const generalType = ref(generalStore.$state.generalpdfinput);
    const isGeneralPageValid = ref(false);

    const checkedTypes = reactive({
        mtile: false,
        adtile: false,
        shingle: false,
        metal: false,
        slope: false
    });

    const dims = reactive({
        steep1: 0,
        steep2: 0,
        steep3: 0,
        steep4: 0,
        low1: 0
    });

    const totals = reactive({
        steep: 0,
        lowslope: 0,
        total: 0
    });

    const dataGeneral = reactive({
        steepData: '',
        slopeData: '',
        totalData: '',
        mtileChk: false,
        adtileChk: false,
        shingleChk: false,
        slopeChk: false,
        metalChk: false,
        roofCheck: '',
        area: ''
    });
    // roofs

    function addRoof(typeOfroof) {
        roofType.value = typeOfroof.value[0];

        const typeMapping = {
            'Asphalt Shingle': { dim: 'dim1', flag: 'shingle', steepKey: 'steep1' },
            'Adhesive Set Tile': { dim: 'dim4', flag: 'adtile', steepKey: 'steep2' },
            'Mechanical Fastened Tile': { dim: 'dim3', flag: 'mtile', steepKey: 'steep3' },
            'Metal Panel': { dim: 'dim5', flag: 'metal', steepKey: 'steep4' },
            'Low Slope': { dim: 'dim2', flag: 'slope' }
        };

        // Reset previous state
        Object.keys(checkedTypes).forEach((key) => (checkedTypes[key] = false));
        Object.keys(dims).forEach((key) => (dims[key] = 0));

        roofList.value.forEach((item) => {
            const config = typeMapping[item.item];
            if (config) {
                const dimValue = Number(item[config.dim]) || 0;
                checkedTypes[config.flag] = true;
                dataGeneral[`${config.flag}Chk`] = true;

                if (config.flag === 'slope') {
                    dims.low1 = dimValue;
                } else {
                    dims[config.steepKey] = dimValue;
                }
            }
        });

        roofArea();
    }

    async function roofArea() {
        totals.steep = dims.steep1 + dims.steep2 + dims.steep3 + dims.steep4;
        totals.lowslope = dims.low1;
        totals.total = totals.steep + totals.lowslope;
        dataGeneral.area = totals.total;
        console.log(dataGeneral, totals);
        dataGeneral.steepData = totals.steep;
        dataGeneral.slopeData = totals.lowslope;
        dataGeneral.totalData = totals.total;
        dataGeneral.roofCheck = roofType.value;

        generalStore.addgeneralpdfData(dataGeneral);
        await postGeneral(dataGeneral);
        isGeneralPageValid.value = true;
    }

    return {
        addRoof,
        roofArea,
        dataGeneral,
        generalType,
        isGeneralPageValid
    };
}
