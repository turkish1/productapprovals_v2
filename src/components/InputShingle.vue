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
import ProgressSpinner from 'primevue/progressspinner';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import AutoCompletePoly from './roofSystems/AutoCompletePoly.vue';
import AutoCompleteSA from './roofSystems/AutoCompleteSA.vue';

const { postShingle, postUDLshingle, postSAshingle } = usePostShingleToLambda();

const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const { slopeCondition } = useSlope();

const polyStore = usePolyStore();
const store = useShingleStore();
const usesystemfStore = useSystemf();
const { inputshingle } = storeToRefs(store);

const { systeminput } = storeToRefs(usesystemfStore.store);
const latestOf = (list) => (Array.isArray(list) && list.length ? list[list.length - 1] : null);
const latestSA = computed(() => latestOf(systeminput.value)?.systemData || null);
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
const dims = reactive({
    area: '',
    height: '',
    slope: '',
    decktype: ''
});
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isShingleValid = ref(false);

let slope = ref(null);

const isSlopeInRange = computed(() => Number(slope.value) >= 2 && Number(slope.value) <= 12);
const canEnterHeight = computed(() => isSlopeInRange.value && !isDisabledslope.value);

watch(slope, () => {
    validateShingleSlope(slope.value);
    // no manual visibility toggles if you adopt §7
});
watch(
    () => dims.height,
    () => validateShingleHeight(dims.height)
);
const selectedsystemf = ref(null);

const modalSAIsActive = ref(false);
const modalUDLIsActive = ref(false);
const modalIsActive = ref(false);
// helpers

// latest items from stores
const latestShingle = computed(() => latestOf(inputshingle.value)?.shingleData || null);
const latestUdl = computed(() => latestOf(polyinput.value)?.polyData || null);

// let polydatamt = ref(polyinput._object.polyinput);

const isHeightValid = ref(false);

const dt = ref('');

const isDisabledslope = ref(true);
const isDisabled = ref(true);
function getdeckType(event) {
    console.log(selectedDeck._value.name, event.value.name);
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        isDisabledslope.value = false;
        dims.decktype = dt.value;
        console.log(dt.value);
    }
}
// options & fields
const sysOptions = computed(() => saPayload.System.map((k) => ({ label: k, value: k })));
const currentSysKey = computed(() => (typeof selectedsystemf.value === 'object' ? selectedsystemf.value?.value : selectedsystemf.value));
const sysToDesc = computed(() => Object.fromEntries(saPayload.System.map((k) => [k, saPayload[`Description_${k}`] ?? saPayload.Maps?.[k] ?? ''])));
const resolvedSaDescription = computed({
    get: () => (currentSysKey.value ? sysToDesc.value[currentSysKey.value] || saPayload.Description || '' : ''),
    set: (v) => (saForm.sadescription = v)
});

watch(selectedsystemf, (k) => {
    const key = typeof k === 'object' ? k?.value : k;
    saForm.sasystem = key || '';
    saForm.sadescription = key ? sysToDesc.value[key] || saPayload.Description || '' : '';
    console.log(saForm);
});

let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedSlopehigh = ref();
const selectedSlopelow = ref();
const selectedDeck = ref();

const type = ref([{ name: ' - Select Deck Type - ' }, { name: ' 5/8" Plywood ' }, { name: ' 3/4" Plywood ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G ' }, { name: ' Existing 1/2" Plywood ' }]);
// Store the incoming SA payload here (shape matches your example)
const saPayload = reactive({
    System: [],
    Maps: {}, // { F1:"..", F5:".." }
    Description: '' // generic description
    // plus Description_F1, Description_F5, ...
});
// ---- hydrate from backend payload once you receive it ----
function hydrateSA(sd) {
    const System = Array.isArray(sd.System) ? sd.System : Array.isArray(sd.system) ? sd.system : (sd.System ?? sd.system) ? [sd.System ?? sd.system] : [];

    saPayload.System = System.filter(Boolean);
    saPayload.Maps = sd.Maps || sd.maps || {};
    saPayload.Description = sd.Description || sd.description || '';

    for (const k of saPayload.System) {
        const dk = `Description_${k}`;
        if (sd[dk] != null) saPayload[dk] = sd[dk];
    }
}

// Keep your form model in sync when selection changes
watch(selectedsystemf, (k) => {
    saForm.sasystem = k || '';
    saForm.sadescription = k ? sysToDesc.value[k] || saPayload.Description || '' : '';
});

watch(sysOptions, (opts) => {
    if (opts.length && !selectedsystemf.value) selectedsystemf.value = opts[0].value;
});
// keep form in sync
watch([selectedsystemf, latestSA], () => {
    const sd = latestSA.value;
    if (!sd) return;
    Object.assign(saForm, {
        sanoa: sd.noa || '',
        samanufacturer: sd.manufacturer || '',
        samaterial: sd.material || '',
        sasystem: saPayload.System.slice(),
        sadescription: resolvedSaDescription.value || ''
    });
});
watch(
    [latestSA, () => sysOptions.value.length, currentSysKey, () => modalSAIsActive.value],
    () => {
        if (!modalSAIsActive.value) return;
        const sd = latestSA.value;
        if (!sd) return; // nothing yet; modal can show a small inline spinner

        // hydrate payload once
        if (!saPayload.System.length) hydrateSA(sd);

        // default select first system
        if (!currentSysKey.value && sysOptions.value.length) {
            selectedsystemf.value = sysOptions.value[0].value;
        }
        // fill form
        Object.assign(saForm, {
            sanoa: sd.noa || '',
            samanufacturer: sd.manufacturer || '',
            samaterial: sd.material || '',
            sasystem: saPayload.System.slice(),
            sadescription: resolvedSaDescription.value || ''
        });
    },
    { immediate: true }
);

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

// optional: your reactive parent form state

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

const showSaDescription = computed(() => !!selectedsystemf.value);

const modalKey = ref(0);

// function resetShingleForm() {
//     Object.assign(shingleForm, { manufacturer: '', material: '', description: '' });
// }
// function resetUdlForm() {
//     Object.assign(udlForm, { udlnoa: '', udlmanufacturer: '', udlmaterial: '', udldescription: '' });
// }
// function resetSaForm() {
//     Object.assign(saForm, { sanoa: '', samanufacturer: '', samaterial: '', sasystem: [], sadescription: '' });
// }
async function waitFor(getter, timeoutMs = 2500, intervalMs = 50) {
    const start = Date.now();
    while (!getter()) {
        if (Date.now() - start > timeoutMs) return null;
        await new Promise((r) => setTimeout(r, intervalMs));
    }
    return getter();
}
const modalKeyUDL = ref(0);
const modalKeySA = ref(0);
const loading = ref(false);
async function openModal(kind) {
    if (loading.value) return;
    loading.value = true;
    try {
        await nextTick(); // settle pending UI writes

        if (kind === 'shingle') {
            const s = await waitFor(() => latestShingle.value, 2500, 50);
            if (!s) return;
            Object.assign(shingleForm, {
                noa: latestShingle.value?.noa || '',
                manufacturer: latestShingle.value?.applicant || '',
                material: latestShingle.value?.material || '',
                description: latestShingle.value?.description || ''
            });
            modalKey.value++;
            await nextTick();
            modalIsActive.value = true;
            return;
        }
        // resetShingleForm();

        if (kind === 'udl') {
            // resetUdlForm();
            const u = await waitFor(() => latestUdl.value, 2500, 50);

            Object.assign(udlForm, {
                udlnoa: latestUdl.value?.noa || '',
                udlmanufacturer: latestUdl.value?.applicant || '',
                udlmaterial: latestUdl.value?.material || '',
                udldescription: latestUdl.value?.description || ''
            });
            modalKeyUDL.value++;
            await nextTick();
            modalUDLIsActive.value = true;
            return;
        }
        console.log(kind);
    } finally {
        loading.value = false;
    }
}
watch(latestSA, (v) => console.log('latestSA ->', v), { immediate: true });
watch(sysOptions, (v) => console.log('sysOptions ->', v), { immediate: true });
watch(selectedsystemf, (v) => console.log('selectedsystemf ->', v));
// use it:
const onOpenShingleClick = () => openModal('shingle');
const onOpenShingleUDLClick = () => openModal('udl');

const shingleUdlStaging = async () => {
    const payload = {
        udlmanufacturer: udlForm.udlmanufacturer || '',
        udlnoa: udlForm.udlnoa || '',
        udlmaterial: udlForm.udlmaterial || '',
        udldescription: udlForm.udldescription || '',
        udlIdentifier: 'udl'
    };
    await postUDLshingle(payload);
};
const shingleSAStaging = async () => {
    console.log(selfadhered, saForm);
    saData.samanufacturer = saForm.samanufacturer;
    saData.sanoa = saForm.sanoa;
    saData.samaterial = saForm.samaterial;
    saData.sasystem = saForm.sasystem;
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
    // Normalize selected values to strings (PrimeVue options can be objects)
    const normalize = (v) => (typeof v === 'string' ? v : (v?.label ?? v?.value ?? v?.name ?? ''));

    const low = normalize(selectedSlopelow.value);
    const high = normalize(selectedSlopehigh.value);
    if (high) {
        isPrescriptivehigh = true;
        postMetrics.prescriptiveSelection = isPrescriptivehigh ? high : low;
        console.log(low, high, postMetrics);
    }
    if (!low && !high) return;

    const conditions = [
        {
            match: ['2 Plies # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c', '1 Ply # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c'],
            flags: { isUDLNOAValid: false, isSAValid: false, isShingleValid: true }
        },
        {
            match: ['2 Plies Poly with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c', '1 Ply Poly with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c'],
            flags: { isUDLNOAValid: true, isSAValid: false, isShingleValid: true }
        },
        {
            match: ['(S/A) membrane adhered directly to a wood deck, per the NOA system F'],
            flags: { isUDLNOAValid: false, isSAValid: true, isShingleValid: true }
        }
    ];

    const hit = conditions.find((c) => c.match.includes(low) || c.match.includes(high));
    if (hit) {
        isUDLNOAValid.value = hit.flags.isUDLNOAValid;
        isSAValid.value = hit.flags.isSAValid;
        isShingleValid.value = hit.flags.isShingleValid;
    }
}
// helpers
const toNum = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

const shingleMetrics = async () => {
    postMetrics.noa = shingleForm.noa;
    postMetrics.manufacturer = shingleForm.manufacturer;
    postMetrics.material = shingleForm.material;
    postMetrics.description = shingleForm.description;
    postMetrics.slope = toNum(slope.value);
    postMetrics.height = toNum(dims.height);
    postMetrics.area = toNum(dims.area);
    postMetrics.decktype = dims.decktype;
    postMetrics.shingleIdentifier = shingles.shingleIdentifier;

    console.log(postMetrics);
    await postShingle(postMetrics);
};
const slopeBand = computed(() => {
    const n = Number(slope.value || 0);
    if (n >= 2 && n <= 4) return 'low';
    if (n > 4 && n <= 12) return 'high';
    return 'invalid';
});

const showUDL = computed(() => slopeBand.value === 'low');
const showSA = computed(() => slopeBand.value === 'high');
async function onOpenShingleSAClick() {
    if (loading.value) return;
    loading.value = true;
    try {
        modalKeySA.value++;
        await nextTick();
        modalSAIsActive.value = true; // open immediately

        if (latestSA.value) hydrateSA(latestSA.value);
        // if data comes later, the watch(sysOptions) above will populate & select
    } finally {
        loading.value = false;
    }
}

// --- SHINGLE ---

watch(
    () => dims.slope,
    () => {
        validateRoofSlope();
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
            <InputText id="height" v-model.number="dims.height" type="text" placeholder="height" :invalid="height === null" :disabled="!canEnterHeight" @change="validateHeight" />
            <Message v-if="errorshHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorshHeightMessage }}</Message>
        </div>
        <div v-show="showSA" class="min-w-[580px] flex flex-col border-2 border-gray-700 focus:border-orange-600" style="margin-top: 20px">
            <label style="color: red">Select Underlayment (S/A) *</label>
            <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
        </div>
        <div v-show="showUDL" class="min-w-[580px] flex flex-col border-2 border-gray-700 focus:border-orange-600" style="margin-top: 50px">
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
            <transition name="fade">
                <div v-if="loading" class="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center rounded-md">
                    <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
                </div>
            </transition>
        </div>
    </div>
    <Divider />

    <Divider />
    <ModalWindow :key="modalKeyUDL" @closePopup="(modalUDLIsActive = false), shingleUdlStaging()" v-if="modalUDLIsActive">
        <div class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
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
    <ModalWindow :key="modalKeySA" @closePopup="(modalSAIsActive = false), shingleSAStaging()" v-if="modalSAIsActive">
        <div v-show="showSA" class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
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
                <Select v-model="selectedsystemf" :options="sysOptions" optionLabel="label" optionValue="value" placeholder="Select System" />
                <ProgressSpinner v-if="!sysOptions.length" style="width: 24px; height: 24px" strokeWidth="4" />
            </div>
            <div v-show="showSaDescription" class="min-w-[400px] flex flex-col gap-2 border-gray-700 focus:border-orange-600">
                <label for="sadescription">S/A Description Chosen</label>
                <InputText id="sadescription" v-model="resolvedSaDescription" />
            </div>
        </div>
    </ModalWindow>
    <ModalWindow :key="modalKey" @closePopup="(modalIsActive = false), shingleMetrics()" v-if="modalIsActive">
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
