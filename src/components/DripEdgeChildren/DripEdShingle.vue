<script setup>
import useShingleDrip from '@/composables/DripEdge/use-ShingleDrip';
import useDripedge from '@/composables/DripEdge/useDripedge';
import usePostShingleToLambda from '@/composables/Postdata/usePostShingleLambda';

import { usedripedgeshingleStore } from '@/stores/dripEdgeShingleStore';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { selectDripEdge, selectDripEdgeSize, holdSize, type } = useDripedge();
const { dripEdge } = usePostShingleToLambda();

const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const types = ref();
const typesSh = ref();

const { stype, holdSizeshingle } = useShingleDrip();
// Reactive value bound to the select dropdown

// Ref for the <select> element
const selectSizeRef = ref(null);

// Define emits
const emit = defineEmits(['update-valuesize']);

const dripShingleStore = usedripedgeshingleStore();
const { selectDripEdges, selectDripEdgeSizes } = storeToRefs(dripShingleStore);
const { resetState } = dripShingleStore;

let isRoofShingleValid = ref(false);

const typeSizes = ref();
const typeSizeSh = ref();

const callState = tryOnMounted(() => {
    console.log(roofType.value);
    if (roofType.value.length === 0) {
        return '';
    }
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Asphalt Shingle') {
            console.log(roofType.value[i].item);
            isRoofShingleValid.value = true;
            typesSh.value = stype.value;
        }
    }
    checkRoof();
});

const dripShinData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const dripStagedata = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);
    dripShinData.DripEdgeSize = selectDripEdgeSize.value;
    getdripSize();
};

const resetButton = () => {
    dripShingleStore.$reset();
    selectDripEdgeSize.value = selectDripEdgeSizes.value;
    selectDripEdge.value = selectDripEdges.value;
};
// Example: Accessing the select element via the ref and for the default use
onMounted(() => {
    console.log('Select element:', selectSizeRef.value);
    checkValue();
});

function checkRoof() {
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Asphalt Shingle') {
            console.log(roofType.value[i].item);

            shingles();
        }
    }
}
function checkValue() {
    types.value = type.value;
    console.log(types.value);
}

function getdripSize() {
    console.log(selectDripEdge.value);
    if (selectDripEdge.value) {
        if (selectDripEdge.value === 'Galvanized Steel Metal ¹') {
            typeSizes.value = holdSize.value.size1;
            isdripMaterialValid.value = true;
            isdripsizeValid.value = true;
            console.log(isdripMaterialValid.value);
            checkRoof();
        }
        if (selectDripEdge.value === 'Stainless Steel Metal ²') {
            typeSizes.value = holdSize.value.size2;
            isdripMaterialValid.value = true;
            isdripsizeValid.value = true;
            console.log(isdripMaterialValid.value);
            checkRoof();
        }
        if (selectDripEdge.value === 'Aluminum Metal ³') {
            typeSizes.value = holdSize.value.size3;
            isdripMaterialValid.value = true;
            isdripsizeValid.value = true;
            console.log(isdripMaterialValid.value);
            checkRoof();
        }
        if (selectDripEdge.value === 'Copper Metal ⁴') {
            typeSizes.value = holdSize.value.size4;
            isdripMaterialValid.value = true;
            isdripsizeValid.value = true;
            console.log(isdripMaterialValid.value);
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

function shingles() {
    console.log(selectDripEdge.value);
    // console.log(selectSizeRef.value)
    typeSizeSh.value = holdSizeshingle.value;

    dripShinData.DripEdgeMaterial = selectDripEdge.value;
    console.log(dripShinData.DripEdgeMaterial);

    storeDripEdgeSize();
}
const isdripMaterialValid = ref(false);
const isdripsizeValid = ref(false);

const storeDripEdgeSize = async (value) => {
    console.log(dripShinData.DripEdgeSize);
    if (isRoofShingleValid.value === true) {
        dripShinData.DripEdgeSize = selectDripEdgeSize.value;
        dripShingleStore.insertShinDripAtIndex(1, dripShinData.DripEdgeMaterial);
        dripShingleStore.insertShinDripAtIndex(3, dripShinData.DripEdgeSize);
    }
};

const stageDripedge = async () => {
    console.log(dripStagedata);

    try {
        if (isdripMaterialValid.value === true && isdripsizeValid.value == true) {
            console.log(dripStagedata);
            return await dripEdge(dripStagedata);
        } else {
            console.log('The if statemeant failed');

            return [];
        }
    } catch (err) {
        console.error('Lambda post failed:', err);
    } finally {
        loading.value = false;
    }
};

watch(types, typeSizes, type, checkRoof, resetButton, stageDripedge, () => {});
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
