<script setup>
import DripEdgeComponent from '@/components/DripEdgeComponent.vue';
import { useburValidation } from '@/composables/Validation/use-burHeight';
import { useburSlopeValidation } from '@/composables/Validation/use-burSlope';
import { useBurStore } from '@/stores/burStore';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';

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
// const { burpdfinput, addpdfData } = storeToRefs(burpdfStore);

const dims = reactive({
    area: '',
    per: '',
    height: '',
    slope: '',
    deckType: ''
});
const type = ref([{ name: 'Select Deck Type' }, { name: '5/8" Plywood ' }, { name: '3/4" Plywood ' }, { name: '1" x 6" T & G ' }, { name: '1" x 8" T & G' }, { name: 'Existing 1/2" Plywood ' }]);
const whatChanged = computed(() => {
    setRoofInputs();

    validateHeight();
    validateRoofSlope();
});

const selectedDeck = ref();

let slopeModel = ref('');
let heightModel = ref('');

function setRoofInputs() {
    console.log(slopeModel, heightModel);
    console.log(burinput, addData);
    dims.per = (dims.height * factor.value).toFixed(2);
}

const dt = ref('');
function getdeckType(event) {
    if (selectedDeck._value.name === event.value.name) {
        dt.value = event.value.name;
        console.log(dt.value);
        dims.deckType = dt.value;
        console.log(dt.value, dims.deckType);
    }
}
onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Low Slope') {
            dims.area = item.dim2;
        }
    });
});

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

    burpdfStore.addpdfData(dims);
}

watch(setRoofInputs, validateRoofSlope, validateHeight, dims.per, type, () => {});
watchEffect(setRoofInputs, whatChanged, validateRoofSlope, () => {});
</script>
<template>
    <!-- <div id="bur" class="flex flex-col gap-2" style="margin-left: 1px"> -->
    <div class="card flex flex-col gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px">
        <label for="title" style="color: whitesmoke; margin-left: 450px">Low Slope Roof</label>

        <div class="w-128 gap-2" style="margin-left: 12px">
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
    <!-- </div> -->
</template>
<style scoped></style>
