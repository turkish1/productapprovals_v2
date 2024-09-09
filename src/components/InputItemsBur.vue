<script setup>
import useburAxios from '@/composables/use-burAxios';

import { useRoofListStore } from '@/stores/roofList';
import { invoke, until, useToNumber } from '@vueuse/shared';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
import DripEdgeComponent from './DripEdgeComponent.vue';

const { bMaters, systemHW, systemHM, systemSA, Perimeters } = useburAxios();

const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);

const factor = ref(0.6);

const props = defineProps({
    roofType: {
        type: ref,
        required: false,
        default: 'LowSlope'
    }
});
let slope = ref(null);
// let roofArea = ref(roofList._object.roofList[0].dim2);
let isSlopeValid = ref(true);
let isHeightValid = ref(true);
const dims = reactive({
    area: '',
    per: '',
    height: ''
});
const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);

const selectedBur = ref();
const mat = ref();
const selectedSystem = ref();
const syst = ref([]);
const selectedDeck = ref();
const selectedPrimeone = ref(null);
const primeone = ref();
const selectedPrimethree = ref(null);
const primethree = ref();
const sB = ref('');
let selSytem = ref('');
const maps = ref([]);
const pdfcleared = ref(false);
let slopeModel = ref('');
let heightModel = ref('');

function setRoofInputs() {
    dims.height = heightModel.value;

    dims.slope = slopeModel.value;
    dims.per = (dims.height * factor.value).toFixed(2);
}

function findSelected() {
    mat.value = bMaters.value;
}
watch(setRoofInputs, validateRoofSlope, findSelected, updateselection, updateselectSystem, validateHeight, syst, dims.per, selSytem, type, () => {});
watchEffect(setRoofInputs, sB, syst, selectedSystem, validateHeight, () => {});

onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Low Slope') {
            console.log(item.dim2);
            dims.area = item.dim2;
        }
    });
});

function updateselection() {
    sB.value = Object.entries(selectedBur).map((obj) => {
        const value = obj[1];

        if (obj[1] === 'Hot-Mopped Applied Systems') {
            syst.value = systemHM.value;
        }
        if (obj[1] === 'SBS/APP Modified Heat-Weld Bitumen Membrane') {
            syst.value = systemHW.value;
        }
        if (obj[1] === 'SBS Modified Bitumen Self-Adhered Membrane') {
            syst.value = systemSA.value;
        } else {
            return null;
        }
    });
}
const heightmin = ref(10);
const heightmax = ref(30);
function validateHeight() {
    console.log(typeof dims.height, typeof heightmax.value);
    const height = useToNumber(dims.height);
    console.log(typeof height.value);
    if (height.value >= heightmin.value || height.value <= heightmax.value) {
        console.log(height.value, heightmax.value, heightmax.value);
        isHeightValid.value = true;
    } else {
        isHeightValid.value = false;
    }
}

function validateRoofSlope() {
    if (slope.value <= 2) {
        isSlopeValid.value = true;
    } else isSlopeValid.value = false;
}
function selectSystem() {
    for (let i = 0; i < syst.value.length; i++) {
        let index = i;
        let value = syst.value[i];
        maps.value.push([index, value]);
    }
}
function updateselectSystem() {
    selSytem.value = Object.entries(selectedSystem).map((obj) => {
        const val = obj[1];

        let convert = String(val);

        let sp1 = convert.split(/(?=[)¹])/);
        let sp2 = convert.split(/(?=[)²])/);
        let sp3 = convert.split(/(?=[)³])/);
        let sp4 = convert.split(/(?=[)⁴])/);
        let sp5 = convert.split(/(?=[)⁵])/);

        if (sp2[2] === '²' || sp2[3] === '²') {
            primeone.value = Perimeters.p1_two;
            primethree.value = Perimeters.p2_two;
        }
        if (sp2[2] === ') ⁵') {
            primeone.value = Perimeters.p1_five;
            primethree.value = Perimeters.p2_five;
        }
        if (sp4[2] === '⁴' || sp4[2] === '⁵') {
            primeone.value = Perimeters.p1_four;
            primethree.value = Perimeters.p2_four;
            primeone.value = Perimeters.p1_five;
            primethree.value = Perimeters.p2_five;
        }
        if (sp5[4] === '⁵') {
            primeone.value = Perimeters.p1_five;
            primethree.value = Perimeters.p2_five;
        }
        if (sp1[4] === '¹') {
            primeone.value = Perimeters.p1_one;
            primethree.value = Perimeters.p2_one;
            pdfcleared.value = true;
        }
    });
}

const generatePdf = () => {
    const element = document.getElementById('bur');
    console.log(element);
    // Use html2canvas to capture the element as a canvas
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Add the captured image data to the PDF
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

        const pdfBlob = pdf.output('blob');

        // Save the PDF Blob using the File System Access API
        savePdfBlobSilently(pdfBlob);
    });

    const savePdfBlobSilently = async (blob) => {
        try {
            // Use the File System Access API to request a file handle
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: 'bur.pdf',
                types: [
                    {
                        description: 'PDF file',
                        accept: {
                            'application/pdf': ['.pdf']
                        }
                    }
                ]
            });

            // Create a writable stream
            const writable = await fileHandle.createWritable();

            // Write the Blob data to the file
            await writable.write(blob);

            // Close the writable stream
            await writable.close();

            console.log('PDF saved successfully without popping download dialog!');
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };
};
invoke(async () => {
    await until(pdfcleared).changed();
    generatePdf();
});
</script>
<template>
    <div id="bur" class="flex flex-col lg:w-full gap-2 bg-white shadow-lg shadow-cyan-800" style="margin-left: 50px">
        <div class="card flex flex-col gap-2">
            <div class="w-128 gap-2" style="margin-left: 12px">
                <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" />
            </div>
            <div class="w-64 flex flex-col gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="slope" style="color: red">Slope *</label>

                <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" @change="valueEntered" @input="validateRoofSlope" />
            </div>
            <!-- <Button size="small" v-show="isSlopeValid" icon="pi pi-check" severity="success" @change="valueEntered" />&nbsp; -->

            <div v-if="!isSlopeValid" class="card flex flex-wrap gap-1 justify-left">
                <Message w-64 severity="error" :life="3000">Enter a Valid Slope</Message>
            </div>

            <div class="w-64 flex flex-col flex-row gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="height" style="color: red">Height *</label>
                <InputText id="height" v-model="heightModel" type="text" placeholder="height" @input="setRoofInputs" @change="validateHeight" />
            </div>
            <div v-if="isHeightValid" class="card flex flex-wrap gap-1 justify-left">
                <Message w-64 severity="error" :life="3000">Enter a Valid Height</Message>
            </div>
            <div class="w-64 flex flex-col gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 20px">
                <label for="area">Area</label>
                <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
            </div>

            <div class="w-64 flex flex-col flex-row gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="per" style="color: red">Roof Perimeter * (a') = .6 x h:</label>
                <InputText id="per" v-model="dims.per" type="text" placeholder="per" @change="setRoofInputs" />
            </div>

            <DripEdgeComponent />
            <div class="card lg:w-full grid gap-2 grid-cols-1">
                <label for="material" style="color: red">Type of Low Slope BUR Material: *</label>
                <Select v-model="selectedBur" :options="mat" placeholder="make selection" @click="findSelected" @change="updateselection" />
                <label for="system" style="color: red">Type of Low Slope BUR System: *</label>
                <Select v-model="selectedSystem" :options="syst" placeholder="make selection" @click="selectSystem" @change="updateselectSystem" />
                <label for="fieldPresc1" style="color: red">Attach P(1') Prime using P(1) Field Prescriptive Basesheet: *</label>
                <Select v-model="selectedPrimeone" :options="primeone" placeholder="make selection" @change="updateselectSystem" />
                <label for="fieldPresc3" style="color: red"> Attach P(2) Perimeter using P(3) Corner Prescriptive: *</label>
                <Select v-model="selectedPrimethree" :options="primethree" placeholder="make selection" @change="updateselectSystem" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
