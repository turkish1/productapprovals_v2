<script setup>
import DripEdShingle from '@/components/DripEdgeChildren/DripEdShingle.vue';
import Buttons from '@/components/Features/Buttons.vue';
import ModalWindow from '@/components/Modal/ModalWindow.vue';
import AutoComplete from '@/components/roofSystems/AutoComplete.vue';
import usePostShingleToLambda from '@/composables/Postdata/usePostShingleLambda';
import { useShingleHghtValidation } from '@/composables/Validation/use-shHeight';
import { useShingleValidation } from '@/composables/Validation/use-shSlope';
import useSystemf from '@/composables/use-Inputsystemf';
import useSlope from '@/composables/use-updateSlope';
import { usePolyStore } from '@/stores/polyStore';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import AutoCompletePoly from './roofSystems/AutoCompletePoly.vue';
import AutoCompleteSA from './roofSystems/AutoCompleteSA.vue';

const { postShingle, postUDLshingle, postSAshingle } = usePostShingleToLambda();

const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();

const polyStore = usePolyStore();
const store = useShingleStore();
const usesystemfStore = useSystemf();
const { inputshingle } = storeToRefs(store);
// const { systeminput } = storeToRefs(usesystemfStore);
const systemStore = ref(usesystemfStore.store.$state.systeminput);
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
    Description_F12: '',
    Description_F13: '',
    Description_F14: '',
    Description_F15: '',
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
// let systemfInput = ref(systeminput);
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isShingleValid = ref(false);
let isSelectVisible1 = ref(false);
let isSelectVisible2 = ref(false);
let isSlopeValid = ref(true);
let slope = ref(null);

const isHeightValid = ref(false);

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

const buildMap = (keys = [], values = []) => Object.fromEntries((keys || []).map((k, i) => [String(k), values?.[i]]));

const pickFDescriptions = (sd = {}) => {
    // Pull Description_F* keys into a map: { F1: 'desc1', F2: 'desc2', ... }
    console.log(sd, buildMap.value);
    const out = {};
    for (const key of Object.keys(sd)) {
        // matches Description_F1 ... Description_F15
        if (/^Description_F\d+$/.test(key)) {
            const sysKey = key.replace('Description_', ''); // -> F1
            const raw = sd[key];
            out[sysKey] = Array.isArray(raw) ? (raw[0] ?? '') : (raw ?? '');
        }
    }
    return out;
};

const sysFMap = ref({}); // { F1: dp, F2: dp, ... }
const sysFDescMap = ref({});
async function checkInputSystem() {
    const items = systemStore.value;

    // const values = values[items.length - 1];
    console.log(items, systemStore.value);
    if (!Array.isArray(items) || items.length === 0) return;
    const entry = items[items.length - 1];
    if (!entry?.systemData) return;

    const sd = entry.systemData;

    // const entry = items.find((it) => it && it.systemData);
    // if (!entry) return;
    // const sd = entry.systemData;
    console.log(sd);
    // base fields
    Object.assign(selfadhered, {
        samanufacturer: sd.manufacturer ?? '',
        samaterial: sd.material ?? '',
        system: sd.system ?? [], // ['F1','F2',...]
        systemCheck: sd.systemCheck ?? [],
        saarrSystem: sd.arraySystem ?? '',
        sanoa: sd.noa ?? '',
        sadescription: sd.description ?? []
    });
    console.log(selfadhered);
    // build pressure map
    // const pressures = Array.isArray(sd.designPressure) ? sd.designPressure : Array.isArray(sd.pressure) ? sd.pressure : [];
    sysFMap.value = buildMap(selfadhered.system);
    console.log(sysFMap.value);
    // build description map from Description_F* keys
    sysFDescMap.value = pickFDescriptions(sd);
    console.log(sysFDescMap.value);

    // guard Object.entries with a fallback object
    for (const [fKey, desc] of Object.entries(sysFDescMap.value || {})) {
        selfadhered[`Description_${fKey}`] = desc;
    }
    console.log(selfadhered);
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

const shingleForm = reactive({
    manufacturer: '',
    material: '',
    description: ''
});

const udlForm = reactive({
    udlnoa: '',
    udlmanufacturer: '',
    udlmaterial: '',
    udldescription: ''
});
const saData = reactive({
    samanufacturer: '',
    sanoa: '',
    samaterial: '',
    sadescription: '',
    sasystem: '',
    saIdentifier: 'sa'
});
const saForm = reactive({
    sanoa: '',
    samanufacturer: '',
    samaterial: '',
    sasystem: '',
    sadescription: ''
});

const currentShingleUDl = ref(null);

const currentShingle = ref(null);

const currentShingleSA = ref(null);
// optional: your reactive parent form state
// const shingles = reactive({ manufacturer:'', material:'', description:'' })

watch(
    () => modalIsActive.value,
    (newVal) => {
        console.log('Modal changed:', newVal);
    },
    { immediate: true }
);

watch(
    () => modalUDLIsActive.value,
    (newVal) => {
        console.log('UDLModal changed:', newVal);
    },
    { immediate: true }
);
watch(
    () => modalSAIsActive.value,
    (newVal) => {
        console.log('SAModal changed:', newVal);
    },
    { immediate: true }
);

// map to description
const pickedSystem = ref(null);

const showSaDescription = computed(() => !!pickedSystem.value);

const modalKey = ref(0);

async function onOpenShingleClick() {
    await nextTick();
    await checkInput(); // hydrate `shingles` from store
    // snapshot ➜ form
    shingleForm.manufacturer = shingles.manufacturer || '';
    shingleForm.material = shingles.material || '';
    shingleForm.description = shingles.description || '';
    modalKey.value++;
    await nextTick();
    modalKey.value++;

    modalIsActive.value = true;
}
watch(
    udlForm,
    () => {
        if (udlForm.udlnoa === '') {
            console.log(udlForm);
        } else {
            // Reset tile state if nothing selected

            Object.assign(udlForm, {
                udlnoa: '',
                udlmanufacturer: '',
                udlmaterial: '',
                udldescription: ''
            });
            // console.log(tilenoas);
        }
    },
    { immediate: true } // run once at mount if value is already set
);
watch(
    saForm,
    () => {
        if (saForm.sanoa === '') {
            console.log(selfadhered, saData, saForm);
        } else {
            // Reset tile state if nothing selected
            // setTimeout(() => {
            // Object.assign(saForm, {
            //     sanoa: '',
            //     samanufacturer: '',
            //     samaterial: '',
            //     sasystem: '',
            //     sadescription: ''
            // });
            // }, 500);
            // console.log(tilenoas);
        }
    },
    { immediate: true } // run once at mount if value is already set
);
watch(
    shingleForm,
    () => {
        if (shingleForm.noa === '') {
            console.log(shingleForm);
        } else {
            // Reset tile state if nothing selected

            Object.assign(shingleForm, {
                noa: '',
                manufacturer: '',
                description: '',
                material: ''
            });
            // console.log(tilenoas);
        }
    },
    { immediate: true } // run once at mount if value is already set
);

// --- UDL ---
const modalKeyUDL = ref(0);
async function onOpenShingleUDLClick() {
    await nextTick();

    await checkInputPoly(); // hydrate `underlayment`
    udlForm.udlmanufacturer = underlayment.udlmanufacturer || '';
    udlForm.udlmaterial = underlayment.udlmaterial || '';
    udlForm.udldescription = underlayment.udldescription || '';
    modalKeyUDL.value++;
    await nextTick();
    modalKeyUDL.value++;

    modalUDLIsActive.value = true;
}

// --- SA ---
const modalKeySA = ref(0);
async function onOpenShingleSAClick() {
    await nextTick();

    await checkInputSystem(); // hydrate `selfadhered`
    saForm.samanufacturer = selfadhered.samanufacturer || '';
    saForm.samaterial = selfadhered.samaterial || '';
    saForm.sasystem = selfadhered.system || '';
    // usesystemfStore.store.$state.systeminput?.pdfSystemValue || '';
    saForm.sadescription = selfadhered.sadescription || '';
    saForm.sanoa = selfadhered.sanoa;
    console.log(selfadhered, saForm);
    pickedSystem.value = null;
    selectedsystemf.value = null;
    selfadhered.sadescription = '';
    modalKeySA.value++;

    await nextTick();
    modalKeySA.value++;

    modalSAIsActive.value = true;
}

const shingleUdlStaging = async () => {
    udlData.udlmanufacturer = underlayment.udlmanufacturer;
    udlData.udlnoa = underlayment.udlnoa;
    udlData.udlmaterial = underlayment.udlmaterial;
    udlData.udldescription = underlayment.udldescription;
    // shingles.prescriptiveSelection = inputshingle.value[0]?.shingleData?.prescriptiveSelection;

    await postUDLshingle(udlData);
};

const shingleSAStaging = async () => {
    console.log(selfadhered, saForm);
    saData.samanufacturer = saForm.samanufacturer;
    saData.sanoa = saForm.sanoa;
    saData.samaterial = saForm.samaterial;
    saData.sasystem = saForm.sasystem;
    // usesystemfStore.store.$state.systeminput.pdfSystemValue;
    saData.sadescription = saForm.sadescription;
    console.log(saData);
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

    // console.log(selectedSlopelow.value, selectedSlopehigh.value);
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
// --- modal form snapshots (avoid stale bleed) ---

// handler
function updateselectSystem(sel) {
    const value = typeof sel === 'object' && sel ? sel.value || sel.label || sel : sel;

    pickedSystem.value = value || null;

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
        F12: selfadhered.Description_F12,
        F13: selfadhered.Description_F13,
        F14: selfadhered.Description_F14,
        F15: selfadhered.Description_F15,
        E4: selfadhered.Description_F4,
        E5: selfadhered.Description_F5,
        E6: selfadhered.Description_F6
    };

    const description = descriptionMap[value] || '';
    selfadhered.sadescription = description;

    // sync with store if needed
    // const systemInput = systemStore.$state.systeminput;
    // systemInput.pdfSystemValue = value;
    // systemInput.description = description;
}
// --- SHINGLE ---

watch(
    () => dims.slope,
    () => {
        validateRoofSlope();
        valueEntered();
    }
);

watch(
    () => dims.height,
    () => {
        validateHeight();
    }
);
</script>
<template>
    <div id="shingle" class="inner mx-auto max-w-5xl p-6 dark:bg-gray-800 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6" style="margin-left: 100px; border-radius: 5px">
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

        <div v-show="isSelectVisible2" class="min-w-[580px] flex flex-col border-2 border-gray-700 focus:border-orange-600" style="margin-top: 20px">
            <label style="color: red">Select Underlayment (S/A) *</label>
            <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
        </div>

        <div v-show="isSelectVisible1" class="min-w-[580px] flex flex-col border-2 border-gray-700 focus:border-orange-600" style="margin-top: 50px">
            <label style="color: red">Select Underlayment (UDL) *</label>
            <Select v-model="selectedSlopelow" :options="slopetypeless" placeholder="make selection" @change="getIndexs" />
        </div>
        <br />
        <DripEdShingle />
        <div class="dark:bg-gray-800 rounded-2xl shadow-lg grid grid-cols-1 full:grid-cols-2 gap-3">
            <div v-show="isShingleValid" class="w-96" style="margin-left: 2px; margin-top: 4px">
                <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                    <AutoComplete />
                    <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleClick" style="margin-left: 15px; margin-top: 30px" />
                </div>
            </div>
            <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
                <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                    <AutoCompletePoly />
                    <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleUDLClick" style="margin-left: 15px; margin-top: 30px" />
                </div>
            </div>
            <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
                <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                    <AutoCompleteSA />

                    <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleSAClick" style="margin-left: 75px; margin-top: 30px" />
                </div>
            </div>
        </div>
    </div>
    <Divider />

    <Divider />

    <!-- UDL Modal -->
    <ModalWindow :key="modalKeyUDL" :initialData="currentShingleUDl" @closePopup="(modalUDLIsActive = false), shingleUdlStaging()" v-if="modalUDLIsActive">
        <div v-show="isUDLNOAValid" class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="manufacturer">(UDL) NOA Applicant</label>
                <InputText id="manufacturer" v-model="udlForm.udlmanufacturer" />
            </div>
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="material">(UDL) Material</label>
                <InputText id="material" v-model="udlForm.udlmaterial" />
            </div>
            <div class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="description">(UDL) Description</label>
                <InputText id="description" v-model="udlForm.udldescription" />
            </div>
        </div>
    </ModalWindow>
    <ModalWindow :key="modalKeySA" :initialData="currentShingleSA" @closePopup="(modalSAIsActive = false), shingleSAStaging()" v-if="modalSAIsActive">
        <!-- SA Modal -->
        <div class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="saapplicant">S/A Applicant</label>
                <InputText id="saapplicant" v-model="saForm.samanufacturer" />
            </div>
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="samaterial">S/A Material Type</label>
                <InputText id="saaterial" v-model="saForm.samaterial" />
            </div>
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: red">Select System *</label>
                <Select v-model="selectedsystemf" :options="saForm.sasystem" placeholder="" @change="updateselectSystem" />
            </div>
            <div v-show="showSaDescription" class="min-w-[400px] flex flex-col gap-2 border-gray-700 focus:border-orange-600">
                <label for="sadescription">S/A Description Chosen</label>
                <InputText id="sadescription" v-model="saForm.sadescription" />
            </div>
        </div>
    </ModalWindow>
    <ModalWindow :key="modalKey" :initialData="currentShingle" @closePopup="(modalIsActive = false), shingleMetrics()" v-if="modalIsActive">
        <!-- Shingle Modal -->
        <div class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="manufacturer">Applicant</label>
                <InputText id="manufacturer" v-model="shingleForm.manufacturer" class="w-full" />
            </div>
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="material">Material</label>
                <InputText id="material" v-model="shingleForm.material" class="w-full" />
            </div>
            <div class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="description">Description</label>
                <InputText id="description" v-model="shingleForm.description" class="w-full" />
            </div>
        </div>
    </ModalWindow>
</template>
<style></style>
