<script setup>
// import useburAxios from '@/composables/use-burAxios';
import { useburValidation } from '@/composables/Validation/use-burHeight';
import { useburSlopeValidation } from '@/composables/Validation/use-burSlope';
import { useBurStore } from '@/stores/burStore';
// import useInput from '@/composables/use-input';
import DripEdgeComponent from '@/components/DripEdgeComponent.vue';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';

// const { bMaters, systemHW, systemHM, systemSA, Perimeters } = useburAxios();
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
let isvalueValid = ref(false);
const factor = ref(0.6);
const lowslopeStore = useBurStore();
const { burinput, addData } = storeToRefs(lowslopeStore);

const props = defineProps({
    roofType: {
        type: ref,
        required: false,
        default: 'LowSlope'
    }
});
const burpdfStore = useBurpdfStore();
const { burpdfinput, addpdfData } = storeToRefs(burpdfStore);
// function addCheckmarks() {
//     if (errorMessage.value === null || errorHeightMessage.value === null) {
//         isvalueValid = true;
//         console.log('Entered checkmarks');
//     }
// }
const dims = reactive({
    area: '',
    per: '',
    height: '',
    slope: ''
});
const type = ref([{ name: 'Select Deck Type' }, { name: ' 5/8" Plywood ' }, { name: ' 3/4" Plywood ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G' }, { name: ' Existing 1/2" Plywood ' }]);
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
// const selectedPrimeone = ref(null);
// const primeone = ref();
// const selectedPrimethree = ref(null);
// const primethree = ref();
// const sB = ref('');
let selSytem = ref('');
const maps = ref([]);

let slopeModel = ref('');
let heightModel = ref('');

function setRoofInputs() {
    console.log(slopeModel, heightModel);
    console.log(burinput, addData);
    dims.per = (dims.height * factor.value).toFixed(2);
}

// function findSelected() {
//     mat.value = bMaters.value;
// }
const dt = ref('');
function getdeckType(event) {
    console.log(selectedDeck._value.name, event.value.name);
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        console.log(dt.value);
    }
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

// function updateselection() {
//     sB.value = Object.entries(selectedBur).map((obj) => {
//         const value = obj[1];

//         if (obj[1] === 'Hot-Mopped Applied Systems') {
//             syst.value = systemHM.value;
//         }
//         if (obj[1] === 'SBS/APP Modified Heat-Weld Bitumen Membrane') {
//             syst.value = systemHW.value;
//         }
//         if (obj[1] === 'SBS Modified Bitumen Self-Adhered Membrane') {
//             syst.value = systemSA.value;
//         } else {
//             return null;
//         }
//     });
// }

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
    console.log(dims, burpdfinput.value[0]);
}

// function selectSystem() {
//     for (let i = 0; i < syst.value.length; i++) {
//         let index = i;
//         let value = syst.value[i];
//         maps.value.push([index, value]);
//     }
//     addData(dims);
//     console.log(burinput);
// }
// function updateselectSystem() {
//     selSytem.value = Object.entries(selectedSystem).map((obj) => {
//         const val = obj[1];

//         let convert = String(val);

//         let sp1 = convert.split(/(?=[)¹])/);
//         let sp2 = convert.split(/(?=[)²])/);
//         let sp3 = convert.split(/(?=[)³])/);
//         let sp4 = convert.split(/(?=[)⁴])/);
//         let sp5 = convert.split(/(?=[)⁵])/);

//         if (sp2[2] === '²' || sp2[3] === '²') {
//             primeone.value = Perimeters.p1_two;
//             primethree.value = Perimeters.p2_two;
//         }
//         if (sp2[2] === ') ⁵') {
//             primeone.value = Perimeters.p1_five;
//             primethree.value = Perimeters.p2_five;
//         }
//         if (sp4[2] === '⁴' || sp4[2] === '⁵') {
//             primeone.value = Perimeters.p1_four;
//             primethree.value = Perimeters.p2_four;
//             primeone.value = Perimeters.p1_five;
//             primethree.value = Perimeters.p2_five;
//         }
//         if (sp5[4] === '⁵') {
//             primeone.value = Perimeters.p1_five;
//             primethree.value = Perimeters.p2_five;
//         }
//         if (sp1[4] === '¹') {
//             primeone.value = Perimeters.p1_one;
//             primethree.value = Perimeters.p2_one;
//             pdfcleared.value = true;
//         }
//     });
// }
// syst, selectedSystem,updateselectSystem, syst,selSytem,updateselection,findSelected,
watch(setRoofInputs, validateRoofSlope, validateHeight, dims.per, type, () => {});
watchEffect(setRoofInputs, whatChanged, validateRoofSlope, () => {});
</script>
<template>
    <div id="bur" class="flex flex-col gap-2" style="margin-left: 1px">
        <div class="card flex flex-col gap-2 shadow-lg shadow-cyan-800" style="margin-left: 1px">
            <label for="title" style="color: whitesmoke; margin-left: 650px">Low Slope Roof</label>

            <div class="w-128 gap-2" style="margin-left: 12px">
                <!-- @change="getdeckType"  -->
                <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" @change="getdeckType" />
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
                <label style="color: whitesmoke" for="area">Area</label>
                <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
            </div>

            <div class="w-64 flex flex-col flex-row gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="per" style="color: red">Roof Perimeter * (a') = .6 x h:</label>
                <InputText id="per" v-model="dims.per" type="text" placeholder="per" @change="setRoofInputs" />
            </div>

            <DripEdgeComponent />
        </div>
    </div>
</template>
<style scoped></style>
