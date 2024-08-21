<script setup>
import { onMounted, ref } from 'vue';
import AgreementsDialogShingle from './AgreementsDialogShingle.vue';
import InputItems from './InputItems.vue';

onMounted(() => {
    isDialog = true;
});

const roofType = ref('Shingle');
let slope = ref(null);

let isDialog = ref(false);

const MiamiBC = ref(false);

function checkSlope() {
    console.log(slope);
}
</script>
<template>
    <AgreementsDialogShingle v-show="isDialog === true"></AgreementsDialogShingle>

    <div class="card w-full space-y-1" style="margin-left: 20px">
        <input-items :slopeEntered="slope" style="margin-left: 2px" @change="checkSlope"></input-items>
    </div>
</template>
<style scoped></style>
