<script setup>
import useInputs from '@/composables/use-Inputs';
import useSystemf from '@/composables/use-Inputsystemf';
import useSlope from '@/composables/use-updateSlope';
import { useShingleHghtValidation } from '@/composables/Validation/use-shHeight';
import { useShingleValidation } from '@/composables/Validation/use-shSlope';
import { usePolyStore } from '@/stores/polyStore';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { storeToRefs } from 'pinia';
import DripEdgeComponent from './DripEdgeComponent.vue';

import Divider from 'primevue/divider';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import AutoComplete from './roofSystems/AutoComplete.vue';
import AutoCompletePoly from './roofSystems/AutoCompletePoly.vue';
import AutoCompleteSA from './roofSystems/AutoCompleteSA.vue';

const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();

const polyStore = usePolyStore();
const store = useShingleStore();
const usesystemfStore = useSystemf();
const { inputshingle } = storeToRefs(store);
const { systeminput } = storeToRefs(usesystemfStore);
// const evaluating = ref(false);
const { polyinput } = storeToRefs(polyStore);

const shingles = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    description: '',
    slope: 0,
    height: 0,
    dripEdgeMaterial: [],
    dripEdgeSize: [],
    deckType: '',
    expiration_date: '',
    prescriptiveSelection: ''
});

const underlayment = reactive({
    umanufacturer: '',
    umaterial: '',
    udescription: ''
});

const selfadhered = reactive({
    samanufacturer: '',
    samaterial: '',
    sadescription: '',
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
    system: [],
    maps: [],
    arrSystem: [],
    pdfSystemValue: ''
});

let datamounted = ref(inputshingle._object.inputshingle);

let polydatamt = ref(polyinput._object.polyinput);
let systemdatamt = ref(usesystemfStore.store.$state.systeminput);
// let roofArea = ref(roofList._object.roofList);
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isShingleValid = ref(false);
let isSelectVisible1 = ref(false);
let isSelectVisible2 = ref(false);
let isSlopeValid = ref(true);
let slope = ref(null);
let data = ref();
// let datasystemf = ref();
let datasbs = ref();
let datapoly = ref();
let udlInput = ref(null);
// let saInput = ref(null);
let noaInput = ref(null);

const dims = reactive({
    area: '',
    height: ''
});
const dt = ref('');
function getdeckType(event) {
    console.log(selectedDeck._value.name, event.value.name);
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        console.log(dt.value);
    }
}

const selectedsystemf = ref(null);
const systemtype = ref(selfadhered.system);

let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedSlopehigh = ref();
const selectedSlopelow = ref();
const selectedDeck = ref();

const desc = ref(false);
const { inputsystem } = useSystemf();
// const { inp, takp } = useInputpoly();

const type = ref([{ name: ' - Select Deck Type - ' }, { name: ' 5/8" Plywood ' }, { name: ' 3/4" Plywood ' }, { name: ' 1" x 6" T & G ' }, { name: ' 1" x 8" T & G ' }, { name: ' Existing 1/2" Plywood ' }]);

const whatChanged = computed(() => {
    checkInput();
    clearSelected();
    validateRoofSlope();
    addCheckmarks();

    onKeydown();
    validateHeight();
    checkInputPoly();
});

function checkInputPoly() {
    if (polydatamt.value.length !== null) {
        polydatamt.value.forEach((item, index) => {
            underlayment.umanufacturer = item.polyData.applicant;
            underlayment.umaterial = item.polyData.material;
            underlayment.udescription = item.polyData.description;
        });
    }
}
function checkInputSystem() {
    systemdatamt.value.forEach((item, index) => {
        selfadhered.samanufacturer = item.systemData.manufacturer;
        selfadhered.samaterial = item.systemData.material;
        selfadhered.Description_F1 = item.systemData.Description_F1;
        selfadhered.Description_F2 = item.systemData.Description_F2;
        selfadhered.Description_F3 = item.systemData.Description_F3;
        selfadhered.Description_F4 = item.systemData.Description_F4;
        selfadhered.Description_F5 = item.systemData.Description_F5;
        selfadhered.Description_F6 = item.systemData.Description_F6;
        selfadhered.Description_F7 = item.systemData.Description_F7;
        selfadhered.Description_F8 = item.systemData.Description_F8;
        selfadhered.Description_F9 = item.systemData.Description_F9;
        selfadhered.Description_F10 = item.systemData.Description_F10;
        selfadhered.Description_F11 = item.systemData.Description_F11;
        selfadhered.arrSystem = item.systemData.arraySystem;
        selfadhered.system = item.systemData.system;
    });
}

function updateselectSystem(selectedsystemf) {
    console.log(typeof selectedsystemf.value);
    console.log(usesystemfStore.store.$state.systeminput);
    if (selectedsystemf.value === 'F1') {
        selfadhered.sadescription = selfadhered.Description_F1;
    }
    if (selectedsystemf.value === 'F2') {
        selfadhered.sadescription = selfadhered.Description_F2;
    }

    if (selectedsystemf.value === 'F3') {
        selfadhered.sadescription = selfadhered.Description_F3;
    }
    if (selectedsystemf.value === 'F4' || selectedsystemf.value === 'E4') {
        selfadhered.sadescription = selfadhered.Description_F4;
    }
    if (selectedsystemf.value === 'F5' || selectedsystemf.value === 'E5') {
        selfadhered.sadescription = selfadhered.Description_F5;
    }
    if (selectedsystemf.value === 'F6' || selectedsystemf.value === 'E6') {
        selfadhered.sadescription = selfadhered.Description_F6;
    }
    if (selectedsystemf.value === 'F7') {
        selfadhered.sadescription = selfadhered.Description_F7;
    }
    if (selectedsystemf.value === 'F8') {
        selfadhered.sadescription = selfadhered.Description_F8;
    }
    if (selectedsystemf.value === 'F9') {
        selfadhered.sadescription = selfadhered.Description_F9;
    }
    if (selectedsystemf.value === 'F10') {
        selfadhered.sadescription = selfadhered.Description_F10;
    }
    if (selectedsystemf.value === 'F11') {
        selfadhered.sadescription = selfadhered.Description_F11;
    }
    console.log(usesystemfStore.store.$state.systeminput.pdfSystemValue, selectedsystemf.value);
    usesystemfStore.store.$state.systeminput.pdfSystemValue = selectedsystemf.value;

    // });
}

function checkInput() {
    console.log(datamounted.value);
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            shingles.noa = item.shingleData.noa;
            shingles.manufacturer = item.shingleData.applicant;
            shingles.material = item.shingleData.material;
            shingles.description = item.shingleData.description;
            shingles.expiration_date = item.shingleData.expiration_date;
            inputshingle.value[0].shingleData.slope = slope.value;
            inputshingle.value[0].shingleData.height = dims.height;
            inputshingle.value[0].shingleData.deckType = dt.value;
            inputshingle.value[0].shingleData.prescriptiveSelection = selectedSlopelow.value;
        });
    }
}
onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Asphalt Shingle') {
            console.log(item.dim1);
            dims.area = item.dim1;
        }
    });
});

const dimensions = onMounted(() => {
    // setRoofInputs();
});
watch(slope, (newVal, oldVal) => {
    console.log('Slope change from', oldVal, 'to', typeof newVal);
    validateInput(newVal);
});
let isvalueValid = ref(false);
const { errorshingleMessage, validateShingleSlope } = useShingleValidation({
    min: 2,
    max: 12,
    required: true
});

const { errorshHeightMessage, validateShingleHeight } = useShingleHghtValidation({
    min: 10,
    max: 30,
    required: true
});

function validateRoofSlope() {
    validateInput();
    addCheckmarks();
}
const validateInput = () => {
    validateShingleSlope(slope.value);
    console.log(errorshingleMessage.value);

    // shingleData.slope = slope.value;
};

const validateshHeightInput = () => {
    validateShingleHeight(dims.height);
    console.log(errorshHeightMessage.value);
};

function validateHeight() {
    validateshHeightInput();
    addCheckmarks();

    // getDims(dims.height, slope.value);
}
function addCheckmarks() {
    if (errorshingleMessage.value === null || errorshHeightMessage.value === null) {
        isvalueValid = true;
        console.log('Entered checkmarks');
    }
}
function getIndexs() {
    console.log(selectedSlopelow);

    if (selectedSlopelow.value === '2 Plies ASTM # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c' || selectedSlopehigh.value === '1 Ply ASTM # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c') {
        isUDLNOAValid = false;
        isSAValid = false;
        isShingleValid = true;
    }
    if (selectedSlopelow.value === '2 Plies Polypropylene with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c' || selectedSlopehigh.value === '1 Ply Polypropylene with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c') {
        isUDLNOAValid = true;
        isSAValid = false;
        isShingleValid = true;
    }

    if (selectedSlopelow.value === '(S/A) membrane adhered directly to a wood deck, per the NOA system F' || selectedSlopehigh.value === '(S/A) membrane adhered directly to a wood deck, per the NOA system F') {
        isUDLNOAValid = false;
        isSAValid = true;
        isShingleValid = true;
    }

    if (selectedSlopelow._rawValue === null) {
        console.log('Not Mounted');
    }
}

function valueEntered() {
    if (slope.value) {
        let slopeNumber = Number(slope.value);
        console.log(slopeNumber);

        if (slopeNumber < 2) {
            isSlopeValid = false;
        }
        if (slopeNumber >= 2 && slopeNumber <= 4) {
            isSlopeValid = true;
            isSlopeLessFour.value = true;
            isSelectVisible1 = true;
            isSelectVisible2 = false;
        }
        if (slopeNumber > 4 && slopeNumber <= 12) {
            isSlopeValid = true;
            isSlopeMoreFour.value = true;
            isSelectVisible2 = true;
            isSelectVisible1 = false;
        }

        if (slope.value === '') {
            isSlopeValid.value = false;
            isSlopeLessFour.value = false;
            isSlopeMoreFour.value = false;
        }
    } else {
        console.log('Not Mounted');
    }
}

watchEffect(selectedsystemf, errorshHeightMessage, errorshingleMessage, whatChanged, slopetypeless, slopetypemore, udlInput, getIndexs, selectedSlopelow, selectedSlopehigh, () => {});

watch(
    checkInputSystem,

    updateselectSystem,
    valueEntered,
    noaInput,
    whatChanged,
    udlInput,

    dimensions,

    useInputs,

    inputshingle,
    inputsystem,
    datamounted,
    data,
    datasbs,
    datapoly,

    checkInputPoly,
    checkInput,

    () => {}
);
</script>
<template>
    <div id="shingle" class="flex flex-col w-full gap-1 shadow-lg shadow-cyan-800" style="margin-left: 5px">
        <label for="slope" style="color: black; margin-left: 650px">Shingle Roof</label>

        <div class="w-64 gap-1" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full mt-5 md:w-56" @change="getdeckType" />
            <!-- <Button plain text class="min-w-1 min-h-0"><i class="pi pi-refresh" style="font-size: 1.3rem; color: black; margin-left: 220px" @click="store.$reset()"></i></Button> -->
        </div>

        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="slope" style="color: red">Roof Slope *</label><i class="pi pi-check" v-show="isvalueValid" style="margin-left: 10px; color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;

            <InputText id="slope" v-model.number="slope" type="text" placeholder="slope" :invalid="slope === null" @input="valueEntered" @change="validateRoofSlope" />
            <Message v-if="errorshingleMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorshingleMessage }}</Message>
        </div>

        <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
            <label for="height" style="color: red">Height *</label><i class="pi pi-check" v-show="isvalueValid" style="margin-left: 10px; color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-model.number="dims.height" type="text" placeholder="height" :invalid="height === null" @change="validateHeight" />
            <Message v-if="errorshHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorshHeightMessage }}</Message>
        </div>

        <div class="w-64 flex flex-col gap-2 mt-3 mb-8" style="margin-left: 20px">
            <label style="color: whitesmoke" for="area">Area</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>

        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <AutoCompletePoly @keydown.tab.exact.stop="checkInputPoly"></AutoCompletePoly>
            </div>
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <AutoCompleteSA @keydown.tab.exact.stop="checkInputSystem" />
            </div>
        </div>
        <div v-show="isShingleValid" class="w-96" style="margin-left: 2px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <AutoComplete @click.stop.prevent="checkInput" />
            </div>
        </div>
        <!-- <Button plain text class="min-w-1 min-h-0" @click="clearSelected"> <span style="font-size: 1.3rem; color: black; margin-left: 100px; margin-top: 90px" class="pi pi-refresh"></span></Button> -->

        <div v-show="isSelectVisible2" class="card grid gap-2 grid-cols-1">
            <label style="color: red">Select Underlayment (S/A) *</label>
            <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
        </div>

        <div v-show="isSelectVisible1" class="card grid gap-2 grid-cols-1">
            <label style="color: red">Select Underlayment (UDL) *</label>
            <Select v-model="selectedSlopelow" :options="slopetypeless" placeholder="make selection" @change="getIndexs" />
        </div>
        <DripEdgeComponent />
    </div>

    <Divider />
    <Divider />
    <div v-animateonscroll="{ enterClass: 'animate-zoomin', leaveClass: 'animate-fadeout' }" class="flex shadow-lg justify-center items-center animate-duration-1000">
        <div class="card gap-2 mt-2 shadow-lg shadow-cyan-800" style="margin-left: 5px">
            <div class="flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
                <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                    <div class="w-96 flex flex-col gap-2">
                        <label style="color: whitesmoke" for="manufacturer">(UDL) NOA Applicant</label>
                        <InputText id="manufacturer" v-model="underlayment.umanufacturer" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label style="color: whitesmoke" for="material">(UDL) Material</label>
                        <InputText id="material" v-model="underlayment.umaterial" />
                    </div>
                    <div class="w-128 flex flex-col gap-2">
                        <label style="color: whitesmoke" for="description">(UDL) Description</label>
                        <InputText id="description" v-model="underlayment.udescription" />
                    </div>
                </div>
            </div>

            <div v-show="isSAValid" class="card gap-2 mt-5 space-x-1 space-y-6" style="margin-left: 1px">
                <div class="flex flex-row space-x-20">
                    <div class="flex flex-col gap-2">
                        <label style="color: whitesmoke" for="saapplicant">S/A Applicant</label>
                        <InputText id="saapplicant" v-model="selfadhered.samanufacturer" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label style="color: whitesmoke" for="samaterial">S/A Material Type</label>
                        <InputText id="saaterial" v-model="selfadhered.samaterial" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label style="color: red">Select System F *</label>
                        <Select v-model="selectedsystemf" :options="selfadhered.system" placeholder="" @click="checkInputSystem" @change="updateselectSystem" />
                    </div>
                </div>
                <div class="w-196 flex flex-col gap-2" style="margin-left: 1px">
                    <label style="color: whitesmoke" for="sadescription">S/A Description</label>
                    <InputText id="sadescription" v-model="selfadhered.sadescription" />
                </div>
            </div>
            <div class="max-w-screen-xl flex flex-row mt-8 space-x-10">
                <div class="w-128 flex flex-col gap-2">
                    <label style="color: whitesmoke" for="manufacturer">Applicant</label>
                    <InputText id="manufacturer" v-model="shingles.manufacturer" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label style="color: whitesmoke" for="material"> Material</label>
                    <InputText id="material" v-model="shingles.material" />
                </div>
            </div>
            <div class="w-196 flex flex-col gap-2">
                <label style="color: whitesmoke" for="description">Description</label>
                <InputText id="description" v-model="shingles.description" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
