<script setup>
import ModalWindow from '@/components/Modal/ModalWindow.vue';
import systemENumber from '@/components/roofSystems/systemENumber.vue';
import systemFNumber from '@/components/roofSystems/systemFNumber.vue';
import usePostMechanicalToLambda from '@/composables/Postdata/usePostMechanicalLambda';
import useUDL from '@/composables/TileFunc/systemE';
import useExposurec from '@/composables/Tiletables/exposure_c';
import useExposured from '@/composables/Tiletables/exposure_d';
import { useHeightValidation } from '@/composables/Validation/use-mechHeight';
import { useNumberValidation } from '@/composables/Validation/use-mechSlope';
// import { useTileNoas } from '@/composables/businesslogic/useTileNoas';
import useMechNumber from '@/composables/fetchTech/use-systemMechNumber';
import useMech from '@/composables/fetchTech/use-tileMechanical';
import { useGlobalState } from '@/stores/exposurecStore';
import { useExposureD } from '@/stores/exposuredStore';
import { useRoofListStore } from '@/stores/roofList';
import { usetilesysfStore } from '@/stores/tilesysfStore';
import { invoke, until, useToNumber } from '@vueuse/core';

import usemultiTile from '@/composables/businesslogic/use-multiTile';
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import ProgressSpinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import { computed, isProxy, nextTick, onMounted, reactive, ref, toRaw, unref, watch } from 'vue';

const ftileStore = usetilesysfStore();
const { workoutData, multiTiles } = usemultiTile();
// Input query
const query = ref('');
const { tbd, zoned } = useExposureD();

// const paddySeleted = ref('');
// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);
// This calls the NOAs
const { callNumber, mechanicalStore } = useMechNumber();
const { postMech, postUDLMech, postSAMech } = usePostMechanicalToLambda();
// const { mechTilenoa, isThiscomplextile, isCompTileValid, useNoaTick } = useTileNoas();

const { takeMechInput, mechanicalData, mechStore } = useMech();
console.log(mechStore);
const { etileStore } = useUDL();

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
    slope: '',
    height: '',
    dripEdgeMaterial: '',
    dripEdgeSize: '',
    deckType: '',
    expiration_date: '',
    prescriptiveSelection: '',
    perimeter: '',
    tiletype: '',
    savedfastener: ''
});
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const isHeightValid = ref(false);
const selectedMulti = ref(null);

const isDisabledslope = ref(true);
const isDisabled = ref(true);
const mechanical = ref([]);

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
const dimensions = computed(() => {
    setRoofInputs();
});

onMounted(() => {
    callNumber();
    mechanical.value = mechanicalStore.$state;
    console.log(mechanical.value);
});

onMounted(() => {
    roofList.value.forEach((item, index) => {
        if (item.item === 'Mechanical Fastened Tile') {
            dims.area = item.dim3;
        }
    });
});
let datamounted = ref(ftileStore.$state.tilefinput);
const selectedsystemf = ref(null);

let datamountedsystemE = ref(etileStore.$state.tilesysEinput);
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

// ---- System F helpers (JS) ----
function mapFromArrays(keys = [], vals = []) {
    const out = {};
    keys.forEach((k, i) => {
        out[k] = vals ? vals[i] : '';
    });
    return out;
}

// F -> Design Pressure (e.g., {F1:-60, F2:-75})
const fSysMap = computed(() => {
    const sys = Array.isArray(saTiles.system) ? saTiles.system : [];
    const dp = Array.isArray(saTiles.arrDesignPressure) ? saTiles.arrDesignPressure : [];
    return mapFromArrays(sys, dp);
});

// F -> Description (collect Description_F*)
const fDescMap = computed(() => {
    const out = {};
    Object.keys(saTiles).forEach((k) => {
        const m = /^Description_(F\d+)$/.exec(k);
        if (m) out[m[1]] = String(saTiles[k] ?? '');
    });
    return out;
});

// Bindable views for the currently selected F
const fDpForSelected = computed({
    get: () => (selectedsystemf.value ? String(fSysMap.value[selectedsystemf.value] ?? '') : ''),
    set: (v) => {
        saTiles.designpressure = String(v ?? '');
    }
});
const fDescForSelected = computed({
    get: () => (selectedsystemf.value ? String(fDescMap.value[selectedsystemf.value] ?? '') : ''),
    set: (v) => {
        saTiles.description = String(v ?? '');
    }
});

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
    console.log('fastener options', fastenerOptions.value);
    console.log('fastener map', fastenerValuesMap.value);
    console.log(src);
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
    { immediate: true }
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
    // paddyInputSelected?.pdNumbers?.noa ?? []
    // console.log(mechanical.value.tileMechInput[0]?.tileMechNumber.noa);
    newArray.value = mechanical.value.tileMechInput[0]?.tileMechNumber?.noa;
    // console.log(newArray.value);
    iterateItem.value = newArray.value.body ?? [];
    const stringyfied1 = JSON.stringify(iterateItem.value).split('[').join();

    const stringyfied2 = JSON.stringify(stringyfied1).split(']').join();
    const splitItem = computed(() => stringyfied2.split(',').map((s) => s.trim()));

    return splitItem.value.filter((item) => item.toString().includes(query.value));
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
    saIdentifier: 'sa'
});
const udlTile = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [], // must be an array
    designPressure: '',
    Anchor_Base_Sheet: '',
    TileCap_Sheet_Description: '',

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
const Anchor_Base = reactive(Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`Anchor_Base_Sheet_E${i + 1}`, ''])));
const latestEPayload = computed(() => {
    const arr = Array.isArray(etileStore.$state.tilesysEinput) ? etileStore.$state.tilesysEinput : [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const sd = arr[i]?.systemDataE;
        if (sd && Object.keys(sd).length) return sd;
    }
    return null;
});

function applyUDL(sd) {
    if (!sd) return;
    udlTile.noa = sd.noa ?? '';
    udlTile.manufacturer = sd.manufacturer ?? '';
    udlTile.material = sd.material ?? '';
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
}

watch(latestEPayload, (sd) => applyUDL(sd), { immediate: true, deep: true });

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

// Method to update the input field with selected suggestion query.value = suggestion
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

const selectedMechanical = ref(null);

const selectedUnderlaymentKey = ref(0); // 0,1,2,3
const selectedUnderlaymentOpt = computed(() => (underlaymentType.value || []).find((o) => o.key === selectedUnderlaymentKey.value) || null);
const underlaymentType = ref([
    { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
    { selectedBasesheet: 'Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
    { selectedBasesheet: '(S/A) Tile Capsheet: adhered diretly to a wood deck, per the NOA System F', key: 2 },
    { selectedBasesheet: '(S/A) Tile Capsheet: adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E', key: 3 }
]);
function onUnderlaymentChange(key) {
    save.value = Number.isFinite(key) ? key : 0;

    const states = {
        0: { isTileValid: false, isUDLValid: false, isUDLNOAValid: false, isSAValid: false },
        1: { isTileValid: true, isUDLValid: false, isUDLNOAValid: false, isSAValid: false },
        2: { isTileValid: true, isUDLValid: false, isUDLNOAValid: false, isSAValid: true }, // <- F
        3: { isTileValid: true, isUDLValid: true, isUDLNOAValid: true, isSAValid: false } // <- E
    };

    const next = states[save.value] || states[0];
    isTileValid.value = next.isTileValid;
    isUDLValid.value = next.isUDLValid;
    isUDLNOAValid.value = next.isUDLNOAValid;
    isSAValid.value = next.isSAValid;

    if (save.value === 2) sysFcheckInput(); // hydrate System F now
    if (save.value === 3) applyUDL(); // hydrate System E now
}
watch(selectedUnderlaymentKey, onUnderlaymentChange, { immediate: true });

const slopeOptions = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7
};

const isDataValid = ref(true);

const visible = ref(false);

// const Anchor_Base = reactive({
//     Anchor_Base_Sheet_E1: '',
//     Anchor_Base_Sheet_E2: '',
//     Anchor_Base_Sheet_E3: '',
//     Anchor_Base_Sheet_E4: '',
//     Anchor_Base_Sheet_E5: '',
//     Anchor_Base_Sheet_E6: '',
//     Anchor_Base_Sheet_E7: '',
//     Anchor_Base_Sheet_E8: '',
//     Anchor_Base_Sheet_E9: '',
//     Anchor_Base_Sheet_E10: '',
//     Anchor_Base_Sheet_E11: '',
//     Anchor_Base_Sheet_E12: '',
//     Anchor_Base_Sheet_E13: ''
// });

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
    // const list = datamountedMech?.value ?? [];
    // if (!Array.isArray(list) || list.length === 0) return;
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
function resetZones() {
    Object.assign(zoneone, { zone: '', lambda1: '', mg1: '', mr1: '', mf1: '' });
    Object.assign(zonetwo, { zone: '', lambda2: '', mg2: '', mr2: '', mf2: '' });
    Object.assign(zonethree, { zone: '', lambda3: '', mg3: '', mr3: '', mf3: '' });
}

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

    console.log(latestMech.value.mechanicaltilefastener);
    tilenoas.manufacturer = latestMech.value?.manufacturer;
    tilenoas.material = latestMech.value?.material;
}
function clampNumber1(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}
async function pushTable() {
    tilenoas.description = latestMech.value?.description;
    zoneone.lambda1 = latestMech.value?.Table2?.Direct_Deck;
    zonetwo.lambda2 = latestMech.value?.Table2?.Direct_Deck;
    zonethree.lambda3 = latestMech.value?.Table2?.Direct_Deck;

    const slopeRange = clampNumber1(Number(dims.slope), 2, 12);

    if (slopeRange <= slopeOptions.three) {
        zoneone.mg1 = latestMech.value?.Table3?.two;
        zonetwo.mg2 = latestMech.value?.Table3?.two;
        zonethree.mg3 = latestMech.value?.Table3?.two;
    } else if (slopeRange === slopeOptions.three || slopeRange < slopeOptions.four) {
        zoneone.mg1 = latestMech.value?.Table3?.three;
        zonetwo.mg2 = latestMech.value?.Table3?.three;
        zonethree.mg3 = latestMech.value?.Table3?.three;
    } else if (slopeRange < slopeOptions.five || slopeRange === slopeOptions.four) {
        zoneone.mg1 = latestMech.value?.Table3?.four;
        zonetwo.mg2 = latestMech.value?.Table3?.four;
        zonethree.mg3 = latestMech.value?.Table3?.four;
    } else if (slopeRange === slopeOptions.five || slopeRange < slopeOptions.six) {
        zoneone.mg1 = latestMech.value?.Table3?.five;
        zonetwo.mg2 = latestMech.value?.Table3?.five;
        zonethree.mg3 = latestMech.value?.Table3?.five;
    } else if (slopeRange === slopeOptions.six || slopeRange < slopeOptions.seven) {
        zoneone.mg1 = latestMech.value?.Table3?.six;
        zonetwo.mg2 = latestMech.value?.Table3?.six;
        zonethree.mg3 = latestMech.value?.Table3?.six;
    } else {
        zoneone.mg1 = latestMech.value?.Table3?.seven;
        zonetwo.mg2 = latestMech.value?.Table3?.seven;
        zonethree.mg3 = latestMech.value?.Table3?.seven;
    }

    recomputeMR();
}

watch(
    latestNOAFromStore,
    (v) => {
        if (v && !query.value) query.value = v;
    },
    { immediate: true }
);
const maps = ref([]);
const vals = ref([]);
const modalIsActive = ref(false);

watch(modalIsActive, (open) => {
    if (!open) return;
    if (!selectedMechanical.value && fastenerOptions.value.length) {
        const first = fastenerOptions.value[0];
        selectedMechanical.value = first.key ?? first;
        updateMF(selectedMechanical.value);
    }
});
const zoneSource = reactive({
    zones: []
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

const postMetrictable = reactive({
    noa: '',
    applicant: '',
    description: '',
    material: '',
    decktype: '',
    prescriptive: '',
    height: '',
    slope: '',
    perimeter: '',
    area: '',
    fastenervalues: '',
    zoneone: [],
    zonetwo: [],
    zonethree: [],
    mechIdentifier: 'mechanicalTile',
    checkvalues: Boolean
});

// const keyValueSystemFPairsValues = ref({});
// const keyValueSystemFPairsKeys = ref({});

const keyValueSystemEPairsValues = ref({});
const keyValueSystemEPairsKeys = ref({});

// Assuming udlTile and Anchor_Base are imported or declared above
function updateselectSystemE(selectedsystemE) {
    const sys = udlTile.system;
    const dp = udlTile.arrDesignPressure;

    // Map system values to design pressures
    keyValueSystemEPairsValues.value = Object.fromEntries(sys.map((key, i) => [key, dp[i]]));

    // Optionally map keys (not clearly used)
    keyValueSystemEPairsKeys.value = Object.fromEntries(sys.map((key, i) => [key, sys[i]]));

    // Run description update only once if the selected value exists in mapping
    if (selectedsystemE.value && keyValueSystemEPairsValues.value[selectedsystemE.value] !== null) {
        udlDescPressure(selectedsystemE);
    }
}
const modalExposureIsActive = ref(false);
const modalSAIsActive = ref(false);
const modalUDLIsActive = ref(false);
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
    // If you have a selected row/object, pass it here:
    // const selected = mySelectedRow.value
    // Otherwise, use whatever source `checkInput()` prepared.
    await nextTick();

    // 1) run any prep that fills data (but make sure it doesn’t mutate during open)
    // await selectedExposure();

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

async function onOpenTileUDLClick() {
    await nextTick();
    await until(() => Array.isArray(udlTile.system) && udlTile.system.length > 0).toBe(true);
    modalKeyUDL.value++;

    const src = toPlainUDL(udlTile);
    currentTileUDl.value = {
        udlmanufacturer: src?.manufacturer ?? '',
        udlmaterial: src?.material ?? '',
        udldescription: src?.description ?? '',
        udlsystem: src?.system ?? ''
    };

    modalKeyUDL.value++;
    await nextTick();
    modalKeyUDL.value++;
    modalUDLIsActive.value = true;
}

async function onOpenTileSAClick() {
    // If you have a selected row/object, pass it here:
    // const selected = mySelectedRow.value
    // Otherwise, use whatever source `checkInput()` prepared.
    modalKeySA.value++;
    await nextTick();

    // 1) run any prep that fills data (but make sure it doesn’t mutate during open)
    // await checkInputSA();
    // hydrateSystemF();
    sysFcheckInput();
    // 2) build a plain POJO snapshot with just the fields you need
    const src = toPlainSA(/* selected or shingles or wherever your data lives */ saTiles);
    currentTileSA.value = {
        samanufacturer: src?.manufacturer ?? '',
        samaterial: src?.material ?? '',
        sasystem: src?.system ?? ''
    };

    // 3) bump key BEFORE show if you want a hard reset
    // modalKeySA.value;
    modalKeySA.value++;
    // 4) wait a tick so Vue sees the new props, THEN show the modal
    await nextTick();
    modalKeySA.value;

    modalSAIsActive.value = true;
}

function udlDescPressure(selectedsystemE) {
    const key = selectedsystemE.value;
    console.log(selectedsystemE.value);
    // Dynamically resolve property names
    const descriptionKey = `TileCap_Sheet_Description_${key}`;
    const anchorKey = `Anchor_Base_Sheet_${key}`;

    // Set tile properties dynamically
    udlTile.TileCap_Sheet_Description = udlTile[descriptionKey];
    udlTile.Anchor_Base_Sheet = Anchor_Base[anchorKey];
    udlTile.designPressure = keyValueSystemEPairsValues.value[key];

    console.log('Updated UDL Tile:', udlTile);

    // Sync with store if available
    if (etileStore.$state.tilesysEinput.length > 0) {
        const input = etileStore.$state.tilesysEinput[0].systemDataE;

        input.Anchor_Base = udlTile.Anchor_Base_Sheet;
        input.tileCap = udlTile.TileCap_Sheet_Description;
        input.dP = udlTile.designPressure;
        input.systemSelected = key;
        input.prescriptiveSelection = selectedUnderlaymentOpt.value?.selectedBasesheet ?? '';

        console.log('Updated Store:', etileStore.$state.tilesysEinput[0]);
    }
}

const mechUdlStaging = async () => {
    const eInput = etileStore.$state.tilesysEinput?.[0]?.systemDataE;
    if (eInput) {
        udlTile.Anchor_Base = eInput.Anchor_Base;
        udlTile.prescriptiveSelection = eInput.prescriptiveSelection;
    }
    udlTile.systemSelected = selectedsystemE.value;
    await postUDLMech(udlTile);
};

// helpers (put once in <script setup> if you don't already have something similar)
const toPlain = (v) => JSON.parse(JSON.stringify(unref(v)));
const num = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
};

// Optional: one-line overall check based on your flags
const allZonesPass = computed(() => ismrValidMR1.value && ismrValidMR2.value && ismrValidMR3.value);

// refactored function
const mechStaging = async () => {
    const payload = {
        mechIdentifier: 'mechanicalTile',
        noa: tilenoas.noa ?? '',
        applicant: tilenoas.manufacturer ?? '',
        description: tilenoas.description ?? '',
        material: tilenoas.material ?? '',
        decktype: tilenoas.deckType ?? '',
        prescriptive: selectedUnderlaymentOpt.value?.selectedBasesheet ?? '',

        area: num(dims.area),
        height: num(dims.height),
        slope: num(dims.slope),
        perimeter: num(dims.per),

        fastenervalues: tilenoas.savedfastener ?? '',

        // clone zones to plain objects so you don't leak reactivity
        zoneone: toPlain(zoneone),
        zonetwo: toPlain(zonetwo),
        zonethree: toPlain(zonethree),

        // give this a real boolean, not the Boolean constructor
        checkvalues: allZonesPass.value
    };

    console.log(payload);
    await postMech(payload);
};

const mechSAStaging = async () => {
    saTiles.prescriptiveSelection = selectedUnderlaymentOpt.value?.selectedBasesheet ?? '';

    await postSAMech(saTiles);
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
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>
        <div class="w-64 mt-3 space-y-2" style="margin-left: 20px">
            <label for="height">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="heightModel" type="text" placeholder="height" @input="setRoofInputs" :disabled="isDisabled" @change="validateHeight" />
            <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message>
        </div>
        <DripEdMechTile />

        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label for="perimeter">Roof Perimeter(a) = 4h</label>
            <InputText id="perimeter" v-model="dims.per" type="text" placeholder=" " @change="setRoofInputs" />
        </div>

        <div class="min-w-[780px] flex flex-col mb-4 mt-6 gap-3 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>

            <Select v-model="selectedUnderlaymentKey" :options="underlaymentType" optionLabel="selectedBasesheet" optionValue="key" placeholder="make selection" />
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
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2" style="margin-left: 75px">
        <div v-show="isUDLNOAValid" class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600" style="margin-left: 50px">
            <systemENumber />
            <Button label="Submit" severity="contrast" @click="onOpenTileUDLClick" style="margin-left: 15px" />
        </div>
        <!-- w-96 -->
        <div v-show="isSAValid" class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600" style="margin-left: 50px">
            <systemFNumber />

            <Button label="Submit" severity="contrast" @click="onOpenTileSAClick" style="margin-left: 15px" />
        </div>

        <div v-show="isTileValid" class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600" v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" style="margin-left: 50px">
            <div class="autocomplete">
                <div class="w-64 gap-2 mt-8 space-y-2 mb-2" style="margin-left: 2px">
                    <FloatLabel>
                        <InputText id="tilenoa" v-model="query" @input="onInput" @focus="showSuggestions = true" @blur="hideSuggestions" @keydown.enter.prevent="submitNOA" />
                        <label for="tilenoa">Tile NOA: 00000000</label>
                    </FloatLabel>

                    <Button label="Submit" severity="contrast" :disabled="String(query ?? '').replace(/\D/g, '').length < 6" :loading="loadingMech" @click="submitAndOpen" style="margin-left: 15px" />
                </div>
                <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
                    <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @mousedown.left="selectSuggestion(suggestion)">
                        {{ suggestion }}
                    </li>
                </ul>
            </div>
            <!-- overlay spinner -->
            <transition name="fade">
                <div v-if="loadingMech" class="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center rounded-md">
                    <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
                </div>
            </transition>
        </div>
    </div>

    <Divider />
    <Divider />
    <ModalWindow :key="modalKeyUDL" :initialData="currentTileUDl" @closePopup="(modalUDLIsActive = false), mechUdlStaging()" v-if="modalUDLIsActive">
        <div v-show="isUDLNOAValid" class="grid grid-cols-2 gap-2">
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">(UDL) NOA Applicant</label>
                <InputText id="manufacturer" v-model="udlTile.manufacturer" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">(UDL) Material</label>
                <InputText id="material" v-model="udlTile.material" />
            </div>

            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: red">Select System E * </label>
                <Select v-model="selectedsystemE" :options="udlTile.system" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="designPressure">Design psf: </label>
                <InputText id="designPressure" v-model="udlTile.designPressure" @change="updateselectSystemE" />
            </div>
            <div v-show="isUDLNOAValid" class="grid grid-cols-1 gap-2 border-gray-700 focus:border-orange-600" style="margin-left: 2px">
                <div class="min-w-[780px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" class="mt-3" for="anchor">Anchor Base Sheet</label>
                    <InputText id="anchor" v-model="udlTile.Anchor_Base_Sheet" @change="updateselectSystemE" />
                </div>
                <div class="min-w-[480px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udlTile.TileCap_Sheet_Description" @change="updateselectSystemE" />
                </div>
            </div>
        </div>
    </ModalWindow>
    <ModalWindow :key="modalKeySA" :initialData="currentTileSA" @closePopup="(modalSAIsActive = false), mechSAStaging()" v-if="modalSAIsActive">
        <div v-show="isSAValid" class="grid grid-cols-2 gap-2">
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
                <Select v-model="selectedsystemf" :options="saTiles.system" placeholder="" />
            </div>

            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="designpressure">Design psf: </label>
                <InputText id="designpressure" v-model="fDpForSelected" :disabled="!selectedsystemf" />
            </div>
        </div>
        <div v-show="isSAValid" class="min-w-[490px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
            <label style="color: #122620" for="sadescription">S/A Description</label>
            <InputText id="capsheetdescription" v-model="fDescForSelected" :disabled="!selectedsystemf" />
        </div>
    </ModalWindow>
    <ModalWindow :key="modalKey" :initialData="currentTile" @closePopup="(modalIsActive = false), pushTable(), mechStaging()" v-if="modalIsActive">
        <div v-show="isTileValid" class="grid grid-cols-2 md:grid-cols-2 gap-2" style="margin-left: 30px">
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
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
                    <!-- <Select v-model="selectedMechanical" :options="tilenoas.mechanicaltilefastener" @change="checkMaterial" @update:modelValue="updateMF" /> -->
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

/* input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
} */

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
</style>
