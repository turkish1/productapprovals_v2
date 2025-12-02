<script setup>
import usePostBurLambda from '@/composables/Postdata/usePostBurLambda';
import useS3download from '@/composables/fetchTech/use-S3download';
import useBurDetails from '@/composables/fetchTech/use-burdetailsdocs';
import useburAxios from '@/composables/use-burSystems';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { usePermitappStore } from '@/stores/permitapp';
import { computed, onMounted, reactive, ref, toRaw, watch } from 'vue';

// Composable & store setup

const permitStore = usePermitappStore();
const { downloadFile, fileUrl } = useS3download();
const { callFunction, systemHW, systemHM, systemSA, Perimeters } = useburAxios();
const { postBur } = usePostBurLambda();
const { calldetailsdoc } = useBurDetails();
const dripStore = usedripedgeStore();

// References & state
const fileName = ref('downloaded-file.pdf');
const muniProcessNumber = ref(permitStore.$state.permitapp?.[0]?.formdt?.muniProc ?? '');
const uploadUrl = ref('');

const selectedBur = ref(null);
const selectedSystem = ref(null);
const selectedPrimeone = ref(null);
const selectedPrimethree = ref(null);
const burcardStore = useBurpdfStore();

console.log('STORE FULL STATE:', toRaw(dripStore.$state));
console.log('inputselectedDripEdge array:', dripStore.inputselectedDripEdge);
console.log('First item:', dripStore.inputselectedDripEdge?.[0]);
console.log('dripSelection object:', dripStore.inputselectedDripEdge?.[0]?.dripSelection);

const mat = ref([]);
const syst = ref([]);
const primeone = ref([]);
const primethree = ref([]);
const copiedString = ref('');
const dripMaterialComp = computed(() => dripStore.inputselectedDripEdge[0]?.dripEdgeMaterial ?? dripStore.inputselectedDripEdge[0]?.dripSelection?.dripEdgeMaterial ?? '');
const dripSizeComp = computed(() => dripStore.inputselectedDripEdge[0]?.dripEdgeSize ?? dripStore.inputselectedDripEdge[0]?.dripSelection?.dripEdgeSize ?? '');

onMounted(() => {
    loadMaterials();
});

const selectedBurItems = reactive({
    burMaterial: '',
    burSystem: '',
    p1: '',
    p3: ''
});

// Helper functions
const bMaters = ref(['', 'Hot-Mopped Applied Systems', 'SBS/APP Modified Heat-Weld Bitumen Membrane', 'SBS Modified Bitumen Self-Adhered Membrane']);
/** Load materials from the composable when the select is clicked */
function loadMaterials() {
    mat.value = bMaters.value ?? [];
}
const dripSel = reactive({
    dripMaterial: '',
    dripSize: ''
});
watch(
    () => dripStore.inputselectedDripEdge,
    (newVal) => {
        // console.log('Drip edge selection changed:', newVal);
        dripSel.dripMaterial = newVal[0]?.dripSelection.DripEdgeMaterial;
        dripSel.dripSize = newVal[0]?.dripSelection?.DripEdgeSize;
    },
    { deep: true }
);
//
// At component level (outside setup)
const systemCache = reactive({
    'Hot-Mopped Applied Systems': null,
    'SBS/APP Modified Heat-Weld Bitumen Membrane': null,
    'SBS Modified Bitumen Self-Adhered Membrane': null
});

async function updateSystemOptions(material) {
    if (!material) {
        syst.value = [];
        return;
    }

    // Return from cache if we already fetched it
    if (systemCache[material] !== null) {
        syst.value = systemCache[material];
        return;
    }

    // Show loading state (optional but nice)
    syst.value = [];
    // you can add isLoading.value = true

    try {
        await callFunction(material); // still fetches only the first time

        let data;
        switch (material) {
            case 'Hot-Mopped Applied Systems':
                data = systemHM.value;
                break;
            case 'SBS/APP Modified Heat-Weld Bitumen Membrane':
                data = systemHW.value;
                break;
            case 'SBS Modified Bitumen Self-Adhered Membrane':
                data = systemSA.value;
                break;
            default:
                data = [];
        }

        // Cache it!
        systemCache[material] = data;
        syst.value = data;
    } catch (err) {
        console.error('Failed to load systems:', err);
        syst.value = [];
    }
}
/** Map superscript numerals to Perimeters keys */
function resolvePerimeterOptions(system) {
    const superscriptMap = {
        '¹': 'one',
        '²': 'two',
        '³': 'three',
        '⁴': 'four',
        '⁵': 'five'
    };
    const matches = system.match(/[¹²³⁴⁵]/g);
    if (!matches) return null;
    // Precedence order mirroring original code conditions: 4 > 3 > 2 > 5 > 1
    const precedence = ['⁴', '³', '²', '⁵', '¹'];
    const selected = precedence.find((s) => matches.includes(s));
    if (!selected) return null;
    const key = superscriptMap[selected];
    return {
        prime: Perimeters[`p1_${key}`],
        perimeter: Perimeters[`p2_${key}`]
    };
}

/** Extract the first token (before whitespace) for details lookup and file naming */
function extractFirstToken(str) {
    const match = str?.match(/^[^\s]+/);
    return match ? match[0] : '';
}

async function onMaterialChange({ value }) {
    if (!value || value === selectedBurItems.burMaterial) return;

    selectedBurItems.burMaterial = value;
    selectedSystem.value = null;
    selectedPrimeone.value = null;
    selectedPrimethree.value = null;
    primeone.value = [];
    primethree.value = [];

    await updateSystemOptions(value);
}

function onSystemChange({ value }) {
    selectedBurItems.burSystem = value;
    const options = resolvePerimeterOptions(value);
    if (options) {
        primeone.value = options.prime;
        primethree.value = options.perimeter;
    } else {
        primeone.value = [];
        primethree.value = [];
    }
    const firstPart = extractFirstToken(value);
    copiedString.value = firstPart;
    console.log(firstPart);
    calldetailsdoc(firstPart);
    // handleDownload();
}

function onPrimeOneChange({ value }) {
    selectedBurItems.p1 = value;
}

function onPrimeThreeChange({ value }) {
    selectedBurItems.p3 = value;
    burStaging();
}

// Upload the blank PDF and download it from S3
async function handleDownload() {
    const firstName = copiedString.value;
    const pdfBlob = new Blob([], { type: 'application/pdf' });
    if (!firstName || !muniProcessNumber.value) {
        return;
    }
    console.log(firstName);
    const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${muniProcessNumber.value}/${firstName}`;
    try {
        const response = await fetch(s3Url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/pdf' },
            body: pdfBlob
        });
        if (response.ok) {
            uploadUrl.value = s3Url;
        } else {
            console.error(`Failed to upload file. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
    try {
        downloadFile(fileUrl, fileName.value);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

const commonBur = () => ({
    p1: selectedBurItems.p1,
    p3: selectedBurItems.p3,
    bursystem: selectedBurItems.burSystem,
    burmaterial: selectedBurItems.burMaterial,
    hittype: 'lowslope'

    // give this a real boolean, not the Boolean constructor
});

async function burStaging() {
    console.log(burcardStore);
    const burInput = burcardStore.burpdfinput[1]?.burpdfData;
    const body = {
        ...commonBur(),
        area: burInput?.area,

        decktype: burInput?.decktype,
        slope: burInput?.slope,
        dripEdgeMaterial: dripSel.dripMaterial,
        dripEdgeSize: dripSel.dripSize,
        height: burInput?.height,
        permiter: burInput?.perimeter,

        hittype: burcardStore.$state.burpdfinput[0]?.burpdfData?.hittype
    };
    // add body to a store to filee the poker cards in summary page
    console.log(body);
    await postBur(body);
}
</script>

<template>
    <div class="min-w-[980px] flex flex-col gap-2 border-2 mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg grid gap-6" style="margin-left: 50px; border-radius: 5px">
        <div>
            <label for="material" class="block text-sm font-medium text-red-600 mb-1"> Type of Low‑Slope BUR Material <span class="text-red-500">*</span> </label>

            <Select id="material" v-model="selectedBur" :options="mat" placeholder="Make a selection" @change="onMaterialChange" class="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition" />
        </div>

        <div>
            <label for="system" class="block text-sm font-medium text-red-600 mb-1"> Type of Low‑Slope BUR System <span class="text-red-500">*</span> </label>
            <Select id="system" v-model="selectedSystem" :options="syst" placeholder="Make a selection" @change="onSystemChange" class="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition" />
        </div>

        <div>
            <label for="fieldPresc1" class="block text-sm font-medium text-red-600 mb-1">
                Attach P(1') Prime using P(1) Field Prescriptive Basesheet
                <span class="text-red-500">*</span>
            </label>
            <Select id="fieldPresc1" v-model="selectedPrimeone" :options="primeone" placeholder="Make a selection" @change="onPrimeOneChange" class="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition" />
        </div>

        <div>
            <label for="fieldPresc3" class="block text-sm font-medium text-red-600 mb-1">
                Attach P(2) Perimeter using P(3) Corner Prescriptive
                <span class="text-red-500">*</span>
            </label>
            <Select id="fieldPresc3" v-model="selectedPrimethree" :options="primethree" placeholder="Make a selection" @change="onPrimeThreeChange" class="w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition" />
        </div>
    </div>
</template>

<style scoped>
/* Add any additional styles here if needed */
</style>
