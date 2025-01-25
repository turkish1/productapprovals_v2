<script setup>
// import DripEdgeMaterial from '@/components/DripEdgeChildren/DripEgdeMaterial.vue';
import usedripAxios from '@/composables/use-dripAxios';
import { storeToRefs } from 'pinia';

import { usedripedgeadtileStore } from '@/stores/dripEdgeADTileStore';
import { usedripedgeStore } from '@/stores/dripEdgeStore';

import { usedripedgemtileStore } from '@/stores/dripEdgeMechTileStore';

import { usedripedgeshingleStore } from '@/stores/dripEdgeShingleStore';

import { defineEmits, onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { type, holdSize } = usedripAxios();
const selectDripEdge = ref('');
const selectDripEdgeSize = ref('');

const types = ref();

// Reactive value bound to the select dropdown

// Ref for the <select> element

const selectSizeRef = ref(null);

// Define emits
const emit = defineEmits(['update-valuesize']);
const dripStore = usedripedgeStore();
const dripadTileStore = usedripedgeadtileStore();
const dripmechTileStore = usedripedgemtileStore();
const dripShingleStore = usedripedgeshingleStore();

const { dripedgeStore } = storeToRefs(dripStore);
const { dripedgeadTileStore } = storeToRefs(dripadTileStore);
const { dripedgemechTileStore } = storeToRefs(dripmechTileStore);
const { dripedgeShingleStore } = storeToRefs(dripShingleStore);
const typeSizes = ref();
const storeMaterial = ref('');
const storeSize = ref('');

const dripData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const dripShinData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const dripTileData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});

const dripMTileData = reactive({
    DripEdgeMaterial: '',
    DripEdgeSize: ''
});
const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);

    getdripSize();
};

// Example: Accessing the select element via the ref and for the default use
onMounted(() => {
    console.log('Select element:', selectSizeRef.value);
    checkValue();
});

function checkValue() {
    types.value = type.value;
    console.log(types.value);
}

function getdripSize() {
    if (selectDripEdge.value) {
        if (selectDripEdge.value === 'Galvanized Steel Metal ¹') {
            typeSizes.value = holdSize.value.size1;
        }
        if (selectDripEdge.value === 'Stainless Steel Metal ²') {
            typeSizes.value = holdSize.value.size2;
        }
        if (selectDripEdge.value === 'Aluminum Metal ³') {
            typeSizes.value = holdSize.value.size3;
        }
        if (selectDripEdge.value === 'Copper Metal ⁴') {
            typeSizes.value = holdSize.value.size4;
        }
    } else {
        console.log('The element not mounted yet');
    }
    calldrip();
}
const storeId = ref(dripStore.$state.id || '');
const shinstoreId = ref(dripShingleStore.$state.id || '');
const mtilestoreId = ref(dripmechTileStore.$state.id || '');
const tilestoreId = ref(dripadTileStore.$state.id || '');

console.log(mtilestoreId);

function calldrip() {
    console.log(dripShingleStore.$state);
    // console.log( dripadTileStore.$state)

    if (storeId.value === 0) {
        dripData.DripEdgeMaterial = selectDripEdge.value;
        dripStore.addDrip(dripData.DripEdgeMaterial);
    }
    if (shinstoreId.value === 1) {
        dripShinData.DripEdgeMaterial = selectDripEdge.value;
        dripShingleStore.addShinDrip(dripShinData.DripEdgeMaterial);
    }
    if (mtilestoreId.value === 2) {
        dripMTileData.DripEdgeMaterial = selectDripEdge.value;
        dripmechTileStore.addMTileDrip(dripMTileData.DripEdgeMaterial);
    }
    if (tilestoreId.value === 3) {
        dripTileData.DripEdgeMaterial = selectDripEdge.value;
        console.log(dripTileData);
        dripadTileStore.addDripTile(dripTileData.DripEdgeMaterial);
    }

    storeDripEdgeSize(selectDripEdgeSize.value);
}

const storeDripEdgeSize = (value) => {
    if (storeId.value === 0) {
        dripData.DripEdgeSize == value;
        dripStore.addDrip(dripData.DripEdgeSize);
    }

    if (shinstoreId.value === 1) {
        dripShinData.DripEdgeSize = value;
        dripShingleStore.addShinDrip(dripShinData.DripEdgeSize);
    }

    if (mtilestoreId.value === 2) {
        dripMTileData.DripEdgeSize = value;
        dripmechTileStore.addMTileDrip(dripMTileData.DripEdgeSize);
    }
    if (tilestoreId.value === 3) {
        dripTileData.DripEdgeSize = value;
        dripadTileStore.addDripTile(dripTileData.DripEdgeSize);
    }

    console.log(dripadTileStore.$state.dripinputadt);
};

watch(types, typeSizes, type, () => {});
watchEffect(checkValue, getdripSize, () => {});
</script>

<template>
    <!-- flex flex-col w-full gap-4 bg-white shadow-lg shadow-cyan-800 card w-96 grid gap-4 grid-cols-1-->
    <div class="flex flex-col w-96 mb-4 gap-3" style="margin-left: 20px">
        <label style="color: whitesmoke">Drip Edge Material</label>
        <!--  ref="selectRef"    selectDripMaterial,  @change="emitValue" @update-value="selectDripMaterial"    " -->
        <Select v-model="selectDripEdge" :options="types" placeholder="make selection" @click="checkValue" />
        <!-- @change="emitValuesize" @update-valuesize="storeDripEdgeSize" ref="selectSizeRef"-->

        <label style="color: whitesmoke">Drip Edge Size</label>
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" @click="getdripSize" @change="emitValuesize" @update-valuesize="storeDripEdgeSize" placeholder="make selection" />
    </div>
</template>
