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
        console.log(typeOfroof);
        const typeMapping = {
            'Asphalt Shingle': { dim: 'dim1', flag: 'shingle' },
            'Low Slope': { dim: 'dim2', flag: 'slope' },
            'Mechanical Fastened Tile': { dim: 'dim3', flag: 'mtile' },
            'Adhesive Set Tile': { dim: 'dim4', flag: 'adtile' },
            'Metal Panel': { dim: 'dim5', flag: 'metal' }
        };

        roofList.value.forEach((item) => {
            console.log(item);
            const config = typeMapping[item.item];
            console.log(config);

            if (config) {
                const dimValue = Number(item[config.dim]) || 0;
                checkedTypes[config.flag] = true;
                console.log(dimValue);
                if (config.flag === 'slope') {
                    dims.low1 = dimValue;
                } else {
                    dims[`steep${Object.keys(checkedTypes).indexOf(config.flag)}`] = dimValue;
                }

                dataGeneral[`${config.flag}Chk`] = true;
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
