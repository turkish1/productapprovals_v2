<script setup>
import useDripedge from '@/composables/DripEdge/useDripedge';
import usePostBurLambda from '@/composables/Postdata/usePostBurLambda';
import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { selectDripEdge, selectDripEdgeSize, type, sizeTypeMetal } = useDripedge();
const { resetState } = usedripedgeStore();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const types = ref();
const { dripEdge } = usePostBurLambda();

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
            console.log(roofType.value[i].item);

            lowslope();
        }
    }
}
function checkValue() {
    types.value = type.value;
}

function getdripSize(event) {
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
    dripEdge(dripStagedata);
    checkRoof();
}

function lowslope() {
    dripData.DripEdgeMaterial = selectDripEdge.value;

    storeDripEdgeSize();
}

const storeDripEdgeSize = async (event) => {
    if (isRoofLowslopeValid.value === true) {
        dripData.DripEdgeSize = selectDripEdgeSize.value;
        dripStore.insertDripAtIndex(0, dripData.DripEdgeMaterial);
        dripStore.insertDripAtIndex(2, dripData.DripEdgeSize);
    }
};

const stageDripedge = async () => {
    console.log(dripStagedata);
    await dripEdge(dripStagedata);
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
        <!-- <Button label="Reset" severity="danger" @click="resetState"></Button> -->
        <label style="color: #122620">Drip Edge Material</label>
        <!--  ref="selectRef"    selectDripMaterial,  @change="emitValue" @update-value="selectDripMaterial"    " -->
        <Select v-model="selectDripEdge" :options="types" placeholder="make selection" @click="checkValue" />
        <!-- @change="emitValuesize" @update-valuesize="storeDripEdgeSize" ref="selectSizeRef"-->

        <label style="color: #122620">Drip Edge Size</label>
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" @click="getdripSize" @change="emitValuesize" @update-valuesize="storeDripEdgeSize" placeholder="make selection" />
    </div>
</template>
