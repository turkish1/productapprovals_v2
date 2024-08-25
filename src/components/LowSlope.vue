<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { invoke, until } from '@vueuse/shared';
import { onMounted, ref } from 'vue';
import AgreementsDialogLowslope from './AgreementsDialogLowslope.vue';
import InputItemsBur from './InputItemsBur.vue';

const store = useRoofListStore();
const isDialog = ref(false);
invoke(async () => {
    await until(isDialog).toBe(true);
});
const roofType = ref(store.$state.roofList[0].item);
function checkState() {
    if (roofType.value === 'Low Slope') {
        isDialog.value = true;
    } else isDialog.value = false;
}

console.log(roofType);
onMounted(() => {
    checkState();
});
</script>
<template>
    <!-- class="card w-1/3 space-y-1 bg-white shadow-lg shadow-cyan-800" card w-full space-y-1 card flex flex-col md:flex-row gap-2 mt-5 bg-white shadow-lg shadow-cyan-800-->
    <div class="mt-2" v-if="isDialog === true" style="margin-left: 100px">
        <agreements-dialog-lowslope></agreements-dialog-lowslope>

        <InputItemsBur><slot name="Low Slope"></slot></InputItemsBur>
    </div>
</template>
<style scoped></style>
