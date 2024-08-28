<script setup>
// import useSystemf from '@/composables/use-Inputsystemf';
import TileTable1 from '@/components/TileTable.vue';
// import { useRoofListStore } from '@/stores/roofList';
// import { usetilesysfStore } from '@/stores/tilesysfStore';
// import { storeToRefs } from 'pinia';
import DripEdgeComponent from './DripEdgeComponent.vue';
// import { logicOr } from '@vueuse/math';
// import { whenever } from '@vueuse/core';

// import useSlope from '@/composables/use-updateSlope';

// import Divider from 'primevue/divider';

// const storeroof = useRoofListStore();
// const { roofList } = storeToRefs(storeroof);
// const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();

// const tileFsytem = usetilesysfStore();
// const { tilefinput } = storeToRefs(tileFsytem);
</script>
<template>
    <div class="flex flex-col w-full gap-2 bg-white shadow-lg shadow-cyan-800" style="margin-left: 5px">
        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" />
        </div>
        <div class="w-64 mt-6 ..." style="margin-left: 20px">
            <label for="slope">Slope</label><label class="px-2" style="color: red">*</label>
            <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" />
        </div>
        <div class="w-64 mt-6 ..." style="margin-left: 20px">
            <label for="height">Height</label><label class="px-2" style="color: red">*</label>
            <InputText id="height" v-model="height" type="text" placeholder="height" />
        </div>
        <div class="w-64 mt-6 ..." style="margin-left: 20px">
            <label for="area">Area</label>
            <InputText id="area" v-model="area" type="text" placeholder="area" />
        </div>
        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label for="perimeter">Roof Permeter(a) = 4h</label>
            <InputText id="perimeter" v-model="perimeter" type="text" placeholder="perimeter" />
        </div>

        <div class="card md:w-full grid gap-1 grid-cols-1">
            <label for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
            <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" />
        </div>
        <DripEdgeComponent />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="udlInput">Fastened UDL NOA Number</label>

                <InputText id="udlInput" v-model="udlInput" placeholder="00000000" @input="grabInput" @change="checkInputPoly" />
            </div>
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="saInput">S/A Membrane NOA Number</label>
                <InputText id="saInput" v-model="saInput" placeholder="00000000" @input="grabInput" />
            </div>
        </div>
        <div v-show="isShingleValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="shinglenoa">Tile Noa</label>
                <InputText id="shinglenoa" v-model="noaInput" placeholder="00000000" @input="grabInput" @change="checkInput" />
            </div>
        </div>
        <div v-show="isSelectVisible2" class="card grid gap-2 grid-cols-1">
            <label style="color: red">Select Underlayment (S/A) *</label>
            <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
        </div>

        <div v-show="isSelectVisible1" class="card grid gap-2 grid-cols-1">
            <label style="color: red">Select Underlayment (UDL) *</label>
            <Select v-model="selectedSlopelow" :options="slopetypeless" placeholder="make selection" @change="getIndexs" />
        </div>
    </div>

    <Divider />
    <Divider />

    <div class="card md:w-full gap-4 mt-10 bg-white shadow-lg shadow-cyan-800" style="margin-left: 5px">
        <div class="flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                <div class="w-96 flex flex-col gap-2">
                    <label for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="umanufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="material">(UDL) Material</label>
                    <InputText id="material" v-model="umaterial" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udescription" />
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-12 space-y-6" style="margin-left: 2px">
            <div v-show="isSAValid" class="flex flex-row space-x-20">
                <div class="flex flex-col gap-2">
                    <label for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="samanufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="samaterial" />
                </div>

                <div class="flex flex-col gap-2">
                    <label style="color: red">Select System F *</label>
                    <Select v-model="selectedsystemf" :options="system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="sadescription">S/A Description</label>
                    <InputText id="sadescription" v-model="sadescription" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="designpressure">Design psf:</label>
                    <InputText id="designpressure" v-model="designpressure" aria-describedby="username-help" />
                </div>
                <!-- <div class="flex shrink flex-col gap-2">
                    <label for="expiredate_sa">Expiration Date:</label>
                    <InputText id="expiredate_sa" v-model="expiredate_sa" />
                </div> -->
            </div>
        </div>

        <div class="flex flex-row mt-8 space-x-20" style="margin-left: 1px">
            <div class="flex flex-col gap-2">
                <label for="manufacturer">Applicant</label>
                <InputText id="manufacturer" v-model="manufacturer" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="material"> Material</label>
                <InputText id="material" v-model="material" />
            </div>
            <div class="w-128 flex flex-col gap-2">
                <label for="description">Description</label>
                <InputText id="description" v-model="description" />
            </div>
        </div>

        <Divider />
        <div class="flex flex-wrap gap-4" style="margin-left: 300px">
            <label style="margin-left: 200px">Select Exposure</label>
            <div class="flex items-center">
                <RadioButton v-model="exposure" inputId="C" name="exposureC" value="C" />
                <label for="exposureC" class="ml-2">C</label>
            </div>
            <div class="flex items-center">
                <RadioButton v-model="exposure" inputId="D" name="exposureD" value="D" />
                <label for="exposureD" class="ml-2">D</label>
            </div>

            <div class="flex flex-wrap gap-1" style="margin-right: 300px">
                <TileTable1 style="margin-left: 1px" />
                <!-- <TileTable2 style="margin-left: 40px" />
                <TileTable3 style="margin-left: 40px" /> -->
            </div>
        </div>
    </div>
</template>
<style scoped></style>
