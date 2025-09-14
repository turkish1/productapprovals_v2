<script setup>
import useMechtileDrip from '@/composables/DripEdge/use-MechtileDrip';
import useDripedge from '@/composables/DripEdge/useDripedge';
import { usedripMStore } from '@/stores/dripEdgeMechTileStore';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { selectDripEdge, selectDripEdgeSize, holdSize, type } = useDripedge();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const types = ref();

const { typeSize, dtype, holdSized } = useMechtileDrip();
// Reactive value bound to the select dropdown

// Ref for the <select> element
const selectSizeRef = ref(null);

const mechtileStore = usedripMStore();
// Define emits
const emit = defineEmits(['update-valuesize']);

let isRoofTileMechanicalValid = ref(false);

const typeSizes = ref();

const dripStagedata = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});
const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    }
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Mechanical Fastened Tile') {
            console.log(roofType.value[i].item);
            isRoofTileMechanicalValid.value = true;
            types.value = type.value;
        }
    }
    checkRoof();
});

const dripMTileData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);
    dripMTileData.DripEdgeSize = selectDripEdgeSize.value;
    getdripSize();
};

onMounted(() => {
    checkValue();
});

function checkRoof() {
    for (let i = 0; i < roofType.value.length; i++) {
        if (roofType.value[i].item === 'Mechanical Fastened Tile') {
            console.log(roofType.value[i].item);
        }
    }
    mtile();
}
function checkValue() {
    types.value = type.value;
    // console.log(types.value, value);
}

async function getdripSize() {
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

    checkRoof();
}

function mtile() {
    dripMTileData.DripEdgeMaterial = selectDripEdge.value;

    storeDripEdgeSize();
}

const storeDripEdgeSize = async (value) => {
    mechtileStore.resetState();

    mechtileStore.addUseritems(dripStagedata);
    console.log(mechtileStore);
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
        <Select v-model="selectDripEdge" :options="types" placeholder="make selection" @update:modelValue="checkValue" />

        <label style="color: #122620">Drip Edge Size</label>
        <!-- @update-valuesize="storeDripEdgeSize" -->
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" @click="getdripSize" @change="emitValuesize" placeholder="make selection" />
    </div>
</template>
