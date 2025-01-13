<script script="setup">
import usedripAxios from '@/composables/use-dripAxios';
// import { useGlobalStates } from '@/stores/tilenoaStore';
import { defineEmits, onMounted, ref, watch, watchEffect } from 'vue';

const { type, holdSize } = usedripAxios();
const selectDripEdge = ref('');

const types = ref();

const selectRef = ref(null);

// Define emits
const emit = defineEmits(['update-value']);
// const tileStore = useGlobalStates();
const typeSizes = ref();

// Emit the value on change
const emitValue = () => {
    emit('update-value', selectDripEdge.value);
    console.log(selectDripEdge.value);
};

onMounted(() => {
    console.log('Select element:', selectRef.value);
});

function checkValue() {
    types.value = type.value;
    console.log(types.value);
}
watch(types, typeSizes, type, () => {});

watchEffect(checkValue, emitValue, () => {});
</script>
<template>
    <div class="flex flex-col w-96 mb-4 gap-2">
        <label style="color: whitesmoke">Drip Edge Material</label>
        <!--  placeholder="    selectDripMaterial,       " -->
        <Select ref="selectRef" v-model="selectDripEdge" :options="types" placeholder="make selection" @click="checkValue" @update-value="emitValue" />
    </div>
</template>
<style></style>
