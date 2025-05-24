<script setup>
import useS3download from '@/composables/fetchTech/use-S3download';
import useS3upload from '@/composables/fetchTech/use-S3upload';
import useBurDetails from '@/composables/fetchTech/use-burdetailsdocs';
import useburAxios from '@/composables/use-burAxios';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

//
// Composable & store setup
//
const { removeBeforeSlash } = useS3upload();
const { downloadFile, fileUrl } = useS3download();
const fileName = ref('downloaded-file.pdf');
const { bMaters, systemHW, systemHM, systemSA, Perimeters } = useburAxios();

const burpdfStore = useBurpdfStore();
const { burpdfinput, addpdfData } = storeToRefs(burpdfStore);

//
// Reactive state
//
const selectedBurItems = reactive({
    burMaterial: '',
    burSystem: '',
    p1: '',
    p3: ''
});

const selectedBur = ref(null);
const mat = ref([]); // List of materials
const selectedSystem = ref(null);
const syst = ref([]); // Systems based on material selection

const selectedPrimeone = ref(null);
const primeone = ref([]); // Options for Prime One
const selectedPrimethree = ref(null);
const primethree = ref([]); // Options for Prime Three

// Temporary values & mapping
const sB = ref('');
const selSytem = ref('');
const maps = ref([]);
const { calldetailsdoc } = useBurDetails();

// For splitting the system string
const sp1 = ref([]);
const sp2 = ref([]);
const sp3 = ref([]);
const sp4 = ref([]);
const sp5 = ref([]);

// For clipboard copy
const copiedString = ref('');

//
// Functions
//

// Called when the material selection is clicked/needs to be loaded
function findSelected() {
    console.log(bMaters.value);
    mat.value = bMaters.value;
}

// Called on material change; event.value should be the selected material string.
function updateselection(event) {
    const value = event.value;
    // Set the available systems based on the selected material
    if (value === 'Hot-Mopped Applied Systems') {
        syst.value = systemHM.value;
    } else if (value === 'SBS/APP Modified Heat-Weld Bitumen Membrane') {
        syst.value = systemHW.value;
    } else if (value === 'SBS Modified Bitumen Self-Adhered Membrane') {
        syst.value = systemSA.value;
    }
    selectedBurItems.burMaterial = value;
}

// Called when the system select is clicked; here we populate a mapping array.
function selectSystem() {
    maps.value = []; // Clear previous entries
    for (let i = 0; i < syst.value.length; i++) {
        console.log(syst.value[i]);
        maps.value.push([i, syst.value[i]]);
    }
}

// Called when a system is selected; event.value should be the system string.
function updateselectSystem(event) {
    const value = event.value;
    // Split the string into parts for processing. Adjust the regex if needed.
    let convert = String(value);
    sp1.value = convert.split(/(?=[)¹])/);
    sp2.value = convert.split(/(?=[)²])/);
    sp3.value = convert.split(/(?=[)³])/);
    sp4.value = convert.split(/(?=[)⁴])/);
    sp5.value = convert.split(/(?=[)⁵])/);

    console.log('Split parts:', sp5);

    // Apply logic based on the parts to determine primeone and primethree.
    if (sp2.value[2] === '²' || sp2.value[3] === '²' || sp5.value[1] === '⁵' || sp2.value[4] === '²' || sp2.value[1] === '⁵') {
        primeone.value = Perimeters.p1_two;
        primethree.value = Perimeters.p2_two;
    }
    if (sp3.value[3] === '³' || sp4.value[1] === '³' || sp3.value[1] === '⁵') {
        primeone.value = Perimeters.p1_three;
        primethree.value = Perimeters.p2_three;
    }
    if (sp4.value[2] === '⁴' || sp4.value[2] === '⁵' || sp4.value[1] === '⁵') {
        // Note: This condition currently overrides the previous ones.
        primeone.value = Perimeters.p1_four;
        primethree.value = Perimeters.p2_four;
        // If you need to assign additional values, consider using mutually exclusive conditions.
        primeone.value = Perimeters.p1_five;
        primethree.value = Perimeters.p2_five;
    }
    if (sp5.value[4] === '⁵' || sp5.value[1] === '⁵' || sp5.value[2] === '⁵' || sp5.value[3] === '⁵') {
        primeone.value = Perimeters.p1_five;
        primethree.value = Perimeters.p2_five;
    }
    if (sp1.value[4] === '¹' || sp1.value[1] === '⁵') {
        primeone.value = Perimeters.p1_one;
        primethree.value = Perimeters.p2_one;
    }

    selectedBurItems.burSystem = value;
    console.log('Selected system:', value);

    // Get the first part of the system string
    const getFirstPart = (str) => {
        const match = str.match(/^[^\s]+/);
        return match ? match[0] : '';
    };
    const firstPart = getFirstPart(value);
    console.log('First part:', firstPart);

    // Copy to clipboard and call details function
    copyToClipboard(firstPart);
    calldetailsdoc(firstPart);
    handleDownload();
}

// Copies the given text to the clipboard (or simply sets it to our reactive var)
function copyToClipboard(text) {
    copiedString.value = text;
    console.log('Copied string:', copiedString.value);
    // alert(`Copied: "${copiedString.value}"`);
}

// Called when the Prime One select changes.
function prescriptiveOne(event) {
    selectedBurItems.p1 = event.value;
    // addpdfData(selectedBurItems.p1);
}

// Called when the Prime Three select changes.
function prescriptiveThree(event) {
    console.log(event.value);
    selectedBurItems.p3 = event.value;
    // Call the store method to add the PDF data. (Assuming addpdfData is a function)
    burpdfStore.addpdfData(selectedBurItems);
}

//
// File upload / download functionality
//

// Dummy variables; replace these with your actual logic/values.
const fName = 'some-file.pdf';
const pdfBlob = new Blob([], { type: 'application/pdf' });
const objName = 'folder';
const uploadUrl = ref('');

const handleDownload = async () => {
    // Function to upload a file to S3
    const uploadFile = async (fName, pdfBlob) => {
        if (!fName) {
            // alert('Please select a file to upload.');
            return;
        }
        const fileNameLocal = fName; // Keep original name or generate a new one
        const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${objName}/${fileNameLocal}`;
        try {
            const response = await fetch(s3Url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/pdf'
                },
                body: pdfBlob
            });
            if (response.ok) {
                uploadUrl.value = s3Url;
                // alert('File uploaded successfully!');
            } else {
                alert(`Failed to upload file. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }
    };

    await uploadFile(fName, pdfBlob);
    console.log('handleDownload called');
    try {
        downloadFile(fileUrl, fileName.value);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
</script>

<template>
    <div class="md:w-1/2 grid grid-cols-1 gap-2 border-2 border-gray-700 focus:border-orange-600 shadow-md shadow-cyan-800" style="margin-left: 450px">
        <label for="material" style="color: red">Type of Low Slope BUR Material: *</label>
        <Select v-model="selectedBur" :options="mat" placeholder="make selection" @click="findSelected" @change="updateselection" />
        <label for="system" style="color: red">Type of Low Slope BUR System: *</label>
        <Select v-model="selectedSystem" :options="syst" placeholder="make selection" @click="selectSystem" @change="updateselectSystem" />
        <label for="fieldPresc1" style="color: red"> Attach P(1') Prime using P(1) Field Prescriptive Basesheet: * </label>
        <Select v-model="selectedPrimeone" :options="primeone" placeholder="make selection" @change="prescriptiveOne" />
        <label for="fieldPresc3" style="color: red"> Attach P(2) Perimeter using P(3) Corner Prescriptive: * </label>
        <Select v-model="selectedPrimethree" :options="primethree" placeholder="make selection" @change="prescriptiveThree" />
    </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
