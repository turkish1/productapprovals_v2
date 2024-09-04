<script setup>
const { isActive } = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['click']);
</script>
<template>
    <button class="w-40 h-16 m-8 p-5 text-md leading-none bg-blue text-orange text-center rounded-[5px] btn-submit" :class="isActive ? ['blue', 'cursor-pointer'] : ['blue', 'cursor-pointer']" :disabled="!isActive" @click="emit('click')">
        <slot></slot>
    </button>
</template>
