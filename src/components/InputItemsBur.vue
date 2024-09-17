<script setup>
import useburAxios from '@/composables/use-burAxios';
import { useburValidation } from '@/composables/Validation/use-burHeight';
import { useburSlopeValidation } from '@/composables/Validation/use-burSlope';
// import useInput from '@/composables/use-input';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, until } from '@vueuse/shared';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
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

const dims = reactive({
    area: '',
    per: '',
    height: '',
    slope: ''
});
const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
const whatChanged = computed(() => {
    setRoofInputs();

    validateHeight();
    validateRoofSlope();
});
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
    console.log(slopeModel, heightModel);

    dims.per = (dims.height * factor.value).toFixed(2);
}

function findSelected() {
    mat.value = bMaters.value;
}

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

const { errorburMessage, validateburSlope } = useburSlopeValidation({
    min: 0.128,
    max: 2.1,
    required: true
});

const { errorburHeightMessage, validateburHeight } = useburValidation({
    min: 10,
    max: 30,
    required: true
});

function validateRoofSlope() {
    validateInput();
}
const validateInput = () => {
    validateburSlope(dims.slope);
    console.log(errorburMessage.value);
};

const validateHeightInput = () => {
    validateburHeight(dims.height);
    console.log(errorburHeightMessage.value);
};
function validateHeight() {
    validateHeightInput();
    console.log(dims.height);
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

        // Add some content
        pdf.text('This is a sample PDF with a watermark', 20, 30);

        // Set the opacity for the watermark text
        pdf.setGState(new pdf.GState({ opacity: 0.2 })); // Adjust opacity

        // Set font size, alignment, and rotation for the watermark
        pdf.setFontSize(50);
        pdf.setTextColor(150, 150, 150); // Light gray color for watermark
        pdf.text('WATERMARK', pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() / 2, {
            angle: 45, // Rotate watermark text
            align: 'center'
        });

        // Reset the opacity for the rest of the content
        pdf.setGState(new pdf.GState({ opacity: 1 }));
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
watch(setRoofInputs, validateRoofSlope, validateHeight, slope, findSelected, updateselection, updateselectSystem, syst, dims.per, selSytem, type, () => {});
watchEffect(setRoofInputs, sB, whatChanged, syst, selectedSystem, validateRoofSlope, () => {});
</script>
<template>
    <div id="bur" class="flex flex-col lg:w-full gap-2 bg-white shadow-lg shadow-cyan-800" style="margin-left: 50px">
        <div class="card flex flex-col gap-2">
            <div class="w-128 gap-2" style="margin-left: 12px">
                <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" />
            </div>
            <div class="w-64 flex flex-col gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="slope" style="color: red">Slope *</label>

                <InputText id="slope" v-model.number="dims.slope" type="text" :error="slopeError" placeholder="slope" :invalid="slope === null" @change="validateRoofSlope" />
                <Message v-if="errorburMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorburMessage }}</Message>
            </div>

            <div class="w-64 flex flex-col flex-row gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="height" style="color: red">Height *</label>
                <InputText id="height" v-model.number="dims.height" type="text" placeholder="height" @input="setRoofInputs" @change="validateHeight" />
                <Message v-if="errorburHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorburHeightMessage }}</Message>
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
