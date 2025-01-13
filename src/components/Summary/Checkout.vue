<template>
    <div class="card">
        <Timeline :value="events" align="alternate" class="customized-timeline">
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
                        <!-- <img v-if="slotProps.item.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-sm" /> -->
                        <p>The roof systems you selected</p>
                        <Button label="Read more" text></Button>
                    </template>
                </Card>
            </template>
        </Timeline>
    </div>
    <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
        <div class="flex mb-4">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height="2rem" width="30rem" v-model="dba">{{ db }}</Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-between mt-4">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
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
        <div>
            <GeneralPage />
        </div>
    </div>
</template>

<script setup>
import useSignpdf from '@/composables/Signpdf/use-signpdf.js';
import { useGlobalState } from '@/stores/accountsStore';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until, watchOnce } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import GeneralPage from '../jsPDF/Generalpagepdf.vue';
import LowSlope from '../jsPDF/LowSlopepdf.vue';
import Shingle from '../jsPDF/Shingle.vue';
import TileAdhesive from '../jsPDF/TileAdhesive.vue';
import TileMechanical from '../jsPDF/TileMechanical.vue';

const { accountUsers } = useGlobalState();

let isGenaralPageValid = ref(false);
let isRoofTileADValid = ref(false);
let isRoofTileMechanicalValid = ref(false);
let isRoofShingleValid = ref(false);
let isRoofLowslopeValid = ref(false);
const dba = ref('');
const name = ref('');
const license = ref('');
const status = ref('');
const permitStore = usePermitappStore();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);

const generalStore = useGeneralpdfStore();
const generalType = ref(generalStore.$state.generalpdfinput);
const processnumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
const { getNumber } = useSignpdf();

function displayUserInfo() {
    accountUsers.value.forEach((item, index) => {
        dba.value = item.dba;
    });
    console.log(processnumber.value);
    // getNumber(processnumber.value);
}

// const callPdfSign = tryOnMounted(() => {
//     getNumber(processnumber.value);
// });
const index = ref(0);
const count = ref(2);
function callPdfSign() {
    // while (index.value < count.value) {
    getNumber(processnumber.value);
    console.log('called times');
    getNumber(processnumber.value);
    //     index.value = index.value + 1;
    // }
    //     getNumber(processnumber.value);
}

const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    } else if (roofType.value[0].item === 'Asphalt Shingle') {
        isRoofShingleValid.value = true;
    } else if (roofType.value[0].item === 'Low Slope') {
        isRoofLowslopeValid.value = true;
    } else if (roofType.value[0].item === 'Adhesive Set Tile') {
        isRoofTileADValid.value = true;
    } else if (roofType.value[0].item === 'Mechanical Fastened Tile') {
        isRoofTileMechanicalValid.value = true;
    } else if (generalType.value.length !== 1) {
        isGenaralPageValid.value = true;
    }
});

onMounted(() => {
    displayUserInfo();
    callPdfSign();
});

watchOnce(displayUserInfo, callState, () => {
    console.log(isRoofShingleValid.value);
});
// watch(callPdfSign, () => {
//     console.log(callPdfSign());
// });
const events = ref([
    { status: 'RoofSystems', date: '15/10/2020 10:30', icon: 'pi pi-cog', color: '#9C27B0', image: '/src/assets/img/roofing_tile.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' }
]);

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
