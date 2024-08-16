<script setup>
import useShingle from '@/composables/use-shingles';
import useShingleattach from '@/composables/use-shinglesattach';
import useSlope from '@/composables/use-updateSlope';
// import { logicOr } from '@vueuse/math';
// import { whenever } from '@vueuse/core';
import { defineProps, ref, watch, watchEffect } from 'vue';
const props = defineProps({
    slopeEntered: { type: String }
});

const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();
const lowselected = ref([]);
let isUDLNOAValid = ref(false);
let isSAValid = ref(false);
let isSelectVisible1 = ref(false);
let isSelectVisible2 = ref(false);
let isSlopeValid = ref(true);
let slope = ref(null);
let data = ref();
let udlInput = ref(18061905);
let saInput = ref();
let noaInput = ref();
let manufacturer = ref(null);
let material = ref(null);
let description = ref(null);
let umanufacturer = ref(null);
let umaterial = ref(null);
let udescription = ref(null);
let samanufacturer = ref(null);
let samaterial = ref(null);
let sadescription = ref(null);
let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedSlopehigh = ref();
const selectedSlopelow = ref();
const selectedDeck = ref();
const { proccesedValue, processInput, results, processData, noa } = useShingle(noaInput.value);
const { processInputs, result, Poly, SBS } = useShingleattach(udlInput.value, saInput.value);

const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);

// 18061905
function grabNoa() {
    data.value = noaInput.value;
    console.log(data.value, results.value);
    processInput(noaInput.value);

    results.value.forEach((item, index) => {
        (manufacturer = item.applicant), (material = item.material), (description = item.description);
    });
}

function grabAttachmets() {
    processInputs(udlInput.value, saInput.value);
    console.log(result.value);
}

watchEffect(slopetypeless, slopetypemore, getIndexs, useShingle, selectedSlopelow, selectedSlopehigh, grabNoa, () => {
    console.log(shingleNoaInfo);
});

watch(valueEntered, noaInput, grabNoa, grabAttachmets, () => {
    console.log(slopeCondition.slope_more_4);
});

function getIndexs() {
    console.log(selectedSlopelow);
    console.log(selectedSlopelow);

    // '(S/A) membrane adhered to a mechanically fastened UDL/Base Sheet, per the NOA System E'

    if (selectedSlopelow.value === '2 Plies ASTM # 30 with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c' || selectedSlopehigh.value === '1 Ply ASTM # 30 with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c') {
        isUDLNOAValid = false;
        isSAValid = false;
    }
    if (selectedSlopelow.value === '2 Plies Polypropylene with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c' || selectedSlopehigh.value === '1 Ply Polypropylene with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c') {
        isUDLNOAValid = true;
        isSAValid = false;
    }

    if (selectedSlopelow.value === '(S/A) membrane adhered directly to a wood deck, per the NOA system F' || selectedSlopehigh.value === '(S/A) membrane adhered directly to a wood deck, per the NOA system F') {
        console.log(selectedSlopelow._rawValue);
        isUDLNOAValid = false;
        isSAValid = true;
        console.log(isSAValid);
    }
    if (selectedSlopelow._rawValue === '(S/A) membrane adhered to a mechanically fastened UDL/Base Sheet, per the NOA System E' || selectedSlopehigh.value === '(S/A) membrane adhered to a mechanically fastened UDL/Base Sheet, per the NOA System E') {
        console.log(selectedSlopelow._rawValue);
        isUDLNOAValid = true;
        isSAValid = true;
        console.log(isSAValid);
    }
    if (selectedSlopelow._rawValue === null) {
        console.log('Not Mounted');
    }
}

function valueEntered() {
    if (slope.value) {
        let slopeNumber = Number(slope.value);
        console.log(slopeNumber);
        if (slope.value === null) {
            isSlopeValid = false;
        }
        if (slopeNumber < 2) {
            isSlopeValid = false;
        }
        if (slopeNumber > 4 && slopeNumber <= 12) {
            isSlopeValid = true;
            isSlopeMoreFour.value = true;
            isSelectVisible2 = true;
            isSelectVisible1 = false;
        }
        if (slopeNumber >= 2 && slopeNumber <= 4) {
            isSlopeValid = true;
            isSlopeLessFour.value = true;
            isSelectVisible1 = true;
            isSelectVisible2 = false;
        }
    } else {
        console.log('Not Mounted');
    }
}
</script>
<template>
    <div class="flex flex-col md:flex-row gap-2" style="margin-left: 10px">
        <div class="container">
            <div class="card w-64 gap-2" style="margin-left: 2px">
                <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" />
            </div>
            <div class="w-64 gap-4" style="margin-left: 2px">
                <label for="slope">Slope</label><label class="px-1" style="color: red">*</label>
                <!-- @change="valueEntered"  -->
                <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" @change="valueEntered" />
                <p v-if="!isSlopeValid" style="color: red">Enter Valid Slope</p>
            </div>
            <div class="w-64" style="margin-left: 2px">
                <label for="height">Height</label><label class="px-1" style="color: red">*</label>
                <InputText id="height" v-model="height" type="text" placeholder="height" />
            </div>
            <div class="w-64" style="margin-left: 2px">
                <label for="area">Area</label>
                <InputText id="area" v-model="area" type="text" placeholder="area" />
            </div>
            <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
                <div class="flex flex-col gap-2">
                    <label for="udlInput">Fastened UDL NOA Number</label>
                    <InputText id="udlInput" v-model="udlInput" @input="grabAttachmets" />
                </div>
            </div>
            <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
                <div class="flex flex-col gap-2">
                    <label for="saInput">S/A Membrane NOA Number</label>
                    <InputText id="saInput" v-model="saInput" @input="grabAttachmets" />
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
    </div>
    <!-- </div> -->

    <!--  md:w-2/3 flex space-x-4  flex flex-row space-x-4   grid grid-cols-2 gap-4 place-content-around h-48 -->
    <div class="card md:w-full ql-container-bottom">
        <div class="flex flex-row space-x-8" style="margin-left: 10px">
            <div v-show="isUDLNOAValid" class="flex space-x-4">
                <div class="flex flex-col gap-2">
                    <label for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="umanufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="material">(UDL) Material</label>
                    <InputText id="material" v-model="umaterial" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="description">(UDL) Description</label>
                    <InputText id="description" v-model="udescription" />
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-8" style="margin-left: 10px">
            <div v-show="isSAValid" class="flex space-x-3">
                <div class="flex flex-col gap-2">
                    <label for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="samanufacturer" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="samaterial" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="sadescription">S/A Description</label>
                    <InputText id="sadescription" v-model="sadescription" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="designpressure">Design psf:</label>
                    <InputText id="designpressure" v-model="designpressure" />
                </div>

                <div class="flex shrink flex-col gap-2">
                    <label for="expiredate_sa">Expiration Date:</label>
                    <InputText id="expiredate_sa" v-model="expiredate_sa" />
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-8" style="margin-left: 1px">
            <div class="flex flex-col gap-2">
                <label for="shinglenoa">Shingle Noa</label>
                <InputText id="shinglenoa" v-model="noaInput" placeholder="18061905" @input="grabNoa" />
            </div>
            <!-- flex flex-col gap-2 -->
            <div class="flex flex-col gap-2">
                <label for="manufacturer">Manufacturer</label>
                <InputText id="manufacturer" v-model="manufacturer" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="material"> Material</label>
                <InputText id="material" v-model="material" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="description">Description</label>
                <InputText id="description" v-model="description" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 1px;
    padding-top: 0.5px;
    border: none;
    border-radius: 12px;
    /* box-shadow: 4px 4px 16px rgb(22, 183, 183); */
    position: left;
    min-height: 400px;
    min-width: 200px;
    top: 10vh;
}

.ql-container-top {
    padding-bottom: 10px;
    padding-top: 0.2px;
    padding-right: 30px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 650px;
    min-width: 650px;
    top: 10vh;
}
.ql-container-bottom {
    padding-bottom: 3px;
    padding-top: 2px;
    padding-right: 1px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: top;
    min-height: 300px;
    min-width: 600px;
    top: 10vh;
}
</style>
