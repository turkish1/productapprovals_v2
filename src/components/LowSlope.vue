<script setup>
import useBurMat from '@/composables/use-burmaterials';
import useDripSize from '@/composables/use-dripedgesize';
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
let isDialog = ref(false);
onMounted(() => {
    isDialog = true;
});

const props = defineProps({
    roofType: {
        type: ref,
        required: false,
        default: 'LowSlope'
    }
});
let slope = ref(null);
// const roofType = ref('LowSlope');
const selectDripEdge = ref(null);
const selectDripEdgeSize = ref();
const bur = useBurMat();
let sizes = ref();
const size = ref([]);
const save = useDripSize();
const type = reactive(save.types.value);
const sze = ref([save.typeSize.value]);
let deriv1 = ref();
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
function checkValue() {
    let devArray = [];

    deriv1 = sze.value[0][0];
    for (let i = 0; i < sze.value[0].length; i++) {
        devArray.push(sze.value[0][i]);
    }

    sizes = devArray;
}
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

watch(checkValue, selectedBur, selectedSystem, selectDripEdge, findSelected, findSystem, () => {
    if (selectDripEdge.value !== null) {
        console.log('Enter if state');
        if (selectDripEdge.value === 'Galvanized Steel Metal ¹') {
            size = sizes[0];
            console.log(size);
        }
        if (selectDripEdge.value === 'Stainless Steel Metal ²') {
            size = sizes[1];
        }
        if (selectDripEdge.value === 'Aluminum Metal ³') {
            size = sizes[2];
        }
        if (selectDripEdge.value === 'Copper Metal ⁴') {
            size = sizes[3];
        }
    } else {
        console.log('The element not mounted yet');
    }
});
</script>
<template>
    <div class="flex flex-col md:flex-row gap-4" style="margin-left: 100px">
        <agreements-dialog-lowslope v-show="isDialog === true"></agreements-dialog-lowslope>
        <div class="container">
            <!-- <div class="md:w-3/4"> -->
            <div class="card flex flex-col gap-8">
                <div class="w-64 gap-4" style="margin-left: 22px">
                    <Select v-model="selectedDeck" :options="type" placeholder="Select a Deck Type" class="w-full md:w-56" />
                </div>
                <div class="w-64 gap-4" style="margin-left: 22px">
                    <label for="slope">Slope</label><label class="px-1" style="color: red">*</label>

                    <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" @change="valueEntered" />
                </div>

                <div class="w-64" style="margin-left: 22px">
                    <label for="height">Height</label><label class="px-1" style="color: red">*</label>
                    <InputText id="height" v-model="height" type="text" placeholder="height" />
                </div>
                <div class="w-64" style="margin-left: 22px">
                    <label for="area">Area</label>
                    <InputText id="area" v-model="area" type="text" placeholder="area" />
                </div>
                <div class="w-64" style="margin-left: 22px">
                    <label for="height"> Roof Perimeter (a') = .6 x h:</label><label class="px-1" style="color: red">*</label>
                    <InputText id="height" v-model="height" type="text" placeholder="height" />
                </div>

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
            <!-- </div> -->
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 1px;
    padding-top: 0.5px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 600px;
    /* min-width: 600px; */
    top: 10vh;
}
</style>
