<script setup>
import useTileSystemE from '@/composables/InputLogic/tileSystemEInput';
import useTileSystemF from '@/composables/InputLogic/tileSystemFInput';
import usetileInputs from '@/composables/InputLogic/use-tileInput';
import usetileInputsingle from '@/composables/InputLogic/use-tileInputsinglepaddy';
import useExposurec from '@/composables/Tiletables/exposure_c';
import { useGlobalState } from '@/stores/exposurecStore';
import { useRoofListStore } from '@/stores/roofList';
import { usetilesysEStore } from '@/stores/tilesysEStore';
import { usetilesysfStore } from '@/stores/tilesysfStore';
import { useToNumber } from '@vueuse/core';
import { invoke, until } from '@vueuse/shared';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import DripEdgeComponent from './DripEdgeComponent.vue';

const selectedOption = ref(null);
const ftileStore = usetilesysfStore();
const etileStore = usetilesysEStore();
const { getTilenoa, tileData } = usetileInputs();

const { takef } = useTileSystemF();
const { getV } = useTileSystemE();
// const storeroof = useRoofListStore();
// const { tilefinput } = storeToRefs(ftileStore);
const { getTilenoas, tileDatas } = usetileInputsingle();
const { zones } = useGlobalState();
const tilenoas = reactive({
    manufacturer: '',
    material: [],
    description: '',
    resistance: [],
    Table2: [],
    Table3: []
});
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);

onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Adhesive Set Tile') {
            console.log(item.dim4);
            dims.area = item.dim4;
        }
    });
});

const saTiles = reactive({
    manufacturer: '',
    material: '',
    system: [],
    designpressure: [],
    description: [],
    Description_F1: '',
    Description_F2: '',
    Description_F3: '',
    Description_F4: '',
    Description_F5: '',
    Description_F6: '',
    Description_F7: '',
    arrDesignPressure: []
});

const udlTiles = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    designPressure: [],
    Anchor_Base_Sheet: [],
    TileCap_Sheet_Description: [],
    Anchor_Base_Sheet_E1: '',
    Anchor_Base_Sheet_E2: '',
    Anchor_Base_Sheet_E3: '',
    Anchor_Base_Sheet_E4: '',
    Anchor_Base_Sheet_E5: '',
    Anchor_Base_Sheet_E6: '',
    Anchor_Base_Sheet_E7: '',
    TileCap_Sheet_Description: [],
    TileCap_Sheet_Description_E1: '',
    TileCap_Sheet_Description_E2: '',
    TileCap_Sheet_Description_E3: '',
    TileCap_Sheet_Description_E4: '',
    TileCap_Sheet_Description_E5: '',
    TileCap_Sheet_Description_E6: '',
    TileCap_Sheet_Description_E7: '',
    arrDesignPressure: []
});
let datamounted = ref(ftileStore.$state.tilefinput);
let Edatamounted = ref(etileStore.$state.tilesysEinput);
let datamountedsystemE = ref(etileStore.$state.tilesysEinput);
let datasystemf = ref();
let datatilenoa = ref(tileData);
let datatilenoas = ref(tileDatas);
let datasystemE = ref();
const pdfcleared = ref(false);
let saInput = ref(null);
let tilenoaInput = ref(null);
const selectedDeck = ref();
const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
const save = ref([]);
let slopeModel = ref('');
let heightModel = ref('');
const dims = reactive({
    area: '',
    per: '',
    height: '',
    slope: ''
});
const factor = ref(0.4);

function setRoofInputs() {
    dims.height = heightModel.value;
    dims.slope = slopeModel.value;
    dims.per = (dims.height * factor.value).toFixed(2);

    getData(dims.slope, dims.height);
}
const dimensions = computed(() => {
    setRoofInputs();
});
const selectedExposures = ref(null);
function selectedExposure() {
    console.log(selectedExposures.value);
}

const { tables, getData } = useExposurec();

const zoneone = reactive({
    zone: '',
    lambda1: '',
    mg1: '',
    mr1: '',
    mf1: ''
});

const zonetwo = reactive({
    zone: '',
    lambda2: '',
    mg2: '',
    mr2: '',
    mf2: ''
});
const zonethree = reactive({
    zone: '',
    lambda3: '',
    mg3: '',
    mr3: '',
    mf3: ''
});

watch(zoneone, selectedExposure, zonetwo, zonethree, dimensions, dims, () => {});

function EcheckInput() {
    if (Edatamounted.value.length !== null) {
        Edatamounted.value.forEach((item, index) => {
            udlTiles.manufacturer = item.systemDataE.manufacturer;
            udlTiles.material = item.systemDataE.material;
            udlTiles.system = item.systemDataE.system;
            udlTiles.Anchor_Base_Sheet = item.systemDataE.Anchor_Base_Sheet;
        });
    }
}

const selSytemE = ref();
const selSytem = ref();
const whatChanged = computed(() => {
    checkInput();
    EcheckInput();
    setRoofInputs();
    selectPaddy();
});
const selectedsystemf = ref(null);
const selectedsysNoa = ref(null);

const selectedsystemE = ref(null);
const selectedAnchor = ref(null);
let isUDLValid = ref('');
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isTileValid = ref(false);

let selectedUnderlayment = ref();
const underlaymentType = ref([
    { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
    { selectedBasesheet: 'Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F', key: 2 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E', key: 3 }
]);

watch(selectedUnderlayment, () => {
    save.value = selectedUnderlayment.value.key;

    if (save.value === 1) {
        isTileValid.value = true;
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = false;
    } else if (save.value === 2) {
        isTileValid.value = true;
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = true;
    } else if (save.value === 3) {
        isTileValid.value = true;
        isUDLValid.value = true;
        isUDLNOAValid.value = true;
        isSAValid.value = false;
    } else if (save.value === 0) {
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = false;
        isTileValid.value = false;
    }
});

const slopeOptions = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7
};

const isDataValid = ref(true);

watchEffect(isTileValid, whatChanged, saTiles, setRoofInputs, checkData, checkDatas, () => {});

function checkData() {
    if (tileData.Table3.two.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.three.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.four.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.five.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.six.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.seven.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
}
function checkDatas() {
    if (tileDatas.Table3.two.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.three.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.four.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.five.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.six.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.seven.Direct_Deck === 'N/A') {
        isDataValid.value = false;
    }
}
const visible = ref(false);

function checkInputSystem() {
    // 23061202 23070604

    datamounted.value.forEach((item, index) => {
        saTiles.Description_F1 = item.systemData.Description_F1;
        saTiles.Description_F2 = item.systemData.Description_F2;
        saTiles.Description_F3 = item.systemData.Description_F3;
        saTiles.Description_F4 = item.systemData.Description_F4;
        saTiles.Description_F5 = item.systemData.Description_F5;
        saTiles.Description_F6 = item.systemData.Description_F6;
        saTiles.Description_F7 = item.systemData.Description_F7;
        saTiles.arrDesignPressure = item.systemData.designPressure;

        if (item.systemData.system.length > 1) {
            addFSystem();
        } else {
            saTiles.system = item.systemData.system;
        }
    });
}
function EcheckInputSystem() {
    // 23111506

    datamountedsystemE.value.forEach((item, index) => {
        udlTiles.Maps = item.systemDataE.Maps;
        udlTiles.Anchor_Base_Sheet_E1 = item.systemDataE.Anchor_Base_Sheet_E1;
        udlTiles.Anchor_Base_Sheet_E2 = item.systemDataE.Anchor_Base_Sheet_E2;
        udlTiles.Anchor_Base_Sheet_E3 = item.systemDataE.Anchor_Base_Sheet_E3;
        udlTiles.Anchor_Base_Sheet_E4 = item.systemDataE.Anchor_Base_Sheet_E4;
        udlTiles.Anchor_Base_Sheet_E5 = item.systemDataE.Anchor_Base_Sheet_E5;
        udlTiles.Anchor_Base_Sheet_E6 = item.systemDataE.Anchor_Base_Sheet_E6;
        udlTiles.Anchor_Base_Sheet_E7 = item.systemDataE.Anchor_Base_Sheet_E7;

        udlTiles.TileCap_Sheet_Description_E1 = item.systemDataE.TileCap_Sheet_Description_E1;
        udlTiles.TileCap_Sheet_Description_E2 = item.systemDataE.TileCap_Sheet_Description_E2;
        udlTiles.TileCap_Sheet_Description_E3 = item.systemDataE.TileCap_Sheet_Description_E3;
        udlTiles.TileCap_Sheet_Description_E4 = item.systemDataE.TileCap_Sheet_Description_E4;
        udlTiles.TileCap_Sheet_Description_E5 = item.systemDataE.TileCap_Sheet_Description_E5;
        udlTiles.TileCap_Sheet_Description_E6 = item.systemDataE.TileCap_Sheet_Description_E6;
        udlTiles.TileCap_Sheet_Description_E7 = item.systemDataE.TileCap_Sheet_Description_E7;

        udlTiles.arrDesignPressure = item.systemDataE.designPressure;

        if (item.systemDataE.system.length > 1) {
        } else {
            udlTiles.system = item.systemDataE.system;
            // selfAdData.value = item.systemData.description;
            udlTiles.description = item.systemDataE.description;
            udlTiles.designPressure = item.systemDataE.designPressure;
        }
    });
}
function addFSystem() {
    saTiles.system = saTiles.system;
    // console.log(typeof selfadhered.arrSystem, typeof selfadhered.system);
}
const isSinglepaddyValid = ref(false);
const paddySeleted = ref('');
const resistanceCheck = ref(null);
function selectPaddy() {
    console.log(selectedOption.value);
    if (selectedOption.value === 'single') {
        isSinglepaddyValid.value = true;
    }
}
watch(
    selectPaddy,

    selectedExposure,
    () => {
        paddySeleted.value = selectedOption.value;

        console.log(selectedOption.value, selectedExposures.value);
    },
    { immediate: true }
);

function grabInput(event) {
    console.log(typeof event.target.value);
    datatilenoa.value = tilenoaInput.value;
    datatilenoas.value = tilenoaInput.value;
    datasystemf.value = saInput.value;
    datasystemE.value = udlInput.value;
    if (datatilenoa.value !== null) {
        // 18061905

        console.log(selectedOption.value, 'Outside');
        if (selectedOption.value === 'single') {
            console.log(selectedOption.value, 'Entered');
            getTilenoas(datatilenoas.value);
        } else getTilenoa(datatilenoa.value);
    }
    if (saInput.value !== null) {
        takef(datasystemf.value);
    }
    if (udlInput.value !== null) {
        //  17040522

        getV(datasystemE.value);
    }
}

let isSlopeValid = ref(true);
let isHeightValid = ref(true);
function validateRoofSlope() {
    if (slope.value > 2 || slope.value <= 12) {
        isSlopeValid.value = true;
    } else isSlopeValid.value = false;

    if ((dims.height <= 30 && dims.height >= 10) || dims.height === '') {
        isHeightValid.value = true;
    } else {
        isHeightValid.value = false;
    }
}

function checkInput() {
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            saTiles.manufacturer = item.systemData.manufacturer;
            saTiles.material = item.systemData.material;
            saTiles.system = item.systemData.system;
        });
    }
    if (datatilenoa.value.length !== null) {
        tilenoas.manufacturer = isSinglepaddyValid.value === true ? tileDatas.applicant : tileData.applicant;
        tilenoas.description = isSinglepaddyValid.value === true ? tileDatas.description : tileData.description;
        console.log(zones._value, tilenoas.manufacturer);

        zones._value.forEach((item, index) => {
            zoneone.zone = item[0];
            zonetwo.zone = item[1];
            zonethree.zone = item[2];
        });
    }
}
let ismrValid = ref(false);
let ismrInvalid = ref(false);
function checkMaterial() {
    console.log(tileData, tileDatas);
    tilenoas.material = isSinglepaddyValid.value === true ? tileDatas.material : tileData.material;
    tilenoas.paddies = isSinglepaddyValid.value === true ? tileDatas.resistance : tileData.resistance;
    console.log(tilenoas.material, isSinglepaddyValid.value, tileDatas.material);
    zoneone.lambda1 = isSinglepaddyValid.value === true ? tileDatas.Table2.Direct_Deck : tileData.Table2.Direct_Deck;
    zonetwo.lambda2 = isSinglepaddyValid.value === true ? tileDatas.Table2.Direct_Deck : tileData.Table2.Direct_Deck;
    zonethree.lambda3 = isSinglepaddyValid.value === true ? tileDatas.Table2.Direct_Deck : tileData.Table2.Direct_Deck;
    const clampNumber1 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    const slopeRange = clampNumber1(2, Number(dims.slope), 12);
    console.log(slopeRange);
    if (slopeRange <= slopeOptions.three) {
        console.log('Is Less');
        zoneone.mg1 = isSinglepaddyValid.value === true ? tileDatas.Table3.two.Direct_Deck : tileData.Table3.two.Direct_Deck;
        zonetwo.mg2 = isSinglepaddyValid.value === true ? tileDatas.Table3.two.Direct_Deck : tileData.Table3.two.Direct_Deck;
        zonethree.mg3 = isSinglepaddyValid.value === true ? tileDatas.Table3.two.Direct_Deck : tileData.Table3.two.Direct_Deck;
    } else if (slopeRange === slopeOptions.three || slopeRange < slopeOptions.four) {
        console.log('Is Less');
        zoneone.mg1 = isSinglepaddyValid.value === true ? tileDatas.Table3.two.Direct_Deck : tileData.Table3.two.Direct_Deck;
        zonetwo.mg2 = isSinglepaddyValid.value === true ? tileDatas.Table3.two.Direct_Deck : tileData.Table3.two.Direct_Deck;
        zonethree.mg3 = isSinglepaddyValid.value === true ? tileDatas.Table3.two.Direct_Deck : tileData.Table3.two.Direct_Deck;
    } else if (slopeRange < slopeOptions.five || slopeRange === slopeOptions.four) {
        console.log('Is Less');
        zoneone.mg1 = isSinglepaddyValid.value === true ? tileDatas.Table3.four.Direct_Deck : tileData.Table3.four.Direct_Deck;
        zonetwo.mg2 = isSinglepaddyValid.value === true ? tileDatas.Table3.four.Direct_Deck : tileData.Table3.four.Direct_Deck;
        zonethree.mg3 = isSinglepaddyValid.value === true ? tileDatas.Table3.four.Direct_Deck : tileData.Table3.four.Direct_Deck;
    } else if (slopeRange === slopeOptions.five || slopeRange < slopeOptions.six) {
        console.log('Is Less');
        zoneone.mg1 = isSinglepaddyValid.value === true ? tileDatas.Table3.five.Direct_Deck : tileData.Table3.five.Direct_Deck;
        zonetwo.mg2 = isSinglepaddyValid.value === true ? tileDatas.Table3.five.Direct_Deck : tileData.Table3.five.Direct_Deck;
        zonethree.mg3 = isSinglepaddyValid.value === true ? tileDatas.Table3.five.Direct_Deck : tileData.Table3.five.Direct_Deck;
    } else if (slopeRange == slopeOptions.six || slopeRange < slopeOptions.seven) {
        zoneone.mg1 = isSinglepaddyValid.value === true ? tileDatas.Table3.six.Direct_Deck : tileData.Table3.six.Direct_Deck;
        zonetwo.mg2 = isSinglepaddyValid.value === true ? tileDatas.Table3.six.Direct_Deck : tileData.Table3.six.Direct_Deck;
        zonethree.mg3 = isSinglepaddyValid.value === true ? tileDatas.Table3.six.Direct_Deck : tileData.Table3.six.Direct_Deck;
    } else if (slopeRange >= slopeOptions.seven) {
        console.log('Is Less');
        zoneone.mg1 = isSinglepaddyValid.value === true ? tileDatas.Table3.seven.Direct_Deck : tileData.Table3.seven.Direct_Deck;
        zonetwo.mg2 = isSinglepaddyValid.value === true ? tileDatas.Table3.seven.Direct_Deck : tileData.Table3.seven.Direct_Deck;
        zonethree.mg3 = isSinglepaddyValid.value === true ? tileDatas.Table3.seven.Direct_Deck : tileData.Table3.seven.Direct_Deck;
    }

    const result1 = computed(() => zoneone.zone * zoneone.lambda1);
    console.log(result1.value);
    const result2 = computed(() => zonetwo.zone * zonetwo.lambda2);
    console.log(result2.value);
    const result3 = computed(() => zonethree.zone * zonethree.lambda3);

    console.log(result1.value, result2.value, result3.value);

    zoneone.mr1 = computed(() => (result1.value - zoneone.mg1).toFixed(2));
    zonetwo.mr2 = computed(() => (result2.value - zonetwo.mg2).toFixed(2));
    zonethree.mr3 = computed(() => (result3.value - zonethree.mg3).toFixed(2));
}
const maps = ref([]);
const vals = ref([]);
function updateMF(event) {
    // tileData.selection;
    console.log(event.value);
    let mat = isSinglepaddyValid.value === true ? tileDatas.selection : tileData.selection;

    resistanceCheck.value = Object.entries(mat).map((obj) => {
        const k = obj[0];
        const v = obj[1];

        maps.value.push(k);
        vals.value.push(v);
        console.log(v, k);
        console.log(maps.value, vals.value);
        console.log(vals.value[0], vals.value[1]);

        console.log(maps.value);

        // pdfcleared.value = true;
        // 23052403
    });
    for (let i = 0; i < maps.value.length; i++) {
        console.log(maps.value[i], vals.value[i], i);
        if (maps.value[i] === event.value) {
            console.log(maps.value[i], vals.value[i]);
            zoneone.mf1 = vals.value[i];
            zonetwo.mf2 = vals.value[i];
            zonethree.mf3 = vals.value[i];
        }

        const mfcheck1 = useToNumber(zoneone.mf1);
        const mfcheck2 = useToNumber(zoneone.mf2);
        const mfcheck3 = useToNumber(zoneone.mf3);

        console.log(mfcheck1.value);
        if (zoneone.mr1 > mfcheck1.value || event.value) {
            console.log('I am in mr greater', ismrInvalid.value);
            ismrInvalid = true;
        }
        if (zoneone.mr1 < mfcheck1.value || event.value) {
            ismrValid.value = true;
            ismrInvalid = false;
        }
        if (zonetwo.mr2 > mfcheck2.value) {
            console.log('I am in mr greater', ismrInvalid.value);
            ismrInvalid = true;
        } else {
            ismrValid.value = true;
            ismrInvalid = false;
        }
        if (zonethree.mr3 > mfcheck3.modelValue) {
            console.log('I am in mr greater', ismrInvalid.value);
            ismrInvalid = true;
        } else {
            ismrValid.value = true;
            ismrInvalid = false;
        }
        // } else if (zoneone.mr1 < mfcheck1 || event.value || zonetwo.mr2 < mfcheck2 || zonethree.mr3 < mfcheck3) {
        //     ismrValid.value = true;
        //     console.log('I am in mr1', ismrValid.value);
        //     visible.value = true;
    }
}

function updateselectSystem() {
    selSytem.value = Object.entries(selectedsystemf).map((obj) => {
        const val = obj[1];

        if (val === 'F1') {
            saTiles.description = saTiles.Description_F1;
            saTiles.designpressure = saTiles.arrDesignPressure[0];
        }
        if (val === 'F2') {
            saTiles.description = saTiles.Description_F2;
            saTiles.designpressure = saTiles.arrDesignPressure[1] === null ? saTiles.arrDesignPressure[0] : saTiles.arrDesignPressure[1];
            // isSinglepaddyValid.value === true ? tileDatas.applicant : tileData.applicant;
            console.log(saTiles.arrDesignPressure);
        }
        if (val === 'F3') {
            saTiles.description = saTiles.Description_F3;
            saTiles.designpressure = saTiles.arrDesignPressure[2];
        }
        if (val === 'F4') {
            saTiles.description = saTiles.Description_F4;
            saTiles.designpressure = saTiles.arrDesignPressure[3];
        }
        if (val === 'F5') {
            saTiles.description = saTiles.Description_F5;
            saTiles.designpressure = saTiles.arrDesignPressure[4];
        }
        if (val === 'F6') {
            saTiles.description = saTiles.Description_F6;
            saTiles.designpressure = saTiles.arrDesignPressure[5];
            if (val === 'F7') {
                saTiles.description = saTiles.Description_F7;
                saTiles.designpressure = saTiles.arrDesignPressure[6];
            }
        }
    });
}
function updateselectSystemE() {
    selSytemE.value = Object.entries(selectedsystemE).map((obj) => {
        const val = obj[1];
        console.log(obj[1]);

        if (val === 'E1' || val === 'E8') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E1;
            udlTiles.designPressure = udlTiles.arrDesignPressure[0];
        }
        if (val === 'E2' || val === 'E9') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E2;
            udlTiles.designPressure = udlTiles.arrDesignPressure[1];
        }
        if (val === 'E3' || val === 'E10') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E3;
            udlTiles.designPressure = udlTiles.arrDesignPressure[2];
        }
        if (val === 'E4' || val === 'E11') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E4;
            udlTiles.designPressure = udlTiles.arrDesignPressure[3];
        }
        if (val === 'E5' || val === 'E12') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E5;
            udlTiles.designPressure = udlTiles.arrDesignPressure[4];
        }
        if (val === 'E6' || val === 'E13') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E6;
            udlTiles.designPressure = udlTiles.arrDesignPressure[5];
            if (val === 'E7' || val === 'E14') {
                udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E7;
                udlTiles.designPressure = udlTiles.arrDesignPressure[6];
            }
        }
    });
}

const generatePdf = () => {
    const element = document.getElementById('tile');
    console.log(element);
    // Use html2canvas to capture the element as a canvas
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Add the captured image data to the PDF
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

        const pdfBlob = pdf.output('blob');

        // Save the PDF Blob using the File System Access API
        savePdfBlobSilently(pdfBlob);
    });

    const savePdfBlobSilently = async (blob) => {
        try {
            // Use the File System Access API to request a file handle
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: 'tile.pdf',
                types: [
                    {
                        description: 'PDF file',
                        accept: {
                            'application/pdf': ['.pdf']
                        }
                    }
                ]
            });

            // Create a writable stream
            const writable = await fileHandle.createWritable();

            // Write the Blob data to the file
            await writable.write(blob);

            // Close the writable stream
            await writable.close();

            console.log('PDF saved successfully without popping download dialog!');
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };
};
invoke(async () => {
    await until(pdfcleared).changed();
    generatePdf();
    alert('Generated, PDF!');
});

watch(checkInputSystem, ismrInvalid, ismrValid, checkMaterial, updateselectSystem, EcheckInputSystem, updateselectSystemE, checkMaterial, () => {});
</script>
<template>
    <div id="tile" class="flex flex-col w-full gap-2 bg-white shadow-lg shadow-cyan-800" style="margin-left: 10px">
        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" />
        </div>
        <div class="w-64 mt-6 ..." style="margin-left: 20px">
            <!-- @input="setRoofInputs" -->
            <label for="slope">Slope</label><label class="px-2" style="color: red">*</label>

            <InputText id="slope" v-model="slopeModel" type="text" placeholder="slope" :invalid="slope === null" @change="validateRoofSlope" />
        </div>
        <!-- <Button size="small" v-show="isSlopeValid" icon="pi pi-check" severity="success" @change="valueEntered" />&nbsp; -->

        <div v-if="!isSlopeValid" class="card flex flex-wrap gap-1 justify-left">
            <Message w-64 severity="error" :life="2000">Enter a Valid Slope</Message>
        </div>
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="height">Height</label><label class="px-2" style="color: red">*</label>
            <InputText id="height" v-tooltip.bottom="'Press Enter after value'" v-model="heightModel" type="text" placeholder="height" @input="setRoofInputs" @change="validateRoofSlope" />
        </div>
        <div v-if="!isHeightValid" class="card flex flex-wrap gap-1 justify-left">
            <Message w-64 severity="error" :life="3000">Enter a Valid Height</Message>
        </div>
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="area">Area of Tile</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>

        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label for="perimeter">Roof Permeter(a) = 4h</label>
            <InputText id="perimeter" v-model="dims.per" type="text" placeholder=" " @change="setRoofInputs" />
        </div>

        <div class="card md:w-1/2 grid gap-1 grid-cols-1">
            <label for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
            <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @click="checkInputSystem" />
        </div>
        <DripEdgeComponent />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="udlInput">Fastened UDL NOA Number</label>

                <InputText id="udlInput" v-tooltip.bottom="'Press Enter after value'" v-model="udlInput" placeholder="00000000" @input="grabInput" @change="EcheckInput" />
            </div>
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="saInput">S/A Membrane NOA Number</label>
                <InputText id="saInput" v-tooltip.bottom="'Press Enter after value'" v-model="saInput" placeholder="00000000" @input="grabInput" @change="checkInput" />
            </div>
        </div>
        <div v-show="isTileValid" class="w-56 flex flex-col gap-2" style="margin-left: 100px">
            <label style="color: red">Select Exposure</label>
            <div class="flex items-center space-x-2">
                <div class="field-radiobutton space-x-4 gap-2">
                    <RadioButton inputId="option3" name="option" value="c" variant="filled" :invalid="selectedExposures === null" v-model="selectedExposures" @update="selectedExposure" />
                    <label for="option3">C</label>
                </div>
                <div class="field-radiobutton space-x-4 gap-2">
                    <RadioButton inputId="option4" name="option" value="d" variant="filled" :invalid="selectedExposures === null" v-model="selectedExposures" @update="selectedExposure" />
                    <label for="option4">D</label>
                </div>
            </div>
            <Divider />
            <label style="color: red">Select a Paddy Category</label>
            <div class="flex items-center">
                <div class="field-radiobutton space-x-3 gap-2">
                    <RadioButton inputId="option1" name="options" value="single" variant="filled" :invalid="selectedOption === null" v-model="selectedOption" @update="selectPaddy" />
                    <label for="option1">Single</label>
                </div>
                <div class="field-radiobutton space-x-3 gap-2">
                    <RadioButton style="margin-left: 5px" inputId="option2" name="options" value="double" variant="filled" :invalid="selectedOption === null" v-model="selectedOption" @update="selectPaddy" />
                    <label for="option2">Double</label>
                </div>
            </div>
        </div>

        <div v-show="isTileValid" class="w-96" style="margin-left: 3px">
            <div class="w-64 gap-4 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="tilenoa">Tile Noas</label>
                <InputText id="tilenoa" v-tooltip.bottom="'Press Enter after value'" v-model="tilenoaInput" placeholder="00000000" @change="grabInput" @click="checkInput" />
            </div>
        </div>
    </div>

    <Divider />
    <Divider />

    <div class="card md:w-full gap-4 mt-10 bg-white shadow-lg shadow-cyan-800" style="margin-left: 5px">
        <div class="columns-3 flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                <div class="w-96 flex flex-col gap-2">
                    <label for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="udlTiles.manufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="material">(UDL) Material</label>
                    <InputText id="material" v-model="udlTiles.material" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="anchor">Anchor Base Sheet</label>
                    <!-- <InputText id="anchor" v-model="udlTiles.Anchor_Base_Sheet" /> -->
                    <Select v-model="selectedAnchor" :options="udlTiles.Anchor_Base_Sheet" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" />
                </div>
            </div>
        </div>
        <div class="w-full flex flex-row space-x-30 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="break-after-column flex flex-row space-x-8 space-y-4" style="margin-left: 2px">
                <div class="w-56 flex flex-col gap-2 mt-3">
                    <label style="color: red">Select System E *</label>
                    <!-- @click="checkInputSystem" @change="updateselectSystem" -->
                    <Select v-model="selectedsystemE" :options="udlTiles.system" placeholder="" @click="checkInputSystem" @change="updateselectSystemE" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udlTiles.TileCap_Sheet_Description" @change="updateselectSystemE" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="designPressure">Design psf:</label>
                    <InputText id="designPressure" v-model="udlTiles.designPressure" @change="updateselectSystemE" />
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-12 space-y-6" style="margin-left: 2px">
            <div v-show="isSAValid" class="flex flex-row space-x-20">
                <div class="flex flex-col gap-2">
                    <label for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="saTiles.manufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="saTiles.material" />
                </div>

                <div class="flex flex-col gap-2">
                    <label style="color: red">Select System F *</label>
                    <!-- @click="checkInputSystem" @change="updateselectSystem" -->
                    <Select v-model="selectedsystemf" :options="saTiles.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                </div>

                <div class="w-128 flex flex-col gap-2">
                    <label for="sadescription">S/A Description</label>
                    <InputText id="capsheetdescription" v-model="saTiles.description" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="designpressure">Design psf:</label>
                    <InputText id="designpressure" v-model="saTiles.designpressure" aria-describedby="username-help" />
                </div>
            </div>
        </div>

        <div v-show="isTileValid" class="flex flex-row mt-8 space-x-20" style="margin-left: 1px">
            <div class="w-96 flex flex-col gap-2">
                <label for="manufacturer">Tile Applicant</label>
                <InputText id="manufacturer" v-model="tilenoas.manufacturer" />
            </div>

            <div class="w-128 flex flex-col gap-2">
                <label for="material">Tile Description</label>
                <InputText id="description" v-model="tilenoas.description" />
            </div>
            <div class="w-128 flex flex-col gap-2">
                <!-- @input="updateMF" -->
                <label for="material">Tile Adhesive Material</label>
                <Select v-model="selectedsysNoa" :options="tilenoas.material" placeholder="make a selection" @click="checkMaterial" @change="updateMF" />
            </div>
        </div>

        <div class="flex flex-wrap gap-1 mt-10" style="margin-left: 6px">
            <div class="lg:w-full min-h-[10px] flex flex-row gap-18" style="margin-left: 10px">
                <table width="100%" align="left">
                    <tbody>
                        <tr>
                            <td valign="middle">
                                <table style="margin: auto; font-size: large; font-weight: bold; font-family: arial">
                                    <tbody>
                                        <tr>
                                            <td>Zone 1:</td>
                                            <td><input v-model="zoneone.zone" readonly="" size="4" name="p1" value="" /> x λ &nbsp;</td>
                                            <td><input v-model="zoneone.lambda1" readonly="" size="4" name="lambda1" value="" /> - Mg:&nbsp;</td>
                                            <td><input v-model="zoneone.mg1" readonly="" size="4" name="mg1" value="" /> = Mr1:&nbsp;</td>
                                            <td><input v-model="zoneone.mr1" readonly="" size="4" name="mr1" value="" /> NOA Mf:&nbsp;</td>
                                            <td><input v-model="zoneone.mf1" readonly="" size="4" name="mf1" value="" /> &nbsp;</td>
                                            <Button size="small" v-show="ismrValid" icon="pi pi-check" severity="success" @change="updateMF" />&nbsp;
                                            <Button size="small" v-show="ismrInvalid" icon="pi pi-times" severity="danger" @change="updateMF" />&nbsp;
                                        </tr>

                                        <tr>
                                            <td>Zone 2:</td>
                                            <td><input v-model="zonetwo.zone" readonly="" size="4" name="p2" value="" /> x λ &nbsp;</td>
                                            <td><input v-model="zonetwo.lambda2" readonly="" size="4" name="lambda2" value="" /> - Mg:&nbsp;</td>
                                            <td><input v-model="zonetwo.mg2" readonly="" size="4" name="mg2" value="" /> = Mr2:&nbsp;</td>
                                            <td><input v-model="zonetwo.mr2" readonly="" size="4" name="mr2" value="" /> NOA Mf:&nbsp;</td>
                                            <td><input v-model="zonetwo.mf2" readonly="" size="4" name="mf32" value="" />&nbsp;</td>
                                            <Button size="small" v-show="ismrValid" icon="pi pi-check" severity="success" @change="updateMF" />&nbsp;
                                            <Button size="small" v-show="ismrInvalid" icon="pi pi-times" severity="danger" @change="updateMF" />&nbsp;
                                        </tr>

                                        <tr>
                                            <td>Zone 3:</td>
                                            <td><input v-model="zonethree.zone" readonly="" size="4" name="p3" value="" /> x λ</td>
                                            <td><input v-model="zonethree.lambda3" readonly="" size="4" name="lambda3" value="" /> - Mg:&nbsp;</td>
                                            <td><input v-model="zonethree.mg3" readonly="" size="4" name="mg5" value="" /> = Mr3:&nbsp;</td>
                                            <td><input v-model="zonethree.mr3" readonly="" size="4" name="mr3" value="" /> NOA Mf:&nbsp;</td>
                                            <td><input v-model="zonethree.mf3" readonly="" size="4" name="mf3" value="" />&nbsp;</td>
                                            <Button size="small" v-show="ismrValid" icon="pi pi-check" severity="success" @change="updateMF" />&nbsp;
                                            <Button size="small" v-show="ismrInvalid" icon="pi pi-times" severity="danger" @change="updateMF" />&nbsp;
                                        </tr>
                                        <Message v-if="visible" severity="error" :life="3000">Select Another Material</Message>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
