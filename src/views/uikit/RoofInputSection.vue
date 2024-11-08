<script setup>
import Checkout from '@/components/Summary/Checkout.vue';

import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until, useToNumber } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, ref, watch } from 'vue';

const permitStore = usePermitappStore();

const LowSlope = defineAsyncComponent(() => import('@/components/LowSlope.vue'));
const Shingles = defineAsyncComponent(() => import('@/components/Shingles.vue'));
const Tile = defineAsyncComponent(() => import('@/components/Tile.vue'));
const Mechanical = defineAsyncComponent(() => import('@/components/TileNoa/MechanicalTileNoa/TileMech.vue'));
const props = defineProps(['page']);
const page = computed(() => props.page);
// const childRef = ref(Shingles);
const values = ref(1);
let isMiamiBeachValid = ref(false);
const mbVal = ref(2);
if (permitStore.$state.permitapp.length !== 0) {
    isMiamiBeachValid = true;
}
const MB = ref(permitStore.$state.permitapp);
const store = useRoofListStore();
const isValidshingle = ref(false);
const isValidbur = ref(false);
const isValidtile = ref(false);
const isValidmechanical = ref(false);

// Here we check for folios with restriction
const convertMB = isMiamiBeachValid === true ? useToNumber(MB._value[0].miamibeach) : '';
tryOnMounted(() => {
    if (convertMB.value === null || convertMB.value === NaN) {
        return true;
    } else if (convertMB.value === mbVal.value) {
        console.log('Entry');
        isMiamiBeachValid.value = true;
        isValidshingle.value = true;
    }
});

const { roofList } = storeToRefs(store);

// This check will have asphalt dialog pop up
function checkState() {
    roofList.value.forEach((item, index) => {
        console.log(item, index);
        if (item.item === 'Asphalt Shingle') {
            isValidshingle.value = true;
            console.log(isValidshingle, item.item);
        }
    });
}

tryOnMounted(() => {
    checkState();
});

// This function is tied to the next button on the breadcrumb page.
function updateBur() {
    isValidbur.value = true;
}

function updateTile() {
    isValidtile.value = true;
    console.log(isValidtile);
}

function updateMechanical() {
    isValidmechanical.value = true;
    console.log(isValidmechanical);
}

invoke(async () => {
    await until(isValidshingle).toBe(true);
    await until(isValidbur).toBe(true);
    await until(isValidtile).toBe(true);
    await until(isValidmechanical).toBe(true);
    console.log(isValidbur, isValidmechanical, isValidtile);
});
// This is to minimize data not returning in the panel view.
watch(Shingles, LowSlope, Tile, Mechanical, () => {});
</script>

<template>
    <!-- lg:w-full min-h-[10px] card flex flex-row gap-18 background-color: #eae7e2 -->
    <div class="flex justify-center md:w-3/4 px-2" style="margin-left: 200px">
        <!-- <div class="card flex justify-center"> -->
        <Stepper value="1" linear class="basis-[400rem]">
            <StepList>
                <Step value="1">Shingles</Step>
                <Step value="2">Low Slope</Step>
                <Step value="3">Tile</Step>
                <Step value="4">Mechanical</Step>
                <Step value="5">Summary</Step>
            </StepList>

            <StepPanels class="object-scale-down h-0 w-1200 ...">
                <StepPanel v-slot="{ activateCallback }" value="1">
                    <div class="flex flex-col h-0 w-1024">
                        <shingles v-if="isValidshingle" />

                        <div class="flex pt-6 justify-end">
                            <Button
                                label="Next"
                                severity="contrast"
                                icon="pi pi-arrow-right"
                                @click="
                                    activateCallback('2');
                                    updateBur();
                                "
                            />
                            <!--   isValidbur = true; -->
                        </div>
                    </div>
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" value="2">
                    <div class="flex flex-col h-0 w-600">
                        <LowSlope v-if="isValidbur" />

                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                            <Button
                                label="Next"
                                severity="contrast"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                @click="
                                    activateCallback('3');
                                    updateTile();
                                "
                            />
                            <!-- isValidtile = true; -->
                        </div>
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" value="3">
                    <div class="flex flex-col h-0 w-1224">
                        <Tile v-if="isValidtile" />
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                            <Button
                                label="Next"
                                severity="contrast"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                @click="
                                    activateCallback('4');
                                    updateMechanical();
                                "
                            />
                            <!-- isValidmechanical = true; -->
                        </div>
                    </div>
                    <!--  style="margin-top: 650px" -->
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" value="4">
                    <!-- flex flex-row -->
                    <div class="flex flex-col h-0 w-1224">
                        <Mechanical v-if="isValidmechanical" />
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('3')" />
                            <Button label="Next" severity="contrast" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('5')" />
                        </div>
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" value="5">
                    <!-- flex flex-row -->

                    <div class="flex flex-col h-0 w-1024">
                        <Checkout />
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('4')" />
                            <Button label="Submit" severity="contrast" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('6')" />
                        </div>
                    </div>
                </StepPanel>
            </StepPanels>
            <router-view />
        </Stepper>
        <!-- </div> -->
    </div>
</template>
<style scoped></style>
