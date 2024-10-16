<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import AgreementsDialogLowslope from './AgreementsDialogLowslope.vue';
import InputItemsBur from './InputItemsBur.vue';

import { useDocumentVisibility } from '@vueuse/core';

const visibility = useDocumentVisibility();
const store = useRoofListStore();
const { roofList } = storeToRefs(store);
const isDialog = ref(false);
const roofType = ref(store.$state.roofList);
// temp disabled

// Watch the dialog state and log changes
watch(isDialog, (newVal) => {
    if (newVal) {
        console.log('Dialog is now visible');
        console.log(visibility);
    } else {
        console.log('Dialog has been closed');
    }
});

function checkState() {
    for (let i = 0; i < roofType.value.length; i++) {
        console.log(roofType.value[i].item);
        if (roofType.value[i].item === 'Low Slope') {
            console.log('I am in', roofType.value[i].item);
            isDialog.value = true;
            console.log(isDialog.value);
        }
    }
}
onMounted(() => {
    checkState();
});
</script>
<template>
    <agreements-dialog-lowslope v-if="isDialog === true"></agreements-dialog-lowslope>
    <!-- class="card w-1/3 space-y-1 bg-white shadow-lg shadow-cyan-800" card w-full space-y-1 card flex flex-col md:flex-row gap-2 mt-5 bg-white shadow-lg shadow-cyan-800-->
    <div id="bur" class="mt-1" style="margin-left: 1px">
        <InputItemsBur><slot name="Low Slope"></slot></InputItemsBur>
    </div>
</template>
<style scoped></style>
