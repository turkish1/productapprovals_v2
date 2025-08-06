<template>
    <div id="tile" class="flex flex-col md:w-1/2 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 500px; margin-top: 250px">
        <form @submit.prevent="submitPage">
            <section class="space-y-4">
                <h2 class="text-xl font-semibold">Metal Roof Panels Application</h2>

                <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px; margin-top: 30px">
                    <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" @change="getdeckType" />
                </div>
                <!-- v-model.number="dims.slope" v-model="dims.area" v-model="dims.per"-->
                <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
                    <label for="slope">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
                    <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" placeholder="slope" :disabled="isDisabledslope" @change="validateRoofSlope" />
                    <!-- <Message v-if="errorMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorMessage }}</Message> -->
                </div>

                <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
                    <label style="color: #122620" for="area">Area of Tile</label>
                    <InputText id="area" type="text" placeholder="area" />
                </div>

                <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
                    <label for="height">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
                    <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="heightModel" type="text" placeholder="height" @input="setRoofInputs" :disabled="isDisabled" @change="validateHeight" />
                    <!-- <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message> -->
                </div>
                <div class="w-64 mt-3 ..." style="margin-left: 20px">
                    <label for="perimeter">Roof Permeter(a) = 4h</label>
                    <InputText id="perimeter" type="text" placeholder=" " />
                </div>
                <div></div>
                <div class="md:w-1/2 flex flex-col w-96 mb-4 gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 20px">
                    <label style="color: #122620" for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
                    <!-- <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @change="checkInputSystem" /> -->
                </div>
                <br />
                <div class="md:w-1/2 flex flex-col w-96 mb-4 gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 20px">
                    <label style="color: #122620" for="underlaymentType">Select Required Fire Barrier: </label>
                    <!-- <Select v-model="selectedBarrier" :options="barrierType" optionLabel="selectedBasesheet" placeholder="make selection" @change="checkInputSystem" /> -->
                </div>
                <DripEdMetal />

                <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
                    <systemENumber />
                    <!-- @keydown.tab.exact.stop="sysEcheckInput"  -->
                    <Button label="Submit" severity="contrast" @click="(modalUDLIsActive = true), sysEcheckInput()" style="margin-left: 15px" />
                </div>
                <div v-show="isSAValid" class="columns-2 flex flex-row w-64" style="margin-left: 2px">
                    <systemFNumber />
                    <Button label="Submit" severity="contrast" @click="(modalSAIsActive = true), checkInputSA()" style="margin-left: 15px" />
                </div>
                <div v-show="isPaddyCategoryValid" class="w-96" style="margin-left: 3px">
                    <metalNoaNumber ref="childQueryRef" v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out" />
                    <!-- @keydown.tab.exact.stop="grabInput" -->
                    <!-- @change="grabInput" -->

                    <Button label="Submit" severity="contrast" @click="(modalIsActive = true), grabInput()" @change="grabInput" style="margin-left: 15px" />
                </div>
                <!--  metalSAStaging() -->
                <ModalWindow @closePopup="modalSAIsActive = false" v-if="modalSAIsActive">
                    <div class="gap-4 mt-10 space-x-10 space-y-6">
                        <div v-show="isSAValid" class="flex flex-row gap-3 space-x-20" style="margin-left: 25px">
                            <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="saapplicant">S/A Applicant</label>
                                <InputText id="saapplicant" v-model="saMetal.manufacturer" />
                            </div>
                            <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="samaterial">S/A Material Type</label>
                                <InputText id="saaterial" v-model="saMetal.material" />
                            </div>

                            <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: red">Select System F *</label>
                                <Select v-model="selectedsystemf" :options="saMetal.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                            </div>

                            <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="designpressure">Design psf:</label>
                                <InputText id="designpressure" v-model="saMetal.designpressure" />
                            </div>
                        </div>
                        <div v-show="isSAValid" class="max-w-screen-lg flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 25px">
                            <label style="color: #122620" for="sadescription">S/A Description</label>
                            <InputText id="capsheetdescription" v-model="saMetal.description" />
                        </div>
                    </div>
                </ModalWindow>
                <!-- , metalUDLStaging() -->
                <ModalWindow @closePopup="modalUDLIsActive = false" v-if="modalUDLIsActive">
                    <div class="gap-4 mt-10 space-x-10 space-y-6">
                        <div v-show="isSAValid" class="flex flex-row gap-3 space-x-20" style="margin-left: 25px">
                            <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="saapplicant">UDL Applicant</label>
                                <InputText id="saapplicant" v-model="udlMetal.manufacturer" />
                            </div>
                            <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="samaterial">UDL Material Type</label>
                                <InputText id="saaterial" v-model="udlMetal.material" />
                            </div>

                            <!-- <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: red">Select System F *</label>
                                <Select v-model="selectedsystemf" :options="udlMetal.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                            </div> -->
                            <!--
                            <div class="w-72 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="designpressure">Design psf:</label>
                                <InputText id="designpressure" v-model="udlMetal" />
                            </div> -->
                        </div>
                        <div v-show="isUDLValid" class="max-w-screen-lg flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 25px">
                            <label style="color: #122620" for="sadescription">UDL Description</label>
                            <InputText id="capsheetdescription" v-model="udlMetal.description" />
                        </div>
                    </div>
                </ModalWindow>
                <!-- , metalSAStaging() -->
                <ModalWindow @closePopup="modalSAIsActive = false" v-if="modalSAIsActive">
                    <div class="gap-4 mt-10 space-x-10 space-y-6">
                        <div v-show="isSAValid" class="flex flex-row gap-3 space-x-20" style="margin-left: 25px">
                            <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="saapplicant">Panel Applicant</label>
                                <InputText id="saapplicant" v-model="metalPanel.manufacturer" />
                            </div>
                            <div class="w-128 flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600">
                                <label style="color: #122620" for="samaterial">Panel Material</label>
                                <InputText id="saaterial" v-model="metalPanel.material" />
                            </div>
                        </div>
                        <div v-show="isSAValid" class="max-w-screen-lg flex flex-col gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 25px">
                            <label style="color: #122620" for="sadescription">Panel Description</label>
                            <InputText id="capsheetdescription" v-model="metalPanel.description" />
                        </div>
                    </div>
                </ModalWindow>
                <div class="flex flex-wrap gap-1 mt-10" style="margin-left: 6px">
                    <div class="lg:w-full min-h-[10px] flex flex-row gap-18" style="margin-left: 10px">
                        <table width="100%" align="left">
                            <tbody>
                                <tr>
                                    <td valign="middle">
                                        <table style="margin: auto; font-size: large; font-weight: bold; font-family: arial">
                                            <tbody>
                                                <tr>
                                                    <!-- v-model="zoneone.mg1" -->
                                                    <td style="color: #122620">P(1):</td>
                                                    <td style="color: #122620"><input readonly="" size="4" name="p1" value="" /> psf &nbsp;</td>
                                                    <td style="color: #122620"><input readonly="" size="4" name="" value="" /> ≤ NOA Design Pressure: :&nbsp;</td>
                                                    <td style="color: #122620"><input readonly="" size="4" name="" value="" /> psf &nbsp;</td>
                                                    <!-- <i class="pi pi-check" v-show=" " style="color: green; font-size: 1.5rem" @change="updateMF"></i
                                            >&nbsp;
                                            <i class="pi pi-times" v-show=" " style="color: red; font-size: 1.5rem" @change="checkMR1"></i -->
                                                    >&nbsp;
                                                </tr>
                                                <tr>
                                                    <td style="color: #122620">P(1) NOA Clip/Exposed Fastener Spacing:</td>
                                                    <td style="color: #122620"><input readonly="" size="4" name="p1" value="" /> " o/c &nbsp;</td>
                                                </tr>

                                                <tr>
                                                    <td style="color: #122620">P(2) = P(3): &nbsp;</td>
                                                    <td style="color: #122620"><input readonly="" size="4" name="" value="" /> psf ≤ P(3) NOA Design Pressure:&nbsp;</td>

                                                    <td style="color: #122620"><input readonly="" size="4" name="   " value="" /> psf &nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="color: #122620">P(2) = P(3) NOA Clip/Exposed Fastener Spacing:</td>
                                                    <td style="color: #122620"><input readonly="" size="4" name="p1" value="" /> " o/c &nbsp;</td>
                                                </tr>

                                                <Message v-if="visible" severity="error" :life="3000">Select Another Material</Message>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="flex justify-center mt-6 gap-4">
                    <button type="reset" class="btn">Reset</button>
                    <button type="submit" class="btn btn-primary">Confirm</button>
                </div>
            </section>
        </form>
    </div>
</template>

<script setup>
import DripEdMetal from '@/components/DripEdgeChildren/DripEdMetal.vue';
import ModalWindow from '@/components/Modal/ModalWindow.vue';
import { reactive, ref } from 'vue';

const form = reactive({
    processNumber: 'me2024000123',
    jobAddress: '5680 SW 87 Ave',
    roofArea: '',
    meanHeight: '',
    slope: '',
    deckType: '',
    noa: Array(8).fill(''),
    agreePanelTerms: false
});

const deckOptions = {
    deck58: '5/8" Plywood',
    deck1932: '19/32" Plywood',
    deck34: '3/4" Plywood',
    DECK_TYPE4: '1" x 6" T&G',
    DECK_TYPE5: '1" x 8" T&G',
    DECK_TYPE6: 'Existing 1/2" Plywood'
};
let modalSAIsActive = ref(false);
let modalUDLIsActive = ref(false);
let modalIsActive = ref(false);
function autoTab(index) {
    const next = document.querySelectorAll('input')[index + 1];
    if (next) next.focus();
}
const metalPanel = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    designpressure: '',
    pressure: '',
    prescriptiveSelection: '',
    description: '',

    arrDesignPressure: [],
    metalIdentifier: 'metal'
});

const udlMetal = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: '',
    designPressure: '',
    udlIdentifier: 'udl',
    tileCap: '',
    Anchor_Base: '',
    systemSelected: '',
    prescriptiveSelection: '',
    pressure: ''
});

const saMetal = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    designpressure: '',
    pressure: '',
    prescriptiveSelection: '',
    description: '',
    Description_F1: '',
    Description_F2: '',
    Description_F3: '',
    Description_F4: '',
    Description_F5: '',
    Description_F6: '',
    Description_F7: '',
    Description_F8: '',
    Description_F9: '',
    Description_F10: '',
    Description_F11: '',
    Description_F12: '',
    Description_F13: '',
    Description_F14: '',
    Description_F15: '',
    arrDesignPressure: [],
    saIdentifier: 'sa'
});
function submitPage() {
    if (!form.agreePanelTerms) {
        alert('You must agree to the PANEL terms in order to proceed.');
        return;
    }

    if (form.noa.some((val) => val.trim() === '')) {
        alert('Please enter a complete NOA number.');
        return;
    }

    // Submit logic goes here...
    console.log('Form submitted', JSON.stringify(form));
}
</script>

<style scoped>
.input {
    border: 1px solid #ccc;
    padding: 0.4rem;
    font-size: 1rem;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
}
.btn {
    background-color: #ccc;
    padding: 0.5rem 1.2rem;
    border-radius: 4px;
}
.btn-primary {
    background-color: #4caf50;
    color: white;
}
</style>
