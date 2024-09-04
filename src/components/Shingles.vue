<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { invoke, until } from '@vueuse/shared';
import { onMounted, ref } from 'vue';
import AgreementsDialogShingle from './AgreementsDialogShingle.vue';
import InputItems from './InputItems.vue';

const store = useRoofListStore();
const isDialog = ref(false);
invoke(async () => {
    await until(isDialog).toBe(true);
});
const roofType = ref(store.$state.roofList[0].item);
function checkState() {
    if (roofType.value === 'Asphalt Shingle') {
        isDialog.value = true;
    } else isDialog.value = false;
}

console.log(roofType);
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

    <div class="card w-full space-y-1" style="margin-left: 20px">
        <input-items :slopeEntered="slope" style="margin-left: 2px" @change="checkSlope"></input-items>
    </div>
</template>
<style scoped></style>
