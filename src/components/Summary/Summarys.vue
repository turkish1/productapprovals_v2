<template>
    <div id="summary">
        <!-- <Timeline :value="events" align="alternate" class="customized-timeline" style="margin-top: 50px">
            <template #marker="slotProps">
                <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :style="{ backgroundColor: slotProps.item.color }">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
            <template #content="slotProps">
                <Card class="mt-4">
                    <template #title>
                        {{ slotProps.item.status }}
                    </template>
                    <template #subtitle>
                        {{ slotProps.item.date }}
                    </template>
                    <template #content>
                        <p>The roof systems you selected</p>


                        <Button label="Read more" text></Button>
                    </template>
                </Card>
             </template>
        </Timeline> -->
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
            <div class="flex flex-wrap justify-left gap-12">
                <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-96 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
                        <i class="pi pi-info-circle !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">Selection</span>
                    <span class="text-muted-color text-center"> Noa: {{ Noa }}</span>
                    <span class="text-muted-color text-center"> {{ Manufacturer }}</span>
                    <span class="text-muted-color text-center"> {{ Description }} </span>
                    <span class="text-muted-color text-center"> Expiration Date: {{ Expiration_Date }} </span>
                </div>

                <div class="flex flex-col border border-surface shadow-lg justify-left items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
                        <i class="pi pi-spin pi-cog !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">More Information</span>
                    <span class="text-muted-color text-center">Soon to Come</span>
                    <!-- <span class="text-muted-color text-center">{{ muni }}</span> -->
                </div>

                <div class="flex flex-col border border-surface shadow-lg justify-left items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
                        <i class="pi pi-align-justify !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">More Information</span>
                    <span class="text-muted-color text-center">Soon to Come</span>
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
import { useGlobalState } from '@/stores/accountsStore';
import { countStore } from '@/stores/countStore';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { usevalueStore } from '@/stores/tilevalueStore';
import { invoke, tryOnMounted, until, watchOnce } from '@vueuse/core';
import { onMounted, reactive, ref } from 'vue';
import GeneralPage from '../jsPDF/Generalpagepdf.vue';
import LowSlope from '../jsPDF/LowSlopepdf.vue';
import Shingle from '../jsPDF/Shingle.vue';
import TileAdhesive from '../jsPDF/TileAdhesive.vue';
import TileMechanical from '../jsPDF/TileMechanical.vue';

const { accountUsers } = useGlobalState();
const secCountStore = countStore();

const pdStore = usevalueStore();
const isloading = ref(false);
const isSigned = ref(false);

let isGenaralPageValid = ref(false);
let isRoofTileADValid = ref(false);
let isRoofTileMechanicalValid = ref(false);
let isRoofShingleValid = ref(false);
let isRoofLowslopeValid = ref(false);
const dba = ref('');
const name = ref('');

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
//  Second section
const Noa = ref(tileNoaInfo.value.singlepaddyData?.noa || tileNoaInfo.value.doublepaddyData?.noa);
const Manufacturer = ref(tileNoaInfo.value.singlepaddyData?.applicant || tileNoaInfo.value.doublepaddyData?.applicant);
const Description = ref(tileNoaInfo.value.singlepaddyData?.description || tileNoaInfo.value.doublepaddyData?.description);
const Expiration_Date = ref(tileNoaInfo.value.singlepaddyData?.expiration_date || tileNoaInfo.value.doublepaddyData?.expiration_date);
// State for toggles
const isdataValid = ref(false);
const count = ref(secCountStore.$state.countinput[0]?.countData || '');
const isUrldownloadValid = ref(false);
const status = ref(false);
const timedOut = ref(false);
const submitted = ref(false);
// Download composable

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

onMounted(() => {
    displayUserInfo();
    console.log(generalStore, generalType, pdStore.$state.tileInputvalues[0]?.tileValues[0]);
});

const events = ref([
    { status: 'RoofSystems', date: '15/10/2020 10:30', icon: 'pi pi-cog', color: '#9C27B0', image: '/src/assets/img/roofing_tile.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: displayInfo.item, date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' }
]);
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
    background: var(--c-primary-dark);
    backdrop-filter: blur(12px);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 3rem 2.5rem;
}
</style>
