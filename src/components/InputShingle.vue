<script setup>
import DripEdShingle from '@/components/DripEdgeChildren/DripEdShingle.vue';
import Buttons from '@/components/Features/Buttons.vue';
import ModalWindow from '@/components/Modal/ModalWindow.vue';
import ShingleNoa from '@/components/roofSystems/ShingleNoa.vue';
import usePostShingleToLambda from '@/composables/Postdata/usePostShingleLambda';
import { useShingleHghtValidation } from '@/composables/Validation/use-shHeight';
import { useShingleValidation } from '@/composables/Validation/use-shSlope';
import useSystemf from '@/composables/use-Inputsystemf';
import useSlope from '@/composables/use-updateSlope';
import { usedripedgeshingleStore } from '@/stores/dripEdgeShingleStore';
import { usePermitappStore } from '@/stores/permitapp';
import { usePolyStore } from '@/stores/polyStore';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import AutoCompletePoly from './roofSystems/AutoCompletePoly.vue';
import AutoCompleteSA from './roofSystems/AutoCompleteSA.vue';

const { postShingle } = usePostShingleToLambda();
const shingleDripstore = usedripedgeshingleStore();
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const { slopeCondition } = useSlope();

const polyStore = usePolyStore();
const { polyinput } = storeToRefs(polyStore);

const store = useShingleStore();
const { inputshingle } = storeToRefs(store);
const permitStore = usePermitappStore();

const usesystemfStore = useSystemf();
const { systeminput } = storeToRefs(usesystemfStore.store);
const latestSA = computed(() => latestOf(systeminput.value)?.systemData || null);

const latestOf = (list) => (Array.isArray(list) && list.length ? list[list.length - 1] : null);

const processnumber = ref(permitStore.$state.permitapp?.[0]?.formdt?.processNumber);
const muniprocessnumber = ref(permitStore.$state.permitapp?.[0]?.formdt?.muniprocessnumber);

const shingles = reactive({
    noa: '',
    meProcessnumber: 0,
    muniProc: 0,
    manufacturer: '',
    material: '',
    description: '',
    slope: 0,
    height: 0,
    deckType: '',
    expiration_date: '',
    prescriptiveSelection: '',
    dripEdgeMaterial: '',
    dripEdgeSize: '',
    shingleIdentifier: 'shingle'
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

const isHeightValid = ref(false);

const dt = ref('');

const isDisabledslope = ref(true);
const isDisabled = ref(true);
function getdeckType(event) {
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        isDisabledslope.value = false;
        dims.decktype = dt.value;
    }
}

const asText = (v) => {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) return v.join(' | '); // or just return v[0] if you prefer the first
    return String(v);
};

const sysToDesc = computed(() => {
    const m = {};
    for (const k of saPayload.System) {
        const dk = `Description_${k}`;
        if (saPayload[dk]) {
            m[k] = asText(saPayload[dk]); // ✅ Description_Fx
        } else if (saPayload.Maps?.[k]) {
            m[k] = asText(saPayload.Maps[k]); // ✅ fallback Maps[k]
        } else {
            m[k] = asText(saPayload.Description); // ✅ last resort
        }
    }
    return m;
});

// The currently selected key
const currentSysKey = computed(() => (typeof selectedsystemf.value === 'object' ? selectedsystemf.value?.value : selectedsystemf.value));

// Bind the form field to only Fx text

const resolvedSaDescription = computed({
    get: () => (currentSysKey.value ? sysToDesc.value[currentSysKey.value] || '' : ''),
    set: (v) => (saForm.sadescription = v)
});

// options & fields
const sysOptions = computed(() => saPayload.System.map((k) => ({ label: k, value: k })));

watch(selectedsystemf, (k) => {
    const key = typeof k === 'object' ? k?.value : k;
    saForm.sasystem = key || '';
    saForm.sadescription = key ? sysToDesc.value[key] || '' : '';
});
const heightModel = ref('');

let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedSlopehigh = ref();
const selectedSlopelow = ref();
const selectedDeck = ref();
// show ASTM version when hitType is "astm" (or the common typo "atsm")
const isAstm = computed(() => {
    const v = (hitType?.value ?? '').toString().trim().toLowerCase();
    console.log(v);
    return v === 'astm' || v === 'atsm';
});

// one close handler: only posts shingleMetrics for ASTM flow
// function handleShingleModalClose() {
//     console.log(isAstm.value);
//     modalIsActive.value = false;
//     if (isAstm.value) shingleMetrics();
// }

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
const normalizeSysKey = (v) => {
    if (Array.isArray(v)) return normalizeSysKey(v[0]);
    if (v && typeof v === 'object') return v.value ?? v.label ?? '';
    return typeof v === 'string' ? v.trim() : '';
};
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
        sasystem: currentSysKey.value || '', // 👈 only the chosen system
        sadescription: resolvedSaDescription.value || '' // 👈 only that Fx’s description
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

    shingles.meProcessnumber = processnumber.value;
    shingles.muniProc = muniprocessnumber.value;
});

const shingleForm = reactive({
    slope: '',
    height: '',
    area: '',
    decktype: '',
    manufacturer: '',
    material: '',
    description: '',
    prescriptiveSelection: '',
    hittype: 'astm'
});

const udlForm = reactive({
    udlnoa: '',
    udlmanufacturer: '',
    udlmaterial: '',
    udldescription: '',
    hittype: '',
    prescriptiveSelection: ''
});

const saForm = reactive({
    sanoa: '',
    samanufacturer: '',
    samaterial: '',
    sasystem: '',
    sadescription: '',
    hittype: '',
    prescriptiveSelection: ''
});
const conditions = [
    {
        match: ['ASTM #30 2 Plies with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c', 'ASTM #30 1 Ply with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c'],
        flags: { isUDLNOAValid: false, isSAValid: false, isShingleValid: true },
        identifier: 'astm'
    },
    {
        match: ['Polypropylene 2 Plies with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c', 'Polypropylene 1 Ply with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c'],
        flags: { isUDLNOAValid: true, isSAValid: false, isShingleValid: true },
        identifier: 'poly'
    },
    {
        match: ['(S/A) membrane adhered directly to a wood deck, per the NOA system F', '(S/A) membrane adhered directly to a wood deck, per the NOA system F'],
        flags: { isUDLNOAValid: false, isSAValid: true, isShingleValid: true },
        identifier: 'sa'
    }
];
let hitType = ref(null); // outside the function, globally scoped

function getIndexs() {
    const normalize = (v) => (typeof v === 'string' ? v : (v?.label ?? v?.value ?? v?.name ?? ''));
    console.log(normalize);
    const low = normalize(selectedSlopelow.value);
    const high = normalize(selectedSlopehigh.value);
    console.log(low, high);
    if (!low && !high) return;

    const hit = conditions.find((c) => c.match.includes(low) || c.match.includes(high));

    if (hit) {
        console.log(hit);
        isUDLNOAValid.value = hit.flags.isUDLNOAValid;
        isSAValid.value = hit.flags.isSAValid;
        isShingleValid.value = hit.flags.isShingleValid;
        // Extract the type of match

        hitType.value = hit.identifier;
        shingleForm.hittype = hitType.value;
        udlForm.hittype = hitType.value;
        saForm.hittype = hitType.value;
        if (shingleForm.hittype) shingleForm.prescriptiveSelection = hit.match[0];
        if (udlForm.hittype) udlForm.prescriptiveSelection = hit.match[0];
        if (saForm.hittype) saForm.prescriptiveSelection = hit.match[0];
    } else {
        hitType.value = null;
    }
}

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

const modalKey = ref(0);

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
const toNum = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);
// helpers
const commonShingle = () => ({
    meProcess: shingles.meProcessnumber,
    muniProcess: shingles.muniProc,

    noa: shingleForm.noa || '',
    manufacturer: shingleForm.manufacturer || '',
    material: shingleForm.material || '',
    description: shingleForm.description || '',
    decktype: dims.decktype || '',

    dripEdgeMaterial: shingleDripstore.$state.inputselectedUserDripEdge[0]?.dripSelection?.DripEdgeMaterial,
    dripEdgeSize: shingleDripstore.$state.inputselectedUserDripEdge[0]?.dripSelection?.DripEdgeSize,

    area: toNum(dims.area),
    height: toNum(dims.height),
    slope: toNum(slope.value),
    prescriptiveSelection: udlForm.prescriptiveSelection || saForm.prescriptiveSelection || shingleForm.prescriptiveSelection || ''
});

const shingleUdlStaging = async () => {
    const body = {
        ...commonShingle(),
        udlnoa: udlForm.udlnoa || '',
        udlmanufacturer: udlForm.udlmanufacturer || '',
        udlmaterial: udlForm.udlmaterial || '',
        udldescription: udlForm.udldescription || '',
        hittype: 'poly'
    };
    await postShingle(body); // one call is enough
};

// SA + Shingle in one POST (hittype: 'sa')
const shingleSAStaging = async () => {
    const key = normalizeSysKey(selectedsystemf.value || saForm.sasystem);
    const body = {
        ...commonShingle(),
        samanufacturer: saForm.samanufacturer || '',
        sanoa: saForm.sanoa || '',
        sasystem: key || '',
        samaterial: saForm.samaterial || '',
        sadescription: (key && (sysToDesc.value[key] || '')) || saForm.sadescription || '',
        hittype: 'sa'
    };
    await postShingle(body);
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

const isHeightDisabled = ref(true); // start disabled

const heightInputRef = ref(null);

watch(isHeightDisabled, (newVal) => {
    if (!newVal) {
        nextTick(() => {
            const el = heightInputRef.value?.$el?.querySelector('input') || heightInputRef.value?.$el;
            if (el) {
                el.focus();
                el.select();
            }
        });
    }
});

const isSlopeValid = ref(false);

function validateRoofSlope() {
    validateInput();
    const n = Number(dims.slope);
    const ok = Number.isFinite(n) && n >= 2 && n <= 12;
    isSlopeValid.value = ok;

    if (ok) {
        // clear height and enable it
        dims.height = '';
        heightModel.value = '';
        isHeightDisabled.value = false;
    } else {
        // keep height locked if slope is not valid
        isHeightDisabled.value = true;
        isHeightValid.value = false;
    }
}
const validateInput = () => {
    validateShingleSlope(slope.value);
};

function validateHeight() {
    const raw = heightModel.value !== '' ? heightModel.value : dims.height;
    const n = Number(raw);
    // dims.per = (n * factor.value).toFixed(2);
    // ✅ keep dims.height in sync so the exposure watcher can react
    dims.height = n;
    const ok = Number.isFinite(n) && n >= 10 && n <= 40;
    isHeightValid.value = ok;
}
watch(
    () => dims.slope,
    (s) => {
        validateShingleSlope(s);
        isDisabled.value = Number(s) >= 2 ? false : true;
        addCheckmarks();
    }
);
watch(
    () => dims.height,
    (h) => {
        validateShingleHeight(h);
        isHeightValid.value = true;
        addCheckmarks();
    }
);
function addCheckmarks() {
    if (isHeightValid.value || isDisabledslope.value) {
        isvalueValid.value = true;
        console.log('Entered checkmarks');
        console.log(shingleDripstore);

        shingles.dripEdgeMaterial = shingleDripstore.$state.inputselectedUserDripEdge[0]?.dripSelection?.DripEdgeMaterial;
        shingles.dripEdgeSize = shingleDripstore.$state.inputselectedUserDripEdge[0]?.dripSelection?.DripEdgeSize;

        console.log(shingles.dripEdgeMaterial, shingles.dripEdgeSize);
    } else {
        isvalueValid.value = false;
    }
}

// helpers

const postingShingle = ref(false);

function handleShingleModalClose() {
    if (postingShingle.value) return; // prevent overlap
    postingShingle.value = true;
    try {
        modalIsActive.value = false;
        console.log(isAstm.value);
        // if (isAstm.value)
        shingleStaging();
    } finally {
        postingShingle.value = false;
    }
}

const shingleStaging = async () => {
    try {
        const body = {
            ...commonShingle(),
            hittype: shingleForm.hittype
        };
        await postShingle(body);
        // Success: maybe show a toast or update UI
        console.log('Posted successfully');
    } catch (error) {
        // This prevents "Uncaught (in promise)"!
        console.error('Post failed:', error);

        // Optional: show user-friendly message
        if (error.response) {
            // Server responded with error status (4xx, 5xx)
            alert(`Error ${error.response.status}: ${error.response.data.message || 'Request failed'}`);
        } else if (error.request) {
            // No response received (network issue)
            alert('Network error: Please check your connection');
        } else {
            // Something else
            alert('An unexpected error occurred');
        }
    }
};

const slopeBand = computed(() => {
    const n = Number(slope.value || 0);
    if (n >= 2 && n <= 4) return 'low';
    if (n > 4 && n <= 12) return 'high';
    return 'invalid';
});

const showUDL = computed(() => slopeBand.value === 'low');
const showSA = computed(() => slopeBand.value === 'high');

watch([showSA, showUDL, () => slopeBand.value], () => {
    console.log(showSA, showUDL);
});

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
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" readonly />
        </div>
        <div class="w-64 mt-1 space-y-1" style="margin-left: 10px">
            <label for="height" style="color: red">Height *</label><i class="pi pi-check" v-show="isvalueValid" style="margin-left: 10px; color: green; font-size: 1rem" @change="addCheckmarks"></i>&nbsp;
            <InputText ref="heightInputRef" id="height" v-model.number="dims.height" type="text" placeholder="height" :invalid="height === null" :disabled="!canEnterHeight" @change="validateHeight" />
            <Message v-if="errorshHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorshHeightMessage }}</Message>
        </div>
        <div v-show="showSA" class="min-w-[680px] flex flex-col border-2 border-gray-700 focus:border-orange-600" style="margin-top: 20px">
            <label style="color: red">Select Underlayment (S/A) *</label>
            <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
        </div>
        <div v-show="showUDL" class="min-w-[680px] flex flex-col border-2 border-gray-700 focus:border-orange-600" style="margin-top: 50px">
            <label style="color: red">Select Underlayment (UDL) *</label>
            <Select v-model="selectedSlopelow" :options="slopetypeless" placeholder="make selection" @change="getIndexs" />
        </div>
        <br />
        <DripEdShingle />
        <div class="dark:bg-gray-800 rounded-2xl shadow-lg grid grid-cols-1 full:grid-cols-2 gap-3">
            <div v-show="isShingleValid" class="w-96" style="margin-left: 2px; margin-top: 4px">
                <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                    <ShingleNoa />
                    <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleClick" style="margin-left: 15px; margin-top: 30px" />
                </div>
            </div>
            <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
                <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                    <AutoCompletePoly />
                    <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleUDLClick" style="margin-left: 10px; margin-top: 30px" />
                </div>
            </div>
            <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
                <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                    <AutoCompleteSA />

                    <Buttons label="Submit" severity="contrast" raised @click="onOpenShingleSAClick" style="margin-left: 70px; margin-top: 25px" />
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
        <div class="grid grid-cols-2 md:grid-cols-2 gap-2" style="margin-left: 10px">
            <div class="min-w-[350px] flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="manufacturer">(UDL) NOA Applicant</label>
                <InputText id="manufacturer" v-model="udlForm.udlmanufacturer" />
            </div>
            <div class="min-w-[350px] flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="material">(UDL) Material</label>
                <InputText id="material" v-model="udlForm.udlmaterial" />
            </div>
            <div class="min-w-[350px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <!-- <div class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600"> -->
                <label for="description">(UDL) Description</label>
                <InputText id="description" v-model="udlForm.udldescription" />
            </div>
        </div>
    </ModalWindow>
    <ModalWindow :key="modalKeySA" @closePopup="(modalSAIsActive = false), shingleSAStaging()" v-if="modalSAIsActive">
        <div class="grid grid-cols-2 md:grid-cols-2 gap-2" style="margin-left: 10px">
            <div class="min-w-[350px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label for="saapplicant">S/A Applicant</label>
                <InputText id="saapplicant" v-model="saForm.samanufacturer" />
            </div>
            <div class="min-w-[350px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label for="samaterial">S/A Material Type</label>
                <InputText id="saaterial" v-model="saForm.samaterial" />
            </div>
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: red">Select System *</label>
                <Select v-model="selectedsystemf" :options="sysOptions" optionLabel="label" optionValue="value" placeholder="Select System" />
                <ProgressSpinner v-if="!sysOptions.length" style="width: 24px; height: 24px" strokeWidth="4" />
            </div>
            <div v-show="!!currentSysKey" class="min-w-[480px] flex flex-col gap-2 border-gray-700 focus:border-orange-600">
                <label for="sadescription">S/A Description Chosen</label>
                <InputText id="sadescription" v-model="resolvedSaDescription" />
            </div>
        </div>
    </ModalWindow>
    <!--  grid grid-cols-1 md:grid-cols-1 gap-2-->
    <div v-if="!isAstm" class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
        <ModalWindow :key="modalKey" @closePopup="handleShingleModalClose" v-if="modalIsActive">
            <div class="grid grid-cols-2 md:grid-cols-2 gap-2" style="margin-left: 10px">
                <div class="min-w-[350px] flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                    <label for="manufacturer">Applicant</label>
                    <InputText id="manufacturer" v-model="shingleForm.manufacturer" class="w-full" />
                </div>
                <div class="min-w-[450px] flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                    <label for="material">Material</label>
                    <InputText id="material" v-model="shingleForm.material" class="w-full" />
                </div>
                <div class="min-w-[650px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label for="description">Description</label>
                    <InputText id="description" v-model="shingleForm.description" class="w-full" />
                </div>
            </div>
        </ModalWindow>
    </div>

    <ModalWindow :key="modalKey" @closePopup="handleShingleModalClose()" v-if="modalIsActive">
        <div class="grid grid-cols-2 md:grid-cols-2 gap-4" style="margin-left: 10px">
            <div class="min-w-[350px] flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="manufacturer">Applicant</label>
                <InputText id="manufacturer" v-model="shingleForm.manufacturer" class="w-full" />
            </div>
            <div class="min-w-[350px] flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="material">Material</label>
                <InputText id="material" v-model="shingleForm.material" class="w-full" />
            </div>
            <div class="min-w-[400px] flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label for="description">Description</label>
                <InputText id="description" v-model="shingleForm.description" class="w-full" />
            </div>
        </div>
    </ModalWindow>
</template>
<style></style>
