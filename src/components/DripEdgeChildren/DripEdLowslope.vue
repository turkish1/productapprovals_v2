<script setup>
import useDripedge from '@/composables/DripEdge/useDripedge';
import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { selectDripEdge, selectDripEdgeSize, type, sizeTypeMetal } = useDripedge();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const types = ref();

// Ref for the <select> element
const selectSizeRef = ref(null);

// Define emits
const emit = defineEmits(['update-valuesize']);
const dripStore = usedripedgeStore();

let isRoofLowslopeValid = ref(false);

const typeSizes = ref();

const callState = tryOnMounted(() => {
    console.log(roofType.value);
    if (roofType.value.length === 0) {
        return '';
    }
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Low Slope') {
            isRoofLowslopeValid.value = true;
        }
    }
    checkRoof();
});

const dripData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});
const dripStagedata = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);
    dripData.DripEdgeSize = selectDripEdgeSize.value;
    getdripSize();
};

// Example: Accessing the select element via the ref and for the default use
onMounted(() => {
    console.log('Select element:', selectSizeRef.value);
    checkValue();
});

function checkRoof() {
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Low Slope') {
            // console.log(roofType.value[i].item);

            lowslope();
        }
    }
}
function checkValue() {
    types.value = type.value;
}

function getdripSize() {
    if (selectDripEdge.value) {
        if (selectDripEdge.value === 'Galvanized Steel Metal ¹') {
            typeSizes.value = sizeTypeMetal.galvanized;
            checkRoof();
        }
        if (selectDripEdge.value === 'Stainless Steel Metal ²') {
            typeSizes.value = sizeTypeMetal.stainless;
            checkRoof();
        }
        if (selectDripEdge.value === 'Aluminum Metal ³') {
            typeSizes.value = sizeTypeMetal.aluminum;
            checkRoof();
        }
        if (selectDripEdge.value === 'Copper Metal ⁴') {
            typeSizes.value = sizeTypeMetal.copper;
            checkRoof();
        }
    } else {
        console.log('The element not mounted yet');
    }
    dripStagedata.DripEdgeMaterial = selectDripEdge.value;
    dripStagedata.DripEdgeSize = selectDripEdgeSize.value;
    storeDripEdgeSize();

    checkRoof();
}

function lowslope() {
    dripData.DripEdgeMaterial = selectDripEdge.value;
}

const storeDripEdgeSize = () => {
    dripStore.resetState();
    dripData.DripEdgeSize = selectDripEdgeSize.value;
    dripStore.addUseritems(dripStagedata);
};

watch(types, typeSizes, type, checkRoof, () => {});
watchEffect(checkValue, getdripSize, () => {});
invoke(async () => {
    await until(callState).toBe(true);
});
</script>

<template>
    <div class="flex flex-col w-96 mb-4 gap-3" style="margin-left: 20px">
        <!-- <Button label="Reset" severity="danger" @click="resetState"></Button> -->
        <label style="color: #122620">Drip Edge Material</label>
        <Select v-model="selectDripEdge" :options="types" placeholder="make selection" @click="checkValue" />

        <label style="color: #122620">Drip Edge Size</label>
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" @click="getdripSize" @change="emitValuesize" @update-valuesize="storeDripEdgeSize" placeholder="make selection" />
    </div>
</template>
