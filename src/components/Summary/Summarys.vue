<template>
    <div class="card">
        <Timeline :value="events" align="alternate" class="customized-timeline" style="margin-top: 50px">
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
                        <!-- v-show="isUrldownloadValid" -->

                        <Button label="Read more" text></Button>
                    </template>
                </Card>
                <!-- <Button icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="downloadFile" /> -->
            </template>
        </Timeline>
        <!-- v-show="isUrldownloadValid" -->
        <!-- <div><Button icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="updateUrl" /></div> -->
    </div>

    <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
        <div>
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
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { countStore } from '@/stores/countStore';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until, watchOnce } from '@vueuse/core';

import { onMounted, reactive, ref } from 'vue';
import GeneralPage from '../jsPDF/Generalpagepdf.vue';
import LowSlope from '../jsPDF/LowSlopepdf.vue';
import Shingle from '../jsPDF/Shingle.vue';
import TileAdhesive from '../jsPDF/TileAdhesive.vue';
import TileMechanical from '../jsPDF/TileMechanical.vue';

const { accountUsers } = useGlobalState();
const secCountStore = countStore();
const isloading = ref(false);
const isSigned = ref(false);

let isGenaralPageValid = ref(false);
let isRoofTileADValid = ref(false);
let isRoofTileMechanicalValid = ref(false);
let isRoofShingleValid = ref(false);
let isRoofLowslopeValid = ref(false);
const dba = ref('');
const name = ref('');
const license = ref('');

const permitStore = usePermitappStore();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
const generalStore = useGeneralpdfStore();
const generalType = ref(generalStore.$state.generalpdfinput);
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');
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

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row;

            .p-timeline-event-content {
                text-align: left;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }
    }
}
</style>
