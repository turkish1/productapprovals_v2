<template>
    <div class="card">
        <div class="stepper">
            <div v-for="(step, index) in filteredSteps" :key="index" class="step-wrapper" :class="{ active: index === currentStepIndex }" @click="goToStep(index)">
                <div class="step">
                    <span>{{ step.label }}</span>
                </div>
                <!-- Add a separator line between steps, but not after the last step -->
                <div v-if="index < filteredSteps.length - 1" class="line"></div>
            </div>
        </div>

        <div v-if="!isloading" class="step-content">
            <!-- <p>{{ filteredSteps[currentStepIndex].component }}</p> -->
            <component :is="activeComponent" />
        </div>
        <VueSpinnerBall v-else color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />
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
import { computed, defineAsyncComponent, reactive, ref } from 'vue';
import { VueSpinnerBall } from 'vue3-spinners';
const isloading = ref(false);

let isMiamiBeachValid = ref(false);

const permitStore = usePermitappStore();
const mbVal = ref(2);
if (permitStore.$state.permitapp.length !== 0) {
    isMiamiBeachValid = true;
}
const MB = ref(permitStore.$state.permitapp);

const store = useRoofListStore();
const isValidshingle = ref(false);
const isValidbur = ref(false);
const isValidtile = ref(false);
const isValidmechanical = ref(false);
const isValidcheckout = ref(true);
const isValidpaymentgate = ref(true);
const Step1Component = defineAsyncComponent(() => import('@/components/Shingles.vue'));
const Step2Component = defineAsyncComponent(() => import('@/components/LowSlope.vue'));
const Step3Component = defineAsyncComponent(() => import('@/components/Tile.vue'));
const Step4Component = defineAsyncComponent(() => import('@/components/TileNoa/MechanicalTileNoa/TileMech.vue'));
const Step5Component = defineAsyncComponent(() => import('@/components/Summary/Checkout.vue'));
const Step6Component = defineAsyncComponent(() => import('@/components/Summary/Paymentgateway.vue'));
const { roofList } = storeToRefs(store);

// const RoofList = ref(['', 'LowSlope', '', 'Mechanical', 'Checkout']);
// This check will have asphalt dialog pop up

const convertMB = isMiamiBeachValid === true ? useToNumber(MB._value[0].miamibeach) : '';
tryOnMounted(() => {
    if (convertMB.value === null || convertMB.value === NaN) {
        return true;
    } else if (convertMB.value === mbVal.value) {
        console.log('Entry');
        isMiamiBeachValid.value = true;
        isValidshingle.value = true;
    }
});

function checkState() {
    for (let i = 0; i <= roofList.value.length - 1; i++) {
        console.log(i);
        if (roofList.value[i].item === 'Asphalt Shingle') {
            isValidshingle.value = true;
        }
        if (roofList.value[i].item === 'Low Slope') {
            isValidbur.value = true;
        }
        if (roofList.value[i].item === 'Mechanical Fastened Tile') {
            isValidmechanical.value = true;
        }
        if (roofList.value[i].item === 'Adhesive Set Tile') {
            isValidtile.value = true;
        }
    }

    validateState();
}

const comp = reactive({ component: [Step1Component, Step2Component, Step3Component, Step4Component, Step5Component, Step6Component] });

const booleanValues = ref([]);
const steps = ref([
    // use tenerary option
    { label: '', component: '' },
    { label: '', component: '' },
    { label: '', component: '' },
    { label: '', component: '' },
    { label: '', component: '' },
    { label: '', component: '' },
    { label: '', component: '' }
]);

function validateState() {
    // assign the boolean to each array
    booleanValues.value[0] = isValidshingle.value;
    booleanValues.value[1] = isValidbur.value;
    booleanValues.value[2] = isValidtile.value;
    booleanValues.value[3] = isValidmechanical.value;
    booleanValues.value[4] = isValidcheckout.value;
    booleanValues.value[5] = isValidpaymentgate.value;

    const nonEmptyValues = booleanValues.value.filter((value) => value !== '' && value !== null && value !== undefined);
    const countTrue = nonEmptyValues.filter((value) => value === true).length;
    console.log(booleanValues);
    // for (let k = 0; k <= countTrue; k++) {
    //     console.log(k);
    if (isValidshingle.value === true) {
        console.log(isValidshingle.value, 'Entered if statement shingle');
        steps.value[0].label = 'Shingles';
    }
    if (isValidbur.value === true) {
        console.log(isValidbur.value, 'Entered if statement bur');
        steps.value[1].label = 'Low Slope';
    }
    if (isValidtile.value === true) {
        console.log(isValidtile.value, 'Entered if statement tile!');
        steps.value[2].label = 'Adhesive Tile';
    }
    if (isValidmechanical.value === true) {
        console.log(isValidmechanical.value, 'Entered if statement tile!');
        steps.value[3].label = 'Mechanical Tile';
    }
    if (isValidcheckout.value === true) {
        console.log(isValidtile.value, 'Entered if statement checkout!');
        steps.value[4].label = 'Checkout';
    }
    if (isValidpaymentgate.value === true) {
        console.log(isValidpaymentgate.value, 'Entered if statement checkout!');
        steps.value[5].label = 'Payment Page';
    }

    //     console.log(k);
    // }

    for (let i = 0; i < booleanValues.value.length; i++) {
        // count the false values

        for (let j = 0; j <= nonEmptyValues.length; j++) {
            if (nonEmptyValues[j] === true) {
                if (booleanValues.value[i] === true) {
                    steps.value[i].component = comp.component[i];
                }
            }
        }
    }
}

tryOnMounted(() => {
    checkState();
});

const filteredSteps = computed(() => steps.value.filter((step) => step.component));
console.log(filteredSteps);
const currentStepIndex = ref(0);
const activeComponent = computed(() => filteredSteps.value[currentStepIndex.value]?.component);

const nextStep = () => {
    isloading.value = true;
    if (currentStepIndex.value < filteredSteps.value.length - 1) {
        setTimeout(() => {
            isloading.value = false;
        }, 3000);

        currentStepIndex.value += 1;
    }
    // console.log(steps);
};

const prevStep = () => {
    isloading.value = true;
    setTimeout(() => {
        if (currentStepIndex.value > 0) {
            currentStepIndex.value -= 1;
        }
        isloading.value = false;
    }, 1500);
};
const goToStep = (index) => {
    currentStepIndex.value = index;
};

const isFirstStep = computed(() => currentStepIndex.value === 0);
const isLastStep = computed(() => currentStepIndex.value === filteredSteps.value.length - 1);
</script>

<style scoped>
.card {
    background-size: cover;
}
.stepper {
    display: flex;
    flex-direction: row;
    /* align-items: left; */
    width: 100%;
    height: 100%;
    margin-top: 16px;
    background-attachment: fixed;
}

.step-wrapper {
    display: flex;
    /* align-items: left; */
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
    width: 500px;
    height: 2.5px;
    background-color: #f5ece6;
    padding-inline-start: 5px;
    margin-top: 30px;
}

.step-content {
    margin-top: 18px;
    margin-left: -30px;
    font-size: 14px;
}
.stepper-controls {
    display: flex;
    gap: 1500px;
    margin-top: 105px;
}
</style>
