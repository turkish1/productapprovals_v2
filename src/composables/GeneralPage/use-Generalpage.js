import usePostGeneralpageLambda from '@/composables/Postdata/usePostGeneralpageLambda';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

export default function useGeneral() {
    const roofStore = useRoofListStore();
    const { roofList } = storeToRefs(roofStore);
    const permitStore = usePermitappStore();

    const processnumber = ref(permitStore.$state.permitapp?.[0]?.formdt?.processNumber);

    const loading = ref(false);

    const generalStore = useGeneralpdfStore();
    const { postGeneral } = usePostGeneralpageLambda();
    const roofType = ref(null);
    const generalType = ref(generalStore.$state.generalpdfinput);
    const isGeneralPageValid = ref(false);

    const checkedTypes = reactive({
        checkedmtile: false,
        checkedmetal: false,
        checkedslp: false,
        checkedadtile: false,
        checkedshingle: false
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
        checkedmtile: false,
        checkedmetal: false,
        checkedslp: false,
        checkedadtile: false,
        checkedshingle: false,
        roofCheck: '',
        area: '',
        processnumber: ''
    });

    function addRoof(typeOfroof) {
        roofType.value = typeOfroof.value;
        console.log(roofType.value);
        const typeMapping = {
            'Asphalt Shingle': { dim: 'dim1', flag: 'checkedshingle', steepKey: 'steep1' },
            'Adhesive Set Tile': { dim: 'dim4', flag: 'checkedadtile', steepKey: 'steep2' },
            'Mechanical Fastened Tile': { dim: 'dim3', flag: 'checkedmtile', steepKey: 'steep3' },
            'Metal Panel': { dim: 'dim5', flag: 'checkedmetal', steepKey: 'steep4' },
            'Low Slope': { dim: 'dim2', flag: 'checkedslp' }
        };
        console.log(checkedTypes, dims);
        // Reset previous state
        Object.keys(checkedTypes).forEach((key) => (checkedTypes[key] = false));
        Object.keys(dims).forEach((key) => (dims[key] = 0));

        roofList.value.forEach((item) => {
            console.log(item, typeMapping[item.item]);
            const config = typeMapping[item.item];
            if (config) {
                console.log(config.flags);
                const dimValue = Number(item[config.dim]) || 0;
                checkedTypes[config] = true;
                dataGeneral[`${config.flag}`] = true;
                console.log(config.flag, dataGeneral);
                // createDocument.roofSystem.push(config.flag);
                if (config.flag === 'checkedslp') {
                    console.log(dimValue);
                    dims.low2 = dimValue;
                } else {
                    dims[config.steepKey] = dimValue;
                }
            }
        });

        roofArea();
    }

    async function roofArea() {
        totals.steep = dims.steep1 + dims.steep2 + dims.steep3 + dims.steep4;
        totals.lowslope = dims.low2;
        console.log(totals.lowslope);
        totals.total = totals.steep + totals.lowslope;
        dataGeneral.area = totals.total;
        dataGeneral.steepData = totals.steep;
        dataGeneral.slopeData = totals.lowslope;
        dataGeneral.totalData = totals.total;
        dataGeneral.roofCheck = roofType.value;
        dataGeneral.processnumber = processnumber.value;
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
