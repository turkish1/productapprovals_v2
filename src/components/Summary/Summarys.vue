<template>
    <div v-if="isCheckingFiles" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
        <!-- <i class="pi pi-spin pi-spinner text-black !text-6xl mb-4"></i> -->
        <div class="card flex justify-center">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration="8.5s" aria-label="Verifying Documents..." />
        </div>
        <h2 class="text-white text-2xl font-bold">Verifying Documents...</h2>
        <p class="text-black/80 mt-2">Confirming creation of Documents: {{ expectedFiles.join(', ') }}</p>
    </div>

    <div id="summary" :class="{ 'opacity-30 pointer-events-none grayscale': isCheckingFiles }" style="margin-left: 250px; transition: all 0.5s ease">
        <div class="card flex flex-col items-left">
            <div class="flex flex-wrap justify-left gap-12">
                <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-12 h-24 flex items-center justify-center">
                        <i class="pi pi-briefcase !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">Job Info</span>
                    <span class="text-muted-color text-center">{{ dba }}</span>
                    <span class="text-muted-color text-center">{{ jobaddress }}</span>
                    <span class="text-muted-color text-center">License: {{ license }}</span>
                </div>

                <div class="flex flex-col border border-surface shadow-lg justify-left items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-12 h-24 flex items-center justify-center">
                        <i class="pi pi-info-circle !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">Municipality Info</span>
                    <span class="text-muted-color text-center">{{ muniProcessNumber }}</span>
                    <span class="text-muted-color text-center">{{ muni }}</span>
                </div>

                <div class="flex flex-col border border-surface shadow-lg justify-left items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-12 h-24 flex items-center justify-center">
                        <i class="pi pi-id-card !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">mEPermit Number</span>
                    <span class="text-muted-color text-center">{{ processNumber }}</span>
                </div>
            </div>

            <div class="h-[10rem]"></div>

            <div class="card flex flex-wrap justify-left gap-12">
                <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-96 rounded-2xl p-8 gap-4">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
                        <i class="pi pi-fw pi-question-circle !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">Support</span>
                </div>

                <div class="flex flex-wrap justify-left gap-12">
                    <Swiper :modules="[EffectCards, Navigation, Pagination]" effect="cards" grab-cursor="true" navigation pagination class="w-md max-w-md mx-auto">
                        <SwiperSlide v-for="(card, i) in cards" :key="i">
                            <StackCard :icon="card.icon" :title="card.title" :items="card.items" :bgClass="card.bg" :textClass="card.text" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import StackCard from '@/components/Summary/StackCard.vue';
import { useGlobalState } from '@/stores/accountsStore';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { usevalueStore } from '@/stores/tilevalueStore';

import ProgressSpinner from 'primevue/progressspinner';

import { Swiper, SwiperSlide } from 'swiper/vue';

// Core CSS
import 'swiper/css';

// individual module imports + CSS
import 'swiper/css/effect-cards';
import EffectCards from '../../../node_modules/swiper/modules/effect-cards';

import 'swiper/css/navigation';
import Navigation from '../../../node_modules/swiper/modules/navigation';

import useMech from '@/composables/fetchTech/use-tileMechanical';
import 'swiper/css/pagination';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import Pagination from '../../../node_modules/swiper/modules/pagination';

const { accountUsers } = useGlobalState();

const pdStore = usevalueStore();
const { mechStore } = useMech();
let isGenaralPageValid = ref(false);
let isRoofTileADValid = ref(false);
let isRoofTileMechanicalValid = ref(false);
let isRoofShingleValid = ref(false);
let isRoofLowslopeValid = ref(false);
const dba = ref('');

const burpdfStore = useBurpdfStore();
const shingleStore = useShingleStore();
const permitStore = usePermitappStore();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
const jobaddress = ref(permitStore.$state.permitapp[0]?.formdt?.address || '');
const muni = ref(permitStore.$state.permitapp[0]?.formdt?.muni || '');
const generalStore = useGeneralpdfStore();
const generalType = ref(generalStore.$state.generalpdfinput);
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');
const license = ref(permitStore.$state.permitapp[0]?.formdt?.license || '');
// const tileNoaInfo = ref(pdStore.$state.tileInputvalues[0]?.tileValues[0]);
// const mechtileNoaInfo = ref(mechStore.tilemech.value[0]);
const tileNoaInfo = computed(() => pdStore.$state.tileInputvalues[0]?.tileValues[0]);
const mechtileNoaInfo = computed(() => mechStore.tilemech.value?.[0]);

const singlePaddyData = computed(() => tileNoaInfo.value?.singlepaddyData || '');
const doublePaddyData = computed(() => tileNoaInfo.value?.doublepaddyData || '');

const burInfo = computed(() => burpdfStore.$state.burpdfinput[1]?.burpdfData);
const isPaddySingle = ref(false);
const shingleInfo = computed(() => shingleStore.$state.inputshingle[0]);
const shData = computed(() => shingleInfo.value?.shingleData || '');
const mechData = ref(mechtileNoaInfo.value);
//  Second section
console.log(tileNoaInfo, singlePaddyData, doublePaddyData, muniProcessNumber.value);
function displayUserInfo() {
    accountUsers.value.forEach((item, index) => {
        dba.value = item.dba;
    });
}
const isCheckingFiles = ref(false);

const expectedFiles = computed(() => {
    const files = [];
    const prefix = muniProcessNumber.value;
    if (!prefix) return files;

    if (isRoofTileADValid.value) files.push(`${prefix}/TileAdhesive.pdf`);
    if (isRoofLowslopeValid.value) files.push(`${prefix}/Lowslope.pdf`);
    if (isRoofTileMechanicalValid.value) files.push(`${prefix}/MechanicalTile.pdf`);
    if (isRoofShingleValid.value) files.push(`${prefix}/Shingle.pdf`);

    return files;
});

async function checkS3File(fileKey) {
    try {
        const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${fileKey}`;
        // HEAD request is faster and saves bandwidth on CentOS
        const response = await fetch(s3Url, { method: 'HEAD', cache: 'no-store' });
        // return response.ok;
        if (response.ok) {
            console.log(`✅ File Found: ${fileKey}`);
            return true;
        } else {
            console.warn(`❌ File Not Found (Status ${response.status}): ${fileKey}`);
            return false;
        }
    } catch (err) {
        console.error('S3 Check Error:', err);
        return false;
    }
}
onMounted(async () => {
    displayUserInfo();

    // 1. Manually trigger the logic that sets isRoofTileADValid, etc.
    updateRoofValidity();

    // 2. Wait a tick for the computed 'expectedFiles' to update
    await nextTick();

    console.log('Expected Files to check:', expectedFiles.value);

    if (expectedFiles.value.length > 0) {
        await verifyDocuments();
    } else {
        console.warn('No files to verify. Check if roofType.value has data.');
    }
});
/**
 * The Polling Engine
 * It will stop spinning only when ALL expected files are detected
 */
async function verifyDocuments() {
    const targets = expectedFiles.value;
    if (targets.length === 0) return;

    isCheckingFiles.value = true;
    let allFound = false;
    const startTime = Date.now();
    const TIMEOUT_MS = 30000; // 30 second safety net

    while (!allFound) {
        // Check for timeout
        if (Date.now() - startTime > TIMEOUT_MS) {
            console.error('S3 verification timed out.');
            break;
        }

        const results = await Promise.all(targets.map((file) => checkS3File(file)));
        allFound = results.every((exists) => exists === true);

        if (!allFound) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }

    isCheckingFiles.value = false;
}

const displayInfo = reactive({
    dim: '',
    item: ''
});

// Change this: const callState = tryOnMounted(() => { ... })
// To this:
const updateRoofValidity = () => {
    if (!roofType.value || roofType.value.length === 0) {
        console.log('No roof types found to validate.');
        return;
    }

    roofType.value.forEach((item) => {
        if (item.item === 'Asphalt Shingle') {
            isRoofShingleValid.value = true;
            displayInfo.dim = item.dim1;
            displayInfo.item = item.item;
        } else if (item.item === 'Low Slope') {
            isRoofLowslopeValid.value = true;
        } else if (item.item === 'Adhesive Set Tile') {
            isRoofTileADValid.value = true;
        } else if (item.item === 'Mechanical Fastened Tile') {
            isRoofTileMechanicalValid.value = true;
        }
    });

    if (generalType.value && generalType.value.length !== 1) {
        isGenaralPageValid.value = true;
    }
};

// --- Update your picker functions to use .value ---

function pick(field) {
    console.log(doublePaddyData.value[field]);
    // Note the .value here because singlePaddyData is now a computed
    return isPaddySingle.value ? singlePaddyData.value[field] : doublePaddyData.value[field];
}

function mechPick(mechfield) {
    return isRoofTileMechanicalValid.value ? mechtileNoaInfo.value?.[mechfield] : '';
}

function burpick(burfield) {
    return isRoofLowslopeValid.value ? burInfo.value?.[burfield] : '';
}
function shinglePick(shfield) {
    return isRoofShingleValid.value ? shData.value?.[shfield] : '';
}

// function mechPick(mechfield) {
//     return isRoofTileMechanicalValid.value ? mechData.value[mechfield] : '';
// }
// helper to build items array
function makeItems(defs, pickerFn) {
    console.log(defs, pickerFn);
    // defs = [ [field, label], … ]
    return defs.map(([field, label]) => ({
        label,
        value: pickerFn(field)
    }));
}
watch(
    () => pdStore.$state.tileInputvalues,
    (newVal) => {
        console.log('📦 Store updated! New data:', newVal);
        console.log('🎴 Current Cards state:', cards.value);
    },
    { deep: true }
);
const burDefs = [
    ['burmaterial', 'Material: '],
    ['bursystem', 'System: '],
    ['p1', 'P1: '],
    ['p3', 'P3: ']
];

// field‑label definitions
const tileDefs = [
    ['noa', 'Noa: '],
    ['applicant', 'applicant: '],
    ['description', 'Description: '],
    ['expiration_date', 'Expiration Date: ']
];

const mechtileDefs = [
    ['noa', 'Noa: '],
    ['manufacturer', 'Applicant: '],
    ['description', 'Description: ']
    // ['fastenervalues', 'Fastener: ']
];

const shingleDefs = [
    ['noa', 'Noa: '],
    ['applicant', 'Applicant: '],
    ['description', 'Description: '],
    ['prescriptiveSelection', 'Prescriptive: ']
];

// now build an array of “cards”

const cards = computed(() => [
    {
        icon: 'pi-info-circle',
        title: 'Tile',
        items: makeItems(tileDefs, pick),
        bg: 'bg-metal', // dark background
        text: 'text-white' // light text
    },
    {
        icon: 'pi-spin pi-cog',
        title: 'Bur ',
        items: makeItems(burDefs, burpick),

        bg: 'bg-midnight',
        text: 'text-white'
    },
    {
        icon: 'pi-align-justify',
        title: 'Shingle',
        items: makeItems(shingleDefs, shinglePick),
        bg: 'bg-brown-400',
        text: 'text-white'
    },
    {
        icon: 'pi-align-justify',
        title: 'Mechanical',
        items: makeItems(mechtileDefs, mechPick),
        bg: 'bg-purple',
        text: 'text-white'
    }
]);
// 4. ALSO watch for changes (in case data arrives late from the store)
watch(
    roofType,
    () => {
        updateRoofValidity();
    },
    { deep: true }
);

// computed array of label/value pairs

onMounted(() => {
    displayUserInfo();
    console.log(mechData);
    console.log(mechStore);
});
</script>

<style scoped>
:root {
    --c-bg: #f4f4f4;
    --c-bg-card: rgba(255, 255, 255, 0.85);
    --c-bg-card-dark: rgba(30, 41, 59, 0.85);
    --c-primary: #00857a;
    --c-primary-dark: #10bda7;
    --c-text: #1b1b1b;
    --c-text-light: #ffffff;
    --radius: 1.2rem;
    --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

.card {
    background: var(--c-bg-card);
    backdrop-filter: blur(12px);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 3rem 2.5rem;
}

.swiper {
    height: 350px;
}
</style>
