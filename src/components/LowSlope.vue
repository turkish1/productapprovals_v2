<script setup>
import { onUpdated, ref } from 'vue';
import AgreementsDialogLowslope from './AgreementsDialogLowslope.vue';
import InputItemsBur from './InputItemsBur.vue';

let isDialog = ref(false);
const roofType = ref('lowslope');
onUpdated(() => {
    // if (roofType.value === 'lowslope') {
    isDialog = true;
    // }
});
</script>
<template>
    <div class="card flex flex-col md:flex-row gap-4 mt-10 bg-white shadow-lg shadow-cyan-800" style="margin-left: 50px">
        <agreements-dialog-lowslope v-if="isDialog !== true"></agreements-dialog-lowslope>

        <InputItemsBur />
    </div>
</template>
<style scoped></style>
