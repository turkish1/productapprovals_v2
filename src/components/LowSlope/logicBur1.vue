<script setup>
import DripEdLowslope from '@/components/DripEdgeChildren/DripEdLowslope.vue';
import usePostBurLambda from '@/composables/Postdata/usePostBurLambda';
import { useburValidation } from '@/composables/Validation/use-burHeight';
import { useburSlopeValidation } from '@/composables/Validation/use-burSlope';
import { useBurStore } from '@/stores/burStore';
import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch } from 'vue';

const { postBur } = usePostBurLambda();
const dripStore = usedripedgeStore();
const storeroof = useRoofListStore();
const { roofList } = storeToRefs(storeroof);
let isvalueValid = ref(false);
const factor = ref(0.6);
const dt = ref('');
const lowslopeStore = useBurStore();
const isHeightValid = ref(false);

const isSlopeDisabled = ref(true); // start disabled
const isHeightDisabled = ref(true);
const isSlopeValid = ref(false);

const props = defineProps({
    roofType: {
        type: ref,
        required: false,
        default: 'LowSlope'
    }
});

const dims = reactive({
    area: '',
    per: '',
    height: '',
    slope: '',
    deckType: ''
});
const type = ref([{ name: 'Select Deck Type' }, { name: '5/8" Plywood ' }, { name: '3/4" Plywood ' }, { name: '1" x 6" T & G ' }, { name: '1" x 8" T & G' }, { name: 'Existing 1/2" Plywood ' }]);

const normalizeEvtVal = (e) => (e && typeof e === 'object' && 'value' in e ? e.value : e);

const selectedDeck = ref();
function getdeckType(evt) {
    const v = normalizeEvtVal(evt);
    const sel = v?.name ?? selectedDeck.value?.name;
    if (!sel || sel === 'Select Deck Type') return;
    dt.value = sel;
    console.log(dt.value);
    // Enable slope only; height stays disabled until slope validates
    isSlopeDisabled.value = false;
    isHeightDisabled.value = true;
    dims.deckType = dt.value;
    console.log(dims);
}

// when slope changes: validate it and enable/disable height accordingly
watch(
    () => dims.slope,
    (s) => {
        const n = Number(s);
        validateburSlope(n);
        const ok = Number.isFinite(n) && n >= 0.128 && n <= 1.5;
        isSlopeValid.value = ok;
        isHeightDisabled.value = !ok;
        if (!ok) {
            // clear dependent fields if slope is invalid
            dims.height = '';
            isHeightValid.value = false;
            dims.per = '';
        }
    }
);
// when height changes: validate height and compute perimeter
watch(
    () => dims.height,
    (h) => {
        const n = Number(h);
        validateburHeight(n);
        isHeightValid.value = Number.isFinite(n) && n >= 10 && n <= 30;
        dims.per = Number.isFinite(n) ? (n * factor.value).toFixed(2) : '';
    }
);

// (optional) show the overall “check” only when both are valid
// const bothValid = computed(() => isSlopeValid.value && isHeightValid.value);

onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Low Slope') {
            dims.area = item.dim2;
        }
    });
});

// validators (names you already return from your composables)
const { errorburMessage, validateburSlope } = useburSlopeValidation({
    min: 0.128,
    max: 1.5,
    required: true
});
const { errorburHeightMessage, validateburHeight } = useburValidation({
    min: 10,
    max: 30,
    required: true
});

watch(
    () => dims.slope,
    (s) => {
        validateburSlope(s);
        // isDisabled.value = Number(s) >= 2 ? false : true;
        addCheckmarks();
    }
);
watch(
    () => dims.height,
    (h) => {
        validateburHeight(h);
        isHeightValid.value = true;
        if (dims.per) {
            burStaging();
        }
        addCheckmarks();
    }
);
// Value checks
function addCheckmarks() {
    isvalueValid.value = isHeightValid.value;
}
function burStaging() {
    console.log(dims);
    postBur(dims);
}
</script>
<template>
    <div class="shadow-lg shadow-cyan-800 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ml-12" style="margin-left: 50px; margin-top: 25px">
        <div class="w-128 mt-6 gap-2" style="margin-left: 20px; margin-top: 50px">
            <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" @change="getdeckType" />
        </div>

        <div class="w-64 mt-3 space-y-1" style="margin-left: 20px">
            <label for="slope" style="color: #122620">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isSlopeValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" placeholder="slope" v-model.number="dims.slope" :disabled="isSlopeDisabled" @change="validateRoofSlope" />
            <Message v-if="errorburMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">
                {{ errorburMessage }}
            </Message>
        </div>
        <div class="w-64 mt-3 space-y-1" style="margin-left: 20px">
            <label style="color: #122620" for="area">Area of Lowslope</label>
            <InputText id="area" v-model="dims.area" type="text" placeholder="area" />
        </div>
        <div class="w-64 mt-3 space-y-1" style="margin-left: 20px">
            <label for="height" style="color: #122620">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isHeightValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
            <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="dims.height" type="text" placeholder="height" :disabled="isHeightDisabled" />
            <!-- Height error -->
            <Message v-if="errorburHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">
                {{ errorburHeightMessage }}
            </Message>
        </div>
        <div class="w-64 mt-6 space-y-1" style="margin-left: 20px">
            <label for="per" style="color: #122620">Roof Perimeter * (a') = .6 x h:</label>
            <InputText id="per" :value="dims.per" type="text" placeholder="per" readonly />
        </div>

        <DripEdLowslope />
    </div>
</template>
<style scoped></style>
