<template>
    <div class="card flex justify-center .">
        <Dialog v-model:visible="visible" modal header="Terms Of Use" :style="{ width: '70rem' }">
            <div class="grid grid-cols-1 gap-2 place-content-center h-8 ...">
                <p style="color: black">It is the applicant's responsiblity to complete this application correctly.</p>
            </div>
            <Divider></Divider>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: black">Failure to provide valid permitting information can result in failed inspections and/or cancelation of the permit by the Authority Having Jurisdiction (AHJ).</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: black">Double permit fees plus a fine determined by the AHJ issuing the permit, can be required for work without a permit.</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: red">Refunds will not be provided by the AHJ issuing the permit, due to errors on the applicant's part.</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: red">Any deviations from an approved permit package will require a permit revision.</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: black">This application is only valid for residential roof permits, either standalone or tied to a master building permit.</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: black">The permit applicant agrees to comply with these terms of use requirements when obtaining this permit electronically.</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: black">The use of the mePermit Application system is limited to properly licensed & insured Roofing Contractors.</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: black">This application is only valid for residential work or commercial work subsidiary to a master building permit.</p>
            </div>
            <div class="grid grid-cols-1 gap-2 place-content-center h-12 ...">
                <p style="color: black">Roofing permits cannot be issued for mobile homes (approved by the State of Florida Department of Motor Vehicles).</p>
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
