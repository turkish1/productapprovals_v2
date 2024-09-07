<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { onMounted, ref } from 'vue';
import AgreementsDialogShingle from './AgreementsDialogShingle.vue';
import InputItems from './InputItems.vue';

// import { storeToRefs } from 'pinia';
const store = useRoofListStore();

const isDialog = ref(false);

const roofType = ref(store.$state.roofList[0].item);
function checkState() {
    if (roofType.value === 'Asphalt Shingle') {
        isDialog.value = true;
    } else isDialog.value = false;
}

// function checkState() {
//     // roofList.value.forEach((item, index) => {
//     //     console.log(item, index);
//     //     if (item.item === 'Asphalt Shingle') {
//     //         isDialog.value = true;
//     //     } else isDialog.value = false;
//     //     console.log(item.item);
//     // });
// }

onMounted(() => {
    checkState();
});

let slope = ref(null);

const MiamiBC = ref(false);

function checkSlope() {
    console.log(slope);
}
</script>
<template>
    <AgreementsDialogShingle v-show="isDialog === true"></AgreementsDialogShingle>

    <div id="shingle" class="card w-full space-y-1" style="margin-left: 20px">
        <input-items :slopeEntered="slope" style="margin-left: 2px" @change="checkSlope"></input-items>
    </div>
</template>
<style scoped></style>
