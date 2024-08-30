<script setup>
import { usetilesysEStore } from '@/stores/tilesysEStore';
import { usetilesysfStore } from '@/stores/tilesysfStore';
// import { useRoofListStore } from '@/stores/roofList';

import useTileSystemE from '@/composables/InputLogic/tileSystemEInput';
import useTileSystemF from '@/composables/InputLogic/tileSystemFInput';
// import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import DripEdgeComponent from './DripEdgeComponent.vue';

const ftileStore = usetilesysfStore();
const etileStore = usetilesysEStore();

const { takef } = useTileSystemF();
const { getV } = useTileSystemE();
// const storeroof = useRoofListStore();
// const { tilefinput } = storeToRefs(ftileStore);

const saTiles = reactive({
    manufacturer: '',
    material: '',
    system: [],
    designpressure: [],
    description: [],
    Description_F1: '',
    Description_F2: '',
    Description_F3: '',
    Description_F4: '',
    Description_F5: '',
    Description_F6: '',
    Description_F7: '',
    arrDesignPressure: []
});

const udlTiles = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    designPressure: [],
    Anchor_Base_Sheet: [],
    TileCap_Sheet_Description: [],
    Anchor_Base_Sheet_E1: '',
    Anchor_Base_Sheet_E2: '',
    Anchor_Base_Sheet_E3: '',
    Anchor_Base_Sheet_E4: '',
    Anchor_Base_Sheet_E5: '',
    Anchor_Base_Sheet_E6: '',
    Anchor_Base_Sheet_E7: '',
    TileCap_Sheet_Description: [],
    TileCap_Sheet_Description_E1: '',
    TileCap_Sheet_Description_E2: '',
    TileCap_Sheet_Description_E3: '',
    TileCap_Sheet_Description_E4: '',
    TileCap_Sheet_Description_E5: '',
    TileCap_Sheet_Description_E6: '',
    TileCap_Sheet_Description_E7: '',
    arrDesignPressure: []
});
let datamounted = ref(ftileStore.$state.tilefinput);
let Edatamounted = ref(etileStore.$state.tilesysEinput);
let datamountedsystemE = ref(etileStore.$state.tilesysEinput);
let datasystemf = ref();
let datasystemE = ref();
let saInput = ref(null);
const selectedDeck = ref();
const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
const save = ref([]);
const dims = reactive({
    area: '',
    per: '',
    height: ''
});

function setRoofInputs() {
    dims.per = dims.height * 0.4;
}
const dimensions = onMounted(() => {
    setRoofInputs();
});

function grabInput() {
    // data.value = noaInput.value;
    // datasbs.value = saInput.value;

    datasystemf.value = saInput.value;
    datasystemE.value = udlInput.value;
    // if (noaInput.value !== null) {
    //     // 18061905

    //     takeE(data.value);
    // }
    if (saInput.value !== null) {
        takef(datasystemf.value);
    }
    if (udlInput.value !== null) {
        //  17040522

        getV(datasystemE.value);
    }
}
function checkInput() {
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            saTiles.manufacturer = item.systemData.manufacturer;
            saTiles.material = item.systemData.material;
            saTiles.system = item.systemData.system;
        });
    }
}

function EcheckInput() {
    if (Edatamounted.value.length !== null) {
        Edatamounted.value.forEach((item, index) => {
            udlTiles.manufacturer = item.systemDataE.manufacturer;
            udlTiles.material = item.systemDataE.material;
            udlTiles.system = item.systemDataE.system;
            udlTiles.Anchor_Base_Sheet = item.systemDataE.Anchor_Base_Sheet;
        });
    }
}

const selSytemE = ref();
const selSytem = ref();
const whatChanged = computed(() => {
    checkInput();
    EcheckInput();
});

watch(dimensions, checkInputSystem, updateselectSystem, EcheckInputSystem, updateselectSystemE, () => {});
const selectedsystemf = ref(null);
const selectedsystemE = ref(null);
const selectedAnchor = ref(null);
let isUDLValid = ref('');
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isTileValid = ref(false);
// let isSlopeValid = ref(true);
let slope = ref(null);
let selectedUnderlayment = ref();
const underlaymentType = ref([
    { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
    { selectedBasesheet: 'Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F', key: 2 },
    { selectedBasesheet: '(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E', key: 3 }
]);

watch(selectedUnderlayment, () => {
    save.value = selectedUnderlayment.value.key;
    console.log(save.value, ftileStore.$state.tilefinput);
    if (save.value === 1) {
        isTileValid.value = true;
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = false;
    } else if (save.value === 2) {
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = true;
    } else if (save.value === 3) {
        isUDLValid.value = true;
        isUDLNOAValid.value = true;
        isSAValid.value = false;
    } else if (save.value === 0) {
        isUDLValid.value = false;
        isUDLNOAValid.value = false;
        isSAValid.value = false;
        isTileValid.value = false;
    }
});

watchEffect(setRoofInputs, isTileValid, whatChanged, saTiles, () => {});

function checkInputSystem() {
    // 23061202 23070604

    datamounted.value.forEach((item, index) => {
        saTiles.Description_F1 = item.systemData.Description_F1;
        saTiles.Description_F2 = item.systemData.Description_F2;
        saTiles.Description_F3 = item.systemData.Description_F3;
        saTiles.Description_F4 = item.systemData.Description_F4;
        saTiles.Description_F5 = item.systemData.Description_F5;
        saTiles.Description_F6 = item.systemData.Description_F6;
        saTiles.Description_F7 = item.systemData.Description_F7;
        saTiles.arrDesignPressure = item.systemData.designPressure;

        if (item.systemData.system.length > 1) {
            addFSystem();
        } else {
            saTiles.system = item.systemData.system;
            saTiles.description = item.systemData.description;
            saTiles.designpressure = item.systemData.designPressure;
        }
    });
}
function EcheckInputSystem() {
    // 23111506

    datamountedsystemE.value.forEach((item, index) => {
        console.log(item, index);
        console.log(etileStore.$state.tilesysEinput);
        udlTiles.Maps = item.systemDataE.Maps;
        udlTiles.Anchor_Base_Sheet_E1 = item.systemDataE.Anchor_Base_Sheet_E1;
        udlTiles.Anchor_Base_Sheet_E2 = item.systemDataE.Anchor_Base_Sheet_E2;
        udlTiles.Anchor_Base_Sheet_E3 = item.systemDataE.Anchor_Base_Sheet_E3;
        udlTiles.Anchor_Base_Sheet_E4 = item.systemDataE.Anchor_Base_Sheet_E4;
        udlTiles.Anchor_Base_Sheet_E5 = item.systemDataE.Anchor_Base_Sheet_E5;
        udlTiles.Anchor_Base_Sheet_E6 = item.systemDataE.Anchor_Base_Sheet_E6;
        udlTiles.Anchor_Base_Sheet_E7 = item.systemDataE.Anchor_Base_Sheet_E7;

        udlTiles.TileCap_Sheet_Description_E1 = item.systemDataE.TileCap_Sheet_Description_E1;
        udlTiles.TileCap_Sheet_Description_E2 = item.systemDataE.TileCap_Sheet_Description_E2;
        udlTiles.TileCap_Sheet_Description_E3 = item.systemDataE.TileCap_Sheet_Description_E3;
        udlTiles.TileCap_Sheet_Description_E4 = item.systemDataE.TileCap_Sheet_Description_E4;
        udlTiles.TileCap_Sheet_Description_E5 = item.systemDataE.TileCap_Sheet_Description_E5;
        udlTiles.TileCap_Sheet_Description_E6 = item.systemDataE.TileCap_Sheet_Description_E6;
        udlTiles.TileCap_Sheet_Description_E7 = item.systemDataE.TileCap_Sheet_Description_E7;

        udlTiles.arrDesignPressure = item.systemDataE.designPressure;

        if (item.systemDataE.system.length > 1) {
            //         //
            console.log('condition met');
        } else {
            udlTiles.system = item.systemDataE.system;
            // selfAdData.value = item.systemData.description;
            udlTiles.description = item.systemDataE.description;
            udlTiles.designPressure = item.systemDataE.designPressure;
        }
    });
}
function addFSystem() {
    saTiles.system = saTiles.system;
    // console.log(typeof selfadhered.arrSystem, typeof selfadhered.system);
}
// 23061202
function updateselectSystem() {
    selSytem.value = Object.entries(selectedsystemf).map((obj) => {
        const val = obj[1];

        if (val === 'F1') {
            saTiles.description = saTiles.Description_F1;
            saTiles.designpressure = saTiles.arrDesignPressure[0];
        }
        if (val === 'F2') {
            saTiles.description = saTiles.Description_F2;
            saTiles.designpressure = saTiles.arrDesignPressure[1];
        }
        if (val === 'F3') {
            saTiles.description = saTiles.Description_F3;
            saTiles.designpressure = saTiles.arrDesignPressure[2];
        }
        if (val === 'F4') {
            saTiles.description = saTiles.Description_F4;
            saTiles.designpressure = saTiles.arrDesignPressure[3];
        }
        if (val === 'F5') {
            saTiles.description = saTiles.Description_F5;
            saTiles.designpressure = saTiles.arrDesignPressure[4];
        }
        if (val === 'F6') {
            saTiles.description = saTiles.Description_F6;
            saTiles.designpressure = saTiles.arrDesignPressure[5];
            if (val === 'F7') {
                saTiles.description = saTiles.Description_F7;
                saTiles.designpressure = saTiles.arrDesignPressure[6];
            }
        }
    });
}
function updateselectSystemE() {
    selSytemE.value = Object.entries(selectedsystemE).map((obj) => {
        const val = obj[1];
        console.log(obj[1]);
        // console.log(val, typeof selfadhered.Description_F1, selfadhered.Description_F1, selfAdData.value);

        if (val === 'E1' || val === 'E8') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E1;
            udlTiles.designPressure = udlTiles.arrDesignPressure[0];
        }
        if (val === 'E2' || val === 'E9') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E2;
            udlTiles.designPressure = udlTiles.arrDesignPressure[1];
        }
        if (val === 'E3' || val === 'E10') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E3;
            udlTiles.designPressure = udlTiles.arrDesignPressure[2];
        }
        if (val === 'E4' || val === 'E11') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E4;
            udlTiles.designPressure = udlTiles.arrDesignPressure[3];
        }
        if (val === 'E5' || val === 'E12') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E5;
            udlTiles.designPressure = udlTiles.arrDesignPressure[4];
        }
        if (val === 'E6' || val === 'E13') {
            udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E6;
            udlTiles.designPressure = udlTiles.arrDesignPressure[5];
            if (val === 'E7' || val === 'E14') {
                udlTiles.TileCap_Sheet_Description = udlTiles.TileCap_Sheet_Description_E7;
                udlTiles.designPressure = udlTiles.arrDesignPressure[6];
            }
        }
    });
}
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
            <InputText id="height" v-model="dims.height" type="text" placeholder="height" @input="setRoofInputs" />
        </div>
        <div class="w-64 mt-6 ..." style="margin-left: 20px">
            <label for="area">Area</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>
        <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label for="perimeter">Roof Permeter(a) = 4h</label>
            <InputText id="perimeter" v-model="dims.per" type="text" placeholder="perimeter" />
        </div>

        <div class="card md:w-1/2 grid gap-1 grid-cols-1">
            <label for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
            <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @click="checkInputSystem" />
        </div>
        <DripEdgeComponent />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="udlInput">Fastened UDL NOA Number</label>

                <InputText id="udlInput" v-model="udlInput" placeholder="00000000" @input="grabInput" @change="EcheckInput" />
            </div>
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="saInput">S/A Membrane NOA Number</label>
                <InputText id="saInput" v-model="saInput" placeholder="00000000" @input="grabInput" @change="checkInput" />
            </div>
        </div>
        <div v-show="isTileValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="tilenoa">Tile Noa</label>
                <InputText id="tilenoa" v-model="tilenoa" placeholder="00000000" />
            </div>
        </div>
    </div>

    <Divider />
    <Divider />

    <div class="card md:w-full gap-8 mt-10 bg-white shadow-lg shadow-cyan-800" style="margin-left: 5px">
        <div class="columns-3 flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                <div class="w-96 flex flex-col gap-2">
                    <label for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="udlTiles.manufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="material">(UDL) Material</label>
                    <InputText id="material" v-model="udlTiles.material" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="anchor">Anchor Base Sheet</label>
                    <!-- <InputText id="anchor" v-model="udlTiles.Anchor_Base_Sheet" /> -->
                    <Select v-model="selectedAnchor" :options="udlTiles.Anchor_Base_Sheet" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" />
                </div>
            </div>
        </div>
        <div class="w-full flex flex-row space-x-30 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="break-after-column flex flex-row space-x-8 space-y-4" style="margin-left: 2px">
                <div class="w-56 flex flex-col gap-2 mt-3">
                    <label style="color: red">Select System E *</label>
                    <!-- @click="checkInputSystem" @change="updateselectSystem" -->
                    <Select v-model="selectedsystemE" :options="udlTiles.system" placeholder="" @click="checkInputSystem" @change="updateselectSystemE" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udlTiles.TileCap_Sheet_Description" @change="updateselectSystemE" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="designPressure">Design psf:</label>
                    <InputText id="designPressure" v-model="udlTiles.designPressure" @change="updateselectSystemE" />
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-12 space-y-6" style="margin-left: 2px">
            <div v-show="isSAValid" class="flex flex-row space-x-20">
                <div class="flex flex-col gap-2">
                    <label for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="saTiles.manufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="saTiles.material" />
                </div>

                <div class="flex flex-col gap-2">
                    <label style="color: red">Select System F *</label>
                    <!-- @click="checkInputSystem" @change="updateselectSystem" -->
                    <Select v-model="selectedsystemf" :options="saTiles.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                </div>

                <div class="w-128 flex flex-col gap-2">
                    <label for="sadescription">S/A Description</label>
                    <InputText id="capsheetdescription" v-model="saTiles.description" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="designpressure">Design psf:</label>
                    <InputText id="designpressure" v-model="saTiles.designpressure" aria-describedby="username-help" />
                </div>
                <!-- <div class="flex shrink flex-col gap-2">
                    <label for="expiredate_sa">Expiration Date:</label>
                    <InputText id="expiredate_sa" v-model="expiredate_sa" />
                </div> -->
            </div>
        </div>

        <div v-show="isTileValid" class="flex flex-row mt-8 space-x-20" style="margin-left: 1px">
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
            <label style="margin-left: 500px">Select Exposure</label>
            <div class="flex items-center">
                <RadioButton v-model="exposure" inputId="C" name="exposureC" value="C" />
                <label for="exposureC" class="ml-2">C</label>
            </div>
            <div class="flex items-center">
                <RadioButton v-model="exposure" inputId="D" name="exposureD" value="D" />
                <label for="exposureD" class="ml-2">D</label>
            </div>
        </div>
        <div class="flex flex-wrap gap-1" style="margin-left: 600px">
            <TileTable1 style="margin-left: 1px" />
            <!-- <TileTable2 style="margin-left: 40px" />
                <TileTable3 style="margin-left: 40px" /> -->
        </div>
    </div>
</template>
<style scoped></style>
