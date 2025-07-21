<script setup>
// import { useAos } from '@/composables/useAos'; // if you have an AOS composable, otherwise import AOS in main.js

defineProps({
    icon: { type: String, required: true }, // e.g. 'pi-info-circle'
    title: { type: String, required: true },
    items: { type: Array, required: true }, // [{ label: '', value: '' }, …]
    // animation: { type: String, default: 'fade-up' },
    bgClass: { type: String, default: 'bg-surface' },
    textClass: { type: String, default: 'text-muted-color' }
});

// useAos(); // initialize AOS if needed
</script>

<template>
    <div :class="['flex flex-col border shadow-lg justify-center items-center max-w-96 rounded-2xl p-8 gap-4', bgClass]">
        <!-- <div class="flex flex-col bgClass border border-surface shadow-lg justify-center items-center max-w-96 rounded-2xl p-8 gap-4"> -->
        <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
            <i :class="`pi ${icon} !text-2xl`"></i>
        </div>
        <span :class="['text-2xl font-bold', textClass]">{{ title }}</span>
        <span v-for="(item, i) in items" :key="i" :class="[textClass, 'text-center']"> {{ item.label }}{{ item.value }} </span>
    </div>
</template>
<style scoped>
/* adjust the swiper-container size if you like */
</style>
