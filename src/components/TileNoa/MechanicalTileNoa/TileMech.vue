<script setup>
import AgreementsDialogMechTile from '@/components/Agreements/AgreementsDialogMechTile.vue';
import InputMechTile from '@/components/TileNoa/MechanicalTileNoa/InputMechTile.vue';
import { useRoofListStore } from '@/stores/roofList';
import { useDocumentVisibility } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const visibility = useDocumentVisibility();
const store = useRoofListStore();
const { roofList } = storeToRefs(store);
const isDialog = ref(false);
const roofType = ref(store.$state.roofList);
let slope = ref(null);

function checkSlope() {
    console.log(slope);
}

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
        if (roofType.value[i].item === 'Mechanical Fastened Tile') {
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
    <agreements-dialog-mech-tile v-if="isDialog === true"></agreements-dialog-mech-tile>

    <div id="tile" class="w-full space-y-1" style="margin-left: 20px">
        <input-mech-tile :slopeEntered="slope" style="margin-left: 2px" @change="checkSlope"></input-mech-tile>
    </div>
</template>
<style scoped></style>
