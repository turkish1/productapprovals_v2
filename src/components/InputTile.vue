<script setup>
import DripEdAdTile from '@/components/DripEdgeChildren/DripEdAdTile.vue';
// import Buttons from '@/components/Features/Buttons.vue';
import systemENumber from '@/components/roofSystems/systemENumber.vue';
import systemFNumber from '@/components/roofSystems/systemFNumber.vue';
import { useExpiry } from '@/composables/ExpirationCheck/useExpiry';
import usetileInputdouble from '@/composables/InputLogic/use-tileInputDoublepaddy';
import usetileInputsingle from '@/composables/InputLogic/use-tileInputsinglepaddy';

// import usePostToMongo from '@/composables/Postdata/TileADpdf';
import useUDL from '@/composables/TileFunc/systemE';
import useExposurec from '@/composables/Tiletables/exposure_c';
import useExposured from '@/composables/Tiletables/exposure_d';
import { useHeightValidation } from '@/composables/Validation/use-Height';
import { useNumberValidation } from '@/composables/Validation/use-Slope';

import tileNoaNumber from '@/components/roofSystems/tileNoaNumber.vue';
import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { useGlobalState } from '@/stores/exposurecStore';
import { useExposureD } from '@/stores/exposuredStore';
import { usemultiAdStore } from '@/stores/multitileADStore';
import { usePaddyoptionStore } from '@/stores/paddyCatStore';
import { useRoofListStore } from '@/stores/roofList';
import { useSavedStore } from '@/stores/savedTiledataStore';
import { usePaddyStore } from '@/stores/singlepaddyStore';
import { usetilesysfStore } from '@/stores/tilesysfStore';
import { usevalueStore } from '@/stores/tilevalueStore';
import { useToNumber } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import { computed, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { addPaddyCatval } = usePaddyoptionStore();
const paddyStore = usePaddyStore();
const { inputdata } = storeToRefs(paddyStore);

const useDoublepaddy = useDoublePaddyStore();
const { inputdatas } = storeToRefs(useDoublepaddy);
// State and Store Initialization
const store = usevalueStore();

const ftileStore = usetilesysfStore();
const multipleStore = usemultiAdStore();
// const { postData, response, error, loading } = usePostToMongo();
const { multiAdinput } = storeToRefs(multipleStore);
const { addSystemvalues, tileInputvalues } = usevalueStore();
const resetStore = useSavedStore();
const { addSavedvalues, reset } = useSavedStore();
const { Edatamounted, etileStore } = useUDL();

const { tileData } = usetileInputdouble();
const { tileDatas } = usetileInputsingle();
const { zones } = useGlobalState();
const { zoned } = useExposureD();
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const childQueryRef = ref();
// Reactive State
const selectedOption = ref('');
const query = ref('');
const isPaddySingle = ref(false);
const paddySeleted = ref('');
const isHeightValid = ref(false);
const isDisabledslope = ref(true);
const isDisabled = ref(true);

const dt = ref('');

const heightModel = ref('');
const dims = reactive({ area: '', per: '', height: '', slope: '' });
const zoneone = reactive({ zone: '', lambda1: '', mg1: '', mr1: '', mf1: '' });
const zonetwo = reactive({ zone: '', lambda2: '', mg2: '', mr2: '', mf2: '' });
const zonethree = reactive({ zone: '', lambda3: '', mg3: '', mr3: '', mf3: '' });
const selectedDeck = ref();
const type = ref([{ name: 'Select Deck Type' }, { name: ' 5/8" Plywood ' }, { name: ' 3/4" Plywood ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G ' }, { name: ' Existing 1/2" Plywood ' }]);
const save = ref([]);
let selectedUnderlayment = ref('');
const underlaymentType = ref([
    { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
    { selectedBasesheet: 'Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F', key: 2 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E', key: 3 }
]);
const licenseEnd = ref('');
let isUDLValid = ref(false);
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isTileValid = ref(false);
let isTileData = ref(false);
let isMultiTileValid = ref(false);
let isPaddyCategoryValid = ref(false);
let ismrValidMR1 = ref(false);
let ismrValidMR2 = ref(false);
let ismrValidMR3 = ref(false);
let ismrInvalid1 = ref(false);
let ismrInvalid2 = ref(false);
let ismrInvalid3 = ref(false);
let isDataValid = ref(true);
let isvalueValid = ref(false);

const tileSel = reactive({
    keys: '',
    values: ''
});
const tilenoas = reactive({
    manufacturer: '',
    material: [],
    description: '',
    resistance: [],
    Table2: [],
    Table3: [],
    select_tile: [],
    tile_map: [],
    table2_map: [],
    Table3_obj_map: [],
    Table2_obj_map: [],
    slope: 0,
    height: 0,
    dripEdgeMaterial: [],
    dripEdgeSize: [],
    deckType: '',
    expiration_date: '',
    prescriptiveSelection: '',
    perimeter: ''
});
const visible = ref(false);
const selectedExposures = ref('');
const exposureChoosen = ref('');
const isExposureC = ref(false);
const { getData } = useExposurec();
const { getDatas } = useExposured();
// Computed Properties
const dimensions = computed(() => {
    setRoofInputs();
});
function clearQueryInput() {
    childQueryRef.value?.clearInput();
}
const paddyTracker = ref('');

//  a check if single is change to double, and tile input boxes have data clear it.
const selectPaddy = computed(() => {
    if (selectedOption.value == 'double') {
        isPaddySingle.value = false;

        addPaddyCatval(selectedOption);
        isMultiTileValid = false;
        isTileValid = true;
        console.log(isPaddySingle.value);
        clearData();
    } else {
        isPaddySingle.value = true;
        addPaddyCatval(selectedOption);
        isMultiTileValid = false;
        isTileValid = true;

        clearData();
    }
});

watch(
    selectPaddy,
    () => {
        paddySeleted.value = selectedOption.value;
    },
    { immediate: true }
);
const dtMounted = ref();
const dtMounteds = ref();
// May want to put this code on the other watcher
watch(selectedOption, (newVal, oldVal) => {
    console.log(newVal, oldVal);
    paddyTracker.value = oldVal;
    console.log(paddyTracker.value);
});
// Methods
function getdeckType(event) {
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        isDisabledslope.value = false;
    }
}

function validateRoofSlope() {
    validateInput();
    if (dims.slope >= 2) {
        isDisabled.value = false;
        addCheckmarks();
    } else {
        isDisabled.value = true;
    }
}

function validateHeight() {
    validateHeightInput();
}

function addCheckmarks() {
    if (isHeightValid.value || isDisabledslope.value) {
        isvalueValid.value = true;
    } else {
        isvalueValid.value = false;
    }
}

function setRoofInputs() {
    dims.height = heightModel.value;
    dims.per = (dims.height * factor.value).toFixed(2);
    addCheckmarks();
}

// 1. First Exposure selected

function selectedExposure() {
    console.log(selectedExposures.value);
    if (selectedExposures.value === 'c') {
        exposureChoosen.value = 'c';
        console.log(exposureChoosen.value);
        checkZones();
    } else {
        exposureChoosen.value = 'd';

        console.log(exposureChoosen.value);
        isExposureC.value = false;
        checkZones();
    }
}

// 2. Underlayment is picked and we reviel the respective components. Then zones are checked
function pickUnderlayment(event) {
    save.value = selectedUnderlayment.value.key;
    if (save.value === 1) {
        isPaddyCategoryValid.value = true;
        isTileValid = false;
        isTileData.value = false;

        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = false;
    } else if (save.value === 2) {
        isPaddyCategoryValid.value = true;

        isTileValid = true;
        isTileData.value = true;
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = true;
    } else if (save.value === 3) {
        isPaddyCategoryValid.value = true;

        isTileValid = true;
        isUDLValid.value = true;
        isTileData.value = true;
        isUDLNOAValid.value = true;
        isSAValid.value = false;
    } else if (save.value === 0) {
        isPaddyCategoryValid.value = false;

        isTileData.value = false;
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = false;
        isTileValid.value = false;
    }
}

const paddySelectedSingle = ref(inputdata);
const paddySelectedDouble = ref(inputdatas);
let datamounted_f = ref(ftileStore.$state.tilefinput);
// let Edatamounted = ref(etileStore.$state.tilesysEinput);

watchEffect(() => {
    dtMounted.value = paddySelectedSingle.value;
    dtMounteds.value = paddySelectedDouble.value;
});
// const dataComp =  computed(() =>   async  (dtMounted.value = paddySelectedSingle.value));
let datamountedsystemE = ref(etileStore.$state.tilesysEinput);

let datatilenoaDoublePaddy = ref('');

let datatilenoas = ref('');
let datatilenoa = ref('');
//
async function grabInput() {
    if (selectedOption.value == 'double') {
        console.log(selectedOption.value, 'Entered double');
        datatilenoaDoublePaddy.value = query.value;
        console.log(datatilenoaDoublePaddy.value);

        updateDoubletick();
    } else if (selectedOption.value == 'single') {
        console.log(selectedOption.value, 'Entered single');
        datatilenoas.value = query.value;

        updateTick();
    } else {
        console.log('all was skipped');
    }
}
const manufacturerData = ref('');
const manufacturerDoubleData = ref('');

const updateTick = () => {
    // isPaddySingle.value = true;
    dtMounted.value = paddySelectedSingle.value?.[0];
    manufacturerData.value = dtMounted.value?.singlepaddyData ?? [];
    console.log(dtMounted.value, manufacturerData.value);
    nextTick(() => {
        if (manufacturerData.value.content === 'multiple') {
            isMultiTileValid = true;
            isTileValid = true;

            isTileData.value = true;
            tilenoas.manufacturer = manufacturerData.value.applicant;
            tilenoas.select_tile = manufacturerData.value.select_tile;
            tilenoas.expiration_date = manufacturerData.value.expiration_date;
            console.log(tilenoas.expiration_date);
            licenseEnd.value = tilenoas.expiration_date;
            const { isExpired } = useExpiry(licenseEnd);
            console.log(isExpired);
        } else {
            // This is for the rest of the NOAs

            console.log(manufacturerData.value);
            isTileData.value = true;
            isTileValid = true;
            isMultiTileValid = false;
            tilenoas.manufacturer = manufacturerData.value.applicant;
            tilenoas.description = manufacturerData.value.description;
            console.log(tilenoas.description);
            tilenoas.material = manufacturerData.value.material;
            tilenoas.expiration_date = manufacturerData.value.expiration_date;
            console.log(tilenoas.expiration_date);
            licenseEnd.value = tilenoas.expiration_date;
            const { isExpired } = useExpiry(licenseEnd);
            console.log(isExpired);
        }
        console.log(tilenoas);
        // postData(tilenoas);

        addSystemvalues(tilenoas);
        checkZones();
    });
};

const updateDoubletick = () => {
    dtMounteds.value = paddySelectedDouble.value?.[0];
    console.log(dtMounteds.value);
    manufacturerDoubleData.value = dtMounteds.value?.doublepaddyData ?? [];
    console.log(manufacturerDoubleData.value);
    nextTick(() => {
        // manufacturerDoubleData.value.content === 'multiple'
        console.log(manufacturerDoubleData.value.content);
        if (manufacturerDoubleData.value.content === 'multiple') {
            isMultiTileValid = true;
            isTileValid = true;

            isTileData.value = true;
            tilenoas.manufacturer = manufacturerDoubleData.value.applicant;
            tilenoas.select_tile = manufacturerDoubleData.value.select_tile;
            tilenoas.expiration_date = manufacturerDoubleData.value.expiration_date;
            licenseEnd.value = tilenoas.expiration_date;
            const { isExpired } = useExpiry(licenseEnd);
            console.log(isExpired);
        } else {
            isTileData.value = true;
            isTileValid = true;
            tilenoas.manufacturer = manufacturerDoubleData.value.applicant;
            tilenoas.description = manufacturerDoubleData.value.description;
            console.log(tilenoas.description);
            tilenoas.material = manufacturerDoubleData.value.material;
            tilenoas.expiration_date = manufacturerDoubleData.value.expiration_date;
            licenseEnd.value = tilenoas.expiration_date;
            const { isExpired } = useExpiry(licenseEnd);
            console.log(isExpired);
            isMultiTileValid = false;
        }
        console.log(tilenoas);

        // postData(tilenoas);
        addSystemvalues(tilenoas);
        checkZones();
    });
};

// This could clear the data: Now
function clearData() {
    // paddyStore.clearAllData();
    // isTileValid.value = false;
    // isUDLValid.value = false;
    // isTileData.value = false;
    // isUDLNOAValid.value = false;
    // isSAValid.value = false;
    // recordPaddy();

    tilenoas.manufacturer = '';
    tilenoas.description = '';
    tilenoas.material = [];
    tilenoas.select_tile = [];
    tilenoas.expiration_date = '';
    resetStore.$reset();

    zoneone.lambda1 = '';
    zonetwo.lambda2 = '';
    zonethree.lambda3 = '';

    zoneone.mg1 = '';
    zonetwo.mg2 = '';
    zonethree.mg3 = '';

    zoneone.mf1 = '';
    zonetwo.mf2 = '';
    zonethree.mf3 = '';

    if (paddyTracker.value == '') {
        return;
    } else if (paddyTracker.value !== selectedOption.value) {
        console.log('clearQuery exec', selectedOption.value);
        clearQueryInput();
    }
}
const tileValue = reactive({
    k: '',
    v: []
});

function checkZones() {
    if (selectedExposures.value === 'c') {
        // This Function gets the zones
        getData(dims.slope, dims.height);

        zones.value.forEach((item) => {
            zoneone.zone = item[0];
            zonetwo.zone = item[1];
            zonethree.zone = item[2];
        });
    } else {
        getDatas(dims.slope, dims.height);

        zoned.value.forEach((item) => {
            zoneone.zone = item[0];
            zonetwo.zone = item[1];
            zonethree.zone = item[2];
        });
    }
}
// Multi-tile
function updateTile(event) {
    let type = selectedOption.value === 'double' ? manufacturerDoubleData.value.table2_map : manufacturerData.value.Table2_obj_map;
    console.log(type, isMultiTileValid.value);
    const valMulti = Object.entries(type).map((obj) => {
        const key = obj[0];
        const value = obj[1];
        console.log(key, value);
        if (event.value === key) {
            console.log(key);
            tilenoas.description = key;

            tileSel.values = value[0];
            console.log(tilenoas.description);
        }
    });
    zones.value.forEach((item) => {
        zoneone.zone = item[0];
        zonetwo.zone = item[1];
        zonethree.zone = item[2];
    });
    zoneone.lambda1 = tileSel.values;
    zonetwo.lambda2 = tileSel.values;
    zonethree.lambda3 = tileSel.values;

    // These I may need to separate further: 04232025 15:45 - Hugo Table2_obj_map
    let types = selectedOption.value === 'double' ? manufacturerDoubleData.value.tile_map : manufacturerData.value.Table3_obj_map;
    // console.log(types);
    const valMultis = Object.entries(types).map((obj) => {
        const key = obj[0];
        const value = obj[1];
        console.log(key, value);
        if (event.value === key) {
            tileValue.v = value;
            console.log(tileValue.v);
        }
        const clampNumber1 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
        const slopeRange = clampNumber1(2, Number(dims.slope), 12);
        console.log(slopeRange);
        if (slopeRange <= slopeOptions.three) {
            console.log('Is Less then three', tileValue.v[0]);
            tileValue.v[0];
            zoneone.mg1 = tileValue.v[0];
            zonetwo.mg2 = tileValue.v[0];
            zonethree.mg3 = tileValue.v[0];
            console.log(zoneone.mg1);
        } else if (slopeRange === slopeOptions.three || slopeRange < slopeOptions.four) {
            zoneone.mg1 = tileValue.v[1];
            zonetwo.mg2 = tileValue.v[1];
            zonethree.mg3 = tileValue.v[1];
        } else if (slopeRange < slopeOptions.five || slopeRange === slopeOptions.four) {
            console.log('Is Less');
            zoneone.mg1 = tileValue.v[2];
            zonetwo.mg2 = tileValue.v[2];
            zonethree.mg3 = tileValue.v[2];
        } else if (slopeRange === slopeOptions.five || slopeRange < slopeOptions.six) {
            console.log('Is Less');
            zoneone.mg1 = tileValue.v[3];
            zonetwo.mg2 = tileValue.v[3];
            zonethree.mg3 = tileValue.v[3];
        } else if (slopeRange == slopeOptions.six || slopeRange < slopeOptions.seven) {
            zoneone.mg1 = tileValue.v[4];
            zonetwo.mg2 = tileValue.v[4];
            zonethree.mg3 = tileValue.v[4];
        } else if (slopeRange >= slopeOptions.seven) {
            console.log('Is Less');
            zoneone.mg1 = tileValue.v[5];
            zonetwo.mg2 = tileValue.v[5];
            zonethree.mg3 = tileValue.v[5];
        }

        const result1 = computed(() => zoneone.zone * zoneone.lambda1);

        const result2 = computed(() => zonetwo.zone * zonetwo.lambda2);

        const result3 = computed(() => zonethree.zone * zonethree.lambda3);
        console.log(zoneone.mg1, result1);
        zoneone.mr1 = computed(() => (result1.value - zoneone.mg1).toFixed(2));
        zonetwo.mr2 = computed(() => (result2.value - zonetwo.mg2).toFixed(2));
        zonethree.mr3 = computed(() => (result3.value - zonethree.mg3).toFixed(2));
        console.log(zoneone.mg1, zoneone.mr1);
    });

    tilenoas.material = isPaddySingle.value === true ? manufacturerData.value.material : manufacturerDoubleData.value.material;
    tilenoas.paddies = isPaddySingle.value === true ? manufacturerData.value.resistance : manufacturerDoubleData.value.resistance;

    // updateMF();
}

watch(underlaymentType, checkZones, () => {
    grabInput();
    // checkInput();
});
const saTiles = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    prescriptiveSelection: '',
    designpressure: [],
    description: [],
    Description_F1: '',
    Description_F2: '',
    Description_F3: '',
    Description_F4: '',
    Description_F5: '',
    Description_F6: '',
    Description_F7: '',
    Description_F8: '',
    Description_F9: '',
    Description_F10: '',
    Description_F11: '',
    Description_F12: '',
    arrDesignPressure: [],
    pressure: '',
    expiration_date: ''
});

const udlTile = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    designPressure: [],
    Anchor_Base_Sheet: [],
    dP: '',
    tileCap: '',
    Anchor_Base: '',
    systemSelected: '',
    TileCap_Sheet_Description: [],
    prescriptiveSelection: '',
    Anchor_Base_Sheet_E1: '',
    Anchor_Base_Sheet_E2: '',
    Anchor_Base_Sheet_E3: '',
    Anchor_Base_Sheet_E4: '',
    Anchor_Base_Sheet_E5: '',
    Anchor_Base_Sheet_E6: '',
    Anchor_Base_Sheet_E7: '',
    Anchor_Base_Sheet_E8: '',
    Anchor_Base_Sheet_E9: '',
    Anchor_Base_Sheet_E10: '',
    Anchor_Base_Sheet_E11: '',
    Anchor_Base_Sheet_E12: '',
    Anchor_Base_Sheet_E13: '',
    TileCap_Sheet_Description: [],
    TileCap_Sheet_Description_E1: '',
    TileCap_Sheet_Description_E2: '',
    TileCap_Sheet_Description_E3: '',
    TileCap_Sheet_Description_E4: '',
    TileCap_Sheet_Description_E5: '',
    TileCap_Sheet_Description_E6: '',
    TileCap_Sheet_Description_E7: '',
    TileCap_Sheet_Description_E8: '',
    TileCap_Sheet_Description_E9: '',
    TileCap_Sheet_Description_E10: '',
    TileCap_Sheet_Description_E11: '',
    TileCap_Sheet_Description_E12: '',
    TileCap_Sheet_Description_E13: '',
    arrDesignPressure: [],
    syst: '',
    pressure: '',
    expiration_date: ''
});

watch(zoneone, zonetwo, zonethree, dimensions, dims, () => {});

function sysEcheckInput() {
    console.log(Edatamounted.value[0]);
    if (Edatamounted.value.length !== null) {
        Edatamounted.value.forEach((item, index) => {
            console.log(item);
            udlTile.manufacturer = item.systemDataE.manufacturer;
            udlTile.material = item.systemDataE.material;
            udlTile.system = item.systemDataE.system;
        });
    }
}

const whatChanged = computed(() => {
    checkInput();
    checkMR1();
    checkMR2();
    checkMR3();
    sysEcheckInput();
    setRoofInputs();
    grabInput();
    addCheckmarks();
    validateHeight();
    validateRoofSlope();
});

const selectedsystemf = ref(null);
const selectedsysNoa = ref(null);
const selectedMulti = ref(null);
const selectedsystemE = ref(null);

const slopeOptions = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7
};

watchEffect(isTileValid, isTileData, zoneone.mr1, zonetwo.mr2, zonethree.mr3, whatChanged, saTiles, setRoofInputs, checkData, checkDatas, underlaymentType, () => {});

function checkData() {
    if (tileData.Table3.two === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.three === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.four === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.five === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.six === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.seven === 'N/A') {
        isDataValid.value = false;
    }
}
// function clear() {
//   ignoreUpdates(() => {
//     source.value = 0
//     log.value = ''
//   })
// }
function checkDatas() {
    console.log(datatilenoas.value);
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

// const visible = ref(false);

function checkInputSystem() {
    // 23061202 23070604

    datamounted_f.value.forEach((item, index) => {
        saTiles.Description_F1 = item.systemData.Description_F1;
        saTiles.Description_F2 = item.systemData.Description_F2;
        saTiles.Description_F3 = item.systemData.Description_F3;
        saTiles.Description_F4 = item.systemData.Description_F4;
        saTiles.Description_F5 = item.systemData.Description_F5;
        saTiles.Description_F6 = item.systemData.Description_F6;
        saTiles.Description_F7 = item.systemData.Description_F7;
        saTiles.Description_F8 = item.systemData.Description_F8;
        saTiles.Description_F9 = item.systemData.Description_F9;
        saTiles.arrDesignPressure = item.systemData.designPressure;
        saTiles.expiration_date = item.systemData.expiration_date;
        console.log(saTiles.expiration_date);
        licenseEnd.value = saTiles.expiration_date;
        const { isExpired } = useExpiry(licenseEnd);
        console.log(isExpired);
        if (item.systemData.system.length > 1) {
            addFSystem();
        } else {
            saTiles.system = item.systemData.system;
        }
    });
}
const Anchor_Base = reactive({
    Anchor_Base_Sheet_E1: '',
    Anchor_Base_Sheet_E2: '',
    Anchor_Base_Sheet_E3: '',
    Anchor_Base_Sheet_E4: '',
    Anchor_Base_Sheet_E5: '',
    Anchor_Base_Sheet_E6: '',
    Anchor_Base_Sheet_E7: '',
    Anchor_Base_Sheet_E8: '',
    Anchor_Base_Sheet_E9: '',
    Anchor_Base_Sheet_E10: '',
    Anchor_Base_Sheet_E11: '',
    Anchor_Base_Sheet_E12: '',
    Anchor_Base_Sheet_E13: ''
});
function EcheckInputSystem() {
    // 23111506

    datamountedsystemE.value.forEach((item, index) => {
        udlTile.Maps = item.systemDataE.Maps;
        console.log(Anchor_Base.Anchor_Base_Sheet_E2);
        Anchor_Base.Anchor_Base_Sheet_E1 = item.systemDataE.Anchor_Base_Sheet_E1;
        Anchor_Base.Anchor_Base_Sheet_E2 = item.systemDataE.Anchor_Base_Sheet_E2;
        Anchor_Base.Anchor_Base_Sheet_E3 = item.systemDataE.Anchor_Base_Sheet_E3;
        Anchor_Base.Anchor_Base_Sheet_E4 = item.systemDataE.Anchor_Base_Sheet_E4;
        Anchor_Base.Anchor_Base_Sheet_E5 = item.systemDataE.Anchor_Base_Sheet_E5;
        Anchor_Base.Anchor_Base_Sheet_E6 = item.systemDataE.Anchor_Base_Sheet_E6;
        Anchor_Base.Anchor_Base_Sheet_E7 = item.systemDataE.Anchor_Base_Sheet_E7;
        Anchor_Base.Anchor_Base_Sheet_E8 = item.systemDataE.Anchor_Base_Sheet_E8;
        Anchor_Base.Anchor_Base_Sheet_E9 = item.systemDataE.Anchor_Base_Sheet_E9;
        Anchor_Base.Anchor_Base_Sheet_E10 = item.systemDataE.Anchor_Base_Sheet_E10;
        Anchor_Base.Anchor_Base_Sheet_E11 = item.systemDataE.Anchor_Base_Sheet_E11;
        Anchor_Base.Anchor_Base_Sheet_E12 = item.systemDataE.Anchor_Base_Sheet_E12;
        Anchor_Base.Anchor_Base_Sheet_E13 = item.systemDataE.Anchor_Base_Sheet_E13;

        udlTile.TileCap_Sheet_Description_E1 = item.systemDataE.TileCap_Sheet_Description_E1;
        udlTile.TileCap_Sheet_Description_E2 = item.systemDataE.TileCap_Sheet_Description_E2;
        udlTile.TileCap_Sheet_Description_E3 = item.systemDataE.TileCap_Sheet_Description_E3;
        udlTile.TileCap_Sheet_Description_E4 = item.systemDataE.TileCap_Sheet_Description_E4;
        udlTile.TileCap_Sheet_Description_E5 = item.systemDataE.TileCap_Sheet_Description_E5;
        udlTile.TileCap_Sheet_Description_E6 = item.systemDataE.TileCap_Sheet_Description_E6;
        udlTile.TileCap_Sheet_Description_E7 = item.systemDataE.TileCap_Sheet_Description_E7;
        udlTile.TileCap_Sheet_Description_E8 = item.systemDataE.TileCap_Sheet_Description_E8;
        udlTile.TileCap_Sheet_Description_E9 = item.systemDataE.TileCap_Sheet_Description_E9;
        udlTile.TileCap_Sheet_Description_E10 = item.systemDataE.TileCap_Sheet_Description_E10;
        udlTile.TileCap_Sheet_Description_E11 = item.systemDataE.TileCap_Sheet_Description_E11;

        udlTile.TileCap_Sheet_Description_E12 = item.systemDataE.TileCap_Sheet_Description_E12;
        udlTile.TileCap_Sheet_Description_E13 = item.systemDataE.TileCap_Sheet_Description_E13;
        udlTile.arrDesignPressure = item.systemDataE.designPressure;

        if (item.systemDataE.system.length > 1) {
        } else {
            udlTile.system = item.systemDataE.system;
        }
        //  updateselectSystemE();
    });
}
function addFSystem() {
    saTiles.system = saTiles.system;
}

// let isvalueValid = ref(false);

const { errorMessage, validateNumber } = useNumberValidation({
    min: 2,
    max: 12,
    required: true
});

const { errorHeightMessage, validateTileHeight } = useHeightValidation({
    min: 10,
    max: 40,
    required: true
});

const validateInput = () => {
    validateNumber(dims.slope);
    console.log(dims.slope);
};

const validateHeightInput = () => {
    validateTileHeight(dims.height);
    isHeightValid.value = true;
    addCheckmarks();
};
// Lifecycle Hooks
onMounted(() => {
    // Recent changes

    roofList.value.forEach((item, index) => {
        if (item.item === 'Adhesive Set Tile') {
            dims.area = item.dim4;
        }
    });
});

const factor = ref(0.4);

const tileData2 = reactive({
    noa: '',
    manufacturerData: '',
    material: [],
    description: '',
    Table2: [],
    Table3: [],
    expiration_date: '',
    resistance: [],
    selection: '',
    select_tile: [],
    tile_map: [],
    table2_map: [],
    height: '',
    area: '',
    slope: '',
    Decktype: '',
    perimeter: '',
    zoneone: {
        zone1: '',
        lambda1: '',
        mg1: '',
        mr1: '',
        mf1: ''
    },
    zonetwo: {
        zone2: '',
        lambda2: '',
        mg2: '',
        mr2: '',
        mf2: ''
    },
    zonethree: {
        zone3: '',
        lambda3: '',
        mg3: '',
        mr3: '',
        mf3: ''
    }
});

function checkInputSA() {
    if (datamounted_f.value.length !== null) {
        datamounted_f.value.forEach((item, index) => {
            console.log(item);
            saTiles.manufacturer = item.systemData.manufacturer;
            saTiles.material = item.systemData.material;
            saTiles.system = item.systemData.system;
        });
    }
}

const showMaterialValid = ref(false);

function checkInput() {
    // recently removed || datatilenoas.value.Table2.content === 'multiple' || datatilenoas.value.Table2.content === ''

    console.log(isMultiTileValid);
    if (isMultiTileValid) {
        isMultiTileValid = true;
        showMaterialValid.value = false;
        checkTile();
    } else {
        showMaterialValid.value = true;
        isMultiTileValid = false;
        isTileValid = true;
        isTileData = true;
    }
}

// For Exposure D it seems and multi content on tables 2 and 3
function checkTile() {
    if (exposureChoosen.value === 'c') {
        // getData(dims.slope, dims.height) this will get a different zone than d exposure

        getData(dims.slope, dims.height);
        zones.value.forEach((item) => {
            zoneone.zone = item[0];
            zonetwo.zone = item[1];
            zonethree.zone = item[2];
        });
    } else {
        getDatas(dims.slope, dims.height);
        zoned.value.forEach((item) => {
            zoneone.zone = item[0];
            zonetwo.zone = item[1];
            zonethree.zone = item[2];
        });
        checkZones();
    }
}

// seems singleTile exposure C
function checkMaterial() {
    const clampNumber1 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
    const slopeRange = clampNumber1(2, Number(dims.slope), 12);
    console.log(slopeRange);
    if (slopeRange <= slopeOptions.three) {
        zoneone.mg1 = isPaddySingle.value === true ? manufacturerData.value.Table3.two.Direct_Deck : manufacturerDoubleData.value.Table3.two;
        zonetwo.mg2 = isPaddySingle.value === true ? manufacturerData.value.Table3.two.Direct_Deck : manufacturerDoubleData.value.Table3.two;
        zonethree.mg3 = isPaddySingle.value === true ? manufacturerData.value.Table3.two.Direct_Deck : manufacturerDoubleData.value.Table3.two;
    } else if (slopeRange === slopeOptions.three || slopeRange < slopeOptions.four) {
        // console.log('Is Less than four but equal to or higher than three', ileDatas1.value.tileValues.Table3.three.Direct_Deck, manufacturerDoubleData.value.Table3.three);

        zoneone.mg1 = isPaddySingle.value === true ? manufacturerData.value.Table3.three.Direct_Deck : manufacturerDoubleData.value.Table3.three;
        zonetwo.mg2 = isPaddySingle.value === true ? manufacturerData.value.Table3.three.Direct_Deck : manufacturerDoubleData.value.Table3.three;
        zonethree.mg3 = isPaddySingle.value === true ? manufacturerData.value.Table3.three.Direct_Deck : manufacturerDoubleData.value.Table3.three;
        console.log(zonethree.mg3);
    } else if (slopeRange < slopeOptions.five || slopeRange === slopeOptions.four) {
        console.log('Is Less');
        console.log(slopeRange);
        zoneone.mg1 = isPaddySingle.value === true ? manufacturerData.value.Table3.four.Direct_Deck : manufacturerDoubleData.value.Table3.four;
        zonetwo.mg2 = isPaddySingle.value === true ? manufacturerData.value.Table3.four.Direct_Deck : manufacturerDoubleData.value.Table3.four;
        zonethree.mg3 = isPaddySingle.value === true ? manufacturerData.value.Table3.four.Direct_Deck : manufacturerDoubleData.value.Table3.four;
    } else if (slopeRange === slopeOptions.five || slopeRange < slopeOptions.six) {
        console.log('Is Less');
        zoneone.mg1 = isPaddySingle.value === true ? manufacturerData.value.Table3.five.Direct_Deck : manufacturerDoubleData.value.Table3.five;
        zonetwo.mg2 = isPaddySingle.value === true ? manufacturerData.value.Table3.five.Direct_Deck : manufacturerDoubleData.value.Table3.five;
        zonethree.mg3 = isPaddySingle.value === true ? manufacturerData.value.Table3.five.Direct_Deck : manufacturerDoubleData.value.Table3.five;
    } else if (slopeRange == slopeOptions.six || slopeRange < slopeOptions.seven) {
        zoneone.mg1 = isPaddySingle.value === true ? manufacturerData.value.Table3.six.Direct_Deck : manufacturerDoubleData.value.Table3.six;
        zonetwo.mg2 = isPaddySingle.value === true ? manufacturerData.value.Table3.six.Direct_Deck : manufacturerDoubleData.value.Table3.six;
        zonethree.mg3 = isPaddySingle.value === true ? manufacturerData.value.Table3.six.Direct_Deck : manufacturerDoubleData.value.Table3.six;
    } else if (slopeRange >= slopeOptions.seven) {
        console.log('Is Less');
        zoneone.mg1 = isPaddySingle.value === true ? manufacturerData.value.Table3.seven.Direct_Deck : manufacturerDoubleData.value.Table3.seven;
        zonetwo.mg2 = isPaddySingle.value === true ? manufacturerData.value.Table3.seven.Direct_Deck : manufacturerDoubleData.value.Table3.seven;
        zonethree.mg3 = isPaddySingle.value === true ? manufacturerData.value.Table3.seven.Direct_Deck : manufacturerDoubleData.value.Table3.seven;
    }

    tilenoas.paddies = isPaddySingle.value === true ? manufacturerData.value.resistance : manufacturerDoubleData.value.resistance;
    zoneone.lambda1 = isPaddySingle.value === true ? manufacturerData.value.Table2.Direct_Deck : manufacturerDoubleData.value.Table2.Direct_Deck;
    zonetwo.lambda2 = isPaddySingle.value === true ? manufacturerData.value.Table2.Direct_Deck : manufacturerDoubleData.value.Table2.Direct_Deck;
    zonethree.lambda3 = isPaddySingle.value === true ? manufacturerData.value.Table2.Direct_Deck : manufacturerDoubleData.value.Table2.Direct_Deck;

    const result1 = computed(() => zoneone.zone * zoneone.lambda1);

    const result2 = computed(() => zonetwo.zone * zonetwo.lambda2);

    const result3 = computed(() => zonethree.zone * zonethree.lambda3);

    zoneone.mr1 = computed(() => (result1.value - zoneone.mg1).toFixed(2));
    zonetwo.mr2 = computed(() => (result2.value - zonetwo.mg2).toFixed(2));
    zonethree.mr3 = computed(() => (result3.value - zonethree.mg3).toFixed(2));

    saveTileData();
}

const savedKey = ref([]);
const savedValue = ref([]);

function updateMF(event) {
    let mat = isPaddySingle.value === true ? manufacturerData.value.resistance : manufacturerDoubleData.value.resistance;
    console.log(mat, tilenoas.material[0]);
    // almost there fix this section by changing SelectionKey, start with
    const count = ref(0);

    for (let i = 0; i < tilenoas.material.length; i++) {
        if (tilenoas.material[i] === event.value) {
            zoneone.mf1 = mat[i];
            zonetwo.mf2 = mat[i];
            zonethree.mf3 = mat[i];
        }
    }

    tileData2.material = event.value;
    console.log(tileData2.material);
    if ((!zoneone.mf1.includes('.') && zoneone.mf1.length === 6) || (!zonetwo.mf2.includes('.') && zonetwo.mf2.length === 4) || (!zonethree.mf3.includes('.') && zonethree.mf3.length === 4)) {
        const superscripts = detectSuperscripts(zoneone.mf1, zonetwo.mf2, zonethree.mf3);
    } else {
        const superscriptRegex = /[\u00B2-\u00B3\u00B9\u2070-\u207F]/g;
        const mfcheck1 = zoneone.mf1.replace(superscriptRegex, '');

        const mfcheck2 = zonetwo.mf2.replace(superscriptRegex, '');
        const mfcheck3 = zonethree.mf3.replace(superscriptRegex, '');
        const mfc1 = useToNumber(mfcheck1);
        const mfc2 = useToNumber(mfcheck2);
        const mfc3 = useToNumber(mfcheck3);

        const convertmr1 = useToNumber(zoneone.mr1);
        const convertmr2 = useToNumber(zonetwo.mr2);
        const convertmr3 = useToNumber(zonethree.mr3);

        if (convertmr3.value < mfc3.value) {
            console.log('I am less than MF3', convertmr3.value, mfc3.value);
            ismrValidMR3 = true;
            ismrInvalid3 = false;
        } else {
            checkMR3();
            console.log('Entered Else');
        }
        if (convertmr1.value < mfc1.value) {
            console.log('I am less than MF1', convertmr1.value);

            ismrValidMR1 = true;
            ismrInvalid1 = false;
        } else {
            checkMR1();
            console.log('entered else');
        }
        if (convertmr2.value < mfc2.value) {
            console.log('I am less than MF2');
            ismrValidMR2 = true;
            ismrInvalid2 = false;
        } else {
            checkMR2();
        }
    }
    saveTileData();
}

// I think we need another next tick system here or clear the memory

const matches1 = ref('');
const matches2 = ref('');
const matches3 = ref('');

function detectSuperscripts(str1, str2, str3) {
    // Define the regular expression to match superscript characters
    console.log('Entered detectSuperscripts section');
    const superscriptRegex = /[\u00B2-\u00B3\u00B9\u2070-\u207F]/g;

    // Find matches for superscripts
    matches1.value = str1.replace(superscriptRegex, '');
    matches2.value = str2.replace(superscriptRegex, '');
    matches3.value = str3.replace(superscriptRegex, '');
    console.log(matches1.value, matches2.value, matches3.value);
    // Return the array of detected superscript characters (or null if none)
    checkMR3();
    checkMR1();
    checkMR2();

    return matches1, matches2, matches3 || [];
}
function checkMR1() {
    const superscriptRegex = /[\u00B2-\u00B3\u00B9\u2070-\u207F]/g;
    if (matches1.value.length === 0) {
        const mfcheck1 = zoneone.mf1.replace(superscriptRegex, '');
        console.log(zoneone.mf1.replace(superscriptRegex, ''));
        const mfc1 = useToNumber(mfcheck1);

        const convertmr1 = useToNumber(zoneone.mr1);
        if (convertmr1.value > mfc1.value) {
            console.log('I am greater than MF1');
            ismrInvalid1 = true;
            ismrValidMR1 = false;
        }
    } else {
        const mfc1 = useToNumber(matches1.value);
        const convertmr1 = useToNumber(zoneone.mr1);
        console.log(mfc1.value, convertmr1.value);
        if (convertmr1.value < mfc1.value) {
            console.log('I am greater than MF1');
            ismrInvalid1 = false;
            ismrValidMR1 = true;
        }
    }
}

function checkMR2() {
    const superscriptRegex = /[\u00B2-\u00B3\u00B9\u2070-\u207F]/g;
    if (matches2.value.length === 0) {
        const mfcheck2 = zonetwo.mf2.replace(superscriptRegex, '');
        console.log(zonetwo.mf2.replace(superscriptRegex, ''));
        const mfc2 = useToNumber(mfcheck2);

        const convertmr2 = useToNumber(zonetwo.mr2);
        if (convertmr2.value > mfc2.value) {
            console.log('I am greater than MF2');
            ismrInvalid2 = true;
            ismrValidMR2 = false;
        }
    } else {
        const mfc2 = useToNumber(matches2.value);

        const convertmr2 = useToNumber(zonetwo.mr2);
        console.log(mfc2.value, convertmr2.value);
        if (convertmr2.value < mfc2.value) {
            console.log('I am greater than MF2');
            ismrInvalid2 = false;
            ismrValidMR2 = true;
        }
    }
}

function checkMR3() {
    const superscriptRegex = /[\u00B2-\u00B3\u00B9\u2070-\u207F]/g;
    if (matches3.value.length === 0) {
        const mfcheck3 = zonethree.mf3.replace(superscriptRegex, '');
        console.log('slice', zonethree.mf3.replace(superscriptRegex, ''));
        const mfc3 = useToNumber(mfcheck3);

        const convertmr3 = useToNumber(zonethree.mr3);
        if (convertmr3.value > mfc3.value) {
            console.log('I am greater than MF3');
            ismrInvalid3 = true;
            ismrValidMR3 = false;
        }
    } else {
        const mfc3 = useToNumber(matches3.value);

        const convertmr3 = useToNumber(zonethree.mr3);
        console.log(convertmr3.value, mfc3.value);
        console.log(typeof convertmr3.value, typeof mfc3.value);
        if (convertmr3.value < mfc3.value) {
            console.log('I am greater than MF3', convertmr3.value, mfc3.value);
            ismrInvalid3 = false;
            ismrValidMR3 = true;
        }
    }
}
// Reset the roof list store.
// function clearSelected() {
//     store.$reset();
//     console.log(store, reset);
// }
const saveTileData = async () => {
    tileData2.slope = dims.slope;
    tileData2.height = dims.height;
    tileData2.area = dims.area;
    tileData2.perimeter = dims.per;
    tileData2.zoneone.zone1 = zoneone.zone;
    tileData2.zoneone.lambda1 = zoneone.lambda1;
    tileData2.zoneone.mg1 = zoneone.mg1;
    tileData2.zoneone.mr1 = zoneone.mr1;
    tileData2.zonetwo.zone2 = zonetwo.zone;
    tileData2.zonetwo.lambda2 = zonetwo.lambda2;
    tileData2.zonetwo.mg2 = zonetwo.mg2;
    tileData2.zonetwo.mr2 = zonetwo.mr2;
    tileData2.paddySelection = selectedOption.value;
    tileData2.applicant = tilenoas.manufacturer;
    tileData2.description = tilenoas.description;
    console.log(tileData2.description);
    // tileData2.material = tilenoas.material;

    tileData2.Decktype = dt.value;
    tileData2.prescriptiveSelection = selectedUnderlayment.value;

    tileData2.zonethree.zone3 = zonethree.zone;
    tileData2.zonethree.lambda3 = zonethree.lambda3;
    tileData2.zonethree.mg3 = zonethree.mg3;
    tileData2.zonethree.mr3 = zonethree.mr3;

    tileData2.zoneone.mf1 = zoneone.mf1;
    tileData2.zonetwo.mf2 = zonetwo.mf2;
    tileData2.zonethree.mf3 = zonethree.mf3;
    addSavedvalues(tileData2);
    // addtileData(tileData2);
    console.log(tileData2);

    // }
};
const keyValueSystemFPairsValues = ref({});
const keyValueSystemFPairsKeys = ref({});
function updateselectSystem(selectedsystemf) {
    let sys = saTiles.system;
    let dp = saTiles.arrDesignPressure;
    let key = sys;
    sys.forEach((key, index) => {
        keyValueSystemFPairsValues.value[key] = dp[index];
    });
    key.forEach((key, index) => {
        keyValueSystemFPairsKeys.value[key] = sys[index];
    });
    console.log(sys, key, dp);
    if (keyValueSystemFPairsValues.value.F1 !== null && selectedsystemf.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F2 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F3 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F4 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F5 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F6 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F7 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F8 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F9 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F10 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F11 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
    if (keyValueSystemFPairsValues.value.F12 !== null && selectedsystemf.value !== null) {
        saDescPressure();
    }
}
const keyValueSystemEPairsValues = ref({});
const keyValueSystemEPairsKeys = ref({});
function updateselectSystemE(selectedsystemE) {
    let sys = udlTile.system;
    let dp = udlTile.arrDesignPressure;
    let key = sys;
    sys.forEach((key, index) => {
        keyValueSystemEPairsValues.value[key] = dp[index];
    });
    key.forEach((key, index) => {
        keyValueSystemEPairsKeys.value[key] = sys[index];
    });
    if (keyValueSystemEPairsValues.value.E1 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E2 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E3 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E4 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E5 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E6 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E7 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E8 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E9 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E10 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E11 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E12 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
    if (keyValueSystemEPairsValues.value.E13 !== null && selectedsystemE.value !== null) {
        udlDescPressure();
    }
}
function udlDescPressure() {
    if (selectedsystemE.value === 'E1') {
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E1;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E1;
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E1;
    }
    if (selectedsystemE.value === 'E2') {
        console.log(selectedsystemE.value, typeof selectedsystemE);
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E2;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E2;
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E2;
        console.log(Anchor_Base.Anchor_Base_Sheet_E2);
    }
    if (selectedsystemE.value === 'E3') {
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E3;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E3;
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E3;
    }
    if (selectedsystemE.value === 'E4') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E4;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E4;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E4;
    }
    if (selectedsystemE.value === 'E5') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E5;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E5;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E5;
    }

    if (selectedsystemE.value === 'E6') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E6;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E6;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E6;
    }
    if (selectedsystemE.value === 'E7') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E7;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E7;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E7;
    }
    if (selectedsystemE.value === 'E8') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E8;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E8;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E8;
    }
    if (selectedsystemE.value === 'E9') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E9;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E9;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E9;
    }
    if (selectedsystemE.value === 'E10') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E10;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E10;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E10;
    }
    if (selectedsystemE.value === 'E11') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E11;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E11;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E11;
    }
    if (selectedsystemE.value === 'E12') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E12;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E12;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E12;
    }
    if (selectedsystemE.value === 'E13') {
        udlTile.Anchor_Base_Sheet = Anchor_Base.Anchor_Base_Sheet_E13;
        udlTile.TileCap_Sheet_Description = udlTile.TileCap_Sheet_Description_E13;
        udlTile.designPressure = keyValueSystemEPairsValues.value.E13;
    }
    if (etileStore.$state.tilesysEinput.length !== 0) {
        etileStore.$state.tilesysEinput[0].systemDataE.Anchor_Base = udlTile.Anchor_Base_Sheet;
        etileStore.$state.tilesysEinput[0].systemDataE.tileCap = udlTile.TileCap_Sheet_Description;
        etileStore.$state.tilesysEinput[0].systemDataE.dP = udlTile.designPressure;
        etileStore.$state.tilesysEinput[0].systemDataE.systemSelected = selectedsystemE.value;
    }
}
function saDescPressure() {
    if (selectedsystemf.value === 'F1') {
        saTiles.description = saTiles.Description_F1;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F1;
    }
    if (selectedsystemf.value === 'F2') {
        saTiles.description = saTiles.Description_F2;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F2;
    }
    if (selectedsystemf.value === 'F3') {
        saTiles.description = saTiles.Description_F3;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F3;
        console.log(saTiles.arrDesignPressure);
    }
    if (selectedsystemf.value === 'F4') {
        saTiles.description = saTiles.Description_F4;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F4;
    }
    if (selectedsystemf.value === 'F5') {
        saTiles.description = saTiles.Description_F5;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F5;
    }
    if (selectedsystemf.value === 'F6') {
        saTiles.description = saTiles.Description_F6;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F6;
    }

    if (selectedsystemf.value === 'F7') {
        saTiles.description = saTiles.Description_F7;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F7;
    }
    if (selectedsystemf.value === 'F8') {
        saTiles.description = saTiles.Description_F8;

        saTiles.designpressure = keyValueSystemFPairsValues.value.F8;
    }
    if (selectedsystemf.value === 'F9') {
        saTiles.description = saTiles.Description_F9;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F9;
    }

    if (selectedsystemf.value === 'F10') {
        saTiles.description = saTiles.Description_F10;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F10;
    }
    if (selectedsystemf.value === 'F11') {
        saTiles.description = saTiles.Description_F11;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F11;
    }
    if (selectedsystemf.value === 'F12') {
        saTiles.description = saTiles.Description_F12;
        saTiles.designpressure = keyValueSystemFPairsValues.value.F12;
    }
    console.log(ftileStore.$state.tilefinput.length);
    if (ftileStore.$state.tilefinput.length !== 0) {
        ftileStore.$state.tilefinput[0].systemData.description = saTiles.description;
        ftileStore.$state.tilefinput[0].systemData.pressure = saTiles.designpressure;
        ftileStore.$state.tilefinput[0].systemData.prescriptiveSelection = selectedUnderlayment.value;
    }
}

//  processMFValue,
watch(
    checkInputSystem,

    validateRoofSlope,
    saveTileData,
    query,
    ismrValidMR3,
    ismrValidMR1,
    ismrValidMR2,
    ismrInvalid2,
    ismrInvalid3,
    ismrInvalid1,
    checkMaterial,
    updateselectSystem,
    EcheckInputSystem,
    updateselectSystemE,

    updateTile,
    () => {}
);
</script>
<template>
    <div id="tile" class="flex flex-col w-full gap-2 shadow-lg shadow-cyan-800" style="margin-left: 10px">
        <label for="title" style="color: #122620; margin-left: 650px">Tile Adhesive Roof</label>

        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" @change="getdeckType" />
        </div>

        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="slope" style="color: #122620">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" placeholder="slope" v-model.number="dims.slope" :disabled="isDisabledslope" @change="validateRoofSlope" />
            <Message v-if="errorMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorMessage }}</Message>
        </div>

        <div></div>
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="area">Area of Tile</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>

        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="height" style="color: #122620">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="heightModel" type="text" placeholder="height" :disabled="isDisabled" @input="setRoofInputs" @change="validateHeight" />
            <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message>
        </div>
        <div></div>
        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label style="color: #122620" for="perimeter">Roof Permeter(a) = 4h</label>
            <InputText id="perimeter" v-model="dims.per" type="text" placeholder=" " @change="setRoofInputs" />
        </div>

        <div class="w-56 flex flex-col gap-2" style="margin-left: 50px">
            <label style="color: red">Select Exposure</label>
            <div class="flex items-center space-x-2">
                <div class="field-radiobutton space-x-4 space-y-4 gap-6">
                    <!-- variant="filled"  -->
                    <RadioButton inputId="option3" name="option" value="c" v-model="selectedExposures" @change="selectedExposure" style="margin-left: 5px" />
                    <label style="color: #122620; margin-left: 10px" for="option3">C</label>
                </div>
                <div class="field-radiobutton space-x-4 space-y-4 gap-6">
                    <!-- variant="filled" -->
                    <RadioButton inputId="option4" name="option" value="d" v-model="selectedExposures" @change="selectedExposure" style="margin-left: 20px" />

                    <label style="color: #122620; margin-left: 20px" for="option4">D</label>
                </div>
            </div>
        </div>
        <Divider />

        <div class="md:w-1/2 flex flex-col w-72 mb-4 mt-6 gap-3 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
            <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @change="pickUnderlayment" />
        </div>
        <!-- <Button label="Reset" severity="danger" @click="clearSelected" size="small"></Button> -->
        <DripEdAdTile />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <systemENumber @keydown.tab.exact.stop="sysEcheckInput" />
        </div>
        <div v-show="isSAValid" class="columns-2 flex flex-row w-64" style="margin-left: 2px">
            <systemFNumber @keydown.tab.exact.stop="checkInputSA" />
            <div class="w-128 gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 100px">
                <label style="color: #122620" for="material">S/A Expiration Date</label>
                <InputText v-model="saTiles.expiration_date" />
            </div>
        </div>

        <div v-show="isPaddyCategoryValid" class="w-56 flex flex-col gap-2" style="margin-left: 50px">
            <label style="color: red">Select a Paddy Category</label>
            <div class="flex items-center">
                <div class="field-radiobutton space-x-3 gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <RadioButton inputId="option1" name="options" value="single" variant="filled" v-model="selectedOption" @update="selectPaddy" />
                    <label style="color: #122620" for="option1">Single</label>
                </div>
                <div class="field-radiobutton space-x-3 gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <RadioButton inputId="option2" style="margin-left: 5px" name="options" value="double" variant="filled" v-model="selectedOption" @update="selectPaddy" />
                    <label style="color: #122620" for="option2">Double</label>
                </div>
            </div>
        </div>
        <Divider />
        <div v-show="isPaddyCategoryValid" class="w-96" style="margin-left: 3px">
            <tileNoaNumber ref="childQueryRef" v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out" @keydown.tab.exact.stop="grabInput" @change="grabInput" />
        </div>
    </div>

    <Divider />
    <Divider />

    <div class="md:w-full gap-4 mt-10 shadow-lg shadow-cyan-800" style="margin-left: 1px">
        <div v-show="isTileData" class="w-full flex flex-row space-x-10 space-y-1" style="margin-left: 20px">
            <div class="min-w-[450px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">Tile Applicant</label>
                <InputText id="manufacturer" v-model="tilenoas.manufacturer" />
            </div>

            <div v-show="isMultiTileValid" class="min-w-[550px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Tile Type</label>

                <Select v-model="selectedMulti" :options="tilenoas.select_tile" placeholder="make a selection" @click="checkInput" @change="updateTile" />
            </div>

            <div v-show="!isMultiTileValid" class="min-w-[770px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="description">Tile Description</label>
                <InputText id="description" v-model="tilenoas.description" />
            </div>
            <div v-show="isMultiTileValid" class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Tile Material</label>
                <Select v-model="selectedsysNoa" :options="tilenoas.material" placeholder="make a selection" @change="updateMF" />
            </div>
            <div v-show="!isMultiTileValid" class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Tile Material</label>
                <Select v-model="selectedsysNoa" :options="tilenoas.material" placeholder="make a selection" @click="checkMaterial" @change="updateMF" />
            </div>
        </div>
        <!-- !isMultiTileValid -->
        <div v-show="isTileData" class="w-64 flex flex-col mt-8 gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 20px">
            <label style="color: #122620" for="material">NOA Expiration Date</label>
            <InputText v-model="tilenoas.expiration_date" />
        </div>
        <div class="columns-3 flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                <div class="w-96 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="udlTile.manufacturer" />
                </div>
                <div class="flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="material">(UDL) Material</label>
                    <InputText id="material" v-model="udlTile.material" />
                </div>
                <div class="w-56 flex flex-col gap-1">
                    <label style="color: red">Select System E *</label>
                    <Select v-model="selectedsystemE" :options="udlTile.system" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" />
                </div>
                <div class="flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="designPressure">Design psf:</label>
                    <InputText id="designPressure" v-model="udlTile.designPressure" @change="updateselectSystemE" />
                </div>
            </div>
        </div>
        <div class="w-full flex flex-row space-x-36 space-y-8" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="break-after-column flex flex-row space-x-12 space-y-4" style="margin-left: 2px">
                <div class="min-w-[680px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" class="mt-3" for="anchor">Anchor Base Sheet</label>
                    <InputText id="anchor" v-model="udlTile.Anchor_Base_Sheet" @change="updateselectSystemE" />
                </div>
                <div class="min-w-[480px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udlTile.TileCap_Sheet_Description" @change="updateselectSystemE" />
                </div>
            </div>
        </div>

        <div class="gap-4 mt-10 space-x-10 space-y-6">
            <div v-show="isSAValid" class="flex flex-row gap-3 space-x-20" style="margin-left: 25px">
                <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="saTiles.manufacturer" />
                </div>
                <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="saTiles.material" />
                </div>

                <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: red">Select System F *</label>
                    <Select v-model="selectedsystemf" :options="saTiles.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                </div>

                <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="designpressure">Design psf:</label>
                    <InputText id="designpressure" v-model="saTiles.designpressure" />
                </div>
            </div>
            <div v-show="isSAValid" class="max-w-screen-lg flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 25px">
                <label style="color: #122620" for="sadescription">S/A Description</label>
                <InputText id="capsheetdescription" v-model="saTiles.description" />
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
                                            <td style="color: #122620">Zone 1:</td>
                                            <td style="color: #122620"><input v-model="zoneone.zone" readonly="" size="4" name="p1" value="" /> x λ &nbsp;</td>
                                            <td style="color: #122620"><input v-model="zoneone.lambda1" readonly="" size="4" name="lambda1" value="" /> - Mg:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zoneone.mg1" readonly="" size="4" name="mg1" value="" /> = Mr1:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zoneone.mr1" readonly="" size="4" name="mr1" value="" /> NOA Mf:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zoneone.mf1" readonly="false" size="6" name="mf1" value="" @change="updateMF" /> &nbsp;</td>
                                            <i class="pi pi-check" v-show="ismrValidMR1" style="color: green; font-size: 1.5rem" @change="updateMF"></i
                                            >&nbsp;
                                            <i class="pi pi-times" v-show="ismrInvalid1" style="color: red; font-size: 1.5rem" @change="checkMR1"></i
                                            >&nbsp;
                                        </tr>

                                        <tr>
                                            <td style="color: #122620">Zone 2:</td>
                                            <td style="color: #122620"><input v-model="zonetwo.zone" readonly="" size="4" name="p2" value="" /> x λ &nbsp;</td>
                                            <td style="color: #122620"><input v-model="zonetwo.lambda2" readonly="" size="4" name="lambda2" value="" /> - Mg:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zonetwo.mg2" readonly="" size="4" name="mg2" value="" /> = Mr2:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zonetwo.mr2" readonly="" size="4" name="mr2" value="" /> NOA Mf:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zonetwo.mf2" readonly="false" size="6" name="mf2" value="" @change="updateMF" />&nbsp;</td>
                                            <i class="pi pi-check" v-show="ismrValidMR2" style="color: green; font-size: 1.5rem" @change="updateMF"></i
                                            >&nbsp;
                                            <i class="pi pi-times" v-show="ismrInvalid2" style="color: red; font-size: 1.5rem" @change="checkMR2"></i
                                            >&nbsp;
                                        </tr>

                                        <tr>
                                            <td style="color: #122620">Zone 3:</td>
                                            <td style="color: #122620"><input v-model="zonethree.zone" readonly="" size="4" name="p3" value="" /> x λ</td>
                                            <td style="color: #122620"><input v-model="zonethree.lambda3" readonly="" size="4" name="lambda3" value="" /> - Mg:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zonethree.mg3" readonly="" size="4" name="mg5" value="" /> = Mr3:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zonethree.mr3" readonly="" size="4" name="mr3" value="" /> NOA Mf:&nbsp;</td>
                                            <td style="color: #122620"><input v-model="zonethree.mf3" readonly="false" size="6" name="mf3" value="" @change="updateMF" />&nbsp;</td>
                                            <i class="pi pi-check" v-show="ismrValidMR3" style="color: green; font-size: 1.5rem" @change="updateMF"></i
                                            >&nbsp;
                                            <i class="pi pi-times" v-show="ismrInvalid3" style="color: red; font-size: 1.5rem" @change="checkMR3"></i
                                            >&nbsp;
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
<style scoped>
.autocomplete {
    position: relative;
    width: 200px;
}

.suggestions {
    color: black;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    position: absolute;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background: white;
    z-index: 1000;
}

.suggestions li {
    padding: 8px;
    cursor: pointer;
}

.suggestions li:hover {
    background-color: #f0f0f0;
}
@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }

    100% {
        transform: translateY(0);
    }
}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
.p-inputtext {
    color: black;
}
</style>
