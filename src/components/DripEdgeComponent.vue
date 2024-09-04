<script setup>
// import useDripSize from '@/composables/use-dripedgesize';
import usedripAxios from '@/composables/use-dripAxios';
import { ref, watch, watchEffect } from 'vue';

// const { types, holdSize, typeSize } = useDripSize();
const { type, holdSize } = usedripAxios();
const selectDripEdge = ref();
const selectDripEdgeSize = ref();
const selectedValue = ref(null);
const types = ref();

const typeSizes = ref();
function checkValue() {
    types.value = type.value;
}

watch(types, typeSizes, type, () => {});

function getdripSize() {
    if (selectedValue.value) {
        console.log(selectedValue.value);
        if (selectedValue.value.label === 'Galvanized Steel Metal ¹') {
            typeSizes.value = holdSize.value.size1;
        }
        if (selectedValue.value.label === 'Stainless Steel Metal ²') {
            typeSizes.value = holdSize.value.size2;
        }
        if (selectedValue.value.label === 'Aluminum Metal ³') {
            typeSizes.value = holdSize.value.size3;
        }
        if (selectedValue.value.label === 'Copper Metal ⁴') {
            typeSizes.value = holdSize.value.size4;
        }
    } else {
        console.log('The element not mounted yet');
    }
}
watchEffect(checkValue, getdripSize, () => {});
</script>

<template>
    <!-- flex flex-col w-full gap-4 bg-white shadow-lg shadow-cyan-800 card w-96 grid gap-4 grid-cols-1-->
    <div class="flex flex-col w-96 mb-8 gap-4" style="margin-left: 20px">
        <label>Drip Edge Material</label>
        <Select ref="selectedValue" v-model="selectDripEdge" :options="types" placeholder="make selection" @click="checkValue" />

        <label>Drip Edge Size</label>
        <Select v-model="selectDripEdgeSize" :options="typeSizes" placeholder="make selection" @click="getdripSize" />
    </div>
</template>
