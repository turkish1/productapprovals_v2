<script setup>
import DripEdAdTile from '@/components/DripEdgeChildren/DripEdAdTile.vue';
import Buttons from '@/components/Features/Buttons.vue';
import ModalWindow from '@/components/Modal/ModalWindow.vue';
import systemENumber from '@/components/roofSystems/systemENumber.vue';
import systemFNumber from '@/components/roofSystems/systemFNumber.vue';
import usetileInputdouble from '@/composables/InputLogic/use-tileInputDoublepaddy';
import usetileInputsingle from '@/composables/InputLogic/use-tileInputsinglepaddy';
import usePostToLambda from '@/composables/Postdata/usePostToLambda';
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
import { storeToRefs } from 'pinia';
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
import { computed, isProxy, nextTick, onMounted, reactive, ref, toRaw, unref, watch } from 'vue';

const { addPaddyCatval, paddycatInput } = usePaddyoptionStore();
const paddyStore = usePaddyStore();
const { inputdata } = storeToRefs(paddyStore);

const useDoublepaddy = useDoublePaddyStore();
const { inputdatas } = storeToRefs(useDoublepaddy);
// State and Store Initialization
const store = usevalueStore();

const ftileStore = usetilesysfStore();
const multipleStore = usemultiAdStore();

const { multiAdinput } = storeToRefs(multipleStore);
const { addSystemvalues, tileInputvalues } = usevalueStore();
const resetStore = useSavedStore();
const { addSavedvalues, reset } = useSavedStore();
const { Edatamounted, etileStore } = useUDL();

const { tileData } = usetileInputdouble();
const { tileDatas } = usetileInputsingle();
const { zones } = useGlobalState();
const { zoned } = useExposureD();

const { post, postUDL, postSATile } = usePostToLambda();
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const childQueryRef = ref();
// Reactive State
const selectedOption = ref('');
const query = ref('');
const isPaddySingle = ref(false);
const isPaddyDouble = ref(false);

const isPaddydatavalid = ref(false);
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
const type = ref([{ name: 'Select Deck Type' }, { name: '5/8" Plywood' }, { name: '3/4" Plywood' }, { name: '1" x 6" T & G' }, { name: '1" x 8" T & G' }, { name: 'Existing 1/2" Plywood' }]);
const save = ref([]);
const UnderlaymentSelection = ref('');
let selectedUnderlayment = ref('');
const underlaymentType = ref([
    { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
    { selectedBasesheet: 'Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F', key: 2 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E', key: 3 }
]);

// --- Utilities & constants ---
// const SUPER_RE = /[\u00B2-\u00B3\u00B9\u2070-\u207F]/g; // for MF cleanup
const SLOPE_BOUNDS = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7 };

// clamp helper
const clamp = (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

// normalize incoming select events (value or {value})

// small numeric parser
const licenseEnd = ref('');
const isUDLValid = ref(false);
const isUDLNOAValid = ref(false);
const isSAValid = ref(false);
const isTileValid = ref(false);
const isTileData = ref(false);
const isMultiTileValid = ref(false);
const isPaddyCategoryValid = ref(false);
const ismrValidMR1 = ref(false);
const ismrValidMR2 = ref(false);
const ismrValidMR3 = ref(false);
const ismrInvalid1 = ref(false);
const ismrInvalid2 = ref(false);
const ismrInvalid3 = ref(false);
const isvalueValid = ref(false);

const tilenoas = reactive({
    noa: 0,
    manufacturer: '',
    material: '',
    description: '',
    resistance: [],
    Table2: [],
    Table3: [],
    select_tile: [],
    tile_map: [],
    table2_map: [],
    Table3_obj_map: [],
    mfMap: [],
    Table2_obj_map: [],
    slope: 0,
    height: 0,
    dripEdgeMaterial: [],
    dripEdgeSize: [],
    deckType: '',
    expiration_date: '',
    prescriptiveSelection: '',
    perimeter: '',
    tileIdentifier: 'tile'
});
const factor = ref(0.4);

const visible = ref(false);
const selectedExposures = ref('');
const exposureChoosen = ref('');
const isExposureC = ref(false);
// const { getData } = useExposurec();
const { getData, zonesRow, zoneData, error } = useExposurec();

// await getData(5.5, 22) // slope 5.5, height 22ft

const { getDatas, zonesRowdouble } = useExposured();
// Decide which kind we want based on UI state

const doubleStore = useDoublePaddyStore();
// // Handy accessors (null if missing)

const singlePaddy = computed(() => paddyStore.$state.inputdata?.[0]?.singlepaddyData ?? null);
const doublePaddy = computed(() => useDoublepaddy.$state.inputdatas?.[0]?.doublepaddyData ?? null);

// Which dataset to use, preferring selected option if valid
const currentPaddyKind = computed(() => {
    if (selectedOption.value === 'single' && isPaddydatavalid.value) return 'single';
    if (selectedOption.value === 'double' && isPaddydatavalid.value) return 'double';
    addPaddyCatval(selectedOption.value, isPaddydatavalid.value);

    return isPaddySingle.value ? 'single' : 'double';
});

// Final dataset with fallback
const srcData = computed(() => {
    const preferSingle = currentPaddyKind.value === 'single';
    const primary = preferSingle ? singlePaddy.value : doublePaddy.value;
    const fallback = preferSingle ? doublePaddy.value : singlePaddy.value;
    return primary ?? fallback;
});
const modalSAIsActive = ref(false);
const modalUDLIsActive = ref(false);
const modalIsActive = ref(false);

// Apply payload every time it changes
const selectedMulti = ref(null); // "Roman_Mission_Cap" etc.
const selectedMaterial = ref(null);
watch(
    srcData,
    (src) => {
        if (!src) return;

        const multiple = src?.content === 'multiple';
        applyNOA(src, { multiple }); // fills tilenoas, maps, etc.
        if (!multiple) applyMgLambdaFromTables();

        // clear stale selects, seed first type for multi
        selectedMaterial.value = null;
        selectedMulti.value = Array.isArray(tilenoas.select_tile) ? tilenoas.select_tile[0] : null;

        // if modal is open, force-refresh its vnode tree
        // if (modalIsActive.value) modalKey.value++;
    },
    { immediate: true }
);
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

// factor was already a ref(0.4)

const isSlopeDisabled = ref(true); // start disabled
const isHeightDisabled = ref(true); // start disabled

const isSlopeValid = ref(false);

// Slope validation flow
// Slope validation (set the boolean, don't compute side-effects here)
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

function validateRoofSlope() {
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
// simple height validator (10..40)
function validateHeight() {
    // use the same source your input binds to (dims.height or heightModel)
    const raw = heightModel.value !== '' ? heightModel.value : dims.height;
    const n = Number(raw);
    dims.per = (raw * factor.value).toFixed(2);
    const ok = Number.isFinite(n) && n >= 10 && n <= 40;
    isHeightValid.value = ok;
}

// (optional) show the overall “check” only when both are valid
const bothValid = computed(() => isSlopeValid.value && isHeightValid.value);

const slopeBucket = computed(() => {
    const s = clamp(Number(dims.slope || 0), 2, 12);
    if (s <= SLOPE_BOUNDS.three) return 2;
    if (s < SLOPE_BOUNDS.four) return 3;
    if (s <= SLOPE_BOUNDS.four) return 4;
    if (s < SLOPE_BOUNDS.six) return 5;
    if (s < SLOPE_BOUNDS.seven) return 6;
    return 7;
});
// 🔧 NEW: React to slope-validity flips to clear/re-evaluate height properly

// 🔧 NEW: React to slope-validity flips to clear/re-evaluate height properly

const zoneTriplet = ref([0, 0, 0]); // [z1,z2,z3]
async function onExposureChange() {
    const s = Number(dims.slope || 0);
    const h = Number(heightModel.value || 0);
    console.log(s, h);
    if (!s || !h) return;
    // checkZones();
    if (selectedExposures.value === 'c') {
        console.log('Entered c exposure');
        await getData(s, h);
        // use the *exposed ref* from useExposurec()
        const z = Array.isArray(zonesRow.value) ? zonesRow.value : zonesRow.value?.[0];
        console.log(zonesRow.value);
        const triple = Array.isArray(zonesRow.value) ? zonesRow.value : [0, 0, 0];
        console.log(z, triple);

        [zoneone.zone, zonetwo.zone, zonethree.zone] = triple;
    } else {
        await getDatas(s, h);
        console.log('Entered d exposure');

        // use the *exposed ref* from useExposured()
        const z = Array.isArray(zonesRowdouble.value) ? zonesRowdouble.value : zonesRowdouble.value?.[0];
        const triple = Array.isArray(z) ? z : [0, 0, 0];
        [zoneone.zone, zonetwo.zone, zonethree.zone] = triple;
    }

    // Recompute MR immediately with the new zones
    zoneone.mr1 = (Number(zoneone.zone) * Number(zoneone.lambda1) - Number(zoneone.mg1)).toFixed(2);
    zonetwo.mr2 = (Number(zonetwo.zone) * Number(zonetwo.lambda2) - Number(zonetwo.mg2)).toFixed(2);
    zonethree.mr3 = (Number(zonethree.zone) * Number(zonethree.lambda3) - Number(zonethree.mg3)).toFixed(2);
}

watch([selectedExposures, () => dims.slope, () => dims.height], () => {
    if (selectedExposures.value) onExposureChange();
    console.log(selectedExposures.value);
});
function getdeckType(evt) {
    const v = normalizeEvtVal(evt);
    const sel = v?.name ?? selectedDeck.value?.name;
    if (!sel || sel === 'Select Deck Type') return;
    dt.value = sel;
    // Enable slope only; height stays disabled until slope validates
    isSlopeDisabled.value = false;
    isHeightDisabled.value = true;
}
watch(
    () => dims.slope,
    (s) => {
        validateNumber(s);
        isDisabled.value = Number(s) >= 2 ? false : true;
        addCheckmarks();
    }
);
watch(
    () => dims.height,
    (h) => {
        validateTileHeight(h);
        isHeightValid.value = true;
        addCheckmarks();
    }
);
// Value checks
function addCheckmarks() {
    isvalueValid.value = isHeightValid.value || isDisabledslope.value;
}
watch(
    () => selectedOption.value,
    (opt, prev) => {
        paddyTracker.value = prev || '';
        isPaddySingle.value = opt === 'single';
        isPaddyDouble.value = opt === 'double';

        isMultiTileValid.value = false;
        isTileValid.value = true;
        clearData(); // will also clear query if switched
    },
    { immediate: false }
);
// Computed Properties

function clearQueryInput() {
    childQueryRef.value?.clearInput();
}
const paddyTracker = ref('');

const saTiles = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: '',
    prescriptiveSelection: '',
    designpressure: '',
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
    pressure: '',
    expiration_date: '',
    saIdentifier: 'sa'
});

const udlTile = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: '',
    designPressure: '',
    Anchor_Base_Sheet: '',
    dP: '',
    tileCap: '',
    Anchor_Base: '',
    systemSelected: '',
    TileCap_Sheet_Description: '',
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
    TileCap_Sheet_Description: '',
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
    expiration_date: '',
    udlIdentifier: 'udl'
});

// I need to provide data this var
onMounted(() => {
    checkInputSA();
});

function pickUnderlayment(evt) {
    const v = evt?.value ?? evt ?? selectedUnderlayment.value ?? { key: 0 };
    const key = Number(v.key || 0);
    UnderlaymentSelection.value = v.selectedBasesheet ?? '';

    const next =
        {
            0: { isPaddyCategoryValid: false, isTileValid: false, isTileData: false, isUDLValid: false, isUDLNOAValid: false, isSAValid: false },
            1: { isPaddyCategoryValid: true, isTileValid: false, isTileData: false, isUDLValid: false, isUDLNOAValid: false, isSAValid: false },
            2: { isPaddyCategoryValid: true, isTileValid: true, isTileData: true, isUDLValid: false, isUDLNOAValid: false, isSAValid: true },
            3: { isPaddyCategoryValid: true, isTileValid: true, isTileData: true, isUDLValid: true, isUDLNOAValid: true, isSAValid: false }
        }[key] ?? {};

    isPaddyCategoryValid.value = !!next.isPaddyCategoryValid;
    isTileValid.value = !!next.isTileValid;
    isTileData.value = !!next.isTileData;
    isUDLValid.value = !!next.isUDLValid;
    isUDLNOAValid.value = !!next.isUDLNOAValid;
    isSAValid.value = !!next.isSAValid;
}
const selectedsystemf = ref(null);
const selectedsystemE = ref(null);

let datamounted_f = ref(ftileStore.$state.tilefinput);

// helpers
const buildMap = (keys = [], values = []) => Object.fromEntries((keys || []).map((k, i) => [String(k), values?.[i]]));

const pickFDescriptions = (sd = {}) => {
    // Pull Description_F* keys into a map: { F1: 'desc1', F2: 'desc2', ... }
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

// maps
const sysFMap = ref({}); // { F1: dp, F2: dp, ... }
const sysFDescMap = ref({}); // { F1: desc, F2: desc, ... }
const normalizeEvtVal = (e) => (e && typeof e === 'object' && 'value' in e ? e.value : e);

// Load SA data once and build maps immediately
function checkInputSA() {
    const items = datamounted_f?.value;
    if (!Array.isArray(items) || items.length === 0) return;

    const entry = items.find((it) => it && it.systemData);
    if (!entry) return;
    const sd = entry.systemData;
    console.log(sd);
    // base fields
    Object.assign(saTiles, {
        manufacturer: sd.manufacturer ?? '',
        material: sd.material ?? '',
        system: sd.system ?? [], // ['F1','F2',...]
        description: sd.description ?? '',
        noa: sd.noa ?? '',
        pressure: sd.designPressure ?? sd.pressure ?? []
    });
    console.log(saTiles);
    // build pressure map
    const pressures = Array.isArray(sd.designPressure) ? sd.designPressure : Array.isArray(sd.pressure) ? sd.pressure : [];
    sysFMap.value = buildMap(saTiles.system, pressures);
    console.log(sysFMap.value);
    // build description map from Description_F* keys
    sysFDescMap.value = pickFDescriptions(sd);
    console.log(sysFDescMap.value);

    // guard Object.entries with a fallback object
    for (const [fKey, desc] of Object.entries(sysFDescMap.value || {})) {
        saTiles[`Description_${fKey}`] = desc;
    }
}

// Dynamic-safe desc + pressure setter
function saDescPressure() {
    // selectedsystemf might be "F3" or { value:"F3", label:"..." }
    const kRaw = selectedsystemf?.value ?? selectedsystemf;
    const k = typeof kRaw === 'string' ? kRaw : String(kRaw || '');
    if (!k) return;

    // prefer description map; fallback to saTiles["Description_Fx"]
    const desc = sysFDescMap.value[k] ?? saTiles?.[`Description_${k}`] ?? '';
    saTiles.description = Array.isArray(desc) ? (desc[0] ?? '') : desc;

    const rawDP = sysFMap.value[k];
    saTiles.designpressure = Array.isArray(rawDP) ? (rawDP[0] ?? '') : (rawDP ?? '');
}

function onTileTypePick(val) {
    const typeKey = val ?? selectedMulti.value;
    if (!typeKey) return;

    const t2 = tilenoas.table2_map || {};
    const t3 = tilenoas.tile_map || {};
    console.log(val, t2, t3);
    // 1) λ from Table2_Map
    const lamArr = t2[typeKey];
    if (Array.isArray(lamArr) && lamArr.length) {
        const lam = Number(lamArr[0]) || 0;
        zoneone.lambda1 = lam;
        zonetwo.lambda2 = lam;
        zonethree.lambda3 = lam;
    }

    // 2) Mg from tile_map by slope bucket
    const mgArr = t3[typeKey];
    if (Array.isArray(mgArr) && mgArr.length) {
        const idxMap = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5 };
        const idx = idxMap[slopeBucket.value] ?? 0;
        const mg = Number(mgArr[idx]) || 0;
        zoneone.mg1 = mg;
        zonetwo.mg2 = mg;
        zonethree.mg3 = mg;
    }

    // 3) MR
    computeMR2();

    // leave MF to the material selection; we’ll set it in updateMF()
}
// const dataComp =  computed(() =>   async  (dtMounted.value = paddySelectedSingle.value));
let datamountedsystemE = ref(etileStore.$state.tilesysEinput);
function assignZonesFrom(sourceTriples) {
    const z = sourceTriples?.[0] ?? [0, 0, 0];
    [zoneone.zone, zonetwo.zone, zonethree.zone] = z;
}
// let datatilenoaDoublePaddy = ref('');

function computeMR2() {
    const z1 = Number(zoneone.zone || 0) * Number(zoneone.lambda1 || 0) - Number(zoneone.mg1 || 0);
    const z2 = Number(zonetwo.zone || 0) * Number(zonetwo.lambda2 || 0) - Number(zonetwo.mg2 || 0);
    const z3 = Number(zonethree.zone || 0) * Number(zonethree.lambda3 || 0) - Number(zonethree.mg3 || 0);

    zoneone.mr1 = z1.toFixed(2);
    zonetwo.mr2 = z2.toFixed(2);
    zonethree.mr3 = z3.toFixed(2);
    console.log(srcData);
    updateMF(srcData);
}
function updateFromPaddy(kind) {
    const src = srcData.value;
    if (!src) return;

    const multiple = src?.content === 'multiple';
    applyNOA(src, { multiple });

    // For single: paint λ/Mg from Table2/3 immediately
    if (!multiple) applyMgLambdaFromTables();
}

//
// Flat material options for PrimeVue (NEVER return an object/array-of-arrays)

// Your original entry-point: just route based on selectedOption
async function grabInput() {
    const opt = selectedOption.value;
    if (opt === 'double') {
        updateFromPaddy('double');
    } else if (opt === 'single') {
        updateFromPaddy('single');
    } else {
        // console.log('grabInput skipped');
    }
}

function applyNOA(src, { multiple }) {
    isTileData.value = true;
    isTileValid.value = true;
    isMultiTileValid.value = !!multiple;

    tilenoas.noa = src.noa ?? src.NOA ?? '';
    tilenoas.manufacturer = src.manufacturer ?? src.applicant ?? '';
    tilenoas.description = src.description ?? '';
    tilenoas.material = src.material ?? src.selection ?? [];
    tilenoas.select_tile = src.select_tile ?? [];
    tilenoas.table2_map = src.Table2_map ?? src.Table2_Map ?? {};
    tilenoas.tile_map = src.tile_map ?? src.Tile_Map ?? {};
    tilenoas.expiration_date = src.expiration_date ?? '';

    // 🔧 NEW: ensure single path exposes a selection map the modal can use
    if (!multiple) {
        // build label->MF map from selection/resistance arrays (or pass through object map if provided)
        const map = {};
        if (src.selection && typeof src.selection === 'object' && !Array.isArray(src.selection)) {
            Object.assign(map, src.selection);
        } else {
            const sel = Array.isArray(src.selection) ? src.selection : [];
            const res = Array.isArray(src.resistance) ? src.resistance : [];
            sel.forEach((k, i) => {
                const label = typeof k === 'string' ? k : (k?.label ?? k?.value ?? '');
                if (label) map[label] = res[i];
            });
        }
        // expose to modal
        tilenoas.selection = map; // <— single path feeds the modal
    }

    // preselect the first tile type for multi
    selectedMulti.value = Array.isArray(tilenoas.select_tile) ? tilenoas.select_tile[0] : null;
    if (multiple && selectedMulti.value) onTileTypePick(selectedMulti.value);

    addSystemvalues(tilenoas);
    // checkZones();
}

// label of material; used to lookup MF

function updateTile() {
    const typeKey = selectedMulti.value;
    if (!typeKey) return;

    const t2Map = tilenoas.table2_map || {};
    const t3Map = tilenoas.tile_map || {};

    // λ from Table2_Map
    const lamArr = t2Map[typeKey];
    if (Array.isArray(lamArr) && lamArr.length) {
        const lam = Number(lamArr[0]) || 0;
        zoneone.lambda1 = lam;
        zonetwo.lambda2 = lam;
        zonethree.lambda3 = lam;
    }

    // Mg from tile_map by slope bucket
    const mgArr = t3Map[typeKey];
    if (Array.isArray(mgArr) && mgArr.length) {
        const idx = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5 }[slopeBucket.value] ?? 0;
        const mg = Number(mgArr[idx]) || 0;
        zoneone.mg1 = mg;
        zonetwo.mg2 = mg;
        zonethree.mg3 = mg;
    }

    computeMR2();
}

async function sysEcheckInput() {
    console.log(Edatamounted.value[0]);
    if (Edatamounted.value.length !== null) {
        Edatamounted.value.forEach((item, index) => {
            console.log(item);
            udlTile.noa = item.systemDataE.noa;
            udlTile.manufacturer = item.systemDataE.manufacturer;
            udlTile.material = item.systemDataE.material;
            udlTile.system = item.systemDataE.system;
        });
    }
}

function clearData() {
    Object.assign(tilenoas, {
        manufacturer: '',
        description: '',
        material: '',
        select_tile: '',
        expiration_date: ''
    });

    zoneone.lambda1 = zonetwo.lambda2 = zonethree.lambda3 = '';
    zoneone.mr1 = zonetwo.mr2 = zonethree.mr3 = '';
    zoneone.mg1 = zonetwo.mg2 = zonethree.mg3 = '';
    zoneone.mf1 = zonetwo.mf2 = zonethree.mf3 = '';

    resetStore.$reset();
    console.log(paddyTracker.value, selectedOption.value);
    if (paddyTracker.value && paddyTracker.value !== selectedOption.value) {
        clearQueryInput?.();
    }
}
watch(
    selectedOption,
    (mode) => {
        if (mode === 'single' || mode === 'double') {
            updateFromPaddy(mode);
        } else {
            // Reset tile state if nothing selected
            isTileData.value = false;
            isTileValid.value = false;
            isMultiTileValid.value = false;
            updateTile(srcData);
            Object.assign(tilenoas, {
                noa: '',
                manufacturer: '',
                description: '',
                material: [],
                select_tile: [],
                expiration_date: ''
            });
            // console.log(tilenoas);
        }
    },
    { immediate: true } // run once at mount if value is already set
);

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
// function EcheckInputSystem() {
//     datamountedsystemE.value.forEach((item, index) => {
//         udlTile.Maps = item.systemDataE.Maps;
//         console.log(Anchor_Base.Anchor_Base_Sheet_E2);
//         Anchor_Base.Anchor_Base_Sheet_E1 = item.systemDataE.Anchor_Base_Sheet_E1;
//         Anchor_Base.Anchor_Base_Sheet_E2 = item.systemDataE.Anchor_Base_Sheet_E2;
//         Anchor_Base.Anchor_Base_Sheet_E3 = item.systemDataE.Anchor_Base_Sheet_E3;
//         Anchor_Base.Anchor_Base_Sheet_E4 = item.systemDataE.Anchor_Base_Sheet_E4;
//         Anchor_Base.Anchor_Base_Sheet_E5 = item.systemDataE.Anchor_Base_Sheet_E5;
//         Anchor_Base.Anchor_Base_Sheet_E6 = item.systemDataE.Anchor_Base_Sheet_E6;
//         Anchor_Base.Anchor_Base_Sheet_E7 = item.systemDataE.Anchor_Base_Sheet_E7;
//         Anchor_Base.Anchor_Base_Sheet_E8 = item.systemDataE.Anchor_Base_Sheet_E8;
//         Anchor_Base.Anchor_Base_Sheet_E9 = item.systemDataE.Anchor_Base_Sheet_E9;
//         Anchor_Base.Anchor_Base_Sheet_E10 = item.systemDataE.Anchor_Base_Sheet_E10;
//         Anchor_Base.Anchor_Base_Sheet_E11 = item.systemDataE.Anchor_Base_Sheet_E11;
//         Anchor_Base.Anchor_Base_Sheet_E12 = item.systemDataE.Anchor_Base_Sheet_E12;
//         Anchor_Base.Anchor_Base_Sheet_E13 = item.systemDataE.Anchor_Base_Sheet_E13;

//         udlTile.TileCap_Sheet_Description_E1 = item.systemDataE.TileCap_Sheet_Description_E1;
//         udlTile.TileCap_Sheet_Description_E2 = item.systemDataE.TileCap_Sheet_Description_E2;
//         udlTile.TileCap_Sheet_Description_E3 = item.systemDataE.TileCap_Sheet_Description_E3;
//         udlTile.TileCap_Sheet_Description_E4 = item.systemDataE.TileCap_Sheet_Description_E4;
//         udlTile.TileCap_Sheet_Description_E5 = item.systemDataE.TileCap_Sheet_Description_E5;
//         udlTile.TileCap_Sheet_Description_E6 = item.systemDataE.TileCap_Sheet_Description_E6;
//         udlTile.TileCap_Sheet_Description_E7 = item.systemDataE.TileCap_Sheet_Description_E7;
//         udlTile.TileCap_Sheet_Description_E8 = item.systemDataE.TileCap_Sheet_Description_E8;
//         udlTile.TileCap_Sheet_Description_E9 = item.systemDataE.TileCap_Sheet_Description_E9;
//         udlTile.TileCap_Sheet_Description_E10 = item.systemDataE.TileCap_Sheet_Description_E10;
//         udlTile.TileCap_Sheet_Description_E11 = item.systemDataE.TileCap_Sheet_Description_E11;

//         udlTile.TileCap_Sheet_Description_E12 = item.systemDataE.TileCap_Sheet_Description_E12;
//         udlTile.TileCap_Sheet_Description_E13 = item.systemDataE.TileCap_Sheet_Description_E13;
//         udlTile.arrDesignPressure = item.systemDataE.designPressure;

//         if (item.systemDataE.system.length > 1) {
//         } else {
//             udlTile.system = item.systemDataE.system;
//         }
//         //  updateselectSystemE();
//     });
// }
function EcheckInputSystem() {
    const items = datamountedsystemE?.value;
    if (!Array.isArray(items) || items.length === 0) return;

    // Grab the first entry that actually has systemDataE
    const sd = items.find((it) => it && it.systemDataE)?.systemDataE;
    if (!sd) return;

    // Core maps/arrays
    udlTile.Maps = sd.Maps ?? {};
    udlTile.arrDesignPressure = Array.isArray(sd.designPressure) ? sd.designPressure.slice() : [];

    // If you need these basics too (optional):
    udlTile.noa = sd.noa ?? udlTile.noa;
    udlTile.manufacturer = sd.manufacturer ?? udlTile.manufacturer;
    udlTile.material = sd.material ?? udlTile.material;

    // Normalize systems to an array for the <Select>
    udlTile.system = Array.isArray(sd.system) ? sd.system.slice() : sd.system ? [sd.system] : [];

    // Fill Anchor_Base_Sheet_E1..E13 and TileCap_Sheet_Description_E1..E13
    for (let i = 1; i <= 13; i++) {
        const aKey = `Anchor_Base_Sheet_E${i}`;
        const dKey = `TileCap_Sheet_Description_E${i}`;

        Anchor_Base[aKey] = sd[aKey] ?? '';
        udlTile[dKey] = sd[dKey] ?? '';
    }
}

// Lifecycle Hooks
onMounted(() => {
    // Recent changes

    roofList.value.forEach((item, index) => {
        if (item.item === 'Adhesive Set Tile') {
            dims.area = item.dim4;
        }
    });
});

const tileData2 = reactive({
    noa: '',
    manufacturerData: '',
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
    height: '',
    area: '',
    slope: '',
    Decktype: '',
    perimeter: '',
    tileIdentifier: 'tile',
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
const selectionMap2 = computed(() => {
    const src = srcData.value || {};
    console.log(src);
    // when API gives an object map
    if (src.mfMap && typeof src.mfMap === 'object' && !Array.isArray(src.mfMap)) {
        return { ...src.mfMap };
    }
    // fallback to arrays selection[] + resistance[]
    const map = {};
    const sel = Array.isArray(src.mfMap) ? src.mfMap : [];
    const res = Array.isArray(src.resistance) ? src.resistance : [];
    sel.forEach((k, i) => {
        const label = typeof k === 'string' ? k : (k?.label ?? k?.value ?? '');
        if (label) map[label] = res[i];
    });
    return map;
});
// --- main actions ---------------------------------------------------------
const materialOptions = computed(() => Object.keys(selectionMap2.value).map((label) => ({ label, value: label })));

// keep model sane when options change
watch(materialOptions, (opts) => {
    if (!opts.some((o) => o?.value === selectedMaterial.value)) {
        selectedMaterial.value = null;
    }
});
const selectionMap = computed(() => {
    const src = srcData.value || {};
    console.log(src);
    if (src.selection && typeof src.selection === 'object' && !Array.isArray(src.selection)) {
        return { ...src.selection }; // label -> MF
    }
    // align with arrays if needed
    const map = {};
    const sel = Array.isArray(src.selection) ? src.selection : [];
    const res = Array.isArray(src.resistance) ? src.resistance : [];
    console.log(res, sel);
    sel.forEach((k, i) => {
        const label = typeof k === 'string' ? k : (k?.label ?? k?.value ?? '');
        if (label) map[label] = res[i];
    });
    return map;
});

// ---- SAFE OPTION BUILDERS (always return a FLAT ARRAY) ----
const toOption = (opt) => {
    if (opt == null) return null;
    console.log(opt);
    // if a primitive string/number
    if (typeof opt === 'string' || typeof opt === 'number') {
        const s = String(opt);
        return { label: s, value: s };
    }

    // if already option-like object
    if (typeof opt === 'object') {
        // treat objects without items (not a group) as a single option
        if (!('items' in opt)) {
            const label = opt.label ?? opt.name ?? opt.text ?? String(opt.value ?? opt.id ?? opt.key ?? '');
            const value = opt.value ?? opt.id ?? opt.key ?? label;
            return { label, value };
        }
    }

    // fallback
    const s = String(opt);
    return { label: s, value: s };
};

// turn an object map into array: { "Label A": "118.9⁴", ... } -> [{label:"Label A", value:"Label A"}, ...]
// const fromObjectMap = (obj) => Object.keys(obj || {}).map((label) => ({ label, value: label }));
// main computed for options

const safeOptions = computed(() => {
    const src = tilenoas.selection; // single path normalized above
    if (src && typeof src === 'object' && !Array.isArray(src)) {
        return Object.keys(src).map((label) => ({ label, value: label }));
    }
    const arr = Array.isArray(src) ? src : [];
    return arr.map(toOption).filter(Boolean);
});
const SUPER_RE = /[\u00B2-\u00B3\u00B9\u2070-\u207F]/g;
const toNum = (x) => Number(String(x ?? '').replace(SUPER_RE, ''));
function updateMF1(val) {
    const label = typeof val === 'object' && val ? (val.value ?? val.label) : val;
    console.log(label, val);

    if (!label) return;
    console.log(label, val);

    const mfRaw = selectionMap.value[label];
    console.log(label, mfRaw);
    if (mfRaw == null) return;

    const mf = String(mfRaw);
    const mfNum = toNum(mf);

    zoneone.mf1 = mf;
    zonetwo.mf2 = mf;
    zonethree.mf3 = mf;

    const mr1 = toNum(zoneone.mr1);
    const mr2 = toNum(zonetwo.mr2);
    const mr3 = toNum(zonethree.mr3);

    ismrValidMR1.value = mr1 < mfNum;
    ismrInvalid1.value = !ismrValidMR1.value;
    ismrValidMR2.value = mr2 < mfNum;
    ismrInvalid2.value = !ismrValidMR2.value;
    ismrValidMR3.value = mr3 < mfNum;
    ismrInvalid3.value = !ismrValidMR3.value;
    console.log(selections, label);
    selectedMaterial.value = label;
    tileData2.material = label;
    saveTileData();
}
const selections = ref(null); // v-model for the Select
watch(
    [slopeBucket, srcData],
    () => {
        // Single path: Table2/3 (not maps)
        if (!isMultiTileValid.value) {
            applyMgLambdaFromTables();
            // If a material is already chosen, re-validate MF vs MR
            if (selectedMaterial.value) updateMF1(selectedMaterial.value);
        }
    },
    { immediate: true }
);

watch(safeOptions, (opts) => {
    console.log(safeOptions, opts);
    // if current selection not in the new list, clear it
    if (!opts.some((o) => o?.value === selections.value)) {
        selections.value = null;
    }
});
watch(
    safeOptions,
    (v) => {
        if (!Array.isArray(v)) console.warn('safeOptions is not an array:', v);
    },
    { immediate: true }
);
watch(
    selectionMap2,
    (m) => {
        console.log('[selectionMap2]', m);
    },
    { immediate: true }
);

watch(selectedMaterial, (v) => {
    console.log('[selectedMaterial]', v);
});
// helper to compute bucket from a numeric slope
function bucketFromSlope(s) {
    const n = clamp(Number(s || 0), 2, 12);
    if (n <= 3) return 2;
    if (n < 4) return 3;
    if (n <= 4) return 4;
    if (n < 6) return 5;
    if (n < 7) return 6;
    return 7;
}
// ---- your existing Mg/λ painter (unchanged), but we'll call updateMF after it this worked
function applyMgLambdaFromTables() {
    const src = srcData.value;

    if (!src?.Table3 || !src?.Table2) return;
    if (src?.content === 'multiple') return; // multi-tile handled by onTileTypePick

    // pick slope bucket key
    const bucket = bucketFromSlope(dims.slope); // 2..7
    const keys = ['two', 'three', 'four', 'five', 'six', 'seven'];
    const key = keys[Math.min(Math.max(bucket - 2, 0), 5)];

    // MG: prefer Direct_Deck if present, else the raw number
    const t3row = src.Table3?.[key];
    const mg = t3row?.Direct_Deck ?? t3row ?? 0;

    // λ: prefer Direct_Deck if present, else numeric value
    const lam = src.Table2?.Direct_Deck ?? src.Table2 ?? 0;

    zoneone.mg1 = mg;
    zonetwo.mg2 = mg;
    zonethree.mg3 = mg;
    zoneone.lambda1 = lam;
    zonetwo.lambda2 = lam;
    zonethree.lambda3 = lam;

    // compute MR once (no need to call computeMR1 again)
    const z1 = Number(zoneone.zone || 0) * Number(zoneone.lambda1 || 0) - Number(zoneone.mg1 || 0);
    const z2 = Number(zonetwo.zone || 0) * Number(zonetwo.lambda2 || 0) - Number(zonetwo.mg2 || 0);
    const z3 = Number(zonethree.zone || 0) * Number(zonethree.lambda3 || 0) - Number(zonethree.mg3 || 0);

    zoneone.mr1 = z1.toFixed(2);
    zonetwo.mr2 = z2.toFixed(2);
    zonethree.mr3 = z3.toFixed(2);
    computeMR1();
}

function computeMR1() {
    const z1 = Number(zoneone.zone) * Number(zoneone.lambda1) - Number(zoneone.mg1);
    const z2 = Number(zonetwo.zone) * Number(zonetwo.lambda2) - Number(zonetwo.mg2);
    const z3 = Number(zonethree.zone) * Number(zonethree.lambda3) - Number(zonethree.mg3);
    zoneone.mr1 = z1.toFixed(2);
    zonetwo.mr2 = z2.toFixed(2);
    zonethree.mr3 = z3.toFixed(2);
}

watch(
    [slopeBucket, srcData],
    () => {
        console.log(srcData, slopeBucket);
        applyMgLambdaFromTables();
        if (selections.value != null) {
            updateMF1(selections.value); // only if user has a selection
        }
    },
    { immediate: true }
);

function updateMF(val) {
    const label = typeof val === 'object' && val ? (val.value ?? val.label) : val;
    console.log(label);

    if (!label) return;
    const mfRaw = selectionMap2.value[label]; // e.g. "118.9⁴"
    if (mfRaw == null) return;
    console.log(mfRaw);

    const mf = String(mfRaw);
    const mfNum = toNum(mf);
    console.log(mf);
    zoneone.mf1 = mf;
    zonetwo.mf2 = mf;
    zonethree.mf3 = mf;

    const mr1 = toNum(zoneone.mr1);
    const mr2 = toNum(zonetwo.mr2);
    const mr3 = toNum(zonethree.mr3);

    ismrValidMR1.value = mr1 < mfNum;
    ismrInvalid1.value = !ismrValidMR1.value;
    ismrValidMR2.value = mr2 < mfNum;
    ismrInvalid2.value = !ismrValidMR2.value;
    ismrValidMR3.value = mr3 < mfNum;
    ismrInvalid3.value = !ismrValidMR3.value;
    selectedMaterial.value = label;
    tileData2.material = label;
    saveTileData();
}

// recompute λ/Mg when slope or payload changes
watch(
    [() => slopeBucket.value, srcData],
    () => {
        if (isMultiTileValid.value && selectedMulti.value) {
            onTileTypePick(selectedMulti.value);
            // re-check MF only if a material is already chosen
            // if (selectedMaterial.value) updateMF(selectedMaterial.value);
        }
    },
    { immediate: true }
);
const postMetrictable = reactive({
    noa: '',
    applicant: '',
    description: '',
    material: '',
    height: '',
    slope: '',
    perimeter: '',
    area: '',
    decktype: '',
    prescriptive: '',
    zoneone: [],
    zonetwo: [],
    zonethree: [],
    tileIdentifier: 'tile'
});

const saveTileData = async () => {
    tileData2.slope = dims.slope;
    tileData2.height = dims.height;
    tileData2.area = dims.area;
    tileData2.perimeter = dims.per;
    tileData2.noa = tilenoas.noa;

    tileData2.Decktype = dt.value;
    tileData2.prescriptiveSelection = UnderlaymentSelection.value;

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

    tileData2.zonethree.zone3 = zonethree.zone;
    tileData2.zonethree.lambda3 = zonethree.lambda3;
    tileData2.zonethree.mg3 = zonethree.mg3;
    tileData2.zonethree.mr3 = zonethree.mr3;

    tileData2.zoneone.mf1 = zoneone.mf1;
    tileData2.zonetwo.mf2 = zonetwo.mf2;
    tileData2.zonethree.mf3 = zonethree.mf3;
    sendDataMongo();

    // }
};
// NEW: local flags for modal state

// Hard reset of tile state
function resetTileUI() {
    selectedMaterial.value = null;
    selectedMulti.value = null;

    Object.assign(tilenoas, {
        noa: 0,
        manufacturer: '',
        material: '',
        description: '',
        select_tile: [],
        table2_map: {},
        tile_map: {},
        selection: {},
        expiration_date: ''
    });

    zoneone.lambda1 = zonetwo.lambda2 = zonethree.lambda3 = '';
    zoneone.mg1 = zonetwo.mg2 = zonethree.mg3 = '';
    zoneone.mr1 = zonetwo.mr2 = zonethree.mr3 = '';
    zoneone.mf1 = zonetwo.mf2 = zonethree.mf3 = '';
}

watch(selectedOption, (mode, prev) => {
    // clear input box if switching kinds
    if (prev && prev !== mode) childQueryRef.value?.clearInput?.();

    resetTileUI();
    isPaddySingle.value = mode === 'single';
    isPaddyDouble.value = mode === 'double';
    isTileValid.value = true;
    isMultiTileValid.value = false;

    // if the modal is open, bump key so content remounts
    // if (modalIsActive.value) modalKey.value++;
});

// When the user flips single/double, clear UI immediately

// Whenever the backing payload changes, re-apply it
watch(
    srcData,
    (src) => {
        if (!src) return;
        const multiple = src?.content === 'multiple';
        applyNOA(src, { multiple });
        if (!multiple) applyMgLambdaFromTables();

        // clean selections that no longer exist
        selectedMaterial.value = null;
        selectedMulti.value = Array.isArray(tilenoas.select_tile) ? tilenoas.select_tile[0] : null;

        if (isTileModalOpen.value) modalKey.value++; // force modal content refresh
    },
    { immediate: true }
);

const sendDataMongo = async () => {
    console.log(tileData2.prescriptiveSelection);
    postMetrictable.noa = tileData2.noa;
    postMetrictable.applicant = tileData2.applicant;
    postMetrictable.description = tileData2.description;
    postMetrictable.material = tileData2.material;
    // await post(tileManufacturerInfo);
    postMetrictable.zoneone = tileData2.zoneone;
    postMetrictable.zonetwo = tileData2.zonetwo;
    postMetrictable.zonethree = tileData2.zonethree;
    postMetrictable.decktype = tileData2.Decktype;
    postMetrictable.prescriptive = tileData2.prescriptiveSelection;
    postMetrictable.tileIdentifier = tilenoas.tileIdentifier;
    postMetrictable.slope = dims.slope;
    postMetrictable.height = dims.height;
    postMetrictable.area = dims.area;
    postMetrictable.perimeter = dims.per;
    addSavedvalues(tileData2);

    await post(postMetrictable);
};

// One-liner map builder (keys[] -> values[])
const buildEKeyMap = (keys = [], values = []) => Object.fromEntries(keys.map((k, i) => [String(k), values[i]]));

// --- Maps built reactively (no manual loops needed)
const sysEMap = computed(() => buildEKeyMap(udlTile.system || [], udlTile.arrDesignPressure || []));
// Optional: if you sometimes store Anchor_Base_* on udlTile instead of Anchor_Base
const anchorSource = (k) => Anchor_Base?.[`Anchor_Base_Sheet_${k}`] ?? udlTile?.[`Anchor_Base_Sheet_${k}`] ?? '';
const capDescSource = (k) => udlTile?.[`TileCap_Sheet_Description_${k}`] ?? '';

function udlDescPressure() {
    const k = selectedsystemE.value; // e.g. 'E1'...'E13'
    if (!k) return;

    udlTile.TileCap_Sheet_Description = capDescSource(k);
    udlTile.designPressure = sysEMap.value[k] ?? '';
    udlTile.Anchor_Base_Sheet = anchorSource(k);

    // Persist to store if present
    const s = etileStore.$state.tilesysEinput?.[0]?.systemDataE;
    if (s) {
        s.Anchor_Base = udlTile.Anchor_Base_Sheet;
        s.tileCap = udlTile.TileCap_Sheet_Description;
        s.dP = udlTile.designPressure;
        s.systemSelected = k;
    }

    // Post/update
    postUDLStaging();
}

// When the selection changes, just recompute once
function updateselectSystemE() {
    udlDescPressure();
}

// If your Select supports it, prefer this. Otherwise use @change="updateselectSystemE"
watch(
    () => selectedsystemE.value,
    () => {
        udlDescPressure();
    }
);

async function postUDLStaging() {
    console.log(udlTile);
    udlTile.Anchor_Base = etileStore.$state.tilesysEinput[0].systemDataE.Anchor_Base;
    udlTile.systemSelected = selectedsystemE.value;
    // udlTile.prescriptiveSelection = tileData2.prescriptiveSelection;

    await postUDL(udlTile);
}
// const showModalUDL = ref(false);
const modalKeyUDL = ref(0);
const currentTileUDl = ref(null);
const isTileModalOpen = computed(() => modalIsActive.value);

// const showModal = ref(false);
const modalKey = ref(0);
// const showModalSA = ref(false);
const modalKeySA = ref(0);
const currentTile = ref(null);

const currentTileSA = ref(null);

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
async function onOpenTileClick() {
    // ensure latest payload has been applied by watchers
    await nextTick();

    const src = toPlain(tilenoas);
    currentTile.value = {
        manufacturer: src?.manufacturer ?? '',
        material: src?.material ?? '',
        description: src?.description ?? ''
    };

    // force remount so stale VNodes are gone
    modalKey.value++;
    await nextTick();

    modalIsActive.value = true;
}

async function onOpenTileUDLClick() {
    // If you have a selected row/object, pass it here:
    // const selected = mySelectedRow.value
    // Otherwise, use whatever source `checkInput()` prepared.
    await nextTick();

    // 1) run any prep that fills data (but make sure it doesn’t mutate during open)
    await sysEcheckInput();

    // 2) build a plain POJO snapshot with just the fields you need
    const src = toPlainUDL(udlTile);
    currentTileUDl.value = {
        udlmanufacturer: src?.manufacturer ?? '',
        udlmaterial: src?.material ?? '',
        udldescription: src?.description ?? '',
        udlsystem: src?.system ?? ''
    };

    // 3) bump key BEFORE show if you want a hard reset
    modalKeyUDL.value++;

    // 4) wait a tick so Vue sees the new props, THEN show the modal

    modalKeyUDL.value++; // optional: bump key to force remount
    await nextTick();
    modalUDLIsActive.value = true;
}
async function onOpenTileSAClick() {
    await nextTick();
    checkInputSA(); // fills saTiles
    const src = toPlainSA(saTiles); // snapshot
    currentTileSA.value = {
        samanufacturer: src?.manufacturer ?? '',
        samaterial: src?.material ?? '',
        sasystem: src?.system ?? ''
    };
    modalKeySA.value++; // force remount
    await nextTick();
    modalSAIsActive.value = true; // then show
}

const tileSAStaging = async () => {
    console.log(saTiles);
    // saTiles.prescriptiveSelection = tileData2.prescriptiveSelection;
    await postSATile(saTiles);
};
</script>

<template>
    <div id="tile" class="inner mx-auto max-w-5xl p-6 dark:bg-gray-800 rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-3 gap-3" style="margin-left: 50px; margin-top: 100px">
        <div class="w-64 gap-2 mt-5 space-y-2" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" @change="getdeckType" />
        </div>

        <div class="w-64 gap-2 space-y-2" style="margin-left: 20px">
            <label for="slope" style="color: #122620">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isSlopeValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" placeholder="slope" v-model.number="dims.slope" :disabled="isSlopeDisabled" @change="validateRoofSlope" />
            <Message v-if="errorMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorMessage }}</Message>
        </div>

        <div></div>
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="area">Area of Tile</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>

        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="height" style="color: #122620">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isHeightValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="heightModel" type="text" placeholder="height" :disabled="isHeightDisabled" @change="validateHeight" />
            <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message>
            <!-- @input="setRoofInputs" -->
            <!-- optional error message -->
        </div>
        <div></div>
        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label style="color: #122620" for="perimeter">Roof Permeter(a) = 4h</label>
            <InputText id="perimeter" v-model="dims.per" type="text" placeholder=" " @change="validateHeight" />
        </div>
        <div class="grid grid-cols-3 gap-2">
            <div class="min-w-[580px] flex flex-col" style="margin-left: 50px">
                <label style="color: red">Select Exposure</label>
                <div class="flex items-center space-x-2 mt-5">
                    <div class="field-radiobutton space-x-4 space-y-4 gap-6">
                        <RadioButton inputId="option3" name="option" value="c" v-model="selectedExposures" @change="onExposureChange" style="margin-left: 5px" />
                        <label style="color: #122620; margin-left: 10px" for="option3">C</label>
                    </div>
                    <div class="field-radiobutton space-x-4 space-y-4 gap-6">
                        <!-- variant="filled" -->
                        <RadioButton inputId="option4" name="option" value="d" v-model="selectedExposures" @change="onExposureChange" style="margin-left: 20px" />

                        <label style="color: #122620; margin-left: 20px" for="option4">D</label>
                    </div>
                </div>
                <!-- v-show="isPaddyCategoryValid" -->
                <div class="min-w-[580px] flex flex-col mt-5">
                    <label style="color: red">Select a Paddy Category</label>
                    <div class="flex items-center mt-10">
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
            </div>
        </div>
        <Divider />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <systemENumber @cleared="resetUDLModal" />
            <Buttons label="Submit" severity="contrast" @click="onOpenTileUDLClick" style="margin-left: 15px" />
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <systemFNumber @cleared="resetSAModal" />
            <Buttons label="Submit" severity="contrast" @click="onOpenTileSAClick" style="margin-left: 15px" />
        </div>

        <div v-show="isPaddyCategoryValid" class="w-96" style="margin-left: 3px">
            <tileNoaNumber @cleared="resetModal" ref="childQueryRef" v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out" />
            <Buttons label="Submit" severity="contrast" @click="onOpenTileClick" style="margin-left: 15px" />
        </div>
    </div>
    <div class="md:w-1/2 flex flex-col w-72 mb-4 mt-6 gap-3 space-y-2" style="margin-left: 50px">
        <label style="color: #122620" for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
        <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @change="pickUnderlayment" />
    </div>
    <DripEdAdTile style="margin-left: 50px" />
    <Divider />
    <Divider />

    <ModalWindow :key="modalKey" :initialData="currentTile" @closePopup="(modalIsActive = false), sendDataMongo()" v-if="modalIsActive">
        <div v-show="isTileData" class="grid grid-cols-1 md:grid-cols-1 gap-2" style="margin-left: 10px">
            <div class="w-1/2 flex flex-col border-2 p-2 gap-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">Tile Applicant</label>
                <InputText id="manufacturer" v-model="tilenoas.manufacturer" />
            </div>
            <div v-show="isMultiTileValid" class="w-1/2 flex flex-col border-2 p-2 border-gray-700">
                <label for="material">Tile Type</label>
                <Select v-model="selectedMulti" :options="tilenoas.select_tile" placeholder="make a selection" @update:modelValue="onTileTypePick" />
            </div>

            <div v-show="isMultiTileValid" class="w-1/2 flex flex-col border-2 p-2 border-gray-700">
                <label for="material">Tile Material</label>
                <Select v-model="selectedMaterial" :options="materialOptions" optionLabel="label" optionValue="value" placeholder="make a selection" @update:modelValue="updateMF" />
            </div>

            <Divider />
            <div v-show="!isMultiTileValid" class="w-1/2 flex flex-col border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="description">Tile Description</label>
                <InputText id="description" v-model="tilenoas.description" />
            </div>
            <div v-show="!isMultiTileValid" class="w-2/3 flex flex-col border-2 p-2 border-gray-700">
                <label style="color: #122620">Tile Material</label>
                <Select
                    v-model="selectedMaterial"
                    :options="safeOptions"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="make a selection"
                    @update:modelValue="
                        (val) => {
                            applyMgLambdaFromTables(); // λ/Mg from Table2/3 for single
                            updateMF1(val); // MF from selection/resistance
                        }
                    "
                />
            </div>
        </div>
    </ModalWindow>

    <ModalWindow :key="modalKeyUDL" :initialData="currentTileUDl" @closePopup="(modalUDLIsActive = false), postUDLStaging()" v-if="modalUDLIsActive">
        <div v-show="isUDLNOAValid" class="grid grid-cols-2 gap-2" style="margin-left: 10px">
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">(UDL) NOA Applicant</label>
                <InputText id="manufacturer" v-model="udlTile.manufacturer" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">(UDL) Material</label>
                <InputText id="material" v-model="udlTile.material" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: red">Select System E *</label>
                <Select v-model="selectedsystemE" :options="udlTile.system" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="designPressure">Design psf:</label>
                <InputText id="designPressure" v-model="udlTile.designPressure" @change="updateselectSystemE" />
            </div>
            <div class="grid grid-cols-1 gap-2 border-gray-700 focus:border-orange-600">
                <div class="min-w-[1080px] flex flex-col">
                    <label style="color: #122620" for="anchor">Anchor Base Sheet</label>
                    <InputText id="anchor" v-model="udlTile.Anchor_Base_Sheet" @change="updateselectSystemE" />
                </div>
                <div class="min-w-[280px] flex flex-col">
                    <label style="color: #122620" for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udlTile.TileCap_Sheet_Description" @change="updateselectSystemE" />
                </div>
            </div>
        </div>
    </ModalWindow>
    <ModalWindow :key="modalKeySA" :initialData="currentTileSA" @closePopup="(modalSAIsActive = false), tileSAStaging()" v-if="modalSAIsActive">
        <div v-show="isSAValid" class="grid grid-cols-1 md:grid-cols-2 gap-2" style="margin-left: 10px">
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="saapplicant">S/A Applicant</label>
                <InputText id="saapplicant" v-model="saTiles.manufacturer" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="samaterial">S/A Material Type</label>
                <InputText id="saaterial" v-model="saTiles.material" />
            </div>
            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: red; margin-bottom: 55px">Select System F *</label>
                <br />
                <Select v-model="selectedsystemf" :options="saTiles.system" placeholder="" @update:modelValue="saDescPressure" />
            </div>

            <div class="w-1/2 border-2 p-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="designpressure">Design psf:</label>
                <InputText id="designpressure" v-model="saTiles.designpressure" />
            </div>
            <div v-show="isSAValid" class="min-w-[480px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="sadescription">S/A Description</label>
                <InputText id="capsheetdescription" v-model="saTiles.description" />
            </div>
        </div>
    </ModalWindow>
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
                                        <td style="color: #122620"><input v-model="zoneone.zone" readonly size="4" /> x λ &nbsp;</td>
                                        <td style="color: #122620"><input v-model="zoneone.lambda1" readonly size="4" /> - Mg:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zoneone.mg1" readonly size="4" /> = Mr1:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zoneone.mr1" readonly size="4" /> NOA Mf:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zoneone.mf1" size="6" /></td>
                                        <i class="pi pi-check" v-show="ismrValidMR1" style="color: green; font-size: 1.5rem"></i>
                                        <i class="pi pi-times" v-show="ismrInvalid1" style="color: red; font-size: 1.5rem"></i>
                                    </tr>

                                    <tr>
                                        <td style="color: #122620">Zone 2:</td>
                                        <td style="color: #122620"><input v-model="zonetwo.zone" readonly size="4" /> x λ &nbsp;</td>
                                        <td style="color: #122620"><input v-model="zonetwo.lambda2" readonly size="4" /> - Mg:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zonetwo.mg2" readonly size="4" /> = Mr2:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zonetwo.mr2" readonly size="4" /> NOA Mf:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zonetwo.mf2" size="6" /></td>
                                        <i class="pi pi-check" v-show="ismrValidMR2" style="color: green; font-size: 1.5rem"></i>
                                        <i class="pi pi-times" v-show="ismrInvalid2" style="color: red; font-size: 1.5rem"></i>
                                    </tr>

                                    <tr>
                                        <td style="color: #122620">Zone 3:</td>
                                        <td style="color: #122620"><input v-model="zonethree.zone" readonly size="4" /> x λ</td>
                                        <td style="color: #122620"><input v-model="zonethree.lambda3" readonly size="4" /> - Mg:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zonethree.mg3" readonly size="4" /> = Mr3:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zonethree.mr3" readonly size="4" /> NOA Mf:&nbsp;</td>
                                        <td style="color: #122620"><input v-model="zonethree.mf3" size="6" /></td>
                                        <i class="pi pi-check" v-show="ismrValidMR3" style="color: green; font-size: 1.5rem"></i>
                                        <i class="pi pi-times" v-show="ismrInvalid3" style="color: red; font-size: 1.5rem"></i>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped></style>
