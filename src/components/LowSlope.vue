<script setup>
import useBurMat from '@/composables/use-burmaterials';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { onMounted, onUpdated, reactive, ref, toRefs, watch, watchEffect } from 'vue';
import DripEdgeComponent from './DripEdgeComponent.vue';

const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
let isDialog = ref(false);
const roofType = ref('lowslope');
onUpdated(() => {
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
const bur = useBurMat();
let sizes = ref();
const size = ref([]);
const dims = reactive({
    area: '',
    height: '',
    perimeter: ''
});

const mat = ref();
let syst = reactive({});
const burMat = ref([bur.bMaters]);
const system = ref([bur.system]);
const selectedBur = ref(null);
const selectedSystem = ref(null);
const selectedPrimeone = ref(null);
const selectedPrimethree = ref(null);
let loadingselect = ref(false);
const primeone = ref();
const primethree = ref();
console.log(toRefs(burMat.value));

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
watch(dimensions, setRoofInputs, () => {});
watchEffect(dimensions, setRoofInputs, () => {});
function findSelected() {
    let material = [];
    let deconstruct = toRefs(burMat.value);
    material.push(deconstruct[0].value);

    mat.value = material[0];
}
function findSystem() {
    let sys = [];
    let sysDeconst = toRefs(system.value);
    sys.push(sysDeconst[0].value);

    if (selectedBur.value !== null) {
        mat.value.forEach((itembur, index) => {
            console.log(itembur, index);
            console.log(index);
            if (itembur === 'SBS Modified Hot-Mopped Applied Systems') {
                loadingselect = true;
                console.log('captured index1: ', index);
                syst = sys[0].systemHM;

                loadingselect = false;
            } else if (index === 2) {
                console.log('captured index2: ', index);
                syst = sys[0].systemHW;
            } else if (index === 3) {
                console.log('captured index3: ', index);
                syst = sys[0].systemSA;
            }
        });
    }
}
</script>
<template>
    <div class="card flex flex-col md:flex-row gap-4 mt-10 bg-white shadow-lg shadow-cyan-800" style="margin-left: 50px">
        <agreements-dialog-lowslope v-if="isDialog !== true"></agreements-dialog-lowslope>

        <div class="card flex flex-col gap-6">
            <div class="w-64 gap-4" style="margin-left: 12px">
                <Select v-model="selectedDeck" :options="type" placeholder="Select a Deck Type" class="w-full md:w-56" />
            </div>
            <div class="w-64 gap-4 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="slope">Slope</label><label class="px-1" style="color: red">*</label>

                <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" @change="valueEntered" />
            </div>

            <div class="w-64 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="height">Height</label><label class="px-1" style="color: red">*</label>
                <InputText id="height" v-model="dims.height" type="text" placeholder="height" />
            </div>
            <div class="w-64 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="area">Area</label>
                <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
            </div>
            <div class="w-64 ring ring-cyan-50 hover:ring-cyan-800" style="margin-left: 12px">
                <label for="height"> Roof Perimeter (a') = .6 x h:</label><label class="px-1" style="color: red">*</label>
                <InputText id="height" v-model="dims.perimeter" type="text" placeholder="perimeter" />
            </div>
            <DripEdgeComponent />
            <div class="card grid gap-5 grid-cols-1">
                <label for="material" style="color: red">Type of Low Slope BUR Material: *</label>
                <Select v-model="selectedBur" :options="mat" placeholder="make selection" @click="findSelected" />
                <label for="system" style="color: red">Type of Low Slope BUR System: *</label>
                <Select v-model="selectedSystem" :options="syst" placeholder="make selection" :loading="loadingSelect" @click="findSystem" />
                <label for="fieldPresc1" style="color: red">Attach P(1') Prime using P(1) Field Prescriptive Basesheet: *</label>
                <Select v-model="selectedPrimeone" :options="primeone" placeholder="make selection" />
                <label for="fieldPresc3" style="color: red"> Attach P(2) Perimeter using P(3) Corner Prescriptive: *</label>
                <Select v-model="selectedPrimethree" :options="primethree" placeholder="make selection" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
