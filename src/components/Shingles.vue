<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { onMounted, ref } from 'vue';
import AgreementsDialogShingle from './AgreementsDialogShingle.vue';
import InputShingle from './InputShingle.vue';

import { storeToRefs } from 'pinia';
const store = useRoofListStore();
const { roofList } = storeToRefs(store);

const isDialog = ref(false);
const roofType = ref(store.$state.roofList);

function checkState() {
    for (let i = 0; i < roofType.value.length; i++) {
        console.log(roofType.value[i].item);
        if (roofType.value[i].item === 'Asphalt Shingle') {
            console.log('I am in', roofType.value[i].item);
            isDialog.value = true;
            console.log(isDialog.value);
        }
    }
}

onMounted(() => {
    // this was disabled for testing
    checkState();
});

let slope = ref(null);

// const MiamiBC = ref(false);

function checkSlope() {
    console.log(slope);
}
</script>
<template>
    <AgreementsDialogShingle v-show="isDialog === true"></AgreementsDialogShingle>

    <div id="shingle" class="card w-full space-y-1">
        <input-shingle :slopeEntered="slope" style="margin-left: 2px" @change="checkSlope"></input-shingle>
    </div>
</template>
<style scoped>
#id {
    height: 1200px;
}
</style>
