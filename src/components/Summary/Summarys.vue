<template>
    <div id="summary">
        <div class="card flex flex-col items-left">
            <div class="flex flex-wrap justify-left gap-12">
                <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-12 h-24 flex items-center justify-center">
                        <i class="pi pi-briefcase !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">Job Info</span>
                    <span class="text-muted-color text-center"> {{ dba }}</span>
                    <span class="text-muted-color text-center"> {{ jobaddress }} </span>
                    <span class="text-muted-color text-center"> License: {{ license }} </span>
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
                <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-96 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
                        <i class="pi pi-info-circle !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">More Info</span>
                    <span class="text-muted-color text-center">To Come</span>

                    <!-- <span class="text-2xl font-bold">Selection</span>
                    <span v-for="(item, i) in infoItems" :key="i" class="text-muted-color text-center"> {{ item.label }}{{ item.value }} </span> -->
                </div>

                <div class="flex flex-col border border-surface shadow-lg justify-left items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
                        <i class="pi pi-spin pi-cog !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">More Info</span>
                    <span class="text-muted-color text-center">To Come</span>
                    <!-- <span class="text-2xl font-bold">Bur Selection</span>
                    <span v-for="(item, i) in infoItemsbur" :key="i" class="text-muted-color text-center"> {{ item.label }}{{ item.value }} </span> -->
                </div>
                <div class="flex flex-wrap justify-left gap-12">
                    <Swiper :modules="[EffectCards, Navigation, Pagination]" effect="cards" grab-cursor="true" navigation pagination class="w-md max-w-md mx-auto">
                        <!-- class="flex justify-center items-center" -->
                        <SwiperSlide v-for="(card, i) in cards" :key="i">
                            <StackCard :icon="card.icon" :title="card.title" :items="card.items" :bgClass="card.bg" :textClass="card.text" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900"> -->
    <div v-show="isGenaralPageValid">
        <GeneralPage />
    </div>
    <div v-show="isRoofShingleValid">
        <Shingle />
    </div>

    <div v-show="isRoofTileADValid">
        <TileAdhesive />
    </div>
    <div v-show="isRoofTileMechanicalValid">
        <TileMechanical />
    </div>
    <div v-show="isRoofLowslopeValid">
        <LowSlope />
    </div>
    <!-- </div> -->
</template>

<script setup>
import StackCard from '@/components/Summary/StackCard.vue';
import { useGlobalState } from '@/stores/accountsStore';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { countStore } from '@/stores/countStore';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { useSavedStore } from '@/stores/savedTiledataStore';
import { useShingleStore } from '@/stores/shingleStore';
import { usevalueStore } from '@/stores/tilevalueStore';
import { invoke, tryOnMounted, until, watchOnce } from '@vueuse/core';

import { Swiper, SwiperSlide } from 'swiper/vue';

// Core CSS
import 'swiper/css';

// individual module imports + CSS
import 'swiper/css/effect-cards';
import EffectCards from '../../../node_modules/swiper/modules/effect-cards';

import 'swiper/css/navigation';
import Navigation from '../../../node_modules/swiper/modules/navigation';

import useMech from '@/composables/InputLogic/use-tileMechanical';
import 'swiper/css/pagination';
import { computed, onMounted, reactive, ref } from 'vue';
import Pagination from '../../../node_modules/swiper/modules/pagination';
import GeneralPage from '../jsPDF/Generalpagepdf.vue';
import LowSlope from '../jsPDF/LowSlopepdf.vue';
import Shingle from '../jsPDF/Shingle.vue';
import TileAdhesive from '../jsPDF/TileAdhesive.vue';
import TileMechanical from '../jsPDF/TileMechanical.vue';
const { accountUsers } = useGlobalState();
const secCountStore = countStore();

const pdStore = usevalueStore();
const { mechStore } = useMech();
const tileADstore = useSavedStore();
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
const tileNoaInfo = ref(pdStore.$state.tileInputvalues[0]?.tileValues[0]);
const mechtileNoaInfo = ref(mechStore.tilemech.value[0]);

const burInfo = ref(burpdfStore.$state.burpdfinput[1]);
const isPaddySingle = ref(false);
const burInfoData = ref(burInfo.value?.burpdfData || '');
const singlePaddyData = ref(tileNoaInfo.value?.singlepaddyData || '');
const doublePaddyData = ref(tileNoaInfo.value?.doublepaddyData || '');
const shingleInfo = ref(shingleStore.$state.inputshingle[0]);
const shData = ref(shingleInfo.value?.shingleData || '');
const mechData = ref(mechtileNoaInfo.value);
//  Second section

function displayUserInfo() {
    accountUsers.value.forEach((item, index) => {
        dba.value = item.dba;
    });
}

const displayInfo = reactive({
    dim: '',
    item: ''
});
const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    } else {
        for (let i = 0; i < roofType.value.length; i++) {
            if (roofType.value[i].item === 'Asphalt Shingle') {
                isRoofShingleValid.value = true;
                displayInfo.dim = roofType.value[i].dim1;
                displayInfo.item = roofType.value[i].item;
            } else if (roofType.value[i].item === 'Low Slope') {
                isRoofLowslopeValid.value = true;
            } else if (roofType.value[i].item === 'Adhesive Set Tile') {
                console.log(roofType.value[i].item);
                isRoofTileADValid.value = true;
                if (tileADstore.$state.savedTileinput[0].savedValues.paddySelection == 'single') {
                    isPaddySingle.value = true;
                    console.log(isPaddySingle);
                }
            } else if (roofType.value[i].item === 'Mechanical Fastened Tile') {
                console.log(roofType.value[i].item);
                isRoofTileMechanicalValid.value = true;
            } else if (generalType.value.length !== 1) {
                isGenaralPageValid.value = true;
            }
            console.log(roofType.value);
        }
    }
});

function pick(field) {
    return isPaddySingle.value ? singlePaddyData.value[field] : doublePaddyData.value[field];
}

function burpick(burfield) {
    return isRoofLowslopeValid.value ? burInfoData.value[burfield] : '';
}
function shinglePick(shfield) {
    return isRoofShingleValid.value ? shData.value[shfield] : '';
}

function mechPick(mechfield) {
    return isRoofTileMechanicalValid.value ? mechData.value[mechfield] : '';
}
// helper to build items array
function makeItems(defs, pickerFn) {
    // defs = [ [field, label], … ]
    return defs.map(([field, label]) => ({
        label,
        value: pickerFn(field)
    }));
}

const burDefs = [
    ['burMaterial', 'Material: '],
    ['burSystem', 'System: '],
    ['p1', 'P1: '],
    ['p3', 'P3: ']
];

// field‑label definitions
const tileDefs = [
    ['noa', 'Noa: '],
    ['applicant', 'Applicant: '],
    ['description', 'Description: '],
    ['expiration_date', 'Expiration Date: ']
];

const mechtileDefs = [
    ['noa', 'Noa: '],
    ['manufacturer', 'Applicant: '],
    ['description', 'Description: '],
    ['savedfastener', 'Fastener: ']
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

// computed array of label/value pairs

onMounted(() => {
    displayUserInfo();
    console.log(mechData);
    console.log(mechStore);
});

//  callPdfSign,
watchOnce(displayUserInfo, callState, () => {});
invoke(async () => {
    await until(callState).toBe(true);
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
