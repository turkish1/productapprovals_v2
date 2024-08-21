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
    <!-- lg:w-full min-h-[10px] card flex flex-row gap-18  -->
    <div class="container md:mx-auto px-4">
        <div class="card flex justify-center">
            <Stepper value="1" linear class="basis-[700rem]">
                <StepList>
                    <Step value="1">Shingles</Step>
                    <Step value="2">Low Slope</Step>
                    <Step value="3">Tile</Step>
                </StepList>
                <StepPanels class="object-scale-down h-600 w-1200 ...">
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="flex flex-col h-96">
                            <shingles />
                        </div>

                        <div class="flex pt-6 justify-end" style="margin-top: 350px">
                            <Button label="Next" severity="contrast" icon="pi pi-arrow-right" @click="activateCallback('2')" />
                        </div>
                    </StepPanel>

                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="flex flex-col h-72">
                            <LowSlope />
                        </div>
                        <div class="flex pt-6 justify-between">
                            <Button label="Back" severity="contrast" icon="pi pi-arrow-left" @click="activateCallback('1')" style="margin-top: 550px" />
                            <Button label="Next" severity="contrast" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" style="margin-top: 550px" />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <!-- flex flex-row -->
                        <div class="flex flex-col grow h-96">
                            <Tile />
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
    padding-top: 2px;
    border: none;
    border-radius: 5px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 1000px;
    min-width: 800px;
    top: 5vh;
}
.card {
    min-height: 900px;
    position: center;
    min-width: 800px;
}
.ql-container {
    height: calc(100% - 52px);
}
</style>
