<script setup>
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { ref } from 'vue';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const store = useRoofListStore();
const permitStore = usePermitappStore();
const { permitapp } = storeToRefs(permitStore);
console.log(permitapp._object);
const area = ref('');
const selectedItem = ref('');
const type = ref([{ name: ' ' }, { name: 'Low Slope' }, { name: 'Asphalt Shingle' }, { name: 'Mechanical Fastened Tile' }, { name: 'Mortar/Adhesive Tile' }, { name: 'Metal Panel' }]);
const types = ref([{ name: ' ' }, { name: 'Low Slope' }, { name: 'Mechanical Fastened Tile' }, { name: 'Mortar/Adhesive Tile' }, { name: 'Metal Panel' }]);

tryOnMounted(usePermitappStore, () => {
    console.log(permitapp);
});
function clearSelected() {
    store.$reset();
}

const generatePdf = () => {
    const element = document.getElementById('roofselect');
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
            // const fileHandle = await window.showSaveFilePicker({
            //     suggestedName: 'generated.pdf',
            //     types: [
            //         {
            //             description: 'PDF file',
            //             accept: {
            //                 'application/pdf': ['.pdf']
            //             }
            //         }
            //     ]
            // });

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

const isMiamiBeachValid = ref(false);
function addItemAndClear(item, dim1, dim2, dim3, dim4, dim5) {
    item = selectedItem.value.name;

    if (item.length === 0) {
        return;
    }
    if (item === 'Asphalt Shingle') {
        dim1 = area.value;
        store.addSystemShingle(item, dim1);
    }
    if (item === 'Low Slope') {
        dim2 = area.value;
        store.addSystemBur(item, dim2);
    }

    if (item === 'Mechanical Fastened Tile') {
        dim3 = area.value;

        store.addSystemMTile(item, dim3);
    }
    if (item === 'Mortar/Adhesive Tile') {
        dim4 = area.value;
        store.addSystemATile(item, dim4);
    }
    if (item === 'Metal Panel') {
        dim5 = area.value;
        store.addSystemMetal(item, dim5);
    }

    clear();
    console.log(item, dim1, 'System added');
}

function clear() {
    area.value = '';

    selectedItem.value = '';
}
</script>
<template>
    <div id="roofselect" class="card flex justify-center">
        <div class="refresh">
            <Button plain text><i class="pi pi-refresh" style="font-size: 2rem; color: grey; margin-left: 10px; margin-top: 90px" @click="clearSelected"></i></Button>
        </div>
        <form>
            <div class="card flex flex-col gap-4">
                <h1 class="h1">Select System</h1>

                <Select v-model="selectedItem" :options="type" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" />
                <InputText type="text" v-model="area" />
            </div>
            <div v-show="isMiamiBeachValid" class="card flex flex-col gap-4">
                <h1 class="h1">Select System</h1>

                <Select v-model="selectedItem" :options="types" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" />
                <InputText type="text" v-model="area" />
            </div>
        </form>
        <!-- Prevent the addition of a system until the roof area has been entered -->
        <div class="add">
            <i class="pi pi-plus-circle" style="font-size: 2rem; color: gray; margin-left: 1px; margin-top: 150px" @click="addItemAndClear(selectedItem, area)"></i>
        </div>

        <div class="grid grid-cols-1 gap-2 place-content-end h42 ..">
            <div>
                <!-- <Button severity="contrast" @click="generatePdf">Generate PDF</Button> -->

                <Button class="button" label="Submit" severity="contrast" style="margin-left: 5px; margin-top: 100px" as="router-link" to="/generalpage" @click="generatePdf"></Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .add { */
/* margin-left: 280px;
    margin-top: 30px; */
/* } */
/* .refresh {
    margin-left: 40px;
    margin-top: 90px;
} */

/* .button {
    margin-left: 30px;
    margin-top: 120px;
} */
</style>
