<template>
    <div class="card-system flex justify-center .">
        <Dialog v-model:visible="visible" modal header="Terms Of Use" :style="{ width: '70rem' }">
            <div class="grid grid-cols-1 gap-2 place-content-center h-8 ...">
                <p class="text-center text-red-600">mEPermit Application</p>
            </div>
            <Divider></Divider>
            <div class="grid grid-cols-1 gap-2 place-content-center h-16 ...">
                <p class="text-center text-red-600">High Velocity Hurricane Zone (HVHZ)</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p class="text-center text-red-600">Low Slope Built Up Roofing (BUR) Form</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-16 ...">
                <p class="text-center text-red-600">
                    The low slope Built Up Roof (BUR) Assembly shall be installed in compliance with the HVHZ portions of Chapter 15 found in the 2023 Florida Building Code and the HVHZ Roofing Application Standards (RAS), RAS-111, RAS-117 and
                    RAS-128. This roof assembly shall also comply with the listed requirements for a Class "A" fire rating including roof slope (incline), components and a fire barrier when required.
                </p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p class="text-center text-red-600">The mePermit applicant agrees to comply with the preceding BUR installation requirements.</p>
            </div>

            <div class="flex justify-end gap-2">
                <label class="ml-2"> I Agree</label>
                <RadioButton v-model="agreement" value="1" :invalid="value === null" @click="visible = false" />
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(true);
</script>
<style scoped>
.p {
    text-align: center;
    text-decoration-color: firebrick;
}
</style>
