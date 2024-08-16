<script setup>
import useSlope from '@/composables/use-updateSlope';
import { defineProps, ref, watch } from 'vue';

const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();
const props = defineProps({
    slopeEntered: { type: String }
});

let isSelectVisible1 = ref(false);
let isSelectVisible2 = ref(false);
let isSlopeValid = ref(false);
let slope = ref(null);
let slopetypemore = ref(slopeCondition.slope_more_4);
let slopetypeless = ref(slopeCondition.slope_less_4);
const selectedDeck = ref();
const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);

watch(validateEntries, () => {
    console.log(slope);
    console.log(slopeCondition.slope_more_4);
});

// function showMessage() {
//     visible.value = true;

//     setTimeout(() => {
//         visible.value = false;
//     }, 3500);
// }

function validateEntries() {
    let slopeNumber = Number(slope.value);
    console.log(slopeNumber);
    if (slopeNumber === null) {
        console.log('No Entry has been submited');
    } else if (slopeNumber <= 2) {
        isSlopeValid = true;
        console.log('Entry to lowslope');
    } else {
        isSlopeValid = false;
        // showMessage();
    }
}
function valueEntered() {
    if (slope.value) {
        let slopeNumber = Number(slope.value);

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
        if (slopeNumber < 2) {
            isSlopeValid = false;
        }
    } else {
        console.log('Not Mounted');
    }
}
</script>
<template>
    <div class="flex flex-col md:flex-row gap-12" style="margin-left: 320px">
        <div class="md:w-3/4">
            <div class="card flex flex-col gap-4">
                <div class="container">
                    <div class="card flex justify-left">
                        <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" />
                    </div>
                    <div class="w-64 gap-4" style="margin-left: 22px">
                        <label for="slope">Slope</label><label class="px-1" style="color: red">*</label>
                        <!-- @change="valueEntered"  -->
                        <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" @change="validateEntries" />
                        <p v-if="!isSlopeValid" style="color: red">Enter Valid Slope</p>
                        <!-- <Message v-if="isSlopeValid" severity="warn" :life="3000">Enter Valid Slope</Message> -->
                    </div>
                    <div class="w-64" style="margin-left: 22px">
                        <label for="height">Height</label><label class="px-1" style="color: red">*</label>
                        <InputText id="height" v-model="height" type="text" placeholder="height" />
                    </div>
                    <div class="w-64" style="margin-left: 22px">
                        <label for="area">Area</label>
                        <InputText id="area" v-model="area" type="text" placeholder="area" />
                    </div>
                    <div v-show="isSelectVisible2" class="card w-96 grid gap-6 grid-cols-1">
                        <label style="color: red">Select Underlayment (S/A) *</label>
                        <Select ref="selectedAttachment" v-model="isSlopeMoreFour" :options="slopetypemore" placeholder="make selection" />
                    </div>

                    <div v-show="isSelectVisible1" class="card grid gap-6 grid-cols-1">
                        <label style="color: red">Select Underlayment (UDL) *</label>
                        <Select ref="selectedAttachment" v-model="isSlopeLessFour" :options="slopetypeless" placeholder="make selection" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
