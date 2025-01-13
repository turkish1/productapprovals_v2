<script script="setup">
import DripEdgeMaterial from '@/components/DripEdgeChildren/DripEdgeMaterial';
import usedripAxios from '@/composables/use-dripAxios';
import { useGlobalStates } from '@/stores/tilenoaStore';
import { defineEmits, onMounted, ref, watch, watchEffect } from 'vue';

const { type, holdSize } = usedripAxios();
const selectDripEdge = ref('');

const selectDripEdgeSize = ref('');

const types = ref();
const emit = defineEmits(['update-valuesize']);

const selectDripMaterial = (value) => {
    tileStore.tilenoa.value[0].dripEdgeMaterial = value;
    console.log(tileStore.tilenoa.value[0].dripEdgeMaterial);
};

const selectSizeRef = ref(null);

const tileStore = useGlobalStates();
const typeSizes = ref();

const emitValuesize = () => {
    emit('update-valuesize', selectDripEdgeSize.value);
    console.log(selectDripEdgeSize.value);
};

// const handleUpdate = (value) => {
//     selectDripEdge.value = value;
// };

// Example: Accessing the select element via the ref and for the default use
onMounted(() => {
    console.log('Select element:', selectRefsize.value);
});

function checkValue() {
    types.value = type.value;
    console.log(types.value);
}

watch(types, typeSizes, type, handleUpdate, () => {});

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
}

// const storeDripEdgeSize = (value) => {
//     tileStore.tilenoa.value[0].dripEdgeSize = value;
//     console.log(tileStore.tilenoa.value[0].dripEdgeSize);
// };

watchEffect(checkValue, getdripSize, storeDripEdgeSize, emitValuesize, () => {
    console.log(tileStore.tilenoa.value[0].dripEdgeSize);
});
</script>
<template>
    <div class="flex flex-col w-96 mb-4 gap-3" style="margin-left: 20px">
        <label style="color: whitesmoke">Drip Edge Size</label>
        <Select ref="selectSizeRef" v-model="selectDripEdgeSize" :options="typeSizes" placeholder="make selection" @change="emitValuesize" />
        <DripEdgeMaterial @update-value="handleUpdate" />
    </div>
</template>
<style></style>
