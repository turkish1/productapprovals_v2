<script setup>
import usemetalSlope from '@/composables/MetalPanel/use-metalpanelSlope';
import { reactive, ref } from 'vue';

// const isHeightValid = ref(false);
// const isDisabledslope = ref(true);
// const isDisabled = ref(true);

const dims = reactive({ area: '', per: '', height: '', slope: '' });
const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = usemetalSlope();

let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedSlopehigh = ref();
const selectedSlopelow = ref();
// Methods
function getdeckType(event) {
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        isDisabledslope.value = false;
    }
}
function valueEntered() {
    if (slope.value) {
        let slopeNumber = Number(slope.value);
        console.log(slopeNumber);

        if (slopeNumber < 2) {
            isSlopeValid = false;
        }
        if (slopeNumber >= 2 && slopeNumber <= 4) {
            isSlopeValid = true;
            isSlopeLessFour.value = true;
            isSelectVisible1 = true;
            isSelectVisible2 = false;
            isDisabled.value = false;
        }
        if (slopeNumber > 4 && slopeNumber <= 12) {
            isSlopeValid = true;
            isSlopeMoreFour.value = true;
            isSelectVisible2 = true;
            isSelectVisible1 = false;
        }

        if (slope.value === '') {
            isSlopeValid.value = false;
            isSlopeLessFour.value = false;
            isSlopeMoreFour.value = false;
        }
    } else {
        console.log('Not Mounted');
    }
}
// function validateRoofSlope() {
//     validateInput();
//     if (dims.slope >= 2) {
//         isDisabled.value = false;
//         addCheckmarks();
//     } else {
//         isDisabled.value = true;
//     }
// }

// function validateHeight() {
//     validateHeightInput();
// }

// function addCheckmarks() {
//     if (isHeightValid.value || isDisabledslope.value) {
//         isvalueValid.value = true;
//     } else {
//         isvalueValid.value = false;
//     }
// }

// function setRoofInputs() {
//     dims.height = heightModel.value;
//     dims.per = (dims.height * factor.value).toFixed(2);
//     addCheckmarks();
// }
const selectedDeck = ref();

const fireBarrier = ref('');
const type = ref([{ name: 'Select Deck Type' }, { name: ' 5/8" Plywood ' }, { name: ' 3/4" Plywood ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G ' }, { name: ' Existing 1/2" Plywood ' }]);

const firebarrierType = ref([
    { selectedBasesheet: '-- Select Fire Barrier --', key: 0 },
    { selectedBasesheet: 'One or more layers of GAF Versashield installed above or below the underlayment', key: 1 },
    { selectedBasesheet: 'One layer of PolyGlass USA Polystick XFR adhered directly to wood deck', key: 2 },
    { selectedBasesheet: '¼" min. G-P Densdeck', key: 3 },
    { selectedBasesheet: '¼" min.  United States Gypsum SECUROCK roof boards', key: 4 }
]);
</script>
<template>
    <div id="metalpanel" class="flex flex-col w-full gap-2 shadow-lg shadow-cyan-800" style="margin-left: 10px">
        <label for="title" style="color: #122620; margin-left: 650px">Metal Panel Roof</label>

        <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" @change="getdeckType" />
        </div>
        <!-- v-model.number -->
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="slope" style="color: #122620">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" v-model="dims.slope" placeholder="slope" :disabled="isDisabledslope" @change="validateRoofSlope" />

            <Message v-if="errorMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorMessage }}</Message>
        </div>

        <div></div>
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="area">Area of Tile</label>
            <InputText id="area" type="text" v-model="dims.area" placeholder="area" />
        </div>
        <!--  v-model.number -->
        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="height" style="color: #122620">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model="heightModel" type="text" placeholder="height" :disabled="isDisabled" @input="setRoofInputs" @change="validateHeight" />
            <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message>
        </div>
        <div></div>
        <!-- <div class="w-64 mt-3 ..." style="margin-left: 20px">
            <label style="color: #122620" for="perimeter">Roof Permeter(a) = 4h</label>
            <InputText id="perimeter"  v-model="dims.per"   type="text" placeholder=" " @change="setRoofInputs" />

        </div> -->

        <Divider />
        <!-- <div class="md:w-1/2 flex flex-col w-72 mb-4 mt-6 gap-3 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="underlaymentType">Select Base Sheet and/or Self Adhered (S/A) Underlayment (UDL)</label>
            <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @change="pickUnderlayment" />
        </div> -->
        <div class="md:w-1/2 flex flex-col w-72 mb-4 mt-6 gap-3 space-y-2" style="margin-left: 20px">
            <label style="color: #122620" for="firebarrierType">Select Fire Barrier"</label>
            <Select v-model="fireBarrier" :options="firebarrierType" optionLabel="Select Fire Barrier" placeholder="make selection" @change="pickUnderlayment" />
        </div>
        <!-- <Button label="Reset" severity="danger" @click="clearSelected" size="small"></Button> -->
        <!-- <DripEdAdTile />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <systemENumber @keydown.tab.exact.stop="sysEcheckInput" />
        </div>
        <div v-show="isSAValid" class="columns-2 flex flex-row w-64" style="margin-left: 2px">
            <systemFNumber @keydown.tab.exact.stop="checkInputSA" />
            <div class="w-128 gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 100px">
                <label style="color: #122620" for="material">S/A Expiration Date</label>
                <InputText v-model="saTiles.expiration_date" />
            </div>
        </div> -->

        <Divider />
        <!-- <div v-show="isTileValid" class="w-96" style="margin-left: 3px"> -->
        <!-- @change="grabInput"  -->
        <!-- <tileNoaNumber v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out" @keydown.tab.exact.stop="grabInput" @change="grabInput" /> -->
        <!-- <i class="pi pi-refresh" severity="info" style="font-size: 2rem; margin-left: 220px; margin-bottom: 50px" raised @click="clearData"></i>&nbsp; -->

        <!--
            <Button @click="clearData">Clear Page</Button> pi-refresh  <i class="pi pi-refresh" severity="help" style="font-size: 2rem"></i>-->
        <!-- </div> -->
    </div>

    <Divider />
    <Divider />

    <div class="md:w-full gap-4 mt-10 shadow-lg shadow-cyan-800" style="margin-left: 1px">
        <!-- v-show="isTileData"  -->
        <div class="w-full flex flex-row space-x-10 space-y-1" style="margin-left: 20px">
            <!-- <div class="min-w-[450px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="manufacturer">Tile Applicant</label>
                <InputText id="manufacturer" v-model="tilenoas.manufacturer" />
            </div> -->
            <!-- v-show="isMultiTileValid" -->
            <!-- <div  class="min-w-[550px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Tile Type</label>

                <Select v-model="selectedMulti" :options="tilenoas.select_tile" placeholder="make a selection" @click="checkInput" @change="updateTile" />
            </div> -->
            <!-- v-show="!isMultiTileValid" -->
            <!-- <div  class="min-w-[770px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="description">Tile Description</label>
                <InputText id="description" v-model="tilenoas.description" />
            </div> -->
            <!--  -->
            <!-- <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Tile Material</label>
                <Select v-model="selectedsysNoa" :options="tilenoas.material" placeholder="make a selection" @change="updateMF" />
            </div> -->
            <!--  v-show="!isMultiTileValid" -->
            <!-- <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                <label style="color: #122620" for="material">Tile Material</label>
                <Select v-model="selectedsysNoa" :options="tilenoas.material" placeholder="make a selection" @click="checkMaterial" @change="updateMF" />
            </div> -->
        </div>

        <!-- <div v-show="isTileData" class="w-64 flex flex-col mt-8 gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 20px">
            <label style="color: #122620" for="material">NOA Expiration Date</label>
            <InputText v-model="tilenoas.expiration_date" />
        </div> -->
        <!-- <div class="columns-3 flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                <div class="w-96 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="udlTile.manufacturer" />
                </div>
                <div class="flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="material">(UDL) Material</label>
                    <InputText id="material" v-model="udlTile.material" />
                </div>
                <div class="w-56 flex flex-col gap-1">
                    <label style="color: red">Select System E *</label>
                    <Select v-model="selectedsystemE" :options="udlTile.system" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" />
                </div>
                <div class="flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="designPressure">Design psf:</label>
                    <InputText id="designPressure" v-model="udlTile.designPressure" @change="updateselectSystemE" />
                </div>
            </div>
        </div> -->
        <!-- <div class="w-full flex flex-row space-x-36 space-y-8" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="break-after-column flex flex-row space-x-12 space-y-4" style="margin-left: 2px">
                <div class="min-w-[680px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" class="mt-3" for="anchor">Anchor Base Sheet</label>
                    <InputText id="anchor" v-model="udlTile.Anchor_Base_Sheet" @change="updateselectSystemE" />
                </div>
                <div class="min-w-[480px] flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udlTile.TileCap_Sheet_Description" @change="updateselectSystemE" />
                </div>
            </div>
        </div> -->

        <!-- <div class="gap-4 mt-10 space-x-10 space-y-6">
            <div v-show="isSAValid" class="flex flex-row gap-3 space-x-20" style="margin-left: 25px">
                <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="saTiles.manufacturer" />
                </div>
                <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="saTiles.material" />
                </div>

                <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: red">Select System F *</label>
                    <Select v-model="selectedsystemf" :options="saTiles.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                </div>

                <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                    <label style="color: #122620" for="designpressure">Design psf:</label>
                    <InputText id="designpressure" v-model="saTiles.designpressure" />
                </div>
            </div>
            <div v-show="isSAValid" class="max-w-screen-lg flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 25px">
                <label style="color: #122620" for="sadescription">S/A Description</label>
                <InputText id="capsheetdescription" v-model="saTiles.description" />
            </div>
        </div> -->
        <div class="w-56 flex flex-col gap-1">
            <label style="color: red">Select Metal Panel Pressure Table *</label>
            <!-- <Select v-model="selectedsystemE" :options="udlTile.system" placeholder="" @click="EcheckInputSystem" @change="updateselectSystemE" /> -->
        </div>
    </div>
</template>
