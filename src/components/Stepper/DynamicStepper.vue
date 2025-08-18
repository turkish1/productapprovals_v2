<template>
    <div class="layout-main-container-stepper">
        <div class="card-system">
            <div class="stepper">
                <!-- Iterate over filtered steps to build the stepper UI -->
                <div v-for="(step, index) in filteredSteps" :key="index" class="step-wrapper" :class="{ active: index === currentStepIndex }">
                    <div :class="{ highlight: index === currentStepIndex }">
                        <!--  class="step" -->
                        <span>{{ step.label }} </span>
                    </div>
                    <!-- Separator line (not after the last step) -->
                    <div v-if="index < filteredSteps.length - 1" class="line"></div>
                </div>
            </div>

            <!-- Step Content -->
            <div v-if="!isLoading" class="card-system">
                <component :is="activeComponent" />
            </div>
            <VueSpinnerBall v-else color="#784EA7" size="100px" style="margin-top: 300px; margin-left: 850px" />

            <div class="stepper-controls">
                <Button label="Back" severity="contrast" raised @click="prevStep" :disabled="isFirstStep"></Button>
                <BUtton label="Next" severity="contrast" raised @click="nextStep" :disabled="isLastStep"></BUtton>
            </div>

            <!-- <note>Loading: {{ isLoading.toString() }}</note>
            <note>Finished: {{ isFinished.toString() }}</note>
            <note>Aborted: {{ isAborted.toString() }}</note> -->
        </div>
    </div>
</template>

<script setup>
import { useScreenSize } from '@/composables/ScreenSize/useScreenSize.js';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted, useToNumber } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue';

// Composables / Stores
const permitStore = usePermitappStore();
const store = useRoofListStore();
const { roofList } = storeToRefs(store);
const sessions = ref([]); // [{ session_id, label, completed }]
const active = ref(0);
// Reactive State

onMounted(() => {
    const { width, isUltraWide, height, isLongScreen } = useScreenSize();
    console.log(width, isUltraWide);
    return { width, isUltraWide, height, isLongScreen };
});
const isLoading = ref(false);

// Booleans that decide which steps are valid / included
const isValidShingle = ref(false);
const isValidBur = ref(false);
const isValidTile = ref(false);
const isValidMechanical = ref(false);
const isValidShinglePDF = ref(false);
const isValidBurPDF = ref(false);
const isValidTilePDF = ref(false);
const isValidMechanicalPDF = ref(false);
const isValidSummary = ref(true);
const isValidPayment = ref(true);
// const isValidDownload = ref(true);
// const isValidGeneralpage = ref(true);
// Permitapp / miami beach logic
const MB = ref(permitStore.$state.permitapp);
const mbVal = ref(2);
const isMiamiBeachValid = ref(false);

// Convert a possible MB value
const convertMB = MB.value.length ? useToNumber(MB.value[0].miamibeach) : ref(null);

// Step Components (lazy-loaded)
const Step1Shingle = defineAsyncComponent(() => import('@/components/Shingles.vue'));
const Step2LowSlope = defineAsyncComponent(() => import('@/components/LowSlope.vue'));
const Step3AdhesiveTile = defineAsyncComponent(() => import('@/components/Tile.vue'));
const Step4MechanicalTile = defineAsyncComponent(() => import('@/components/TileNoa/MechanicalTileNoa/TileMech.vue'));
const Step5Summary = defineAsyncComponent(() => import('@/components/Summary/Summarys.vue'));

const Step6Payment = defineAsyncComponent(() => import('@/components/Summary/Paymentgateway.vue'));
// const Step6Payment = defineAsyncComponent(() => import('@/components/Summary/NewStripe.vue'));

// const Step7Download = defineAsyncComponent(() => import('@/components/Summary/Payment.vue'));

const steps = ref([
    { label: '', component: null }, // Shingles
    { label: '', component: null }, // Low Slope
    { label: '', component: null }, // Adhesive Tile
    { label: '', component: null }, // Mechanical Tile
    { label: '', component: null }, // Summary
    { label: '', component: null } // Payment
    // { label: '', component: null } // Start again
]);

// Predefine actual components to map them easily
const availableComponents = [
    Step1Shingle, // Shingles
    Step2LowSlope, // Low Slope
    Step3AdhesiveTile, // Adhesive Tile
    Step4MechanicalTile, // Step4TMechilePDF,
    Step5Summary,
    Step6Payment
    // Step7Download
];

const stepLabels = ['Shingles', 'Low Slope', 'Adhesive Tile', 'Mechanical Tile', 'Summary', 'PaymentPage'];

function newSessionId() {
    return crypto.randomUUID(); // widely supported; drop‑in for uuid libs
}

/* ---------- optional persistence ---------- */
if (typeof window !== 'undefined') {
    const key = 'stepper-sessions';

    // restore on reload
    const cached = sessionStorage.getItem(key);
    if (cached) sessions.value = JSON.parse(cached);

    // save every change
    watch(sessions, (v) => sessionStorage.setItem(key, JSON.stringify(v)), { deep: true });
}
// Check if we have a valid Miami Beach scenario
tryOnMounted(() => {
    if (convertMB.value && convertMB.value === mbVal.value) {
        console.log('Miami Beach check passed.');
        isMiamiBeachValid.value = true;
        // Possibly set isValidShingle if MB logic says so:
        // isValidShingle.value = true
    }
});

function markComplete(index = active.value) {
    sessions.value[index].completed = true;
    console.log(active.value);
}

const numberLabels = ref([]);
// Gather booleans from roofList
function checkState() {
    // Evaluate each roof item & set booleans
    roofList.value.forEach((item) => {
        if (item.item === 'Asphalt Shingle') {
            isValidShingle.value = true;
            isValidShinglePDF.value = true;
        }
        if (item.item === 'Low Slope') {
            isValidBur.value = true;
            isValidBurPDF.value = true;
        }
        if (item.item === 'Mechanical Fastened Tile') {
            isValidMechanical.value = true;
            isValidMechanicalPDF.value = true;
        }
        if (item.item === 'Adhesive Set Tile') {
            isValidTile.value = true;
            isValidTilePDF.value = true;
        }
    });

    // Map booleans to our steps array in one pass
    // The order of these booleans must match the steps definition isValidDownload.value
    const bools = [isValidShingle.value, isValidBur.value, isValidTile.value, isValidMechanical.value, isValidSummary.value, isValidPayment.value];

    bools.forEach((val, i) => {
        if (val) {
            steps.value[i].label = stepLabels[i];
            steps.value[i].component = availableComponents[i];
            console.log(i, val);

            numberLabels.value.push(stepLabels[i]);
        } else {
            steps.value[i].label = '';
            steps.value[i].component = null;
        }
    });
    console.log(numberLabels.value.length);
}

// Init checks on mount
onMounted(() => {
    checkState();
});

// Filter only the steps that have a component
const filteredSteps = computed(() => steps.value.filter((step) => step.component));

// Active step index & component
const currentStepIndex = ref(0);
const activeComponent = computed(() => filteredSteps.value[currentStepIndex.value]?.component);

// Navigation
function nextStep() {
    isLoading.value = true;

    setTimeout(() => {
        if (currentStepIndex.value < filteredSteps.value.length - 1) {
            currentStepIndex.value++;
            console.log(isLastStep.value);
        }
        // else if last filteredSteps.value.length - 1 is equal show a
        //  button to go back to selection roofing page
        isLoading.value = false;
    }, 100);
    // console.log(filteredSteps.value.length);
    goToStep(currentStepIndex.value);
}

function prevStep() {
    isLoading.value = true;
    setTimeout(() => {
        if (currentStepIndex.value > 0) {
            currentStepIndex.value--;
        }
        isLoading.value = false;
    }, 100);
}

function goToStep(index) {
    currentStepIndex.value = index;

    sessions.value.push({
        session_id: newSessionId(),
        completed: false
    });
}
onMounted(async () => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    if (!sessionId) return; // guard
    console.log(sessionId);
    // (A) quick client‑side confirmation message
    // fetch(`/api/checkout-session/${sessionId}`) → your backend uses secret key
});
// Disable states
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === filteredSteps.value.length - 1);
// const isReturnRoofing = computed(()=>)

console.log(isFirstStep.value, isLastStep.value, filteredSteps.value.length);
</script>
<style scoped>
.layout-main-container-stepper {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
}

.card-system {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stepper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 16px;
}

.step-wrapper {
    display: flex;
    align-items: center;
}

.highlight {
    background-color: #eae7e2;
    color: #987284;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
    width: 90px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.step {
    padding: 2px 4px;
    text-align: center;
    font-weight: bold;
    border-radius: 100%;
    width: 90px;
    height: 50px;
    border: 2px solid #eae7e2;
    background-color: #eae7e2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.step-wrapper.active .highlight {
    background-color: #2a6bb0;
    color: #fff;
}

.line {
    flex-grow: 1;
    height: 4.5px;
    background-color: #6c6a68;
    margin: 0 10px;
    min-width: 50px;
    max-width: 200px;
}

.component-wrapper {
    min-height: 300px;
    width: 100%;
}

.stepper-controls {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    justify-content: center;
}

button {
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 4px;
    border: 2px solid #ccc;
    background-color: #c4bebe;
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.spinner {
    margin: 300px auto;
}
</style>
