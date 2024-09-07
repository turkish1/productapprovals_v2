<script setup>
import { useRoofListStore } from '@/stores/roofList';

// import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import AgreementsDialogLowslope from './AgreementsDialogLowslope.vue';
import InputItemsBur from './InputItemsBur.vue';
const store = useRoofListStore();
// const { roofList } = storeToRefs(store);
const isDialog = ref(false);
const roofType = ref(store.$state.roofList);
console.log(roofType.value);
// function checkState() {
// roofList.value.forEach((item, index) => {
//     console.log(item, index);
//     if (item.item === 'Low Slope') {
//         isDialog.value = true;
//     } else isDialog.value = false;
//     console.log(item.item);
//     // });
// }
function checkState() {
    console.log(roofType.value, roofType._value);

    for (let i = 0; i < roofType.value.length; i++) {
        console.log(roofType.value[i].item);
        if (roofType.value[i].item === 'Low Slope') {
            console.log('I am in', roofType.value[i].item);
            isDialog.value = true;
            console.log(isDialog.value);
        }
    }
    // roofType.value.forEach((item, index) => {
    //     console.log(item);
    //     if (item === 'Low Slope') {
    //         console.log('I am in', item);
    //         isDialog.value = true;
    //         console.log(isDialog.value);
    //     }
    // });

    // if (roofType.value === 'Tile') {
    //     isValidtile.value = true;
    // }
}
onMounted(() => {
    checkState();
});
</script>
<template>
    <!-- class="card w-1/3 space-y-1 bg-white shadow-lg shadow-cyan-800" card w-full space-y-1 card flex flex-col md:flex-row gap-2 mt-5 bg-white shadow-lg shadow-cyan-800-->
    <div id="bur" class="mt-2" v-if="isDialog === true" style="margin-left: 100px">
        <agreements-dialog-lowslope></agreements-dialog-lowslope>

        <InputItemsBur><slot name="Low Slope"></slot></InputItemsBur>
    </div>
</template>
<style scoped></style>
