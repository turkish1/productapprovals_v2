import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

export default function useGeneral() {
    const store = useRoofListStore();
    const { roofList } = storeToRefs(store);
    const generalpageStore = useGeneralpdfStore();
    const checked = ref(false);
    const isGenaralPageValid = ref(false);
    const dataGeneral = reactive({
        steepData: '',
        slopeData: '',
        totalData: '',
        mtileChk: '',
        adtileChk: '',
        shingleChk: '',
        slopeChk: '',
        metalChk: ''
        // roofCheck: ''
    });

    const steep = ref('');
    const total = ref('');
    const low1 = ref('');
    const steep1 = ref('');

    const lowslope = ref('');
    const steep2 = ref('');
    const steep3 = ref('');
    const steep4 = ref('');
    const checkedmtile = ref(false);
    const checkedadtile = ref(false);
    const checkedshingle = ref(false);
    const checkedmetal = ref(false);
    const checkedslp = ref(false);

    function addRoof() {
        console.log();
        roofList.value.forEach((item, index) => {
            console.log(item.item, index);
            if (item.item === 'Asphalt Shingle') {
                console.log(item.dim1);
                steep1.value = item.dim1;
                checkedshingle.value = true;
                dataGeneral.shingleChk = checkedshingle.value;
            }

            if (item.item === 'Low Slope') {
                low1.value = item.dim2;

                checkedslp.value = true;
                dataGeneral.slopeChk = checkedslp.value;
            }

            if (item.item === 'Mechanical Fastened Tile') {
                steep1.value = item.dim3;
                checkedmtile.value = true;
                dataGeneral.mtileChk = checkedmtile.value;
            }

            if (item.item === 'Adhesive Set Tile') {
                steep2.value = item.dim4;
                checkedadtile.value = true;
                dataGeneral.adtileChk = checkedadtile.value;
            }
            if (item.item === 'Metal Panel') {
                steep3.value = item.dim5;
                checkedmetal.value = true;
                dataGeneral.metalChk = checkedmetal.value;
            }
        });
        roofArea();
    }

    function roofArea() {
        let l1 = Number(low1.value);
        let st1 = Number(steep1.value);
        let st2 = Number(steep2.value);
        let st3 = Number(steep3.value);
        let st4 = Number(steep4.value);
        steep.value = st1 + st2 + st3 + st4;

        lowslope.value = l1;

        total.value = lowslope.value + steep.value;
        dataGeneral.slopeData = lowslope.value;
        dataGeneral.steepData = steep.value;
        dataGeneral.totalData = Number(total.value);
        // dataGeneral.roofCheck = checked;
        // console.log(dataGeneral.roofCheck);
        generalpageStore.addgeneralpdfData(dataGeneral);

        console.log(generalpageStore, generalType);
        isGenaralPageValid.value = true;
    }
    const generalType = ref(generalpageStore.$state.generalpdfinput);
    return { addRoof, roofArea, dataGeneral, generalType };
}
