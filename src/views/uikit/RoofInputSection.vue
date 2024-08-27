<script setup>
// import LowSlope from '@/components/LowSlope.vue';
// import Shingles from '@/components/Shingles.vue';
import Tile from '@/components/Tile.vue';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted } from '@vueuse/core';
// import { invoke, until } from '@vueuse/shared';
import { defineAsyncComponent } from 'vue';

import { computed, ref, watch } from 'vue';

const LowSlope = defineAsyncComponent(() => import('@/components/LowSlope.vue'));
const Shingles = defineAsyncComponent(() => import('@/components/Shingles.vue'));

const props = defineProps(['page']);
const page = computed(() => props.page);
console.log(page);
const values = ref(1);

const store = useRoofListStore();
const isValidshingle = ref(false);
const isValidbur = ref(false);
const isValidtile = ref(false);
// invoke(async () => {
//     await until(isValidshingle).toBe(true);
//     await until(isValidbur).toBe(true);
//     await until(isValidtile).toBe(true);
// });
const roofType = ref(store.$state.roofList);
function checkState() {
    if (roofType.value === 'Asphalt Shingle') {
        isValidshingle.value = true;
        console.log(isValidshingle.value);
    }
    if (roofType.value === 'Low Slope') {
        isValidbur.value = true;
        console.log(isValidbur.value);
    }
    // if (roofType.value === 'Tile') {
    //     isValidtile.value = true;
    // }
}

console.log(roofType);

tryOnMounted(() => {
    checkState();
});
watch(roofType, () => {});
function updateNode() {
    console.log(isValidbur.value);
    isValidbur.value = true;
    isValidshingle.value = true;
}
</script>

<template>
    <!-- lg:w-full min-h-[10px] card flex flex-row gap-18  -->
    <div class="md:w-3/4 px-2 pt-0">
        <!-- <div class="card flex justify-center"> -->
        <Stepper value="1" linear class="basis-[400rem]">
            <StepList>
                <Step value="1">Shingles</Step>
                <Step value="2">Low Slope</Step>
                <Step value="3">Tile</Step>
            </StepList>
            <StepPanels class="object-scale-down h-700 w-1200 ...">
                <StepPanel v-slot="{ activateCallback }" value="1">
                    <div class="flex flex-col h-16">
                        <shingles v-if="!isValidshingle" />
                    </div>

                    <div class="flex pt-6 justify-end" style="margin-top: 550px">
                        <Button
                            label="Next"
                            severity="contrast"
                            icon="pi pi-arrow-right"
                            @click="
                                activateCallback('2');
                                isValidbur = true;
                                updateNode;
                            "
                        />
                    </div>
                </StepPanel>

                <StepPanel v-slot="{ activateCallback }" value="2">
                    <div class="flex flex-col h-128">
                        <!-- v-if="values === 3" -->
                        <LowSlope v-if="isValidbur" />
                    </div>
                    <div class="flex pt-6 justify-between">
                        <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('1')" style="margin-top: 650px" />
                        <Button label="Next" severity="contrast" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" style="margin-top: 650px" />
                    </div>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" value="3">
                    <!-- flex flex-row -->
                    <div class="flex flex-col grow h-128">
                        <Tile />
                    </div>
                    <div class="pt-6">
                        <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('2')" style="margin-top: 550px" />
                    </div>
                </StepPanel>
            </StepPanels>
            <router-view />
        </Stepper>
        <!-- </div> -->
    </div>
</template>
<style scoped>
/* .container {
    padding-bottom: 3px;
    padding-top: 2px;
    border: none;
    border-radius: 5px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 1300px;
    min-width: 1000px;
    top: 1vh;
}
 .card {
    min-height: 900px;
    position: center;
    min-width: 800px;
}
.ql-container {
    height: calc(100% - 52px);
}  */
</style>
