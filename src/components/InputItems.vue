<script setup>
import useInputpoly from '@/composables/use-Inputpoly';
import useSystemf from '@/composables/use-Inputsystemf';
import { useRoofListStore } from '@/stores/roofList';
import { watchOnce } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import DripEdgeComponent from './DripEdgeComponent.vue';
// import { logicOr } from '@vueuse/math';
// import { whenever } from '@vueuse/core';
import useInputs from '@/composables/use-Inputs';
import useSlope from '@/composables/use-updateSlope';
import { usePolyStore } from '@/stores/polyStore';
// import { useSbsStore } from '@/stores/sbsStore';
import { useShingleStore } from '@/stores/shingleStore';
import Divider from 'primevue/divider';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();

const polyStore = usePolyStore();
const store = useShingleStore();
const usesystemfStore = useSystemf();
const { inputshingle } = storeToRefs(store);

const evaluating = ref(false);
const { polyinput } = storeToRefs(polyStore);

const shingles = reactive({
    manufacturer: '',
    material: '',
    description: ''
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
    system: [],
    maps: []
});

let datamounted = ref(inputshingle._object.inputshingle);

let polydatamt = ref(polyinput._object.polyinput);
let systemdatamt = ref(usesystemfStore.store.$state.systeminput);
let roofArea = ref(roofList._object.roofList);
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isShingleValid = ref(false);
let isSelectVisible1 = ref(false);
let isSelectVisible2 = ref(false);
let isSlopeValid = ref(true);
let slope = ref(null);
let data = ref();
let datasystemf = ref();
let datasbs = ref();
let datapoly = ref();
let udlInput = ref(null);
let saInput = ref(null);
let noaInput = ref(null);

const dims = reactive({
    area: '',
    height: ''
});

const selfAdData = ref([]);
//  This goes in the systemtype ref({ name: array })
const array = ref([]);
const selectedsystemf = ref();
const systemtype = ref(selfadhered.system);
const descriptionSAdata = ref([]);
let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedSlopehigh = ref();
const selectedSlopelow = ref();
const selectedDeck = ref();
const { input, takeValue } = useInputs();
const desc = ref(false);
const { inputsystem, takef } = useSystemf();
const { inp, takp } = useInputpoly();
const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
const descSystem = ref([]);
const whatChanged = computed(() => {
    checkInput();
    descriptionSA();
    checkInputPoly();
    systemfunc();
});

function grabInput() {
    data.value = noaInput.value;
    datasbs.value = saInput.value;
    datapoly.value = udlInput.value;
    datasystemf.value = saInput.value;

    if (noaInput.value !== null) {
        // 18061905

        takeValue(data.value);
    }
    if (saInput.value !== null) {
        //  23101807, 23091404

        takef(datasystemf.value);
    }
    if (udlInput.value !== null) {
        //  17040522

        takp(datapoly.value);
    }
}

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

        console.log(selfadhered.Description_F1);
        if (selfadhered.samanufacturer === 'Tarco Specialty Products' || selfadhered.samanufacturer === 'Polyglass USA') {
            //    23111506
            selfadhered.maps = item.systemData.maps;
            for (const [key, value] of Object.entries(selfadhered.maps)) {
                array.value.push(`${key}`);
                descriptionSAdata.value.push(`${value}`);
            }
        }
    });
}
function systemfunc() {
    if (selfAdData.length !== null) {
        selfadhered.system = array.value;
        selfadhered.sadescription = '';
        if (selfadhered.system[0] === 'F1') {
            descriptionSA(selfadhered.Description_F1);
            console.log('sent');
        } else if (selfadhered.system[1] === 'F2') {
            selfadhered.sadescription = selfadhered.Description_F2;
            descriptionSA(selfadhered.Description_F2);
        }
        // else if (selfadhered.system[2] === 'F3') {
        //     selfadhered.sadescription = selfadhered.Description_F3;
        //     // descriptionSA(descriptionSAdata.value[1]);
        // }
    }
}

const sendAsync = computed(() => {
    descriptionSA();
});
// const sendAsync = computedAsync(
//     async () => {
//         if (selfadhered.system[0] === 'F1') {
//             return descriptionSA(descriptionSAdata.value[0]);
//         } else if (selfadhered.system[1] === 'F2') {
//             descriptionSA(descriptionSAdata.value[1]);
//         }
//     },
//     null,
//     { lazy: true, evaluating }
// );
function descriptionSA(value) {
    // if (selfadhered.system.length === 0) {
    //     selfadhered.sadescription = '';
    // } else
    selfadhered.sadescription = value;
    console.log(value);
}
function checkInput() {
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            console.log(item.shingleData, index);
            shingles.manufacturer = item.shingleData.applicant;
            shingles.material = item.shingleData.material;
            shingles.description = item.shingleData.description;
        });
    }
}

function setRoofInputs() {
    roofArea.value.forEach((item, index) => {
        dims.area = item.dim1;
    });
}
const dimensions = onMounted(() => {
    setRoofInputs();
});

watchOnce(checkInputSystem, () => {
    // triggers only once
    console.log('checkInputSystem changed!');
});
watchEffect(slopetypeless, slopetypemore, udlInput, getIndexs, selectedSlopelow, selectedSlopehigh, setRoofInputs, grabInput, () => {});

watch(
    descriptionSA,
    valueEntered,
    noaInput,
    whatChanged,
    udlInput,
    roofArea,
    dimensions,
    grabInput,
    useInputs,

    inputshingle,
    inputsystem,
    datamounted,

    datasbs,
    datapoly,

    checkInputPoly,
    checkInput,
    setRoofInputs,

    () => {}
);

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
</script>
<template>
    <div class="flex flex-col w-full gap-4 bg-white shadow-lg shadow-cyan-800" style="margin-left: 5px">
        <div class="w-64 gap-2 mt-3 space-y-6" style="margin-left: 20px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" />
        </div>

        <div class="w-64 flex flex-col gap-2" style="margin-left: 20px">
            <label for="slope" style="color: red">Slope *</label>

            <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" @input="valueEntered" />
            <p v-if="!isSlopeValid" style="color: red">Enter Valid Slope</p>
        </div>
        <div class="w-64 flex flex-col gap-2" style="margin-left: 20px">
            <label for="height" style="color: red">Height *</label>
            <!-- <label class="px-1" style="color: red">*</label> -->
            <InputText id="height" v-model="dims.height" type="text" placeholder="height" :invalid="height === null" />
        </div>
        <div class="w-64 flex flex-col gap-2 mt-3 mb-8" style="margin-left: 20px">
            <label for="area">Area</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>
        <DripEdgeComponent />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="udlInput">Fastened UDL NOA Number</label>
                <InputText id="udlInput" v-model="udlInput" placeholder="17040522" @input="grabInput" @change="checkInputPoly" />
            </div>
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="saInput">S/A Membrane NOA Number</label>
                <InputText id="saInput" v-model="saInput" placeholder="23101807" @input="grabInput" />
            </div>
        </div>
        <div v-show="isShingleValid" class="w-96" style="margin-left: 2px">
            <div class="w-64 gap-2 mt-1 space-y-1 mb-2" style="margin-left: 20px">
                <label for="shinglenoa">Shingle Noa</label>
                <InputText id="shinglenoa" v-model="noaInput" placeholder="18061905" @input="grabInput" @change="checkInput" />
            </div>
        </div>
        <div v-show="isSelectVisible2" class="card grid gap-2 grid-cols-1">
            <label style="color: red">Select Underlayment (S/A) *</label>
            <Select v-model="selectedSlopehigh" :options="slopetypemore" placeholder="make selection" @change="getIndexs" />
        </div>

        <div v-show="isSelectVisible1" class="card grid gap-2 grid-cols-1">
            <label style="color: red">Select Underlayment (UDL) *</label>
            <Select v-model="selectedSlopelow" :options="slopetypeless" placeholder="make selection" @change="getIndexs" />
        </div>
    </div>

    <Divider />
    <Divider />

    <div class="card md:w-full gap-4 mt-10 bg-white shadow-lg shadow-cyan-800" style="margin-left: 5px">
        <div class="flex flex-row space-x-20 space-y-12" style="margin-left: 2px">
            <div v-show="isUDLNOAValid" class="flex flex-row space-x-20">
                <div class="w-96 flex flex-col gap-2">
                    <label for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="underlayment.umanufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="material">(UDL) Material</label>
                    <InputText id="material" v-model="underlayment.umaterial" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="description">(UDL) Description</label>
                    <InputText id="description" v-model="underlayment.udescription" />
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-12 space-y-6" style="margin-left: 2px">
            <div v-show="isSAValid" class="flex flex-row space-x-20">
                <div class="flex flex-col gap-2">
                    <label for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="selfadhered.samanufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="selfadhered.samaterial" />
                </div>

                <div class="flex flex-col gap-2">
                    <label style="color: red">Select System F *</label>
                    <Select v-model="selectedsystemf" :options="selfadhered.system" placeholder="" @click="systemfunc" />
                </div>
                <div class="w-128 flex flex-col gap-2">
                    <label for="sadescription">S/A Description</label>
                    <InputText id="sadescription" v-model="selfadhered.sadescription" @change="descriptionSA" />
                </div>

                <!-- <div class="flex shrink flex-col gap-2">
                    <label for="expiredate_sa">Expiration Date:</label>
                    <InputText id="expiredate_sa" v-model="expiredate_sa" />
                </div> -->
            </div>
        </div>

        <div class="flex flex-row mt-8 space-x-20" style="margin-left: 1px">
            <!-- flex flex-col gap-2 -->
            <div class="flex flex-col gap-2">
                <label for="manufacturer">Applicant</label>
                <InputText id="manufacturer" v-model="shingles.manufacturer" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="material"> Material</label>
                <InputText id="material" v-model="shingles.material" />
            </div>
            <div class="w-128 flex flex-col gap-2">
                <label for="description">Description</label>
                <InputText id="description" v-model="shingles.description" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>
