<script setup>
import useLowslopeDrip from '@/composables/DripEdge/use-LowslopeDrip';

import useDripedge from '@/composables/DripEdge/useDripedge';

import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { selectDripEdge, selectDripEdgeSize, holdSize, type } = useDripedge();
const { resetState } = usedripedgeStore();
// const { type, holdSize, hold } = usedripAxios();
// const selectDripEdge = ref('');

const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const types = ref();

const typesLw = ref();
const { typeSize, ltype } = useLowslopeDrip();

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
            console.log(roofType.value[i].item);
            isRoofLowslopeValid.value = true;
        }
    }
    checkRoof();
});

const dripData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);
    console.log(selectDripEdgeSize.value);
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
            console.log(roofType.value[i].item);

            lowslope();
        }
    }
}
function checkValue() {
    types.value = type.value;
    console.log(types.value);
}

function getdripSize(event) {
    console.log(selectDripEdge.value);
    if (selectDripEdge.value) {
        if (selectDripEdge.value === 'Galvanized Steel Metal ¹') {
            typeSizes.value = holdSize.value.size1;
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
    console.log(typeSizes.value);
    checkRoof();
}

function lowslope() {
    // console.log(selectDripEdge.value);

    // console.log(ltype.value);
    dripData.DripEdgeMaterial = selectDripEdge.value;
    // console.log(dripData.DripEdgeMaterial);

    // console.log(dripStore);
    storeDripEdgeSize();
    // storeDripEdgeSize(selectDripEdgeSize.value);
}

const storeDripEdgeSize = (event) => {
    console.log(dripData.DripEdgeSize);
    if (isRoofLowslopeValid.value === true) {
        console.log(selectDripEdgeSize.value);
        dripData.DripEdgeSize = selectDripEdgeSize.value;
        console.log(dripData.DripEdgeSize);
        dripStore.insertDripAtIndex(0, dripData.DripEdgeMaterial);
        dripStore.insertDripAtIndex(2, dripData.DripEdgeSize);
        console.log(dripStore.$state.dripinput);
        // isRoofLowslopeValid.value = false;
    }
};
const resetButton = () => {
    dripStore.$reset();
};
watch(types, typeSizes, type, checkRoof, resetButton, () => {});
watchEffect(checkValue, getdripSize, () => {});
invoke(async () => {
    await until(callState).toBe(true);
});
</script>

<template>
    <!-- flex flex-col w-full gap-4 bg-white shadow-lg shadow-cyan-800 card w-96 grid gap-4 grid-cols-1-->
    <div class="flex flex-col w-96 mb-4 gap-3" style="margin-left: 20px">
        <Button label="Reset" severity="danger" @click="resetState"></Button>
        <label style="color: whitesmoke">Drip Edge Material</label>
        <!--  ref="selectRef"    selectDripMaterial,  @change="emitValue" @update-value="selectDripMaterial"    " -->
        <Select v-model="selectDripEdge" :options="types" placeholder="make selection" @click="checkValue" />
        <!-- @change="emitValuesize" @update-valuesize="storeDripEdgeSize" ref="selectSizeRef"-->

        <label style="color: whitesmoke">Drip Edge Size</label>
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" @click="getdripSize" @change="emitValuesize" @update-valuesize="storeDripEdgeSize" placeholder="make selection" />
    </div>
</template>
