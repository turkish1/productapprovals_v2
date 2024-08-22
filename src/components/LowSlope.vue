<script setup>
import { onUpdated, ref } from 'vue';
import AgreementsDialogLowslope from './AgreementsDialogLowslope.vue';
import InputItemsBur from './InputItemsBur.vue';

let isDialog = ref(false);
const roofType = ref('lowslope');
onUpdated(() => {
    isDialog = true;
});
</script>
<template>
    <!-- class="card w-1/3 space-y-1 bg-white shadow-lg shadow-cyan-800" card w-full space-y-1 card flex flex-col md:flex-row gap-2 mt-5 bg-white shadow-lg shadow-cyan-800-->
    <div class="mt-5" style="margin-left: 100px">
        <agreements-dialog-lowslope v-if="isDialog !== true"></agreements-dialog-lowslope>

        <InputItemsBur />
    </div>
</template>
<style scoped></style>
