<script setup>
import useBurDetails from '@/composables/fetchTech/use-burdetailsdocs';

import useS3download from '@/composables/fetchTech/use-S3download';
import useburAxios from '@/composables/use-burAxios';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { invoke, until } from '@vueuse/shared';
import { storeToRefs } from 'pinia';
import { computed, reactive, ref, watch, watchEffect } from 'vue';

const { downloadFile, fileUrl } = useS3download();
const fileName = ref('downloaded-file.pdf');
const { bMaters, systemHW, systemHM, systemSA, Perimeters } = useburAxios();
const { calldetailsdoc } = useBurDetails();
const props = defineProps({
    roofType: {
        type: ref,
        required: false,
        default: 'LowSlope'
    }
});

const burpdfStore = useBurpdfStore();
const { burpdfinput, addpdfData } = storeToRefs(burpdfStore);

const selectedBurItems = reactive({
    burMaterial: '',
    burSystem: '',
    p1: '',
    p3: ''
});
const selectedBur = ref();
const mat = ref();
const selectedSystem = ref();
const syst = ref([]);

const selectedPrimeone = ref(null);
const primeone = ref();
const selectedPrimethree = ref(null);
const primethree = ref();
const sB = ref('');
let selSytem = ref('');
const maps = ref([]);

function findSelected() {
    mat.value = bMaters.value;
}

function updateselection(event) {
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

    selectedBurItems.burMaterial = event.value;
}

function selectSystem() {
    for (let i = 0; i < syst.value.length; i++) {
        let index = i;
        let value = syst.value[i];
        maps.value.push([index, value]);
    }
}
const sp1 = ref('');
const sp2 = ref('');
const sp3 = ref('');
const sp4 = ref('');
const sp5 = ref('');
const copiedString = ref('');

function updateselectSystem(event) {
    selSytem.value = Object.entries(selectedSystem).map((obj) => {
        const val = obj[1];
        console.log(val, obj);
        let convert = String(val);

        sp1.value = convert.split(/(?=[)¹])/);
        sp2.value = convert.split(/(?=[)²])/);
        sp3.value = convert.split(/(?=[)³])/);
        sp4.value = convert.split(/(?=[)⁴])/);
        sp5.value = convert.split(/(?=[)⁵])/);
        console.log(sp2.value);
        console.log(sp2.value[3]);
        if (sp2.value[2] === '²' || sp2.value[3] === '²' || sp2.value[4] === '²') {
            primeone.value = Perimeters.p1_two;
            primethree.value = Perimeters.p2_two;
            // I need to separete, possibly the p1 and p2 to capture each event from the select box.
        }
        if (sp3.value[3] === '³') {
            primeone.value = Perimeters.p1_three;
            primethree.value = Perimeters.p2_three;
        }
        if (sp4.value[2] === '⁴' || sp4.value[2] === '⁵') {
            primeone.value = Perimeters.p1_four;
            primethree.value = Perimeters.p2_four;
            primeone.value = Perimeters.p1_five;
            primethree.value = Perimeters.p2_five;
        }
        if (sp5.value[4] === '⁵') {
            primeone.value = Perimeters.p1_five;
            primethree.value = Perimeters.p2_five;
        }
        if (sp1.value[4] === '¹') {
            primeone.value = Perimeters.p1_one;
            primethree.value = Perimeters.p2_one;
        }
    });
    selectedBurItems.burSystem = event.value;
    console.log(event.value);

    // selectedBurItems.p1
    // I may use this to call the function in s3downloadbin... downloadFile pass the selection, then generate the pre-url \

    const getFirstPart = (str) => {
        console.log(str);
        const match = str.match(/^[^\s]+/); // Matches characters until the first space
        return match ? match[0] : ''; // Return the matched part or an empty string if no match
    };
    const firstPart = computed(() => getFirstPart(event.value));
    console.log(firstPart.value);
    // Computed property to dynamically get the first part computed()

    // handleDownload();
    copyToClipboard(firstPart.value);
    calldetailsdoc(firstPart.value);
}

function copyToClipboard(firstPart) {
    console.log(firstPart);
    const copyToClipboard = () => {
        copiedString.value = firstPart.value; // Copy the first part
        console.log(copiedString.value);

        alert(`Copied: "${copiedString.value}"`);
    };
}
function prescriptiveOne(event) {
    selectedBurItems.p1 = event.value;
}
function prescriptiveThree(event) {
    selectedBurItems.p3 = event.value;
    burpdfStore.addpdfData(selectedBurItems);
}

const handleDownload = async () => {
    console.log('handleDownload called');
    try {
        downloadFile(fileUrl, fileName.value);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
invoke(async () => {
    await until(handleDownload).changed();
});

watch(findSelected, updateselection, updateselectSystem, handleDownload, syst, selSytem, prescriptiveOne, prescriptiveThree, copyToClipboard, () => {});

watchEffect(sB, syst, selectedSystem, () => {});
</script>
<template>
    <!-- <div id="bur" class="flex flex-col gap-2 shadow-lg shadow-cyan-800" style="margin-left: 1px"> -->
    <!-- <div class="card flex flex-col gap-2"> -->
    <div class="card md:w-1/2 grid gap-2 grid-cols-1 gap-2 shadow-md shadow-cyan-800" style="margin-left: 450px">
        <label for="material" style="color: red">Type of Low Slope BUR Material: *</label>
        <Select v-model="selectedBur" :options="mat" placeholder="make selection" @click="findSelected" @change="updateselection" />
        <label for="system" style="color: red">Type of Low Slope BUR System: *</label>
        <Select v-model="selectedSystem" :options="syst" placeholder="make selection" @click="selectSystem" @change="updateselectSystem" />
        <label for="fieldPresc1" style="color: red">Attach P(1') Prime using P(1) Field Prescriptive Basesheet: *</label>
        <Select v-model="selectedPrimeone" :options="primeone" placeholder="make selection" @update="updateselectSystem" @change="prescriptiveOne" />
        <label for="fieldPresc3" style="color: red"> Attach P(2) Perimeter using P(3) Corner Prescriptive: *</label>
        <Select v-model="selectedPrimethree" :options="primethree" placeholder="make selection" @update="updateselectSystem" @change="prescriptiveThree" />
    </div>
    <!-- </div> -->
    <!-- <DownloadS3 /> -->
    <!-- </div> -->
</template>
<style scoped></style>
