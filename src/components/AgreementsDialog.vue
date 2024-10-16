<template>
    <div class="card flex justify-center .">
        <Dialog v-model:visible="visible" modal header="Terms Of Use" :style="{ width: '70rem' }">
            <div class="grid grid-cols-1 gap-2 place-content-center h-8 ...">
                <p class="text-center text-red-600">mEPermit Application</p>
            </div>
            <Divider></Divider>
            <div class="grid grid-cols-1 gap-2 place-content-center h-16 ...">
                <p class="text-center text-red-600">High Velocity Hurricane Zone (HVHZ)</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p class="text-center text-red-600">Tile</p>
            </div>
            <div class="whitespace-normal grid grid-cols-1 gap-2 place-content-center h-16 ...">
                <p class="text-center text-red-600">
                    The Tile roof system and its components shall be installed in strict compliance with the HVHZ portions of Chapter 15 FBC, the HVHZ Roof Application Standards (RAS) 111 & 115, and the submitted MDC (NOA) Notice of Acceptance(s)
                </p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p class="text-center text-red-600">The mePermit applicant agrees to comply with these installation requirement when obtaining this roof permit.</p>
            </div>

            <div class="flex justify-end gap-2">
                <Button type="button" v-model="agreement" severity="contrast" label="I Agree" @click="visible = false"></Button>
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
