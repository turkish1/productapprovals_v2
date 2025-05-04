<template>
    <div class="card">
        <div class="stepper">
            <!-- Iterate over filtered steps to build the stepper UI -->
            <div v-for="(step, index) in filteredSteps" :key="index" class="step-wrapper" :class="{ active: index === currentStepIndex }" @click="goToStep(index)">
                <div class="step">
                    <span>{{ step.label }}</span>
                </div>
                <!-- Separator line (not after the last step) -->
                <div v-if="index < filteredSteps.length - 1" class="line"></div>
            </div>
        </div>

        <!-- Step Content -->
        <div v-if="!isLoading" class="step-content">
            <component :is="activeComponent" />
        </div>
        <VueSpinnerBall v-else color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <!-- Navigation Buttons -->
        <div class="stepper-controls">
            <button @click="prevStep" :disabled="isFirstStep">Back</button>
            <button @click="nextStep" :disabled="isLastStep">Next</button>
        </div>
    </div>
</template>

<script setup>
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted, useToNumber } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { VueSpinnerBall } from 'vue3-spinners';

// Composables / Stores
const permitStore = usePermitappStore();
const store = useRoofListStore();
const { roofList } = storeToRefs(store);

// Reactive State
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
const Step7Permit = defineAsyncComponent(() => import('@/views/pages/auth/Login.vue'));

// const Step3ADTilePDF = defineAsyncComponent(() => import('@/components/jsPDF/TileAdhesive.vue'));
// const Step4TMechilePDF = defineAsyncComponent(() => import('@/components/jsPDF/TileMechanical.vue'));
// Array of step definitions (we'll fill label and component conditionally)
const steps = ref([
    { label: '', component: null }, // Shingles
    { label: '', component: null }, // Low Slope
    { label: '', component: null }, // Adhesive Tile
    { label: '', component: null }, // Mechanical Tile
    { label: '', component: null }, // Summary
    { label: '', component: null }, // Payment
    { label: '', component: null } // Start again
]);

// Predefine actual components to map them easily
const availableComponents = [
    Step1Shingle, // Shingles
    Step2LowSlope, // Low Slope
    Step3AdhesiveTile,
    // Step3ADTilePDF,// Adhesive Tile
    Step4MechanicalTile,
    // Step4TMechilePDF,
    Step5Summary,
    Step6Payment,
    Step7Permit
];

// const availableComponentsPDF = [Step3ADTilePDF, Step4TMechilePDF];
const stepLabels = ['Shingles', 'Low Slope', 'Adhesive Tile', 'Mechanical Tile', 'Summary', 'Payment Page'];

// Check if we have a valid Miami Beach scenario
tryOnMounted(() => {
    if (convertMB.value && convertMB.value === mbVal.value) {
        console.log('Miami Beach check passed.');
        isMiamiBeachValid.value = true;
        // Possibly set isValidShingle if MB logic says so:
        // isValidShingle.value = true
    }
});

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
    // The order of these booleans must match the steps definition
    const bools = [isValidShingle.value, isValidBur.value, isValidTile.value, isValidMechanical.value, isValidSummary.value, isValidPayment.value];

    bools.forEach((val, i) => {
        if (val) {
            steps.value[i].label = stepLabels[i];
            steps.value[i].component = availableComponents[i];
            console.log(i, val);
            console.log(steps.value[i].component);
        } else {
            steps.value[i].label = '';
            steps.value[i].component = null;
        }
    });
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
        }
        isLoading.value = false;
    }, 200);
}

function prevStep() {
    isLoading.value = true;
    setTimeout(() => {
        if (currentStepIndex.value > 0) {
            currentStepIndex.value--;
        }
        isLoading.value = false;
    }, 200);
}

function goToStep(index) {
    currentStepIndex.value = index;
}

// Disable states
const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === filteredSteps.value.length - 1);
</script>

<style scoped>
.card {
    background-size: cover;
}

/* Stepper Layout */
.stepper {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 16px;
}

.step-wrapper {
    display: flex;
    margin-top: 75px;
}

.step {
    cursor: pointer;
    padding: 2px 4px;
    text-align: center;
    font-weight: bold;
    border-radius: 100%;
    width: 90px;
    height: 40px;
    border: 2px solid #eae7e2;
    background-color: #eae7e2;
}

.step.active {
    background-color: #2a6bb0;
    color: #21c21c;
}

.line {
    width: 400px;
    height: 4.5px;
    background-color: #f5ece6;
    margin-top: 40px;
    margin-left: 5px;
}

.step-content {
    margin-top: 18px;
    margin-left: -30px;
    font-size: 14px;
}

/* Controls Layout */
.stepper-controls {
    display: flex;
    gap: 1500px;
    margin-top: 45px;
}
</style>
