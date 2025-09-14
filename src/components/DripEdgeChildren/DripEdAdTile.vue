<script setup>
// import useADTileDrip from '@/composables/DripEdge/use-ADTileDrip';
import useDripedge from '@/composables/DripEdge/useDripedge';

import { usedripADStore } from '@/stores/dripEdgeADTileStore';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { selectDripEdge, selectDripEdgeSize, holdSize, type } = useDripedge();

const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const types = ref();

// Ref for the <select> element
const selectSizeRef = ref(null);
const loading = ref(false);

const tileStore = usedripADStore();

// Define emits
const emit = defineEmits(['update-valuesize']);

let isRoofTileADValid = ref(false);

const typeSizes = ref();

const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    }
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Adhesive Set Tile') {
            console.log(roofType.value[i].item);
            isRoofTileADValid.value = true;
            types.value = type.value;
        }
    }
    checkRoof();
});

const dripTileData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const dripStagedata = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});
const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);
    dripTileData.DripEdgeSize = selectDripEdgeSize.value;
    getdripSize();
};

// Example: Accessing the select element via the ref and for the default use
onMounted(() => {
    checkValue();
});

function checkRoof() {
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Adhesive Set Tile') {
        }
    }
    tile();
}
function checkValue() {
    types.value = type.value;
}

function getdripSize() {
    if (selectDripEdge.value) {
        if (selectDripEdge.value === 'Galvanized Steel Metal ¹') {
            typeSizes.value = holdSize.value.size1;
            // isdripMaterialValid.value = true;
            // isdripsizeValid.value = true;
            // console.log(isdripMaterialValid.value);
            checkRoof();
        }
        if (selectDripEdge.value === 'Stainless Steel Metal ²') {
            typeSizes.value = holdSize.value.size2;

            checkRoof();
        }
        if (selectDripEdge.value === 'Aluminum Metal ³') {
            typeSizes.value = holdSize.value.size3;

            checkRoof();
        }
        if (selectDripEdge.value === 'Copper Metal ⁴') {
            typeSizes.value = holdSize.value.size4;

            checkRoof();
        }
    } else {
        console.log('The element not mounted yet');
    }
    dripStagedata.DripEdgeMaterial = selectDripEdge.value;
    dripStagedata.DripEdgeSize = selectDripEdgeSize.value;
    checkRoof();
}

function tile() {
    dripTileData.DripEdgeMaterial = selectDripEdge.value;

    storeDripEdgeSize();
}

const storeDripEdgeSize = () => {
    console.log(dripStagedata);
    tileStore.resetState();

    dripTileData.DripEdgeSize = selectDripEdgeSize.value;
    console.log(dripStagedata);
    tileStore.addUseritems(dripStagedata);

    // tileStore.addUseritems(4, dripTileData.DripEdgeMaterial);
    // tileStore.insertDripAtIndex(6, dripTileData.DripEdgeSize);
};

watch(types, typeSizes, type, checkRoof, () => {});
watchEffect(checkValue, getdripSize, () => {});
invoke(async () => {
    await until(callState).toBe(true);
});
</script>

<template>
    <div class="flex flex-col w-96 mb-4 gap-3" style="margin-left: 20px">
        <label style="color: #122620">Drip Edge Material</label>
        <Select v-model="selectDripEdge" :options="types" placeholder="make selection" @click="checkValue" />

        <label style="color: #122620">Drip Edge Size</label>
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" @click="getdripSize" @change="emitValuesize" @update-valuesize="storeDripEdgeSize" placeholder="make selection" />
    </div>
</template>
