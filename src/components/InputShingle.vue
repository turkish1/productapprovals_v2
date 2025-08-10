<script setup>
import DripEdShingle from '@/components/DripEdgeChildren/DripEdShingle.vue';
import Buttons from '@/components/Features/Buttons.vue';
import ModalWindow from '@/components/Modal/ModalWindow.vue';
import AutoComplete from '@/components/roofSystems/AutoComplete.vue';
import usePostShingleToLambda from '@/composables/Postdata/usePostShingleLambda';
import { useShingleHghtValidation } from '@/composables/Validation/use-shHeight';
import { useShingleValidation } from '@/composables/Validation/use-shSlope';
import useInputs from '@/composables/use-Inputs';
import useSystemf from '@/composables/use-Inputsystemf';
import useSlope from '@/composables/use-updateSlope';
import { usePolyStore } from '@/stores/polyStore';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import { computed, isProxy, nextTick, onMounted, reactive, ref, toRaw, unref, watch, watchEffect } from 'vue';
import AutoCompletePoly from './roofSystems/AutoCompletePoly.vue';
import AutoCompleteSA from './roofSystems/AutoCompleteSA.vue';

const { postShingle, postUDLshingle, postSAshingle } = usePostShingleToLambda();
// watch(tab, (v) => {
//     if (v) checkInput();
//     console.log('tab has been pressed');
// });

// watchEffect(() => {
//     if (tab.value) console.log('Tab  have been pressed');
// });

const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();

const polyStore = usePolyStore();
const store = useShingleStore();
const usesystemfStore = useSystemf();
const { inputshingle } = storeToRefs(store);
const { systeminput } = storeToRefs(usesystemfStore);
// const evaluating = ref(false);
const { polyinput } = storeToRefs(polyStore);

const shingles = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    description: '',
    slope: 0,
    height: 0,
    deckType: '',
    expiration_date: '',
    prescriptiveSelection: '',
    shingleIdentifier: 'shingle'
});

const underlayment = reactive({
    udlnoa: '',
    udlmanufacturer: '',
    udlmaterial: '',
    udldescription: '',
    udlIdentifier: 'udl'
});

const selfadhered = reactive({
    sanoa: '',
    samanufacturer: '',
    samaterial: '',
    sadescription: '',
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
    system: '',
    selfadIdentifier: 'sa',
    systemCheck: '',
    maps: [],
    arrSystem: []
});

let datamounted = ref(inputshingle._object.inputshingle);
const modalSAIsActive = ref(false);
const modalUDLIsActive = ref(false);
const modalIsActive = ref(false);

let polydatamt = ref(polyinput._object.polyinput);
let systemdatamt = ref(usesystemfStore.store.$state.systeminput);
// let roofArea = ref(roofList._object.roofList);
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isShingleValid = ref(false);
let isSelectVisible1 = ref(false);
let isSelectVisible2 = ref(false);
let isSlopeValid = ref(true);
let slope = ref(null);
let data = ref();
const isHeightValid = ref(false);

let datasbs = ref();
let datapoly = ref();
let udlInput = ref(null);

let noaInput = ref(null);

const dims = reactive({
    area: '',
    height: '',
    slope: '',
    decktype: ''
});
const dt = ref('');

const isDisabledslope = ref(true);
const isDisabled = ref(true);
function getdeckType(event) {
    console.log(selectedDeck._value.name, event.value.name);
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        isDisabledslope.value = false;
        console.log(dt.value);
    }
}

const selectedsystemf = ref(null);
const systemtype = ref(selfadhered.system);

let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedSlopehigh = ref();
const selectedSlopelow = ref();
const selectedDeck = ref();

const desc = ref(false);
const { inputsystem } = useSystemf();

const type = ref([{ name: ' - Select Deck Type - ' }, { name: ' 5/8" Plywood ' }, { name: ' 3/4" Plywood ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G ' }, { name: ' Existing 1/2" Plywood ' }]);

const whatChanged = computed(() => {
    checkInput();
    clearSelected();
    validateRoofSlope();
    addCheckmarks();

    onKeydown();
    validateHeight();
    // checkInputPoly();
});

async function checkInputPoly() {
    console.log(polydatamt.value);
    // if (polydatamt.value.length !== null) {
    polydatamt.value.forEach((item, index) => {
        underlayment.udlnoa = item.polyData.noa;
        underlayment.udlmanufacturer = item.polyData.applicant;
        underlayment.udlmaterial = item.polyData.material;
        underlayment.udldescription = item.polyData.description;
    });
    // }
}

async function checkInputSystem() {
    systemdatamt.value.forEach((item, index) => {
        // console.log(item.systemData);
        selfadhered.sanoa = item.systemData.noa;
        selfadhered.samanufacturer = item.systemData.manufacturer;
        selfadhered.samaterial = item.systemData.material;
        selfadhered.Description_F1 = item.systemData.Description_F1;
        selfadhered.Description_F2 = item.systemData.Description_F2;
        selfadhered.Description_F3 = item.systemData.Description_F3;
        selfadhered.Description_F4 = item.systemData.Description_F4;
        selfadhered.Description_F5 = item.systemData.Description_F5;
        selfadhered.Description_F6 = item.systemData.Description_F6;
        selfadhered.Description_F7 = item.systemData.Description_F7;
        selfadhered.Description_F8 = item.systemData.Description_F8;
        selfadhered.Description_F9 = item.systemData.Description_F9;
        selfadhered.Description_F10 = item.systemData.Description_F10;
        selfadhered.Description_F11 = item.systemData.Description_F11;
        selfadhered.arrSystem = item.systemData.arraySystem;
        selfadhered.system = item.systemData.system;
    });
}
function updateselectSystem(selectedsystemf) {
    const value = selectedsystemf.value;
    console.log(value);
    console.log(usesystemfStore.store.$state.systeminput);

    const descriptionMap = {
        F1: selfadhered.Description_F1,
        F2: selfadhered.Description_F2,
        F3: selfadhered.Description_F3,
        F4: selfadhered.Description_F4,
        F5: selfadhered.Description_F5,
        F6: selfadhered.Description_F6,
        F7: selfadhered.Description_F7,
        F8: selfadhered.Description_F8,
        F9: selfadhered.Description_F9,
        F10: selfadhered.Description_F10,
        F11: selfadhered.Description_F11,
        E4: selfadhered.Description_F4,
        E5: selfadhered.Description_F5,
        E6: selfadhered.Description_F6
    };
    console.log();
    const description = descriptionMap[value] ?? '';
    selfadhered.sadescription = description;

    const systemInput = usesystemfStore.store.$state.systeminput;
    systemInput.pdfSystemValue = value;
    systemInput.description = description;

    // shingleSAStaging();
}

async function checkInput() {
    console.log('Entered CheckInput');
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            shingles.noa = item.shingleData.noa;
            shingles.manufacturer = item.shingleData.applicant;
            shingles.material = item.shingleData.material;
            shingles.description = item.shingleData.description;
            shingles.expiration_date = item.shingleData.expiration_date;
            inputshingle.value[0].shingleData.slope = slope.value;
            inputshingle.value[0].shingleData.height = dims.height;
            inputshingle.value[0].shingleData.deckType = dt.value;
            inputshingle.value[0].shingleData.prescriptiveSelection = selectedSlopelow.value;
            console.log(datamounted.value);
        });
    }
}
onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Asphalt Shingle') {
            console.log(item.dim1);
            dims.area = item.dim1;
        }
    });
});

const udlData = reactive({
    udlmanufacturer: '',
    udlnoa: '',
    udlmaterial: '',
    udldescription: '',
    udlIdentifier: 'udl'
});

const shingleUdlStaging = async () => {
    udlData.udlmanufacturer = underlayment.udlmanufacturer;
    udlData.udlnoa = underlayment.udlnoa;
    udlData.udlmaterial = underlayment.udlmaterial;
    udlData.udldescription = underlayment.udldescription;
    // shingles.prescriptiveSelection = inputshingle.value[0]?.shingleData?.prescriptiveSelection;

    await postUDLshingle(udlData);
};

const saData = reactive({
    samanufacturer: '',
    sanoa: '',
    samaterial: '',
    sadescription: '',
    sasystem: '',
    saIdentifier: 'sa'
});
const shingleSAStaging = async () => {
    console.log(selfadhered.sadescription);
    saData.samanufacturer = selfadhered.samanufacturer;
    saData.sanoa = selfadhered.sanoa;
    saData.samaterial = selfadhered.samaterial;
    saData.sasystem = usesystemfStore.store.$state.systeminput.pdfSystemValue;
    saData.sadescription = selfadhered.sadescription;

    await postSAshingle(saData);
};

watch(slope, (newVal, oldVal) => {
    console.log('Slope change from', oldVal, 'to', typeof newVal);
    validateInput(newVal);
});
let isvalueValid = ref(false);

const { errorshingleMessage, validateShingleSlope } = useShingleValidation({
    min: 2,
    max: 12,
    required: true
});

const { errorshHeightMessage, validateShingleHeight } = useShingleHghtValidation({
    min: 10,
    max: 30,
    required: true
});

function validateRoofSlope() {
    validateInput();
    if (dims.slope >= 2) {
        isDisabled.value = false;
        addCheckmarks();
        console.log('entered slope');
    } else {
        isDisabled.value = false;
    }
    addCheckmarks();
}
const validateInput = () => {
    validateShingleSlope(slope.value);

    // shingleData.slope = slope.value;
};

const validateshHeightInput = () => {
    validateShingleHeight(dims.height);
    isHeightValid.value = true;
    addCheckmarks();
};

function validateHeight() {
    validateshHeightInput();
    addCheckmarks();
}
// function addCheckmarks() {
//     if (errorshingleMessage.value === null || errorshHeightMessage.value === null) {
//         isvalueValid = true;
//         console.log('Entered checkmarks');
//     }
// }

function addCheckmarks() {
    if (isHeightValid.value || isDisabledslope.value) {
        isvalueValid.value = true;
        console.log('Entered checkmarks');
    } else {
        isvalueValid.value = false;
    }
}
const postMetrics = reactive({
    slope: '',
    height: '',
    area: '',
    decktype: '',
    prescriptiveSelection: '',
    manufacturer: '',
    noa: '',
    material: '',
    description: '',
    shingleIdentifier: 'shingle'
});
let isPrescriptivehigh = ref(false);

function getIndexs() {
    const low = selectedSlopelow.value;
    const high = selectedSlopehigh.value;

    if (selectedSlopelow._rawValue === null) {
        console.log('Not Mounted');
        return;
    }

    const conditions = [
        {
            match: ['2 Plies # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c', '1 Ply # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c'],
            set: {
                isUDLNOAValid: false,
                isSAValid: false,
                isShingleValid: true
            }
        },
        {
            match: ['2 Plies Poly with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c', '1 Ply Poly with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c'],
            set: {
                isUDLNOAValid: true,
                isSAValid: false,
                isShingleValid: true
            }
        },
        {
            match: ['(S/A) membrane adhered directly to a wood deck, per the NOA system F'],
            set: {
                isUDLNOAValid: false,
                isSAValid: true,
                isShingleValid: true
            }
        }
    ];

    for (const { match, set } of conditions) {
        if (match.includes(low) || match.includes(high)) {
            console.log(match.includes(low), match.includes(high));
            isUDLNOAValid = set.isUDLNOAValid;
            isSAValid = set.isSAValid;
            isShingleValid = set.isShingleValid;
            break;
        }
    }

    console.log(selectedSlopelow.value, selectedSlopehigh.value);
}

const shingleMetrics = async () => {
    postMetrics.noa = shingles.noa;
    postMetrics.manufacturer = shingles.manufacturer;
    postMetrics.material = shingles.material;
    postMetrics.description = shingles.description;
    postMetrics.slope = slope.value;
    postMetrics.height = dims.height;
    postMetrics.area = dims.area;
    postMetrics.decktype = dt.value;
    postMetrics.shingleIdentifier = shingles.shingleIdentifier;
    postMetrics.prescriptiveSelection = isPrescriptivehigh === true ? selectedSlopehigh.value : selectedSlopelow.value;
    await postShingle(postMetrics);
};

function valueEntered() {
    if (slope.value) {
        let slopeNumber = Number(slope.value);
        if (slopeNumber < 2) {
            isSlopeValid = false;
        }
        if (slopeNumber >= 2 && slopeNumber <= 4) {
            isSlopeValid = true;
            isSlopeLessFour.value = true;
            isSelectVisible1 = true;
            isSelectVisible2 = false;
            isDisabled.value = false;
        }
        if (slopeNumber > 4 && slopeNumber <= 12) {
            isSlopeValid = true;
            isSlopeMoreFour.value = true;
            isSelectVisible2 = true;
            isPrescriptivehigh = true;
            isSelectVisible1 = false;
        }

        if (slope.value === '') {
            isSlopeValid.value = false;
            isSlopeLessFour.value = false;
            isSlopeMoreFour.value = false;
        }
    } else {
        console.log('Not Mounted');
    }
}

const showModalUDL = ref(false);
const modalKeyUDL = ref(0);
const currentShingleUDl = ref(null);

const showModal = ref(false);
const modalKey = ref(0);
const showModalSA = ref(false);
const modalKeySA = ref(0);
const currentShingle = ref(null);

const currentShingleSA = ref(null);
// optional: your reactive parent form state
// const shingles = reactive({ manufacturer:'', material:'', description:'' })

function toPlain(v) {
    const x = unref(v);
    console.log(x);
    return isProxy(x) ? toRaw(x) : x;
}
function toPlainUDL(v) {
    const x = unref(v);
    console.log(x);

    return isProxy(x) ? toRaw(x) : x;
}

function toPlainSA(v) {
    const x = unref(v);
    console.log(x);

    return isProxy(x) ? toRaw(x) : x;
}

async function onOpenShingleClick() {
    // If you have a selected row/object, pass it here:
    // const selected = mySelectedRow.value
    // Otherwise, use whatever source `checkInput()` prepared.
    await nextTick();

    // 1) run any prep that fills data (but make sure it doesn’t mutate during open)
    await checkInput();

    // 2) build a plain POJO snapshot with just the fields you need
    const src = toPlain(/* selected or shingles or wherever your data lives */ shingles);
    console.log(src);
    currentShingle.value = {
        manufacturer: src?.manufacturer ?? '',
        material: src?.material ?? '',
        description: src?.description ?? ''
    };

    // 3) bump key BEFORE show if you want a hard reset
    modalKey.value++;

    // 4) wait a tick so Vue sees the new props, THEN show the modal
    await nextTick();
    modalIsActive.value = true;
}

async function onOpenShingleUDLClick() {
    // If you have a selected row/object, pass it here:
    // const selected = mySelectedRow.value
    // Otherwise, use whatever source `checkInput()` prepared.
    await nextTick();

    // 1) run any prep that fills data (but make sure it doesn’t mutate during open)
    await checkInputPoly();

    // 2) build a plain POJO snapshot with just the fields you need
    const src = toPlainUDL(/* selected or shingles or wherever your data lives */ udlData);
    currentShingleUDl.value = {
        udlmanufacturer: src?.udlmanufacturer ?? '',
        udlmaterial: src?.udlmaterial ?? '',
        udldescription: src?.udldescription ?? ''
    };

    // 3) bump key BEFORE show if you want a hard reset
    modalKeyUDL.value++;

    // 4) wait a tick so Vue sees the new props, THEN show the modal
    await nextTick();
    modalKeyUDL.value++; // optional: bump key to force remount
    modalUDLIsActive.value = true;
}

async function onOpenShingleSAClick() {
    // If you have a selected row/object, pass it here:
    // const selected = mySelectedRow.value
    // Otherwise, use whatever source `checkInput()` prepared.
    await nextTick();

    // 1) run any prep that fills data (but make sure it doesn’t mutate during open)
    await checkInputSystem();

    // 2) build a plain POJO snapshot with just the fields you need
    const src = toPlainSA(/* selected or shingles or wherever your data lives */ selfadhered);
    currentShingleSA.value = {
        samanufacturer: src?.samanufacturer ?? '',
        samaterial: src?.samaterial ?? '',
        sasystem: src?.sasystem ?? ''
    };

    modalKeySA.value++;

    // 4) wait a tick so Vue sees the new props, THEN show the modal
    await nextTick();
    modalSAIsActive.value = true;
}

watchEffect(selectedsystemf, errorshHeightMessage, errorshingleMessage, whatChanged, slopetypeless, slopetypemore, udlInput, getIndexs, selectedSlopelow, selectedSlopehigh, () => {});

watch(
    checkInputSystem,
    // updateselectSystem,
    valueEntered,
    noaInput,
    whatChanged,
    udlInput,
    useInputs,
    inputshingle,
    inputsystem,
    datamounted,
    data,
    datasbs,
    datapoly,
    checkInputPoly,

    () => {}
);
</script>
<template>
    <div id="shingle" class="inner mx-auto max-w-5xl p-6 dark:bg-gray-800 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6" style="margin-left: 300px; border-radius: 5px">
        <div class="w-64 flex flex-col gap-2">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full mt-5 md:w-56" @change="getdeckType" style="margin-left: 20px" />
        </div>
        <div class="w-64 mt-1 space-y-1" style="margin-left: 10px">
            <label for="slope" style="color: red">Roof Slope *</label><i class="pi pi-check" v-show="isvalueValid" style="margin-left: 10px; color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;

            <InputText id="slope" v-model.number="slope" type="text" placeholder="slope" :invalid="slope === null" :disabled="isDisabledslope" @input="valueEntered" @change="validateRoofSlope" />
            <Message v-if="errorshingleMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorshingleMessage }}</Message>
        </div>
        <div class="w-64 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600 mt-3 mb-8" style="margin-left: 20px">
            <label style="color: #122620" for="area">Area</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>
        <div class="w-64 mt-1 space-y-1" style="margin-left: 10px">
            <label for="height" style="color: red">Height *</label><i class="pi pi-check" v-show="isvalueValid" style="margin-left: 10px; color: green; font-size: 1rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-model.number="dims.height" type="text" placeholder="height" :invalid="height === null" :disabled="isDisabled" @change="validateHeight" />
            <Message v-if="errorshHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorshHeightMessage }}</Message>
        </div>

        <div v-show="isShingleValid" class="w-96" style="margin-left: 2px; margin-top: 4px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <AutoComplete />
                <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleClick" style="margin-left: 15px" />
            </div>
        </div>
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <AutoCompletePoly />
                <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleUDLClick" style="margin-left: 15px" />
            </div>
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <AutoCompleteSA />
                <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleSAClick" style="margin-left: 30px" />
            </div>
        </div>
    </div>

    <div v-show="isSelectVisible2" class="md:w-1/2 grid gap-2 border-2 border-gray-700 focus:border-orange-600 grid-cols-1" style="margin-left: 300px; margin-top: 20px">
        <label style="color: red">Select Underlayment (S/A) *</label>
        <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
    </div>

    <div v-show="isSelectVisible1" class="md:w-1/2 grid gap-2 border-2 border-gray-700 focus:border-orange-600 grid-cols-1" style="margin-left: 300px; margin-top: 20px">
        <label style="color: red">Select Underlayment (UDL) *</label>
        <Select v-model="selectedSlopelow" :options="slopetypeless" placeholder="make selection" @change="getIndexs" />
    </div>
    <br />
    <DripEdShingle style="margin-left: 300px; margin-top: 20px" />

    <Divider />
    <Divider />

    <ModalWindow v-if="modalUDLIsActive" :key="modalKey" :initialData="currentShingle" @closePopup="(modalUDLIsActive = false), shingleUdlStaging()">
        <div v-show="isUDLNOAValid" class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">(UDL) NOA Applicant</label>
                <InputText id="manufacturer" v-model="underlayment.udlmanufacturer" />
            </div>
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">(UDL) Material</label>
                <InputText id="material" v-model="underlayment.udlmaterial" />
            </div>
            <div class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="description">(UDL) Description</label>
                <InputText id="description" v-model="underlayment.udldescription" />
            </div>
        </div>
    </ModalWindow>

    <ModalWindow @closePopup="(modalSAIsActive = false), shingleSAStaging()" :key="modalKeySA" :initialData="currentShingleSA" v-if="modalSAIsActive">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="saapplicant">S/A Applicant</label>
                <InputText id="saapplicant" v-model="selfadhered.samanufacturer" />
            </div>
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="samaterial">S/A Material Type</label>
                <InputText id="saaterial" v-model="selfadhered.samaterial" />
            </div>

            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: red">Select System * </label>
                <Select v-model="selectedsystemf" :options="selfadhered.system" placeholder="" @change="updateselectSystem" />
            </div>
            <div class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620; margin-top: 15px" for="sadescription">S/A Description Chosen</label>
                <InputText id="sadescription" v-model="selfadhered.sadescription" />
            </div>
        </div>
    </ModalWindow>

    <ModalWindow v-if="modalIsActive" :key="modalKey" :initialData="currentShingle" @closePopup="(modalIsActive = false), shingleMetrics()">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">Applicant</label>
                <InputText id="manufacturer" v-model="shingles.manufacturer" class="w-full" />
            </div>

            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Material</label>
                <InputText id="material" v-model="shingles.material" class="w-full" />
            </div>

            <div class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="description">Description</label>
                <InputText id="description" v-model="shingles.description" class="w-full" />
            </div>
        </div>
    </ModalWindow>
</template>
<style></style>
