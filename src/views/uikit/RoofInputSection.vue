<script setup>
import LowSlope from '@/components/LowSlope.vue';
import Shingles from '@/components/Shingles.vue';
import Tile from '@/components/Tile.vue';
import { computed } from 'vue';
const props = defineProps(['page']);
const page = computed(() => props.page);
console.log(page);
</script>

<template>
    <div class="container mx-auto px-4">
        <div class="card flex justify-center">
            <Stepper value="1" linear class="basis-[700rem]">
                <StepList>
                    <Step value="1">Shingles</Step>
                    <Step value="2">Low Slope</Step>
                    <Step value="3">Tile</Step>
                </StepList>
                <StepPanels class="object-scale-down h-720 w-900 ...">
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col h-96">
                            <!-- <div class="border-2 border-dashed border-surface-900 dark:border-surface-900 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium" style="min-height: 700px"> -->
                            <shingles />
                            <!-- </div> -->
                        </div>
                        <!-- as="router-link" to="/lowslope" -->
                        <div class="flex pt-6 justify-end" style="margin-top: 550px">
                            <Button label="Next" severity="contrast" icon="pi pi-arrow-right" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>

                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="flex flex-col h-96">
                            <!-- <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"> -->
                            <LowSlope />
                            <!-- </div> -->
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('1')" style="margin-top: 550px" />
                            <Button label="Next" severity="contrast" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" style="margin-top: 550px" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="flex flex-col h-96">
                            <!-- <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"> -->
                            <Tile />
                            <!-- </div> -->
                        </div>
                        <div class="pt-6">
                            <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('2')" style="margin-top: 550px" />
                        </div>
                    </StepPanel>
                </StepPanels>
                <router-view />
            </Stepper>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 3px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 1100px;
    /* min-width: 600px; */
    top: 5vh;
}
.card {
    min-height: 1100px;
    position: center;
}
.ql-container {
    height: calc(100% - 52px);
}
</style>
