<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { useDocumentVisibility } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import AgreementsDialogLowslope from './AgreementsDialogLowslope.vue';

import burScroll from '@/components/LowSlope/burScroll.vue';
import logicBur2 from '@/components/LowSlope/logicBur2.vue';
import AOS from 'aos';
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
onMounted(() => {
    AOS.init({
        duration: 800, // Animation duration in ms
        easing: 'ease-out-cubic', // Easing for animations
        once: false // Whether animation happens only once
    });
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
    <div data-aos="fade-down-right" data-aos-offset="150" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true" data-aos-once="false" style="margin-top: 50px">
        <burScroll />
        <!-- </div> -->
    </div>
    <div data-aos="flip-left" data-aos-duration="1000" style="margin-top: 30px">
        <logicBur2></logicBur2>
        <!-- </div> -->
    </div>
</template>
<style scoped></style>
