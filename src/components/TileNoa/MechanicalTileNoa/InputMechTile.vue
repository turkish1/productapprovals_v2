<script setup>
import DripEdgeComponent from '@/components/DripEdgeComponent.vue';
import systemENumber from '@/components/roofSystems/systemENumber.vue';
import systemFNumber from '@/components/roofSystems/systemFNumber.vue';

import useMechNumber from '@/composables/fetchTech/use-systemMechNumber';

import useMech from '@/composables/InputLogic/use-tileMechanical';
import useUDL from '@/composables/TileFunc/systemE';
import useExposurec from '@/composables/Tiletables/exposure_c';
import { useHeightValidation } from '@/composables/Validation/use-mechHeight';
import { useNumberValidation } from '@/composables/Validation/use-mechSlope';
import { useGlobalState } from '@/stores/exposurecStore';
import { useRoofListStore } from '@/stores/roofList';
import { usetilesysfStore } from '@/stores/tilesysfStore';
import { useToNumber } from '@vueuse/core';

import usemultiTile from '@/composables/businesslogic/use-multiTile';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const ftileStore = usetilesysfStore();
const { workoutData, multiTiles } = usemultiTile();
// Input query
const query = ref('');

// const paddySeleted = ref('');
// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);

const { callNumber, mechanicalStore } = useMechNumber();

const { takeMechInput, mechanicalData, mechStore } = useMech();
const { Edatamounted, etileStore } = useUDL();

const { zones } = useGlobalState();
const tilenoas = reactive({
    manufacturer: '',
    noa: '',
    material: '',
    description: '',
    Table2: [],
    Table3: [],
    expiration_date: '',
    resistance: [],
    selection: '',
    select_tile: [],
    tile_map: [],
    table2_map: [],
    two_ten_d_RS_Nails: null,
    one_number_eight_screw: null,
    two_number_eight_screw: null,
    mechanicaltilefastener: [],
    fastenerValues: []
});
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);

const mechanical = ref([]);

let heightModel = ref('');
const dims = reactive({
    area: '',
    per: '',
    height: '',
    slope: ''
});

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
const dimensions = computed(() => {
    setRoofInputs();
});

onMounted(() => {
    callNumber();
    mechanical.value = mechanicalStore.$state.tileMechInput[0].tileMechNumber;
});

onMounted(() => {
    roofList.value.forEach((item, index) => {
        if (item.item === 'Mechanical Fastened Tile') {
            dims.area = item.dim3;
        }
    });
});

let datamechnoas = ref(mechanicalData);
function grabInput() {
    console.log(query.value);
    console.log(datamechnoas);
    datamechnoas.value = query.value;
    console.log(query.value, datamechnoas.value);
    if (datamechnoas.value !== null) {
        // 18061905

        takeMechInput(datamechnoas.value);
    }
}
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    // if (!query.value) return [];

    return (suggestions.value = mechanical.value.noa.filter((item) => item.toString().includes(query.value)));
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
    Description_F8: '',
    Description_F9: '',
    Description_F10: '',
    Description_F11: '',
    Description_F12: '',
    arrDesignPressure: []
});

const udlTile = reactive({
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
    arrDesignPressure: []
});
let datamounted = ref(ftileStore.$state.tilefinput);

let datamountedsystemE = ref(etileStore.$state.tilesysEinput);
let datamountedMech = ref(mechStore.tilemech.value);

// Method to update the input field with selected suggestion
const selectSuggestion = (suggestion) => {
    query.value = suggestion;
    showSuggestions.value = false;
};

// Method to handle input change
const onInput = () => {
    showSuggestions.value = true;
};

// Method to hide suggestions when input loses focus (with a delay to allow clicking suggestions)
const hideSuggestions = () => {
    setTimeout(() => {
        showSuggestions.value = false;
    }, 200);
};
const selectedDeck = ref();
const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
const save = ref([]);

const tileSel = reactive({
    keys: '',
    values: []
});
const tileValue = reactive({
    k: '',
    v: []
});
watch(zoneone, selectedExposure, zonetwo, zonethree, dimensions, dims, () => {});
function checkTile() {
    zones.value.forEach((item, index) => {
        zoneone.zone = item[0];
        zonetwo.zone = item[1];
        zonethree.zone = item[2];
    });

    if (datamountedMech.value[0].Table2.content === 'multiple') {
        workoutData(datamountedMech);

        tilenoas.select_tile = multiTiles.select_tile;
    }

    //   if (datamountedMech.value[0].Table2.content === 'multiple' ) {
    //         isTileSelectionValid = true;
    //         showMaterialValid = true;
    //     } else {
    //         showMaterialValid = true;
    //         isTileValid = true;
    //     }
}

function updateTile(event) {
    console.log(event.value);
    console.log(multiTiles.table2_map);
    console.log(multiTiles.tile_map);

    let type = multiTiles.table2_map;

    const valMulti = Object.entries(type).map((obj) => {
        const key = obj[0];
        const value = obj[1];
        console.log(key);

        if (event.value === key) {
            // let sel = tilenoas.select_tile;
            tileSel.values = value[0];
            console.log(value[0], tileSel.values);
            zoneone.lambda1 = tileSel.values;
            zonetwo.lambda2 = tileSel.values;
            zonethree.lambda3 = tileSel.values;
            console.log(zoneone.lambda1);
        }
    });
    let types = multiTiles.tile_map;
    const valMultis = Object.entries(types).map((obj) => {
        const key = obj[0];
        const value = obj[1];
        console.log(key);
        if (event.value === key) {
            // let sel = tilenoas.select_tile;
            tileValue.v = value;
            console.log(tileValue.v);
        }
        const clampNumber1 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
        const slopeRange = clampNumber1(2, Number(dims.slope), 12);
        console.log(slopeRange);
        if (slopeRange <= slopeOptions.three) {
            zoneone.mg1 = tileValue.v[0];
            zonetwo.mg2 = tileValue.v[0];
            zonethree.mg3 = tileValue.v[0];
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

        zoneone.mr1 = computed(() => (result1.value - zoneone.mg1).toFixed(2));
        zonetwo.mr2 = computed(() => (result2.value - zonetwo.mg2).toFixed(2));
        zonethree.mr3 = computed(() => (result3.value - zonethree.mg3).toFixed(2));
    });
    tilenoas.mechanicaltilefastener = datamountedMech.value[0].mechanicaltilefastener;
    tilenoas.fastenerValues = datamountedMech.value[0].fastenerValues;
    checkMaterial();
}
function sysEcheckInput() {
    console.log(Edatamounted.value);
    if (Edatamounted.value.length !== null) {
        Edatamounted.value.forEach((item, index) => {
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
const selectedMechanical = ref(null);
const selectedsysNoa = ref(null);

const selectedsystemE = ref(null);
let isTileTypeValid = ref(false);
let isUDLValid = ref(false);
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

watchEffect(isTileValid, zoneone.mr1, zonetwo.mr2, zonethree.mr3, whatChanged, saTiles, setRoofInputs, checkData, () => {});

function checkData() {
    if (mechanicalData.Table3.two === 'N/A') {
        isDataValid.value = false;
    }
    if (mechanicalData.Table3.three === 'N/A') {
        isDataValid.value = false;
    }
    if (mechanicalData.Table3.four === 'N/A') {
        isDataValid.value = false;
    }
    if (mechanicalData.Table3.five === 'N/A') {
        isDataValid.value = false;
    }
    if (mechanicalData.Table3.six === 'N/A') {
        isDataValid.value = false;
    }
    if (mechanicalData.Table3.seven === 'N/A') {
        isDataValid.value = false;
    }
}

const visible = ref(false);

function checkInputSystem() {
    datamounted.value.forEach((item, index) => {
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
    datamountedsystemE.value.forEach((item, index) => {
        udlTile.Maps = item.systemDataE.Maps;

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
    });
}
function addFSystem() {
    saTiles.system = saTiles.system;
}

const resistanceCheck = ref(null);

const MF = computed(updateMF, () => {
    zoneone.mf1 = mfupdate.value;
    zonetwo.mf2 = mfupdate.value;
    zonethree.mf3 = mfupdate.value;
});

let isvalueValid = ref(false);

const { errorMessage, validateNumber } = useNumberValidation({
    min: 4,
    max: 12,
    required: true
});

const { errorHeightMessage, validateTileHeight } = useHeightValidation({
    min: 10,
    max: 40,
    required: true
});

function validateRoofSlope() {
    validateInput();
}
const validateInput = () => {
    validateNumber(dims.slope);
    console.log(errorMessage.value, dims.slope);
};

const validateHeightInput = () => {
    validateTileHeight(dims.height);
    console.log(errorHeightMessage.value, dims.height);
};

function addCheckmarks() {
    if (errorMessage.value === null || errorHeightMessage.value === null) {
        isvalueValid = true;
        console.log('Entered checkmarks');
    }
}
function validateHeight() {
    validateHeightInput();
    console.log(height.value);
}

const factor = ref(0.4);
const { getData } = useExposurec();
function setRoofInputs() {
    dims.height = heightModel.value;
    dims.per = (dims.height * factor.value).toFixed(2);
    addCheckmarks();
}

const selectedExposures = ref(null);
function selectedExposure() {
    console.log(selectedExposures.value);
}

function checkInputSA() {
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            console.log(item);
            saTiles.manufacturer = item.systemData.manufacturer;
            saTiles.material = item.systemData.material;
            saTiles.system = item.systemData.system;
        });
    }
}
let isTileSelectionValid = ref(false);
let showMaterialValid = ref(false);
function checkInput() {
    console.log(datamountedMech.value[0]);
    if (datamountedMech.value.length !== null) {
        getData(dims.slope, dims.height);
        console.log(datamechnoas.value, datamountedMech);
        tilenoas.manufacturer = datamountedMech.value[0].manufacturer;
        tilenoas.description = datamountedMech.value[0].description;
        tilenoas.material = datamountedMech.value[0].material;

        if (datamountedMech.value[0].Table2.content === 'multiple') {
            isTileSelectionValid = true;
            showMaterialValid = true;
        } else {
            showMaterialValid = true;
            isTileValid = true;
        }
    }
}
let ismrValidMR1 = ref(false);
let ismrValidMR2 = ref(false);
let ismrValidMR3 = ref(false);
let ismrInvalid1 = ref(false);
let ismrInvalid2 = ref(false);
let ismrInvalid3 = ref(false);
function checkMaterial() {
    if (datamountedMech.value[0].Table2.content === 'multiple') {
        checkTile();
    } else {
        zones.value.forEach((item, index) => {
            zoneone.zone = item[0];
            zonetwo.zone = item[1];
            zonethree.zone = item[2];
        });

        tilenoas.mechanicaltilefastener = datamountedMech.value[0].mechanicaltilefastener;
        tilenoas.fastenerValues = datamountedMech.value[0].fastenerValues;
        zoneone.lambda1 = datamountedMech.value[0].Table2.Direct_Deck;
        zonetwo.lambda2 = datamountedMech.value[0].Table2.Direct_Deck;
        zonethree.lambda3 = datamountedMech.value[0].Table2.Direct_Deck;
        const clampNumber1 = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
        const slopeRange = clampNumber1(2, Number(dims.slope), 12);
        console.log(slopeRange);
        if (slopeRange <= slopeOptions.three) {
            console.log('Is Less then three');

            zoneone.mg1 = datamountedMech.value[0].Table3.two;
            zonetwo.mg2 = datamountedMech.value[0].Table3.two;
            zonethree.mg3 = datamountedMech.value[0].Table3.two;
            console.log(zonethree.mg3);
        } else if (slopeRange === slopeOptions.three || slopeRange < slopeOptions.four) {
            console.log('Is Less than four but equal to or higher than three', mechanicalData.Table3.three);

            zoneone.mg1 = datamountedMech.value[0].Table3.three;
            zonetwo.mg2 = datamountedMech.value[0].Table3.three;
            zonethree.mg3 = datamountedMech.value[0].Table3.three;
            console.log(zonethree.mg3);
        } else if (slopeRange < slopeOptions.five || slopeRange === slopeOptions.four) {
            console.log('Is Less');
            zoneone.mg1 = datamountedMech.value[0].Table3.four;
            zonetwo.mg2 = datamountedMech.value[0].Table3.four;
            zonethree.mg3 = datamountedMech.value[0].Table3.four;
        } else if (slopeRange === slopeOptions.five || slopeRange < slopeOptions.six) {
            console.log('Is Less');
            zoneone.mg1 = datamountedMech.value[0].Table3.five;
            zonetwo.mg2 = datamountedMech.value[0].Table3.five;
            zonethree.mg3 = datamountedMech.value[0].Table3.five;
            console.log(zonethree.mg3);
        } else if (slopeRange == slopeOptions.six || slopeRange < slopeOptions.seven) {
            zoneone.mg1 = datamountedMech.value[0].Table3.six;
            zonetwo.mg2 = datamountedMech.value[0].Table3.six;
            zonethree.mg3 = datamountedMech.value[0].Table3.six;
        } else if (slopeRange >= slopeOptions.seven) {
            console.log('Is Less');
            zoneone.mg1 = datamountedMech.value[0].Table3.seven;
            zonetwo.mg2 = datamountedMech.value[0].Table3.seven;
            zonethree.mg3 = datamountedMech.value[0].Table3.seven;
            console.log(zonethree.mg3);
        }

        const result1 = computed(() => zoneone.zone * zoneone.lambda1);

        const result2 = computed(() => zonetwo.zone * zonetwo.lambda2);

        const result3 = computed(() => zonethree.zone * zonethree.lambda3);

        zoneone.mr1 = computed(() => (result1.value - zoneone.mg1).toFixed(2));
        zonetwo.mr2 = computed(() => (result2.value - zonetwo.mg2).toFixed(2));
        zonethree.mr3 = computed(() => (result3.value - zonethree.mg3).toFixed(2));
    }
}
const maps = ref([]);
const vals = ref([]);
const v0 = ref(null);
const mfupdate = ref();

function updateMF(event) {
    console.log(event.value);

    let mat = tilenoas.fastenerValues;

    console.log(mat);

    resistanceCheck.value = Object.entries(mat).map((obj) => {
        const k = obj[0];
        const v = obj[1];

        maps.value.push(k);
        vals.value.push(v);
        console.log(v, k);

        console.log(vals.value[0], vals.value[1]);
    });
    for (let i = 0; i < maps.value.length; i++) {
        console.log(vals.value[i]);
        mfupdate.value = vals.value[i];
        if (maps.value[i] === event.value) {
            zoneone.mf1 = vals.value[i];
            zonetwo.mf2 = vals.value[i];
            zonethree.mf3 = vals.value[i];
        }

        const mfcheck1 = zoneone.mf1;

        const mfcheck2 = zonetwo.mf2;
        const mfcheck3 = zonethree.mf3;
        const mfc1 = useToNumber(mfcheck1);
        const mfc2 = useToNumber(mfcheck2);
        const mfc3 = useToNumber(mfcheck3);
        console.log(mfc1.value, mfc2.value, mfc3.value);
        console.log(typeof mfc1.value, typeof mfc2.value, typeof mfc3.value);
        const convertmr1 = useToNumber(zoneone.mr1);
        const convertmr2 = useToNumber(zonetwo.mr2);
        const convertmr3 = useToNumber(zonethree.mr3);

        if (convertmr3.value < mfc3.value) {
            console.log('I am less than MF3', convertmr3.value, mfc3.value);
            ismrValidMR3 = true;
            ismrInvalid3 = false;
            console.log(ismrValidMR3.value);
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
}

function checkMR1() {
    const mfcheck1 = zoneone.mf1;
    console.log(zoneone.mf1);
    const mfc1 = useToNumber(mfcheck1);

    const convertmr1 = useToNumber(zoneone.mr1);

    if (convertmr1.value > mfc1.value) {
        console.log('I am greater than MF1');
        ismrInvalid1 = true;
        ismrValidMR1 = false;
    }
}

function checkMR2() {
    const mfcheck2 = zonetwo.mf2;
    const mfc2 = useToNumber(mfcheck2);

    const convertmr2 = useToNumber(zonetwo.mr2);
    if (convertmr2.value > mfc2.value) {
        console.log('I am greater than MF2');
        ismrInvalid2 = true;
        ismrValidMR2 = false;
    }
}

function checkMR3() {
    const mfcheck3 = zonethree.mf3;
    const mfc3 = useToNumber(mfcheck3);

    const convertmr3 = useToNumber(zonethree.mr3);

    if (convertmr3.value > mfc3.value) {
        console.log('I am greater than MF3', convertmr3.value, mfc3.value);
        ismrInvalid3 = true;
        ismrValidMR3 = false;
    }
}
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
        console.log(udlTile.TileCap_Sheet_Description_E2, keyValueSystemEPairsValues.value.E2, Anchor_Base.Anchor_Base_Sheet_E2);
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
}
// function callReset() {
//     resetSingle();
// }

watch(checkInputSystem, MF, validateRoofSlope, ismrValidMR3, ismrValidMR1, ismrValidMR2, ismrInvalid2, ismrInvalid3, ismrInvalid1, checkMaterial, updateselectSystem, EcheckInputSystem, updateselectSystemE, checkMaterial, () => {});
</script>
<template>
    <div id="tile" class="flex flex-col w-full gap-2 shadow-lg shadow-cyan-800" style="margin-left: 10px; background-color: #eae7e2">
        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" />
        </div>

        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="slope">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" placeholder="slope" v-model.number="dims.slope" @change="validateRoofSlope" />
            <Message v-if="errorMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorMessage }}</Message>
        </div>

        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="height">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="heightModel" type="text" placeholder="height" @input="setRoofInputs" @change="validateHeight" />
            <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message>
        </div>
        <div></div>
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="area">Area of Tile</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>

        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label for="perimeter">Roof Permeter(a) = 4h</label>
            <InputText id="perimeter" v-model="dims.per" type="text" placeholder=" " @change="setRoofInputs" />
        </div>
        <div class="card md:w-3/4 flex flex-col w-96 mb-4 gap-2" style="margin-left: 1px; background-color: #eae7e2">
            <label for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
            <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @change="checkInputSystem" />
        </div>
        <DripEdgeComponent />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <systemENumber @keydown.tab.exact.stop="sysEcheckInput" />
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <systemFNumber @keydown.tab.exact.stop="checkInputSA" />
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
        </div>

        <div v-show="isTileValid" class="w-128" style="margin-left: 3px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <div class="autocomplete">
                    <div class="w-96 gap-2 mt-3 space-y-2 mb-4" style="margin-left: 20px">
                        <FloatLabel>
                            <InputText
                                id="tilenoa"
                                v-tooltip.bottom="'Press Tab after value'"
                                v-model="query"
                                inputId="ac"
                                @focus="showSuggestions = true"
                                @blur="hideSuggestions"
                                @input="onInput"
                                @click="grabInput"
                                @keydown.tab.exact.stop="checkInput"
                            />
                            <label for="ac">Tile NOA: 00000000</label>
                        </FloatLabel>
                    </div>
                    <!-- Suggestions list -->
                    <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
                        <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @mousedown="selectSuggestion(suggestion)">
                            {{ suggestion }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <Divider />
    <Divider />

    <div class="card md:w-full gap-4 mt-10 bg-white shadow-lg shadow-cyan-800" style="margin-left: 5px; background-color: #eae7e2">
        <div class="columns-3 flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                <div class="w-96 flex flex-col gap-2">
                    <label for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="udlTile.manufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="material">(UDL) Material</label>
                    <InputText id="material" v-model="udlTile.material" />
                </div>

                <div class="w-56 flex flex-col gap-1">
                    <label style="color: red">Select System E *</label>
                    <!-- @click="checkInputSystem" @change="updateselectSystem" -->
                    <Select v-model="selectedsystemE" :options="udlTile.system" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="designPressure">Design psf:</label>
                    <InputText id="designPressure" v-model="udlTile.designPressure" @change="updateselectSystemE" />
                </div>
            </div>
        </div>
        <div class="w-full flex flex-row space-x-36 space-y-8" style="margin-left: 2px; background-color: #eae7e2">
            <div v-show="isUDLNOAValid" class="break-after-column flex flex-row space-x-12 space-y-4" style="margin-left: 2px">
                <div class="min-w-[680px] flex flex-col gap-2">
                    <label class="mt-3" for="anchor">Anchor Base Sheet</label>
                    <InputText id="anchor" v-model="udlTile.Anchor_Base_Sheet" @change="updateselectSystemE" />
                    <!-- @click="EcheckInputSystem" -->
                </div>
                <div class="min-w-[480px] flex flex-col gap-2">
                    <label for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udlTile.TileCap_Sheet_Description" @change="updateselectSystemE" />
                </div>
            </div>
        </div>

        <div class="card gap-4 mt-10 space-x-10 space-y-6" style="background-color: #eae7e2">
            <div v-show="isSAValid" class="flex flex-row gap-3 space-x-20">
                <div class="w-128 flex flex-col gap-2">
                    <label for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="saTiles.manufacturer" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="saTiles.material" />
                </div>

                <div class="w-72 flex flex-col gap-2">
                    <label style="color: red">Select System F *</label>
                    <!-- @click="checkInputSystem" @change="updateselectSystem" -->
                    <Select v-model="selectedsystemf" :options="saTiles.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                </div>

                <div class="w-72 flex flex-col gap-2">
                    <label for="designpressure">Design psf:</label>
                    <InputText id="designpressure" v-model="saTiles.designpressure" />
                </div>
            </div>
            <div v-show="isSAValid" class="max-w-screen-lg gap-2 flex flex-col gap-2">
                <label for="sadescription">S/A Description</label>
                <InputText id="capsheetdescription" v-model="saTiles.description" />
            </div>
        </div>

        <div v-show="isTileValid" class="w-full flex flex-row mt-8 space-x-10" style="margin-left: 1px; background-color: #eae7e2">
            <div class="min-w-[450px] flex flex-col gap-2">
                <label for="manufacturer">Tile Applicant</label>
                <InputText id="manufacturer" v-model="tilenoas.manufacturer" />
            </div>
            <div class="w-128 flex flex-col gap-2">
                <label for="material">Tile Adhesive Material</label>
                <!-- <Select v-model="selectedsysNoa" :options="tilenoas.material" placeholder="make a selection" @click="checkMaterial" @change="updateMF" /> -->
                <InputText id="description" v-model="tilenoas.material" />
            </div>
            <div class="min-w-[700px] flex flex-col gap-2">
                <label for="material">Tile Description</label>
                <InputText id="description" v-model="tilenoas.description" />
            </div>
        </div>
        <div v-show="isTileValid" class="w-full flex flex-row mt-8 space-x-10" style="background-color: #eae7e2">
            <div v-show="isTileSelectionValid" class="min-w-[500px] flex flex-col gap-2">
                <label for="selecttile">Tile Type</label>
                <Select v-model="selectedMulti" :options="tilenoas.select_tile" placeholder="make a selection" @click="checkTile" @change="updateTile" />
            </div>
            <div class="w-72 flex flex-col gap-2">
                <label style="color: red">Select Mechanical Tile Fastnener *</label>
                <!-- @click="checkInputSystem" @change="updateselectSystem" -->
                <Select v-model="selectedMechanical" :options="tilenoas.mechanicaltilefastener" @click="checkMaterial" @change="updateMF" />
            </div>
        </div>

        <div class="flex flex-wrap gap-1 mt-10" style="margin-left: 6px; background-color: #eae7e2">
            <div class="lg:w-full min-h-[10px] flex flex-row gap-18" style="margin-left: 10px; background-color: #eae7e2">
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
                                            <td><input v-model="zoneone.mf1" readonly="false" size="6" name="mf1" value="" @change="updateMF" /> &nbsp;</td>
                                            <i class="pi pi-check" v-show="ismrValidMR1" style="color: green; font-size: 1.5rem" @change="updateMF"></i
                                            >&nbsp;
                                            <i class="pi pi-times" v-show="ismrInvalid1" style="color: red; font-size: 1.5rem" @change="checkMR1"></i
                                            >&nbsp;
                                        </tr>

                                        <tr>
                                            <td>Zone 2:</td>
                                            <td><input v-model="zonetwo.zone" readonly="" size="4" name="p2" value="" /> x λ &nbsp;</td>
                                            <td><input v-model="zonetwo.lambda2" readonly="" size="4" name="lambda2" value="" /> - Mg:&nbsp;</td>
                                            <td><input v-model="zonetwo.mg2" readonly="" size="4" name="mg2" value="" /> = Mr2:&nbsp;</td>
                                            <td><input v-model="zonetwo.mr2" readonly="" size="4" name="mr2" value="" /> NOA Mf:&nbsp;</td>
                                            <td><input v-model="zonetwo.mf2" readonly="false" size="6" name="mf2" value="" @change="updateMF" />&nbsp;</td>
                                            <i class="pi pi-check" v-show="ismrValidMR2" style="color: green; font-size: 1.5rem" @change="updateMF"></i
                                            >&nbsp;
                                            <i class="pi pi-times" v-show="ismrInvalid2" style="color: red; font-size: 1.5rem" @change="checkMR2"></i
                                            >&nbsp;
                                        </tr>

                                        <tr>
                                            <td>Zone 3:</td>
                                            <td><input v-model="zonethree.zone" readonly="" size="4" name="p3" value="" /> x λ</td>
                                            <td><input v-model="zonethree.lambda3" readonly="" size="4" name="lambda3" value="" /> - Mg:&nbsp;</td>
                                            <td><input v-model="zonethree.mg3" readonly="" size="4" name="mg5" value="" /> = Mr3:&nbsp;</td>
                                            <td><input v-model="zonethree.mr3" readonly="" size="4" name="mr3" value="" /> NOA Mf:&nbsp;</td>
                                            <td><input v-model="zonethree.mf3" readonly="false" size="6" name="mf3" value="" @change="updateMF" />&nbsp;</td>
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

/* input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
} */

.suggestions {
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
</style>
