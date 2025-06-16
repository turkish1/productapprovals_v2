<template>
    <div class="card-system flex justify-center">
        <Dialog v-model:visible="visible" modal header="Terms Of Use" :style="{ width: '70rem' }">
            <div class="grid grid-cols-1 gap-2 place-content-center h-8 ...">
                <p class="text-center text-red-600">mEPermit Application</p>
            </div>
            <Divider></Divider>
            <div class="grid grid-cols-1 gap-2 place-content-center h-16 ...">
                <p class="text-center text-red-600">High Velocity Hurricane Zone (HVHZ)</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p class="text-center text-red-600">Concrete & Clay Roof Tiles</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-16 ...">
                <p class="text-center text-red-600">
                    The tile roof system and its components shall be installed in strict compliance with the FBC 2023 HVHZ portions of Chapter 15, the HVHZ Tile Application Standards: RAS-119, RAS-120 & RAS-127 and the submitted MDC Notice of
                    Acceptance(s).
                </p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p class="text-center text-red-600">The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.</p>
            </div>

            <!-- <div class="flex justify-end gap-2">
                <Button v-model="agreement" severity="contrast" label="I Agree" @click="visible = false"></Button>
            </div> -->
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
const value = ref(null);

// watch(() => {
//     console.log(visible, value);
// });
// function clear() {
//     visible = false;
//     value = 0;
// }
</script>
<style scoped>
.p {
    text-align: center;
    text-decoration-color: firebrick;
}
</style>
