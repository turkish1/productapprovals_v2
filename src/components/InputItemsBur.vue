<script setup>
import useburAxios from '@/composables/use-burAxios';
import { useBurStore } from '@/stores/burStore';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';
import DripEdgeComponent from './DripEdgeComponent.vue';

const { bMaters, systemHW, systemHM, systemSA } = useburAxios();
const storebur = useBurStore();
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const { burinput } = storeToRefs(storebur);
let isDialog = ref(false);
const roofType = ref('lowslope');

const agreement = onMounted(() => {
    // if (roofType.value === 'lowslope') {
    isDialog = true;
    // }
});

const props = defineProps({
    roofType: {
        type: ref,
        required: false,
        default: 'LowSlope'
    }
});
let slope = ref(null);
let roofArea = ref(roofList._object.roofList);

const dims = reactive({
    area: '',
    height: '',
    perimeter: ''
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
function setRoofInputs() {
    roofArea.value.forEach((item, index) => {
        console.log(item.dim);
        dims.area = item.dim;
    });
    dims.perimeter = dims.height * 6;
}
const dimensions = onMounted(() => {
    setRoofInputs();
});

function findSelected() {
    console.log(bMaters.value, systemHM.value, systemHW.value, systemSA.value);

    mat.value = bMaters.value;
}
watch(dimensions, setRoofInputs, findSelected, updateselection, updateselectSystem, syst, selSytem, type, () => {});
watchEffect(dimensions, setRoofInputs, sB, syst, selectedSystem, () => {});

function updateselection() {
    sB.value = Object.entries(selectedBur).map((obj) => {
        const value = obj[1];

        if (obj[1] === 'SBS Modified Hot-Mopped Applied Systems') {
            console.log('captured index1: ');
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
function selectSystem() {
    for (let i = 0; i < syst.value.length; i++) {
        let index = i;
        let value = syst.value[i];
        maps.value.push([index, value]);
    }
    console.log(maps.value);
}

function updateselectSystem() {
    selSytem.value = Object.entries(selectedSystem).map((obj) => {
        const val = obj[1];
        console.log(val);
    });
    console.log(selSytem.value);
}
</script>
<template>
    <div class="flex flex-col w-2/3 gap-4 bg-white shadow-lg shadow-cyan-800" style="margin-left: 50px">
        <agreements-dialog-lowslope v-if="isDialog !== true"></agreements-dialog-lowslope>

        <div class="card flex flex-col gap-6">
            <div class="w-128 gap-4" style="margin-left: 12px">
                <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" />
            </div>
            <div class="w-64 flex flex-col gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="slope" style="color: red">Slope *</label>

                <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" @change="valueEntered" />
            </div>

            <div class="w-64 flex flex-col flex-row gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="height" style="color: red">Height *</label>
                <InputText id="height" v-model="dims.height" type="text" placeholder="height" />
            </div>
            <div class="w-64 flex flex-col gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 20px">
                <label for="area">Area</label>
                <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
            </div>
            <div class="w-64 flex flex-col gap-2 mt-3 mb-3 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="height" style="color: red"> Roof Perimeter * (a') = .6 x h:</label>
                <InputText id="height" v-model="dims.perimeter" type="text" placeholder="perimeter" />
            </div>
            <DripEdgeComponent />
            <div class="card grid gap-5 grid-cols-1">
                <label for="material" style="color: red">Type of Low Slope BUR Material: *</label>
                <Select v-model="selectedBur" :options="mat" placeholder="make selection" @click="findSelected" @change="updateselection" />
                <label for="system" style="color: red">Type of Low Slope BUR System: *</label>
                <Select v-model="selectedSystem" :options="syst" placeholder="make selection" @click="selectSystem" @change="updateselectSystem" />
                <label for="fieldPresc1" style="color: red">Attach P(1') Prime using P(1) Field Prescriptive Basesheet: *</label>
                <Select v-model="selectedPrimeone" :options="primeone" placeholder="make selection" />
                <label for="fieldPresc3" style="color: red"> Attach P(2) Perimeter using P(3) Corner Prescriptive: *</label>
                <Select v-model="selectedPrimethree" :options="primethree" placeholder="make selection" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
