<script setup>
import ModalWindow from '@/components/Modal/ModalWindow.vue';
import AnchorInputWrapper from '@/components/TileNoa/MechanicalTileNoa/AnchorInputWrapper.vue';
import usePostMechanicalToLambda from '@/composables/Postdata/usePostMechanicalLambda';
import useExposurec from '@/composables/Tiletables/exposure_c';
import useExposured from '@/composables/Tiletables/exposure_d';
import { useHeightValidation } from '@/composables/Validation/use-mechHeight';
import { useNumberValidation } from '@/composables/Validation/use-mechSlope';
import useMechNumber from '@/composables/fetchTech/use-systemMechNumber';
import useMech from '@/composables/fetchTech/use-tileMechanical';
import { usedripMStore } from '@/stores/dripEdgeMechTileStore';
import { useGlobalState } from '@/stores/exposurecStore';
import { useExposureD } from '@/stores/exposuredStore';
import { useRoofListStore } from '@/stores/roofList';
import { usemechStore } from '@/stores/tilemechanicalNumber';
import { usetilesysEStore } from '@/stores/tilesysEStore';
import { usetilesysfStore } from '@/stores/tilesysfStore';

import { invoke, until, useToNumber } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import { computed, isProxy, nextTick, onMounted, reactive, ref, toRaw, unref, watch } from 'vue';

// Input query
const query = ref('');
const { tbd, zoned } = useExposureD();

// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);
// This calls the NOAs
const { callNumber } = useMechNumber();
const { postMech } = usePostMechanicalToLambda();
const selectedDripstore = usedripMStore();
const { takeMechInput, mechStore } = useMech();
const mechanicalStore = usemechStore();
const srcRefreshKey = ref(0);

const { tileMechInput } = storeToRefs(mechanicalStore);

const lastNonEmpty = (arrRef, key) => {
    const a = Array.isArray(arrRef.value) ? arrRef.value : [];
    for (let i = a.length - 1; i >= 0; i--) {
        const x = a[i]?.[key];
        if (x && Object.keys(x).length) return x;
    }
    return null;
};
const { zones } = useGlobalState();
const tilenoas = reactive({
    mechIdentifier: 'mechanicaltile',
    manufacturer: '',
    noa: '',
    material: '',
    description: '',
    Table2: [],
    Table3: [],
    expiration_date: '',
    resistance: '',
    selection: '',
    select_tile: [],
    tile_map: {},
    table2_map: {},
    fastenerValuesMap: [],
    two_ten_d_RS_Nails: null,
    one_number_eight_screw: null,
    two_number_eight_screw: null,
    mechanicaltilefastener: '',
    fastenerValues: '',
    designPressure: '',
    slope: '',
    height: '',
    dripEdgeMaterial: '',
    dripEdgeSize: '',
    deckType: '',
    expiration_date: '',
    prescriptiveSelection: '',
    perimeter: '',
    tiletype: '',
    savedfastener: '',
    hittype: ''
});
const saTiles = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    designpressure: '',
    pressure: '',
    prescriptiveSelection: '',
    description: '',
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
    arrDesignPressure: [],
    saIdentifier: 'sa',
    hittype: ''
});
const udlTile = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [], // must be an array
    designPressure: '',
    Anchor_Base_Sheet: '',
    TileCap_Sheet_Description: '',
    hittype: '',
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
    udlIdentifier: 'udl',
    tileCap: '',
    Anchor_Base: '',
    systemSelected: '',
    prescriptiveSelection: '',
    syst: '',
    pressure: ''
});
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const isHeightValid = ref(false);
const selectedMulti = ref(null);

const isDisabledslope = ref(true);
const isDisabled = ref(true);
// const mechanical = ref([]);

const selectedsystemE = ref(null);
const isMultiTileValid = ref(false);
const isUDLValid = ref(false);
const isUDLNOAValid = ref(false);
const isSAValid = ref(false);
const isTileValid = ref(false);
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

const mechTileNoas = computed(() => lastNonEmpty(tileMechInput, 'tileMechNumber'));
// Which dataset to use, preferring selected option if valid

onMounted(() => {
    callNumber();
    // mechanical.value = mechanicalStore.$state;
    console.log(mechTileNoas.value?.noa);
});
const refreshSrc = () => {
    srcRefreshKey.value++;
};
// preload both lists once
onMounted(async () => {
    await Promise.allSettled([callNumber()]);
});
watch([tileMechInput], () => refreshSrc(), { deep: true });

onMounted(() => {
    roofList.value.forEach((item, index) => {
        if (item.item === 'Mechanical Fastened Tile') {
            dims.area = item.dim3;
        }
    });
});

const etileStore = usetilesysEStore();
const ftileStore = usetilesysfStore();
const modalSAIsActive = ref(false);
const modalUDLIsActive = ref(false);
const { tilefinput } = storeToRefs(ftileStore);

const { tilesysEinput } = storeToRefs(etileStore);
let datamounted = ref(ftileStore.$state.tilefinput);
let datamountedsystemE = ref(etileStore.$state.tilesysEinput);

const selectedsystemf = ref(null);

const latestOf = (list) => (Array.isArray(list) && list.length ? list[list.length - 1] : null);
const isExposureC = ref(false);
const exposureChoosen = ref('');
const selectedExposures = ref('');
const { tilemech } = storeToRefs(mechStore);
const datamountedMech = tilemech;

function normalizeMechTable2Multiple(T2) {
    // { content:"multiple", TypeA:{Direct_Deck:0.39}, ... } -> { TypeA:[0.39], ... }
    if (!T2 || typeof T2 !== 'object' || T2.content !== 'multiple') return {};
    const out = {};
    for (const [k, v] of Object.entries(T2)) {
        if (k === 'content') continue;
        const d = v && typeof v === 'object' ? (v.Direct_Deck ?? v.value ?? v[0]) : v;
        const lam = Number(Array.isArray(d) ? d[0] : d) || 0;
        out[k] = [lam];
    }
    return out;
}
function normalizeMechTable3Multiple(T3) {
    // { content:"multiple", TypeA:{two:..,three:..}, ... } -> { TypeA:[two..seven] }
    if (!T3 || typeof T3 !== 'object' || T3.content !== 'multiple') return {};
    const order = ['two', 'three', 'four', 'five', 'six', 'seven'];
    const out = {};
    for (const [k, v] of Object.entries(T3)) {
        if (k === 'content') continue;
        out[k] = order.map((key) => Number(v?.[key]) || 0);
    }
    return out;
}
const SLOPE_IDX = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5 };
const clamp = (n, a, b) => Math.max(Math.min(n, Math.max(a, b)), Math.min(a, b));
function bucketFromSlope(s) {
    const n = clamp(Number(s || 0), 2, 12);
    if (n <= 3) return 2;
    if (n < 4) return 3;
    if (n <= 4) return 4;
    if (n < 6) return 5;
    if (n < 7) return 6;
    return 7;
}

const latestSA = computed(() => latestOf(tilefinput.value)?.systemData || null);

watch(
    [latestSA, () => modalSAIsActive.value],
    () => {
        if (!modalSAIsActive.value) return;
        const sd = latestSA.value;
        if (!sd) return;

        // populate fixed payload + base fields once
        if (!saPayload.System.length) hydrateSA(sd);

        Object.assign(saTiles, {
            noa: sd.noa || '',
            manufacturer: sd.manufacturer || '',
            material: sd.material || '',
            // optional: keep a snapshot array for posting
            arrDesignPressure: saPayload.Designpressure.slice()
        });
        console.log(saTiles.arrDesignPressure, saPayload.Designpressure);
        // choose first system if nothing is selected
        if (!currentSysKey.value && saPayload.System.length) {
            selectedsystemf.value = saPayload.System[0];
        }
    },
    { immediate: true }
);

// if NOA changes, just clear the selection + local fields and rehydrate
watch(
    () => saTiles.noa,
    (nv, ov) => {
        if (!nv || nv === ov) return;
        selectedsystemf.value = null;
        saPayload.System = [];
        saPayload.Designpressure = [];
        saTiles.designpressure = '';
        saTiles.description = '';
        const sd = latestSA.value;
        if (sd) hydrateSA(sd);
    }
);

// choices for the <Select>
const sysOptions = computed(() => saPayload.System.map((k) => ({ label: k, value: k })));

// F -> DP map from aligned arrays
const dpBySystem = computed(() => {
    const out = {};
    saPayload.System.forEach((k, i) => {
        out[k] = saPayload.Designpressure[i];
    });
    return out; // { F1:-60, F5:-90, ... }
});

// F -> Description map (prefer Description_Fx then fallback)
const descBySystem = computed(() => {
    const out = {};
    for (const k of saPayload.System) {
        const dk = `Description_${k}`;
        out[k] = saPayload[dk] ?? saPayload.Description ?? '';
    }
    return out;
});

const currentSysKey = computed(() => (typeof selectedsystemf.value === 'object' ? selectedsystemf.value?.value : selectedsystemf.value || ''));

const saPayload = reactive({
    System: [],
    Maps: {}, // { F1:"..", F5:".." }
    Description: '', // generic description // plus Description_F1, Description_F5, ...
    Designpressure: []
});
// ---- hydrate from backend payload once you receive it ----
function hydrateSA(sd) {
    const System = Array.isArray(sd.System) ? sd.System.slice() : Array.isArray(sd.system) ? sd.system.slice() : (sd.System ?? sd.system) ? [sd.System ?? sd.system] : [];

    const dPressure = Array.isArray(sd.designPressure) ? sd.designPressure.slice() : Array.isArray(sd.pressure) ? sd.pressure.slice() : (sd.designPressure ?? sd.pressure) ? [sd.designPressure ?? sd.pressure] : [];

    saPayload.System = System.filter(Boolean);
    saPayload.Designpressure = dPressure.filter((v) => v != null && String(v).trim() !== '');
    saPayload.Description = sd.Description || sd.description || '';
    saPayload.Maps = sd.Maps || sd.maps || {};

    // copy Description_Fx fields if present
    for (const k of saPayload.System) {
        const dk = `Description_${k}`; // <-- fix: backticks + proper string
        if (sd[dk] != null) saPayload[dk] = sd[dk];
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
        } else if (saPayload.System?.[k]) {
            m[k] = asText(saPayload.System[k]); // ✅ fallback Maps[k]
        } else {
            m[k] = asText(saPayload.Description); // ✅ last resort
        }
    }
    return m;
});

const resolvedSaDescription = computed({
    get: () => (currentSysKey.value ? sysToDesc.value[currentSysKey.value] || '' : ''),
    set: (v) => (saTiles.description = v)
});
// options & fields

watch(selectedsystemf, (k) => {
    const key = typeof k === 'object' ? k?.value : k;

    saTiles.description = key ? sysToDesc.value[key] || '' : '';
});

watch(selectedsystemf, (k) => {
    saTiles.description = k ? sysToDesc.value[k] || saPayload.Description || '' : '';
});

watch(
    [latestSA, () => sysOptions.value.length, currentSysKey, () => modalSAIsActive.value],
    () => {
        if (!modalSAIsActive.value) return;
        const sd = latestSA.value;
        if (!sd) return;

        if (!saPayload.System.length) hydrateSA(sd);

        if (!currentSysKey.value && sysOptions.value.length) {
            selectedsystemf.value = sysOptions.value[0].value;
        }

        Object.assign(saTiles, {
            sanoa: sd.noa || '',
            samanufacturer: sd.manufacturer || '',
            samaterial: sd.material || '',
            sasystem: saPayload.System.slice(),
            sadescription: resolvedSaDescription.value || ''
            // ✅ keep the design pressures as an array aligned with `sasystem`
        });
    },
    { immediate: true }
);

const keyValueSystemEPairsValues = ref({});
const keyValueSystemEPairsKeys = ref({});
const selectedUnderlaymentOpt = computed(() => (underlaymentType.value || []).find((o) => o.key === selectedUnderlaymentKey.value) || null);

const fDpForSelected = computed({
    get: () => (currentSysKey.value ? String(dpBySystem.value[currentSysKey.value] ?? '') : ''),
    set: (v) => {
        const value = String(v ?? '');
        saTiles.designpressure = value;
        if (currentSysKey.value) {
            const index = saPayload.System.indexOf(currentSysKey.value);
            if (index !== -1) {
                saPayload.Designpressure[index] = value;
            }
        }
    }
});
watch(
    [currentSysKey, () => saPayload.Designpressure],
    () => {
        const key = currentSysKey.value;
        if (!key) {
            saTiles.designpressure = '';
            return;
        }
        const auto = dpBySystem.value[key];
        // whenever F changes, reset to that F's DP
        saTiles.designpressure = String(auto ?? '');
    },
    { immediate: true }
);

function normalizeSysKey(v) {
    if (!v) return '';
    return typeof v === 'object' ? (v.value ?? v.label ?? String(v)) : String(v);
}

// reflect current selection’s Description
const fDescForSelected = computed({
    get: () => (currentSysKey.value ? String(descBySystem.value[currentSysKey.value] ?? '') : ''),
    set: (v) => {
        saTiles.description = String(v ?? '');
    }
});

const selectedMechanical = ref(null);

const selectedUnderlaymentKey = ref(0); // 0,1,2,3

const conditions = [
    {
        match: ['ASTM #90 Prescriptive hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30'],
        flags: { isUDLNOAValid: false, isSAValid: false, isTileValid: true },
        identifier: 'astm'
    },
    {
        match: ['System F: per the NOA (S/A) Tile Capsheet adhered diretly to a wood deck'],
        flags: { isUDLNOAValid: false, isSAValid: true, isTileValid: true },
        identifier: 'system_f'
    },
    {
        match: ['System E: per the NOA (S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet'],
        flags: { isUDLNOAValid: true, isSAValid: false, isTileValid: true },
        identifier: 'system_e'
    }
];

const underlaymentType = ref([
    { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
    { selectedBasesheet: 'ASTM #90 Prescriptive hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
    { selectedBasesheet: 'System F: per the NOA (S/A) Tile Capsheet adhered diretly to a wood deck', key: 2 },
    { selectedBasesheet: 'System E: per the NOA (S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet', key: 3 }
]);

let hitType = ref(null); // outside the function, globally scoped

const isAstm = computed(() => {
    const v = (hitType?.value ?? '').toString().trim().toLowerCase();
    return v === 'astm' || v === 'atsm';
});
const postingMech = ref(false);

// one close handler: only posts tileStaging for ASTM flow
function handleTileModalClose() {
    console.log(isAstm.value);
    // modalIsActive.value = false;
    if (postingMech.value) return; // prevent overlap
    postingMech.value = true;
    try {
        modalIsActive.value = false;
        pushTable();
        if (isAstm.value) tileStaging();
    } finally {
        postingMech.value = false;
    }
}
function assignUnderlayment() {
    console.log(selectedUnderlaymentOpt.value.selectedBasesheet);
    const normalize = (v) => (typeof v === 'string' ? v : (v?.label ?? v?.value ?? v?.name ?? ''));
    console.log(normalize);
    const pickedSystem = normalize(selectedUnderlaymentOpt.value.selectedBasesheet);
    console.log(pickedSystem);
    if (!pickedSystem) return;
    const hit = conditions.find((c) => c.match.includes(pickedSystem));
    console.log(hit);
    if (hit) {
        console.log(hit);
        isUDLNOAValid.value = hit.flags.isUDLNOAValid;
        isSAValid.value = hit.flags.isSAValid;
        isTileValid.value = hit.flags.isTileValid;
        // Extract the type of match

        hitType.value = hit.identifier;
        tilenoas.hittype = hitType.value;
        udlTile.hittype = hitType.value;
        saTiles.hittype = hitType.value;
        if (tilenoas.hittype) tilenoas.prescriptiveSelection = hit.match[0];
        if (udlTile.hittype) udlTile.prescriptiveSelection = hit.match[0];
        if (saTiles.hittype) saTiles.prescriptiveSelection = hit.match[0];
        // ---- prescriptive text (first match string) ---------------------------
    } else {
        hitType.value = null;
    }
}

function applyMechNOA(src) {
    if (!src) return;
    const isMultiple = src?.Table2?.content === 'multiple';

    // base fields
    tilenoas.noa = src.noa ?? '';
    tilenoas.manufacturer = src.manufacturer ?? '';
    tilenoas.material = src.material ?? '';
    tilenoas.description = src.description ?? '';
    tilenoas.expiration_date = src.expiration_date ?? '';

    if (isMultiple) {
        // normalize maps for multi
        tilenoas.table2_map = normalizeMechTable2Multiple(src.Table2);
        tilenoas.tile_map = normalizeMechTable3Multiple(src.Table3);
        tilenoas.select_tile = Object.keys(tilenoas.table2_map);
        // seed first type
        if (!tilenoas.select_tile.includes(selectedMulti.value)) {
            selectedMulti.value = tilenoas.select_tile[0] ?? null;
        }
        // paint λ/Mg for current selection & slope
        if (selectedMulti.value) updateTile({ value: selectedMulti.value });
    } else {
        // single: clear multi maps
        tilenoas.table2_map = {};
        tilenoas.tile_map = {};
        tilenoas.select_tile = [];

        // λ from Direct_Deck
        const lam = Number(src?.Table2?.Direct_Deck ?? 0) || 0;
        zoneone.lambda1 = lam;
        zonetwo.lambda2 = lam;
        zonethree.lambda3 = lam;

        // Mg from two..seven, pick by slope
        const t3 = src?.Table3 || {};
        const bucket = bucketFromSlope(dims.slope);
        const mgByKey = { 2: t3.two, 3: t3.three, 4: t3.four, 5: t3.five, 6: t3.six, 7: t3.seven };
        const mg = Number(mgByKey[bucket] ?? 0) || 0;
        zoneone.mg1 = mg;
        zonetwo.mg2 = mg;
        zonethree.mg3 = mg;

        // compute MR (zones must already be set)
        recomputeMR();
    }

    // fastener lists (unchanged)
    tilenoas.mechanicaltilefastener = src.mechanicaltilefastener ?? tilenoas.mechanicaltilefastener;
    tilenoas.fastenerValues = src.fastenerValues ?? tilenoas.fastenerValues;
}
function recomputeMR() {
    const z1 = Number(zoneone.zone || 0) * Number(zoneone.lambda1 || 0) - Number(zoneone.mg1 || 0);
    const z2 = Number(zonetwo.zone || 0) * Number(zonetwo.lambda2 || 0) - Number(zonetwo.mg2 || 0);
    const z3 = Number(zonethree.zone || 0) * Number(zonethree.lambda3 || 0) - Number(zonethree.mg3 || 0);
    zoneone.mr1 = z1.toFixed(2);
    zonetwo.mr2 = z2.toFixed(2);
    zonethree.mr3 = z3.toFixed(2);
}
// Always recompute Mr when any input changes
watch(
    [() => zoneone.zone, () => zoneone.lambda1, () => zoneone.mg1, () => zonetwo.zone, () => zonetwo.lambda2, () => zonetwo.mg2, () => zonethree.zone, () => zonethree.lambda3, () => zonethree.mg3],
    () => {
        const n = (x) => Number(x ?? 0);
        zoneone.mr1 = (n(zoneone.zone) * n(zoneone.lambda1) - n(zoneone.mg1)).toFixed(2);
        zonetwo.mr2 = (n(zonetwo.zone) * n(zonetwo.lambda2) - n(zonetwo.mg2)).toFixed(2);
        zonethree.mr3 = (n(zonethree.zone) * n(zonethree.lambda3) - n(zonethree.mg3)).toFixed(2);
    },
    { immediate: false }
);

const newArray = ref([]);
const iterateItem = ref([]);
async function ensureExposureAndZonesReady() {
    if (!selectedExposures.value) {
        selectedExposures.value = 'd';
        exposureChoosen.value = 'd';
    }

    const s = Number(dims.slope);
    const h = Number(dims.height);
    if (Number.isFinite(s) && Number.isFinite(h) && s >= 2 && h > 0) {
        if (exposureChoosen.value === 'd') await getDatas(s, h);
        else await getData(s, h);
    }

    await until(() => {
        const src = exposureChoosen.value === 'd' ? zoned.value : zones.value;
        const arr = Array.isArray(src?.[0]) ? src[0] : src;
        return Array.isArray(arr) && arr.length >= 3 && arr.every((n) => Number(n) > 0);
    }).toBe(true);

    setZonesFromStore();
    recomputeMR();
}

// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];
    newArray.value = mechTileNoas.value?.noa;
    console.log(newArray.value);
    iterateItem.value = newArray.value ?? [];
    console.log(iterateItem.value);

    const stringyfield1 = JSON.stringify(iterateItem.value).split('[').join();
    console.log(stringyfield1);

    const stringyfield2 = JSON.stringify(stringyfield1).split(']').join();
    console.log(stringyfield2);

    const splitItem = computed(() => stringyfield2.split(',').map((s) => s.replace(/^\s*[-•*+▪▫►‣]\s*/g, '').trimStart()));
    console.log(splitItem.value.filter((item) => item.toString().includes(query.value)));
    // This might work to trim bullet
    // if (typeof src === 'string') {
    //     return src
    //         .split(',')
    //         .map((s) => s.replace(/[[\]"']/g, '').trim())
    //         .filter(Boolean);
    // }
    return splitItem.value.filter((item) => item.toString().includes(query.value));
    // splitItem.value.map((item) => String(item).trim()).filter((item) => item.toLowerCase().includes(query.value));
    // return splitItem.value.filter((item) => item.toString().includes(query.value));
});

const Anchor_Base = reactive(Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`Anchor_Base_Sheet_E${i + 1}`, ''])));
// Update latestEPayload to use reactive store
const latestEPayload = computed(() => {
    const arr = Array.isArray(tilesysEinput.value) ? tilesysEinput.value : [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const sd = arr[i]?.systemDataE;
        if (sd && Object.keys(sd).length) return sd;
    }
    return null;
});

// Update the extra watcher to use reactive ref
watch(
    tilesysEinput,
    (newInput) => {
        // No () => needed; storeToRefs makes it reactive
        if (newInput?.[0]?.systemDataE) applyUDL(newInput[0].systemDataE);
    },
    { deep: true }
);
function applyUDL(sd) {
    if (!sd) return;
    console.log('applyUDL called with:', sd); // Log incoming store data

    udlTile.noa = (sd.noa ?? udlTile.noa) || ''; // Parens added here
    udlTile.manufacturer = (sd.manufacturer ?? udlTile.manufacturer) || ''; // Optional: If you added this
    udlTile.material = (sd.material ?? udlTile.material) || ''; // Optional: If you added this
    udlTile.system = Array.isArray(sd.system) ? sd.system.slice() : sd.system ? [sd.system] : [];
    udlTile.arrDesignPressure = Array.isArray(sd.designPressure) ? sd.designPressure.slice() : Array.isArray(sd.pressure) ? sd.pressure.slice() : [];
    for (let i = 1; i <= 13; i++) {
        const key = `E${i}`;
        Anchor_Base[`Anchor_Base_Sheet_${key}`] = sd[`Anchor_Base_Sheet_${key}`] ?? '';
        udlTile[`TileCap_Sheet_Description_${key}`] = sd[`TileCap_Sheet_Description_${key}`] ?? '';
    }

    if (!udlTile.system.includes(selectedsystemE.value)) {
        selectedsystemE.value = udlTile.system[0] ?? null;
        if (selectedsystemE.value) udlDescPressure(selectedsystemE);
    }
    console.log('UDL after apply:', udlTile); // Log populated udlTile
}

// === SA (System F) — mirror of UDL ===
const latestSAPayload = computed(() => {
    const arr = Array.isArray(unref(datamounted)) ? unref(datamounted) : [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const sd = arr[i]?.systemData;
        if (sd && Object.keys(sd).length) return sd; // newest non-empty
    }
    return null;
});

async function sysFcheckInput() {
    applySA(unref(latestSAPayload));
}
function applySA(sd) {
    if (!sd) return;

    // base fields
    saTiles.noa = sd.noa ?? '';
    saTiles.manufacturer = sd.manufacturer ?? '';
    saTiles.material = sd.material ?? '';

    // normalize arrays
    saTiles.system = Array.isArray(sd.system) ? sd.system.slice() : sd.system ? [sd.system] : [];
    saTiles.arrDesignPressure = Array.isArray(sd.designPressure) ? sd.designPressure.slice() : Array.isArray(sd.pressure) ? sd.pressure.slice() : [];

    // copy Description_F* from payload, if present
    Object.keys(sd).forEach((k) => {
        if (/^Description_F\d+$/.test(k)) saTiles[k] = sd[k] ?? '';
    });

    // ensure current selection is valid
    if (!saTiles.system.includes(selectedsystemf.value)) {
        selectedsystemf.value = saTiles.system[0] ?? null;
    }
}

watch(latestSAPayload, (sd) => applySA(sd), { immediate: true, deep: true });
// Clear-only (do not close modal) when NOA changes, then rehydrate
const clearSAFields = () => {
    selectedsystemf.value = null;
    saTiles.designpressure = '';
    saTiles.description = '';
};

watch(
    () => saTiles.noa,
    (nv, ov) => {
        if (!nv || nv === ov) return;
        clearSAFields();
        applySA(unref(latestSAPayload));
    }
);

// Build a computed map for DP: { F1: dp, F2: dp, ... }

// Currently selected F key
const selF = computed(() => selectedsystemf.value || '');

// What to show for the selected F (computed getters like UDL’s dp/anchor/desc)

const selectSuggestion = (suggestion) => {
    query.value = String(suggestion).replace(/\D/g, '').padStart(8, '0');
    showSuggestions.value = false;
};

const onInput = () => {
    showSuggestions.value = true;
};
// Method to hide suggestions when input loses focus (with a delay to allow clicking suggestions)
const hideSuggestions = () => {
    setTimeout(() => {
        showSuggestions.value = false;
    }, 1250);
};
const selectedDeck = ref();
const type = ref([{ name: ' Select Deck Type ' }, { name: ' 5/8" Plywood  ' }, { name: ' 3/4" Plywood  ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G ' }, { name: ' Existing 1/2" Plywood ' }]);
const save = ref([]);

function checkTile() {
    if (exposureChoosen.value === 'd') getDatas(dims.slope, dims.height);
    else getData(dims.slope, dims.height);
    setZonesFromStore();
    recomputeMR();
}

const dt = ref('');
function getdeckType(event) {
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        tilenoas.deckType = dt.value;
        isDisabledslope.value = false;
    }
}
const lastFetchedNoa = ref('');

async function submitNOA() {
    const noa = String(query.value ?? '').replace(/\D/g, '');
    console.log(noa);
    if (!noa) return false;
    if (noa === latestNOAFromStore.value) {
        checkInput();
        return true;
    }
    lastFetchedNoa.value = noa;
    console.log(lastFetchedNoa.value);

    const res = await takeMechInput(noa); // ONE request
    if (!res) return false;

    // useNoaTick(datamountedMech); // point UI to latest store data
    checkInput(); // hydrate λ, Mg, MR, fasteners, etc.
    return true;
}

const loadingMech = ref(false);

async function submitAndOpen() {
    if (loadingMech.value) return;
    loadingMech.value = true;
    try {
        const ok = await submitNOA();
        if (!ok) return;
        // resetZones();
        // prepare snapshot quickly
        currentTile.value = {
            manufacturer: tilenoas.manufacturer ?? '',
            material: tilenoas.material ?? '',
            description: tilenoas.description ?? ''
        };

        // one remount is enough (optional)
        modalKey.value++; // remove if you don’t need a hard reset
        await ensureExposureAndZonesReady();
        modalKey.value++; // remove if you don’t need a hard reset

        // open immediately
        modalIsActive.value = true;

        // only one layout flush if you need it (optional)
        // await nextTick();
    } finally {
        loadingMech.value = false;
    }
}

const latestMech = computed(() => {
    const list = datamountedMech.value;
    if (!Array.isArray(list) || !list.length) return null;

    // Prefer timestamp if present
    const withTs = list.filter((r) => typeof r?.fetchedAt === 'number');
    if (withTs.length) {
        return withTs.sort((a, b) => b.fetchedAt - a.fetchedAt)[0];
    }

    // Fallback: if your store unshifts new items, 0 is latest; if it pushes, use last.
    return list.at(-1);
});

const latestNOAFromStore = computed(() => String(latestMech.value?.noa ?? '').replace(/\D/g, ''));
watch(
    latestNOAFromStore,
    (v) => {
        lastFetchedNoa.value = v;
        if (v && !query.value) query.value = v;
    },
    { immediate: true }
);
function updateTile(event) {
    const typeKey = event?.value ?? selectedMulti.value;
    if (!typeKey) return;

    // λ from table2_map
    const lamEntry = tilenoas.table2_map?.[typeKey];
    const lam = Array.isArray(lamEntry) ? Number(lamEntry[0]) || 0 : typeof lamEntry === 'object' && lamEntry ? Number(lamEntry.Direct_Deck ?? lamEntry.value ?? lamEntry[0]) || 0 : Number(lamEntry) || 0;
    zoneone.lambda1 = lam;
    zonetwo.lambda2 = lam;
    zonethree.lambda3 = lam;

    // Mg from tile_map by slope bucket
    const mgArr = tilenoas.tile_map?.[typeKey] || [];
    const idx = SLOPE_IDX[bucketFromSlope(dims.slope)] ?? 0;
    const mg = Number(mgArr[idx] ?? 0) || 0;
    zoneone.mg1 = mg;
    zonetwo.mg2 = mg;
    zonethree.mg3 = mg;

    tilenoas.tiletype = typeKey;
    recomputeMR();

    // keep fastener lists from store snapshot
    if (Array.isArray(datamountedMech.value) && latestMech.value) {
        tilenoas.mechanicaltilefastener = latestMech.value.mechanicaltilefastener;
        tilenoas.fastenerValues = latestMech.value.fastenerValues;
    }
}
watch(
    () => dims.slope,
    () => {
        // multi: re-eval Mg bucket; single: pushTable handles it
        if (isMultiTileValid.value && selectedMulti.value) updateTile({ value: selectedMulti.value });
        else if (!isMultiTileValid.value && Array.isArray(datamountedMech.value) && latestMech.value) pushTable();
    }
);

watch(selectedMulti, (v) => {
    if (isMultiTileValid.value && v) updateTile({ value: v });
});

function onUnderlaymentChange(key) {
    save.value = Number.isFinite(key) ? key : 0;

    const states = {
        0: { isTileValid: false, isUDLValid: false, isUDLNOAValid: false, isSAValid: false },
        1: { isTileValid: true, isUDLValid: false, isUDLNOAValid: false, isSAValid: false },
        2: { isTileValid: true, isUDLValid: false, isUDLNOAValid: false, isSAValid: true }, // System F
        3: { isTileValid: true, isUDLValid: true, isUDLNOAValid: true, isSAValid: false } // System E
    };

    const next = states[save.value] || states[0];
    isTileValid.value = next.isTileValid;
    isUDLValid.value = next.isUDLValid;
    isUDLNOAValid.value = next.isUDLNOAValid;
    isSAValid.value = next.isSAValid;

    if (save.value === 2) {
        sysFcheckInput(); // Hydrate System F
    }
    if (save.value === 3) {
        loadingUDL.value = true; // Start loading feedback
        console.log('Key=3 selected: Starting UDL population...');

        applyUDL(latestEPayload.value); // Keep this—populates udlTile from store (pass sd explicitly)

        // Brief delay to cover reactivity/watcher flush, then stop loading
        setTimeout(() => {
            loadingUDL.value = false;
            // isUDLComplete.value
            console.log('UDL population complete. isUDLComplete:');
        }, 500); // Adjust to 100-300ms if too slow

        // Optional: Force derived fields if system already selected
        if (selectedsystemE.value && !udlTile.designPressure) {
            updateselectSystemE(selectedsystemE.value);
            udlDescPressure(selectedsystemE.value);
        }
    }
}
watch(selectedUnderlaymentKey, onUnderlaymentChange, { immediate: true });
watch(latestEPayload, (sd) => console.log('EPayload updated:', !!sd?.noa));
const slopeOptions = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7
};

const visible = ref(false);

function EcheckInputSystem() {
    datamountedsystemE.value.forEach((item) => {
        udlTile.Maps = item.systemDataE.Maps;
        udlTile.system = Array.isArray(item.systemDataE.system) ? item.systemDataE.system : [item.systemDataE.system].filter(Boolean);
    });
}

function setZonesFromStore() {
    const src = exposureChoosen.value === 'd' ? zoned.value : zones.value;
    const arr = Array.isArray(src?.[0]) ? src[0] : src;
    if (!Array.isArray(arr) || arr.length < 3) return;
    const [z1, z2, z3] = arr.map(Number);
    if (![z1, z2, z3].every(Number.isFinite)) return;
    zoneone.zone = z1;
    zonetwo.zone = z2;
    zonethree.zone = z3;
    console.log(selectedDripstore.$state.inputselectedUserDripEdge);
    tilenoas.dripEdgeMaterial = selectedDripstore.$state.inputselectedUserDripEdge[0]?.dripSelection?.DripEdgeMaterial;
    tilenoas.dripEdgeSize = selectedDripstore.$state.inputselectedUserDripEdge[0]?.dripSelection?.DripEdgeSize;
    console.log(tilenoas.dripEdgeMaterial, tilenoas.dripEdgeSize);
}
watch(
    [() => exposureChoosen.value, () => zones.value, () => zoned.value],
    () => {
        setZonesFromStore();
        recomputeMR();
    },
    { deep: true }
);

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
    if (dims.slope >= 4) {
        isDisabled.value = false;
        addCheckmarks();
        console.log('entered slope');
    } else {
        isDisabled.value = false;
    }
    validateInput();
}
const validateInput = () => {
    validateNumber(dims.slope);
    console.log(dims.slope);
};

const validateHeightInput = () => {
    validateTileHeight(dims.height);
    console.log(dims.height);
    isHeightValid.value = true;
    addCheckmarks();
};

function addCheckmarks() {
    if (isHeightValid.value || isDisabledslope.value) {
        isvalueValid.value = true;
        console.log('Entered checkmarks');
    } else {
        isvalueValid.value = false;
    }
}

function validateHeight() {
    validateHeightInput();
    console.log(height.value);
}

const factor = ref(0.4);
const { getData } = useExposurec();
const { getDatas } = useExposured();
function setRoofInputs() {
    dims.height = heightModel.value;
    dims.per = (dims.height * factor.value).toFixed(2);
    tilenoas.height = dims.height;
    tilenoas.perimeter = dims.per;
    tilenoas.area = dims.area;

    addCheckmarks();
}

const isTileSelectionValid = ref(false);
const showMaterialValid = ref(false);

function checkInput() {
    const first = latestMech.value;
    const isMultiple = first?.Table2?.content === 'multiple';

    showMaterialValid.value = true;
    isMultiTileValid.value = isMultiple;
    isTileSelectionValid.value = !isMultiple;
    isTileValid.value = true; // modal fields visible in both cases

    applyMechNOA(first);
    selectedExposure(); // sets C/D
    checkTile(); // sets zoneone/two/three.zone
    if (!isMultiple) pushTable(); // single case uses existing logic
}

invoke(async () => {
    await until(isTileValid).toBe(true);
    await onOpenExposureClick();
});

async function selectedExposure() {
    const val = selectedExposures?.value?.toLowerCase?.() ?? '';
    const isC = val === 'c';

    exposureChoosen.value = isC ? 'c' : 'd';
    isExposureC.value = !isC;

    console.log({ selectedExposures: selectedExposures.value, isExposureC: isExposureC.value });

    checkTile();
}
let ismrValidMR1 = ref(false);
let ismrValidMR2 = ref(false);
let ismrValidMR3 = ref(false);
let ismrInvalid1 = ref(false);
let ismrInvalid2 = ref(false);
let ismrInvalid3 = ref(false);

async function checkMaterial() {
    if (latestMech.value?.Table2?.content === 'multiple') {
        console.log('Entered multiple');
        checkTile();
    }

    if (exposureChoosen.value === 'c') {
        console.log('Else C exposure', exposureChoosen);

        setZonesFromStore();
    } else {
        console.log('D exposure');

        setZonesFromStore();
    }

    tilenoas.manufacturer = latestMech.value?.manufacturer;
    tilenoas.material = latestMech.value?.material;
}
function clampNumber1(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

async function pushTable() {
    // Null-safe access to latestMech
    const mech = latestMech.value || {};
    const table2 = mech.Table2 || {};
    const table3 = mech.Table3 || {};

    // Update description
    tilenoas.description = mech.description || '';

    // Set lambda for all zones (same value from Direct_Deck)
    const lambda = Number(table2.Direct_Deck) || 0;
    zoneone.lambda1 = lambda;
    zonetwo.lambda2 = lambda;
    zonethree.lambda3 = lambda;

    // Map slope ranges to Table3 keys
    const slopeToKey = {
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven'
    };

    // Clamp slope and determine Table3 key
    const slope = clampNumber1(Number(dims.slope), 2, 12);
    const slopeKey = slopeToKey[Math.floor(slope)] || 'seven'; // Fallback to 'seven' for slopes >= 7

    // Set mg for all zones based on slope
    const mg = Number(table3[slopeKey]) || 0;
    zoneone.mg1 = mg;
    zonetwo.mg2 = mg;
    zonethree.mg3 = mg;

    // Recalculate MR values
    recomputeMR();
}
watch(
    latestNOAFromStore,
    (v) => {
        if (v && !query.value) query.value = v;
    },
    { immediate: true }
);

const modalIsActive = ref(false);

watch(modalIsActive, (open) => {
    if (!open) return;
    if (!selectedMechanical.value && fastenerOptions.value.length) {
        const first = fastenerOptions.value[0];
        selectedMechanical.value = first.key ?? first;
        updateMF(selectedMechanical.value);
    }
});

// pretty-print keys like "two_ten_d_RS_Nails" -> "Two Ten D RS Nails"
function prettifyFastenerKey(k = '') {
    return String(k)
        .replace(/[_\-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

// 1) Options for the Select: always [{ key, label }]
const fastenerOptions = computed(() => {
    const src = tilenoas.mechanicaltilefastener;

    if (Array.isArray(src)) {
        // array of strings -> wrap
        if (typeof src[0] === 'string') {
            return src.map((k) => ({ key: k, label: prettifyFastenerKey(k) }));
        }
        // already array of objects -> assume they have { key, label }
        return src;
    }

    if (src && typeof src === 'object') {
        // object map -> keys become options
        return Object.keys(src).map((k) => ({ key: k, label: prettifyFastenerKey(k) }));
    }

    return [];
});

// 2) Map for key -> Mf value, kept FRESH whenever data changes
const fastenerValuesMap = computed(() => {
    const fv = tilenoas.fastenerValues;
    const list = tilenoas.mechanicaltilefastener;
    console.log(fv, list);
    // if backend sends parallel arrays
    if (Array.isArray(list) && Array.isArray(fv)) {
        return Object.fromEntries(list.map((k, i) => [k, fv[i]]));
    }
    // if backend sends an object map already
    if (fv && typeof fv === 'object') return fv;

    return {};
});

function updateMF(newKey) {
    const key = newKey ?? selectedMechanical.value; // new selection
    console.log(key);
    if (!key) return;

    tilenoas.savedfastener = key;
    const mf = fastenerValuesMap.value[key];
    // Ideally fastenerValues is a map: { [key]: mfNumber }
    if (mf == null) return;

    zoneone.mf1 = mf;
    zonetwo.mf2 = mf;
    zonethree.mf3 = mf;

    // If pushTable() sets λ/Mg from slope, keep it — but call it BEFORE MR checks if you need fresh Mg
    pushTable();

    const mr1 = useToNumber(zoneone.mr1).value;
    const mr2 = useToNumber(zonetwo.mr2).value;
    const mr3 = useToNumber(zonethree.mr3).value;
    const mfNum = useToNumber(mf).value;

    ismrValidMR1.value = mr1 < mfNum;
    ismrInvalid1.value = !ismrValidMR1.value;
    ismrValidMR2.value = mr2 < mfNum;
    ismrInvalid2.value = !ismrValidMR2.value;
    ismrValidMR3.value = mr3 < mfNum;
    ismrInvalid3.value = !ismrValidMR3.value;
}

function updateselectSystemE(selectedsystemE) {
    const sys = udlTile.system || [];
    const dp = udlTile.arrDesignPressure || [];

    // Map system values to design pressures
    keyValueSystemEPairsValues.value = Object.fromEntries(sys.map((key, i) => [key, dp[i] || '']));

    // Optionally map keys
    keyValueSystemEPairsKeys.value = Object.fromEntries(sys.map((key, i) => [key, sys[i] || '']));

    // Only call if selectedsystemE and its value exist
    const sysKey = selectedsystemE?.value;
    if (sysKey && keyValueSystemEPairsValues.value[sysKey] !== null) {
        udlDescPressure(selectedsystemE);
    }
}
// const isUDLComplete = ref(false);

const isUDLComplete = computed(() => {
    const { noa, manufacturer, material, designPressure, systemSelected } = udlTile;
    console.log(noa, manufacturer, material, designPressure, systemSelected);
    return noa && manufacturer && material && designPressure && systemSelected;
});
watch(
    latestEPayload,
    (sd) => {
        if (sd) {
            applyUDL(sd);
            if (selectedsystemE.value && !udlTile.designPressure) {
                udlDescPressure(selectedsystemE.value);
            }
        }
    },
    { immediate: true }
);
const modalExposureIsActive = ref(false);
const modalKeyExp = ref(false);
const modalKeyUDL = ref(0);
const currentTileUDl = ref(null);
const currentTileExp = ref(null);
const modalKey = ref(0);
const modalKeySA = ref(0);
const currentTile = ref(null);

const currentTileSA = ref(null);

watch(
    () => modalExposureIsActive.value,
    (newVal) => {
        console.log('Exposure Modal changed:', newVal);
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

function toPlainUDL(v) {
    const x = unref(v);
    console.log(x);

    return isProxy(x) ? toRaw(x) : x;
}

function toPlainExposure(v) {
    const x = unref(v);
    console.log(x);
    return isProxy(x) ? toRaw(x) : x;
}
function toPlainSA(v) {
    const x = unref(v);
    console.log(x);

    return isProxy(x) ? toRaw(x) : x;
}

async function onOpenExposureClick() {
    await nextTick();

    // 2) build a plain POJO snapshot with just the fields you need
    const src = toPlainExposure(/* selected or shingles or wherever your data lives */ selectedExposures);
    console.log(src);
    currentTileExp.value = {
        manufacturer: src?.manufacturer ?? '',
        material: src?.material ?? '',
        description: src?.description ?? ''
    };

    // 3) bump key BEFORE show if you want a hard reset
    modalKeyExp.value;

    // 4) wait a tick so Vue sees the new props, THEN show the modal
    await nextTick();
    modalKeyExp.value;

    modalExposureIsActive.value = true;
}
const loadingUDL = ref(false);
const isUDLLoaded = ref(false);

async function onOpenTileUDLClick() {
    if (loadingUDL.value) return;
    loadingUDL.value = true;
    isUDLLoaded.value = false;
    modalKeyUDL.value++;

    try {
        await nextTick();

        // Snapshot
        const src = toPlainUDL(udlTile);
        currentTileUDl.value = {
            udlmanufacturer: src?.manufacturer ?? '',
            udlmaterial: src?.material ?? '',
            udldescription: src?.udldescription ?? '',
            udlsystem: src?.system ?? []
        };

        isUDLLoaded.value = !!udlTile.noa && udlTile.system.length;
        modalKeyUDL.value++;
        await nextTick();
        modalUDLIsActive.value = true;
    } catch (err) {
        console.error('UDL modal open failed:', err);
        // Optional: Show toast
    } finally {
        loadingUDL.value = false;
    }
}

async function onOpenTileSAClick() {
    await nextTick();

    sysFcheckInput();
    // 2) build a plain POJO snapshot with just the fields you need
    const src = toPlainSA(/* selected or shingles or wherever your data lives */ saTiles);
    currentTileSA.value = {
        samanufacturer: src?.manufacturer ?? '',
        samaterial: src?.material ?? '',
        sasystem: src?.system ?? ''
    };
    modalKeySA.value++;
    await nextTick(() => {
        modalSAIsActive.value = true;
    });
}
async function closeTileModal() {
    // hide first, a
    modalSAIsActive.value = false;

    // after it’s gone, optionally bump the key for the next open, on 9/11/2025 added the await it may not need it.
    await nextTick(() => {
        modalKeySA.value++;
    });
    mechSAStaging();
}
async function closeTileUDLModal() {
    // hide first, a
    modalUDLIsActive.value = false;

    // after it’s gone, optionally bump the key for the next open, on 9/11/2025 added the await it may not need it.
    await nextTick(() => {
        modalKeyUDL.value++;
    });
}

function udlDescPressure(selectedsystemE) {
    const key = selectedsystemE?.value || selectedsystemE || '';
    if (!key) return;

    const descriptionKey = `TileCap_Sheet_Description_${key}`;
    const anchorKey = `Anchor_Base_Sheet_${key}`;

    udlTile.TileCap_Sheet_Description = udlTile[descriptionKey] || '';
    udlTile.Anchor_Base_Sheet = Anchor_Base[anchorKey] || '';
    udlTile.designPressure = keyValueSystemEPairsValues.value[key] || '';
    udlTile.systemSelected = key;
    if (tilesysEinput[0]?.length > 0) {
        const input = tilesysEinput[0].systemDataE;
        input.Anchor_Base = udlTile.Anchor_Base_Sheet;
        input.tileCap = udlTile.TileCap_Sheet_Description;
        input.dP = udlTile.designPressure;
        input.systemSelected = key;
        input.prescriptiveSelection = selectedUnderlaymentOpt.value?.selectedBasesheet ?? '';
    }

    // Sync back to udlTile (existing)
    udlTile.udldescription = udlTile.TileCap_Sheet_Description;
    udlTile.pressure = udlTile.designPressure;

    console.log('udlDescPressure updated udlTile:', udlTile); // Debug
}

watch(
    selectedsystemE,
    (val) => {
        if (val) {
            updateselectSystemE(val);
            udlDescPressure(val);
        }
    },
    { immediate: true }
);

const mechUdlStaging = async () => {
    const eInput = tilesysEinput.value?.[0]?.systemDataE;
    console.log('Store eInput in staging:', eInput);

    if (!eInput) {
        console.error('No eInput in staging - check store update');
        return;
    }

    // Sync Anchor_Base
    udlTile.Anchor_Base = eInput.Anchor_Base || udlTile.Anchor_Base_Sheet || '';

    // Populate base fields (persistent)
    udlTile.noa ||= eInput.noa || '';
    udlTile.manufacturer ||= eInput.manufacturer || '';
    udlTile.material ||= eInput.material || '';

    // Force derived (now await tick for reactivity)
    if (!udlTile.designPressure && selectedsystemE.value) {
        udlDescPressure(selectedsystemE.value);
        await nextTick(); // Ensure udlTile updates flush
    }
    // console.log('Is UDL Complete', isUDLComplete.value, latestEPayload.value, loadingUDL.value);
    // console.log('udlTile after population:', toPlainUDL(udlTile));

    // Re-check completeness post-tick
    if (!isUDLComplete.value) {
        console.warn('UDL incomplete, skipping post. Missing:', {
            noa: !udlTile.noa,
            manufacturer: !udlTile.manufacturer,
            material: !udlTile.material,
            designPressure: !udlTile.designPressure,
            systemSelected: !udlTile.systemSelected
        });
        // Optional: Open toast or re-open modal for user fix
        return;
    }

    const body = {
        ...commonTile(),
        udlapplicant: udlTile.manufacturer || '',
        udlnoa: udlTile.noa || '',
        udlmaterial: udlTile.material || '',
        udldescription: eInput.tileCap || udlTile.TileCap_Sheet_Description || udlTile.udldescription || '',
        systemeselection: udlTile.systemSelected || eInput.systemSelected || '',
        designpressure: udlTile.designPressure || '',
        anchorbasesheet: udlTile.Anchor_Base_Sheet || eInput.Anchor_Base || udlTile.Anchor_Base || '',
        hittype: 'system_e',
        udlIdentifier: 'udl'
    };
    console.log('UDL Body Debug:', body);
    await postMech(body);
};

// helpers (put once in <script setup> if you don't already have something similar)
const toPlain = (v) => JSON.parse(JSON.stringify(unref(v)));
const num = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
};
const tileStaging = async () => {
    const body = {
        ...commonTile(),

        hittype: tilenoas.hittype
    };
    await postMech(body);
};
// Optional: one-line overall check based on your flags
const allZonesPass = computed(() => ismrValidMR1.value && ismrValidMR2.value && ismrValidMR3.value);
const commonTile = () => ({
    mechIdentifier: 'mechanicalTile',
    noa: tilenoas.noa ?? '',
    applicant: tilenoas.manufacturer ?? '',
    description: tilenoas.description ?? '',
    material: tilenoas.material ?? '',
    decktype: tilenoas.deckType ?? '',
    area: num(dims.area),
    height: num(dims.height),
    slope: num(dims.slope),
    dripEdgeMaterial: tilenoas.dripEdgeMaterial,
    dripEdgeSize: tilenoas.dripEdgeSize,
    perimeter: num(tilenoas.perimeter),
    fastenervalues: tilenoas.savedfastener ?? '',
    hittype: 'astm',

    // clone zones to plain objects so you don't leak reactivity
    zoneone: toPlain(zoneone),
    zonetwo: toPlain(zonetwo),
    zonethree: toPlain(zonethree),

    // give this a real boolean, not the Boolean constructor
    checkvalues: allZonesPass.value,
    prescriptiveSelection: udlTile.prescriptiveSelection || saTiles.prescriptiveSelection || tilenoas.prescriptiveSelection || ''
});
const mechSAStaging = async () => {
    const key = normalizeSysKey(selectedsystemf.value || saTiles.system[0] || '');
    const dpIndex = saPayload.System.indexOf(key);
    const designPressure = dpIndex !== -1 && saPayload.Designpressure[dpIndex] ? saPayload.Designpressure[dpIndex] : saTiles.designpressure || '';

    const body = {
        ...commonTile(),
        samanufacturer: saTiles.manufacturer || '',
        sanoa: saTiles.noa || '',
        sasystem: key || '',
        samaterial: saTiles.material || '',
        sadescription: (key && (sysToDesc.value[key] || '')) || saTiles.description || '',
        designpressure: designPressure,
        hittype: 'system_f',
        saIdentifier: 'sa'
    };
    console.log('mechSAStaging payload:', body);
    await postMech(body);
};
</script>
<template>
    <div id="tile" class="inner mx-auto max-w-5xl p-6 dark:bg-gray-800 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4" style="margin-left: 150px">
        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px; margin-top: 30px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" @change="getdeckType" />
        </div>

        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px">
            <label for="slope">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" placeholder="slope" v-model.number="dims.slope" :disabled="isDisabledslope" @change="validateRoofSlope" />
            <Message v-if="errorMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorMessage }}</Message>
        </div>
        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="area">Area of Tile</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" readonly />
        </div>
        <div class="w-64 mt-3 space-y-2" style="margin-left: 20px">
            <label for="height">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText ref="heightInputRef" id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="heightModel" type="text" placeholder="height" @input="setRoofInputs" :disabled="isDisabled" @change="validateHeight" />
            <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message>
        </div>
        <DripEdMechTile />

        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label for="perimeter">Roof Perimeter(a) = 4h</label>
            <InputText id="perimeter" v-model="dims.per" type="text" placeholder=" " @change="setRoofInputs" readonly />
        </div>

        <div class="min-w-[780px] flex flex-col mb-4 mt-6 gap-3 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
            <Select v-model="selectedUnderlaymentKey" :options="underlaymentType" optionLabel="selectedBasesheet" optionValue="key" placeholder="make selection" @change="assignUnderlayment" />
        </div>
        <Divider />
        <div class="grid grid-cols-1 md:grid-cols-1 gap-2">
            <div v-show="isTileValid" class="w-128 mt-6 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 50px">
                <label style="color: red">Select Exposure *</label>
                <div class="flex items-center space-x-4">
                    <div class="field-radiobutton space-x-4 gap-2 border-2 border-gray-700 focus:border-orange-600">
                        <RadioButton inputId="option3" name="option" value="c" variant="filled" :invalid="selectedExposures === null" v-model="selectedExposures" @update="selectedExposure" />
                        <label for="option3">C</label>
                    </div>
                    <div class="field-radiobutton space-x-4 gap-2 border-2 border-gray-700 focus:border-orange-600">
                        <RadioButton inputId="option4" name="option" value="d" variant="filled" :invalid="selectedExposures === null" v-model="selectedExposures" @update="selectedExposure" />
                        <label for="option4">D</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div></div>
    <Divider />

    <!-- Row: Tile NOA (left) and System E/F (right) -->
    <div class="px-12">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2" style="margin-left: 75px">
            <!-- LEFT: Tile NOA -->
            <div v-show="isTileValid" class="border-2 border-gray-700 rounded-md p-4 flex flex-col justify-start gap-4" v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }">
                <FloatLabel class="w-72">
                    <InputText id="tilenoa" v-model="query" class="h-8" @input="onInput" @focus="showSuggestions = true" @blur="hideSuggestions" @keydown.enter.prevent="submitNOA" />
                    <label for="tilenoa">Tile NOA: 00000000</label>
                </FloatLabel>

                <Button label="Submit" class="w-28" severity="contrast" :disabled="String(query ?? '').replace(/\D/g, '').length < 6" :loading="loadingMech" @click="submitAndOpen" />

                <!-- Suggestions -->
                <ul v-if="showSuggestions && filteredSuggestions.length" class="mt-2 max-h-48 overflow-auto border rounded-md divide-y bg-white">
                    <li v-for="(suggestion, index) in filteredSuggestions" :key="index" class="px-3 py-2 hover:bg-gray-50 cursor-pointer" @mousedown.left="selectSuggestion(suggestion)">
                        {{ suggestion }}
                    </li>
                </ul>

                <!-- Loading Spinner -->
                <transition name="fade">
                    <div v-if="loadingMech" class="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
                        <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
                    </div>
                </transition>
            </div>

            <!-- RIGHT: System E or F -->
            <div v-if="isUDLNOAValid || isSAValid" class="border-2 border-gray-700 rounded-md p-4 flex flex-col justify-start gap-4">
                <template v-if="isUDLNOAValid">
                    <systemENumber />
                    <Button label="Submit" class="w-28" severity="contrast" :disabled="!latestEPayload || !isUDLComplete" :loading="loadingUDL" @click="onOpenTileUDLClick" style="margin-left: 25px; margin-bottom: 5px" />
                </template>

                <template v-else-if="isSAValid">
                    <systemFNumber />
                    <Button label="Submit" class="w-28" severity="contrast" @click="onOpenTileSAClick" style="margin-left: 25px; margin-bottom: 5px" />
                </template>
            </div>
        </div>
    </div>
    <Divider />
    <Divider />

    <ModalWindow
        :key="modalKeyUDL"
        :initialData="currentTileUDl"
        @closePopup="
            () => {
                if (selectedsystemE.value) updateselectSystemE(selectedsystemE);
                closeTileUDLModal();
                mechUdlStaging();
            }
        "
        v-if="modalUDLIsActive && isUDLLoaded"
    >
        <div v-show="isUDLNOAValid" class="grid grid-cols-2 gap-2">
            <!-- Loading State -->
            <div v-if="!isUDLLoaded" class="col-span-2 flex items-center justify-center p-4">
                <ProgressSpinner style="width: 24px; height: 24px" strokeWidth="4" />
                <span class="ml-2">Loading UDL data...</span>
            </div>

            <!-- Fields -->
            <div v-else class="grid grid-cols-2 md:grid-cols-2 gap-4" style="margin-left: 40px">
                <div class="min-w-[30px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" :value="udlTile.manufacturer || initialData?.udlmanufacturer || ''" @input="udlTile.manufacturer = $event.target.value" />
                </div>
                <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="material">(UDL) Material</label>
                    <InputText id="material" :value="udlTile.material || initialData?.udlmaterial || ''" @input="udlTile.material = $event.target.value" />
                </div>
                <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                    <label style="color: red">Select System E *</label>
                    <Select v-model="selectedsystemE" :options="udlTile.system" placeholder="Select System" @change="updateselectSystemE($event.value)" />
                </div>
                <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="designPressure">Design psf:</label>
                    <InputText id="designPressure" v-model="udlTile.designPressure" />
                </div>
                <div v-show="isUDLNOAValid" class="grid grid-cols-1 gap-2 border-gray-700 focus:border-orange-600" style="margin-left: 2px">
                    <div class="min-w-[1080px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                        <AnchorInputWrapper id="anchor" v-model="udlTile.Anchor_Base_Sheet" placeholder="Enter anchor base sheet" />
                    </div>
                    <div class="min-w-[480px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                        <label style="color: #122620" for="description">(UDL) Description</label>
                        <InputText id="description" :value="udlTile.TileCap_Sheet_Description || initialData?.udldescription || ''" @input="udlTile.TileCap_Sheet_Description = $event.target.value" />
                    </div>
                </div>
            </div>
        </div>
    </ModalWindow>

    <ModalWindow :key="modalKeySA" :initialData="currentTileSA" @closePopup="closeTileModal()" v-if="modalSAIsActive">
        <!-- mechSAStaging() -->
        <div v-show="isSAValid" class="grid grid-cols-2 md:grid-cols-2 gap-4" style="margin-left: 50px">
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="saapplicant">S/A Applicant</label>
                <InputText id="saapplicant" v-model="saTiles.manufacturer" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="samaterial">S/A Material Type</label>
                <InputText id="saaterial" v-model="saTiles.material" />
            </div>

            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: red">Select System F * </label>
                <Select v-model="selectedsystemf" :options="sysOptions" optionLabel="label" optionValue="value" placeholder="Select System" />

                <ProgressSpinner v-if="!sysOptions.length" style="width: 24px; height: 24px" strokeWidth="4" />
            </div>

            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="designpressure">Design psf: </label>
                <InputText id="designpressure" v-model="fDpForSelected" :disabled="!currentSysKey" />
            </div>
            <div v-show="!!currentSysKey" class="min-w-[490px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="sadescription">S/A Description</label>
                <InputText id="capsheetdescription" v-model="fDescForSelected" :disabled="!currentSysKey" />
            </div>
        </div>
    </ModalWindow>
    <!-- no function is called at closePopup because we are just saving the data -->
    <div v-if="!isAstm" class="w-2/3 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
        <ModalWindow :key="modalKey" @closePopup="modalIsActive = false" v-if="modalIsActive">
            <div v-show="isTileValid" class="grid grid-cols-2 md:grid-cols-2 gap-2" style="margin-left: 30px">
                <div class="min-w-[350px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="manufacturer">Tile Applicant</label>
                    <InputText id="manufacturer" v-model="tilenoas.manufacturer" />
                </div>
                <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="material">Tile Material</label>
                    <InputText id="description" v-model="tilenoas.material" />
                </div>
                <div v-show="isTileValid" class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                    <div v-show="isTileSelectionValid" class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                        <label style="color: red">Select Mechanical Tile Fastener *</label>
                        <Select v-model="selectedMechanical" :options="tilenoas.mechanicaltilefastener" @update:modelValue="updateMF" />
                    </div>
                </div>
                <div></div>
                <div v-show="!isMultiTileValid" class="w-3/4 border-2 p-2 gap-4 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="description">Tile Description</label>
                    <InputText class="min-w-[500px] flex flex-col gap-2 border-2" id="description" v-model="tilenoas.description" @update:modelValue="checkMaterial" />
                </div>
            </div>

            <div v-show="isMultiTileValid" class="w-full flex flex-row mt-8 space-x-10" style="margin-left: 30px">
                <div class="min-w-[200px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="selecttile">Tile Type</label>
                    <Select v-model="selectedMulti" :options="tilenoas.select_tile" placeholder="make a selection" @update:modelValue="checkTile" @change="updateTile" />
                </div>
                <div v-show="isMultiTileValid" class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 30px">
                    <label style="color: red">Select Mechanical Tiles Fastnener *</label>
                    <Select v-model="selectedMechanical" :options="tilenoas.mechanicaltilefastener" @update:modelValue="updateMF" />
                </div>
            </div>
        </ModalWindow>
    </div>
    <ModalWindow :key="modalKey" :initialData="currentTile" @closePopup="handleTileModalClose" v-if="modalIsActive">
        <div v-show="isTileValid" class="grid grid-cols-2 md:grid-cols-2 gap-2" style="margin-left: 30px">
            <div class="min-w-[350px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">Tile Applicant</label>
                <InputText id="manufacturer" v-model="tilenoas.manufacturer" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Tile Material</label>
                <InputText id="description" v-model="tilenoas.material" />
            </div>
            <div v-show="isTileValid" class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <div v-show="isTileSelectionValid" class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: red">Select Mechanical Tile Fastener *</label>
                    <Select v-model="selectedMechanical" :options="tilenoas.mechanicaltilefastener" @update:modelValue="updateMF" />
                </div>
            </div>
            <div></div>
            <div v-show="!isMultiTileValid" class="w-3/4 border-2 p-2 gap-4 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="description">Tile Description</label>
                <InputText class="min-w-[500px] flex flex-col gap-2 border-2" id="description" v-model="tilenoas.description" @update:modelValue="checkMaterial" />
            </div>
        </div>

        <div v-show="isMultiTileValid" class="w-full flex flex-row mt-8 space-x-10" style="margin-left: 30px">
            <div class="min-w-[200px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="selecttile">Tile Type</label>
                <Select v-model="selectedMulti" :options="tilenoas.select_tile" placeholder="make a selection" @update:modelValue="checkTile" @change="updateTile" />
            </div>
            <div v-show="isMultiTileValid" class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 30px">
                <label style="color: red">Select Mechanical Tiles Fastnener *</label>
                <Select v-model="selectedMechanical" :options="tilenoas.mechanicaltilefastener" @update:modelValue="updateMF" />
            </div>
        </div>
    </ModalWindow>
    <div class="flex flex-wrap gap-1 mt-10" style="margin-left: 1px">
        <table width="100%" align="left">
            <tbody>
                <tr>
                    <td valign="middle">
                        <table style="margin: auto; font-size: large; font-weight: bold; font-family: arial">
                            <tbody>
                                <tr>
                                    <td style="color: #122620">Zone 1:</td>
                                    <td style="color: #122620"><input v-model="zoneone.zone" readonly="" size="4" name="zone1" value="" /> x λ &nbsp;</td>
                                    <td style="color: #122620"><input v-model="zoneone.lambda1" readonly="" size="4" name="lambda1" value="" /> - Mg:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zoneone.mg1" readonly="" size="4" name="mg1" value="" /> = Mr1:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zoneone.mr1" readonly="" size="4" name="mr1" value="" /> NOA Mf:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zoneone.mf1" readonly="false" size="6" name="mf1" value="" @change="updateMF" /> &nbsp;</td>

                                    <i class="pi pi-check" v-show="ismrValidMR1" style="color: green; font-size: 1.5rem"></i>
                                    <i class="pi pi-times" v-show="ismrInvalid1" style="color: red; font-size: 1.5rem"></i>
                                </tr>

                                <tr>
                                    <td style="color: #122620">Zone 2:</td>
                                    <td style="color: #122620"><input v-model="zonetwo.zone" readonly="" size="4" name="zone2" value="" /> x λ &nbsp;</td>
                                    <td style="color: #122620"><input v-model="zonetwo.lambda2" readonly="" size="4" name="lambda2" value="" /> - Mg:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zonetwo.mg2" readonly="" size="4" name="mg2" value="" /> = Mr2:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zonetwo.mr2" readonly="" size="4" name="mr2" value="" /> NOA Mf:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zonetwo.mf2" readonly="false" size="6" name="mf2" value="" @change="updateMF" />&nbsp;</td>
                                    <i class="pi pi-check" v-show="ismrValidMR2" style="color: green; font-size: 1.5rem"></i>
                                    <i class="pi pi-times" v-show="ismrInvalid2" style="color: red; font-size: 1.5rem"></i>
                                </tr>

                                <tr>
                                    <td style="color: #122620">Zone 3:</td>
                                    <td style="color: #122620"><input v-model="zonethree.zone" readonly="" size="4" name="zone3" value="" /> x λ</td>
                                    <td style="color: #122620"><input v-model="zonethree.lambda3" readonly="" size="4" name="lambda3" value="" /> - Mg:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zonethree.mg3" readonly="" size="4" name="mg5" value="" /> = Mr3:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zonethree.mr3" readonly="" size="4" name="mr3" value="" /> NOA Mf:&nbsp;</td>
                                    <td style="color: #122620"><input v-model="zonethree.mf3" readonly="false" size="6" name="mf3" value="" @change="updateMF" />&nbsp;</td>
                                    <i class="pi pi-check" v-show="ismrValidMR3" style="color: green; font-size: 1.5rem"></i>
                                    <i class="pi pi-times" v-show="ismrInvalid3" style="color: red; font-size: 1.5rem"></i>
                                </tr>
                                <Message v-if="visible" severity="error" :life="3000">Select Another Material</Message>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="text-xs mt-2" v-if="datamountedMech?.[0]?.Table3" style="margin-left: 350px">
            <div><b>λ (Direct_Deck):</b> {{ zoneone.lambda1 }}</div>
            <div>
                <b>Mg by slope:</b> 2: {{ datamountedMech[0].Table3.two }}, 3: {{ datamountedMech[0].Table3.three }}, 4: {{ datamountedMech[0].Table3.four }}, 5: {{ datamountedMech[0].Table3.five }}, 6: {{ datamountedMech[0].Table3.six }}, 7:
                {{ datamountedMech[0].Table3.seven }}
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
/* Make PrimeVue FloatLabel inputs the same height everywhere, even inside child components */
:deep(.p-inputtext) {
    height: 2.2rem !important; /* h-12 */
}
</style>
