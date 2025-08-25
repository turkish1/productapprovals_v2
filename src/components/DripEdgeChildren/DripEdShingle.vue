<script setup>
import useShingleDrip from '@/composables/DripEdge/use-ShingleDrip';
import useDripedge from '@/composables/DripEdge/useDripedge';
import usePostShingleLambda from '@/composables/Postdata/usePostShingleLambda';
import { usedripedgeshingleStore } from '@/stores/dripEdgeShingleStore';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { selectDripEdge, selectDripEdgeSize, holdSize, type } = useDripedge();
const { dripEdge } = usePostShingleLambda();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const types = ref();

const { typeSize, dtype, holdSized } = useShingleDrip();
// Reactive value bound to the select dropdown

// Ref for the <select> element
const selectSizeRef = ref(null);

const shingleStore = usedripedgeshingleStore();
console.log(shingleStore);
// Define emits
const emit = defineEmits(['update-valuesize']);

let isRoofShingleValid = ref(false);

const typeSizes = ref();

const dripStagedata = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});
const callState = tryOnMounted(() => {
    console.log(roofType.value);
    if (roofType.value.length === 0) {
        return '';
    }
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Asphalt Shingle') {
            console.log(roofType.value[i].item);
            isRoofShingleValid.value = true;
            types.value = type.value;
        }
    }
    checkRoof();
});

const dripShingleData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);
    dripShingleData.DripEdgeSize = selectDripEdgeSize.value;
    console.log(selectDripEdgeSize.value);
    getdripSize();
};

// const resetButton = () => {
//     usedripedgeadtileStore.$reset();
//     selectDripEdgeSize.value = selectDripEdgeSizes.value;
//     selectDripEdge.value = selectDripEdges.value;
// };
// Example: Accessing the select element via the ref and for the default use
onMounted(() => {
    console.log('Select element:', selectSizeRef.value);
    checkValue();
});

function checkRoof() {
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Asphalt Shingle') {
            console.log(roofType.value[i].item);

            shingle();
        }
    }
}
function checkValue(value) {
    types.value = type.value;
    console.log(types.value);
}

function getdripSize() {
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
    dripStagedata.DripEdgeMaterial = selectDripEdge.value;
    dripStagedata.DripEdgeSize = selectDripEdgeSize.value;
    // stageDripedge();
    dripEdge(dripStagedata);
    checkRoof();
}

function shingle() {
    console.log(selectDripEdge.value);

    dripShingleData.DripEdgeMaterial = selectDripEdge.value;
    console.log(dripShingleData.DripEdgeMaterial);

    storeDripEdgeSize();
}

const storeDripEdgeSize = async (value) => {
    console.log(dripShingleData.DripEdgeSize);
    if (isRoofShingleValid.value === true) {
        dripShingleData.DripEdgeSize = selectDripEdgeSize.value;
        console.log(dripShingleData.DripEdgeSize);
        shingleStore.insertShinDripAtIndex(5, dripShingleData.DripEdgeMaterial);
        shingleStore.insertShinDripAtIndex(7, dripShingleData.DripEdgeSize);
        console.log(shingleStore);
    }

    // await stageDripedge();
};

const stageDripedge = async () => {
    // dripStagedata.DripEdgeMaterial = selectDripEdge.value;
    // dripStagedata.DripEdgeSize = selectDripEdgeSize.value;

    await dripEdge(dripStagedata);
};

watch(types, typeSizes, type, checkRoof, () => {});
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
        <Select v-model="selectDripEdge" :options="types" placeholder="make selection" @update:modelValue="checkValue" />
        <!-- @change="emitValuesize" @update-valuesize="storeDripEdgeSize" ref="selectSizeRef"-->

        <label style="color: #122620">Drip Edge Size</label>
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" @click="getdripSize" @change="emitValuesize" @update-valuesize="storeDripEdgeSize" placeholder="make selection" />
    </div>
</template>
