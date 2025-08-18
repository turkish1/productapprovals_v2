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
                <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px; margin-top: 30px">
                    <Select v-model="selectedFireBarrier" :options="FireBarrier" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" @change="getdeckType" />
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

                <div v-show="isSelectVisible2" class="md:w-1/2 grid gap-2 border-2 border-gray-700 focus:border-orange-600 grid-cols-1" style="margin-left: 300px; margin-top: 20px">
                    <label style="color: red">Select Underlayment (S/A) *</label>
                    <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
                </div>

                <div v-show="isSelectVisible1" class="md:w-1/2 grid gap-2 border-2 border-gray-700 focus:border-orange-600 grid-cols-1" style="margin-left: 300px; margin-top: 20px">
                    <label style="color: red">Select Underlayment (UDL) *</label>
                    <Select v-model="selectedSlopelow" :options="slopetypeless" placeholder="make selection" @change="getIndexs" />
                </div>
                <!-- <div class="flex flex-wrap gap-1 mt-10" style="margin-left: 6px"> -->
                <div class="flex flex-row gap-4 mt-10 space-x-10 space-y-6" style="margin-left: 10px">
                    <!-- <table class="border-collapse border border-gray-400" width="80%" align="left">
                        <tbody>
                            <tr>
                                <td valign="left">
                                    <table style="margin: left; font-size: medium; font-weight: bold; font-family: arial">
                                        <tbody>
                                            <tr>
                                                 <td style="color: #122620">P(1):</td>
                                                <td style="color: #122620">
                                                    <input readonly="" size="4" name="p1" value="" />
                                                    &nbsp; psf &nbsp;
                                                </td>
                                                <td style="color: #122620"><input readonly="" size="4" name="NOA Design Pressure:" value="" /> ≤ NOA Design Pressure:&nbsp;</td>
                                                <td style="color: #122620"><input readonly="" size="4" name="psf" value="" /> psf</td>
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
                    </table> -->
                    <!-- </div> -->
                    <div class="mt-8 max-w-2xl">
                        <div class="rounded-xl border border-gray-200 bg-white shadow-md">
                            <table class="w-full table-auto">
                                <!-- was table-fixed -->
                                <colgroup>
                                    <col class="w-[28%]" />
                                    <col class="w-[20%]" />
                                    <col class="w-[32%]" />
                                    <!-- label column gets more room -->
                                    <col class="w-[20%]" />
                                </colgroup>
                                <tbody class="divide-y divide-gray-100">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-gray-700 font-medium">P(1)</th>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <input readonly class="w-20 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-right" />
                                                <span class="text-gray-600">psf</span>
                                            </div>
                                        </td>

                                        <!-- keep this on one line -->
                                        <td class="px-4 py-3 text-gray-600 text-sm whitespace-nowrap min-w-[14ch] md:min-w-[20ch]">≤ NOA Design Pressure</td>

                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <input readonly class="w-20 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-right" />
                                                <span class="text-gray-600">psf</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th class="px-4 py-3 text-gray-600 text-sm whitespace-nowrap min-w-[8ch] md:min-w-[18ch]">P(1) NOA Clip/Exposed Fastener Spacing:</th>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <input readonly class="w-20 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-right" />
                                                <span class="text-gray-600">"o/c </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- do the same for the P(3) label -->
                                    <tr>
                                        <th class="px-4 py-3 text-left text-gray-700 font-small">P(2) = P(3)</th>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <input readonly class="w-20 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-right" />
                                                <span class="text-gray-600">psf</span>
                                            </div>
                                        </td>

                                        <td class="px-4 py-3 text-gray-600 text-sm whitespace-nowrap min-w-[16ch] md:min-w-[22ch]">≤ P(3) NOA Design Pressure</td>

                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <input readonly class="w-20 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-right" />
                                                <span class="text-gray-600">psf</span>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th class="px-4 py-3 text-gray-600 text-sm whitespace-nowrap min-w-[14ch] md:min-w-[20ch]">P(2) = P(3) NOA Clip/Exposed Fastener Spacing:</th>
                                        <td class="px-4 py-3">
                                            <div class="flex items-center gap-2">
                                                <input readonly class="w-20 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-right" />
                                                <span class="text-gray-600">"o/c </span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- PrimeVue message kept outside the table -->
                        <Message v-if="visible" severity="error" :life="3000" class="mt-4"> Select Another Material </Message>
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
import usemetalSlope from '@/composables/MetalPanel/use-metalpanelSlope';
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
const dims = reactive({ area: '', per: '', height: '', slope: '' });
const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = usemetalSlope();
let isSelectVisible1 = ref(false);
let isSelectVisible2 = ref(false);
const selectedDeck = ref(null);
const selectedFireBarrier = ref(null);
const type = ref([{ name: ' - Select Deck Type - ' }, { name: ' 5/8" Plywood ' }, { name: ' 19/32" Plywood ' }, { name: ' 3/4" Plywood ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G ' }, { name: ' Existing 1/2" Plywood ' }]);
const FireBarrier = ref([
    { name: ' - Select Fire Barrier - ' },
    { name: 'One or more layers of GAF Versashield installed above or below the underlayment' },
    { name: 'One layer of PolyGlass USA Polystick XFR adhered directly to wood deck' },
    { name: '¼" min. G-P Densdeck' },
    { name: '¼" min.  United States Gypsum SECUROCK roof boards' }
]);

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

function valueEntered() {
    if (!slope.value) {
        console.log('Not Mounted');
        return;
    }

    const slopeNumber = Number(slope.value);

    // Reset all state first
    isSlopeValid.value = false;
    isSlopeLessFour.value = false;
    isSlopeMoreFour.value = false;
    isSelectVisible1.value = false;
    isSelectVisible2.value = false;
    isDisabled.value = true;
    isPrescriptivehigh.value = false;

    // Empty input
    if (slope.value === '') {
        return;
    }

    // Logic
    if (slopeNumber < 2) {
        // Nothing to set, already invalid
        return;
    }

    if (slopeNumber >= 2 && slopeNumber <= 4) {
        isSlopeValid.value = true;
        isSlopeLessFour.value = true;
        isSelectVisible1.value = true;
        isDisabled.value = false;
    } else if (slopeNumber > 4 && slopeNumber <= 12) {
        isSlopeValid.value = true;
        isSlopeMoreFour.value = true;
        isSelectVisible2.value = true;
        isPrescriptivehigh.value = true;
    }
}

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
