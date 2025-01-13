<script setup>
// import DripEdgeMaterial from '@/components/DripEdgeChildren/DripEgdeMaterial.vue';
import usedripAxios from '@/composables/use-dripAxios';
import { storeToRefs } from 'pinia';

import { usedripedgeStore } from '@/stores/dripEdgeStore';
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

const { dripedgeStore } = storeToRefs(dripStore);
const typeSizes = ref();
const storeMaterial = ref('');
const storeSize = ref('');
// Emit the value on change
// const emitValue = () => {
//     emit('update-value', selectDripEdge.value);

//     storeMaterial.value = selectDripEdge.value;
//     console.log(storeMaterial.value);
// };

const dripData = reactive({
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

function calldrip() {
    dripData.DripEdgeMaterial = selectDripEdge.value;

    dripStore.addDrip(dripData.DripEdgeMaterial);

    console.log(dripStore.$state);

    storeDripEdgeSize(selectDripEdgeSize.value);
}

const storeDripEdgeSize = (value) => {
    dripData.DripEdgeSize = value;
    dripStore.addDrip(dripData.DripEdgeSize);
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
