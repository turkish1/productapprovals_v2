<script setup>
import useDripSize from '@/composables/use-dripedgesize';
import { ref } from 'vue';

const { types, holdSize, typeSize } = useDripSize();

const selectDripEdge = ref();
const selectDripEdgeSize = ref();
const selectedValue = ref(null);

watchEffect(() => {
    if (selectedValue.value) {
        if (selectedValue.value.label === 'Galvanized Steel Metal ¹') {
            typeSize.value = holdSize.value.size1;
        }
        if (selectedValue.value.label === 'Stainless Steel Metal ²') {
            typeSize.value = holdSize.value.size2;
        }
        if (selectedValue.value.label === 'Aluminum Metal ³') {
            typeSize.value = holdSize.value.size3;
        }
        if (selectedValue.value.label === 'Copper Metal ⁴') {
            typeSize.value = holdSize.value.size4;
        }
    } else {
        console.log('The element not mounted yet');
    }
});
</script>

<template>
    <div class="card w-96 grid gap-4 grid-cols-1">
        <label>Drip Edge Material</label>
        <Select ref="selectedValue" v-model="selectDripEdge" :options="types" placeholder="make selection" />

        <label>Drip Edge Size</label>
        <Select v-model="selectDripEdgeSize" :options="typeSize" placeholder="make selection" />
    </div>
</template>
