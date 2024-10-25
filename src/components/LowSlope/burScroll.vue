<template>
    <div ref="scrollContainer" class="infinite-container">
        <div v-for="(page, index) in pages" :key="index" class="page-content">
            <!-- style="background-color: #262b26" -->
            <div>
                <logicBur1><slot name="Low Slope"></slot></logicBur1>
            </div>
        </div>

        <div v-if="loading" class="loading-indicator">Loading more content...</div>
    </div>
</template>

<script setup>
import logicBur1 from '@/components/LowSlope/logicBur1.vue';

import { useIntersectionObserver } from '@vueuse/core';
import { onMounted, ref, watchEffect } from 'vue';
// Mock data for pages
const pageData = [{ content: 'This is content from Page 1' }];

const pages = ref([pageData[0]]); // Start with the first page
const loading = ref(false); // Loading indicator state
const currentPage = ref(0); // Track which page is being loaded

// Load the next page when user scrolls to the bottom
const loadNextPage = () => {
    if (currentPage.value < pageData.length - 1) {
        loading.value = true;
        setTimeout(() => {
            currentPage.value++;
            pages.value.push(pageData[currentPage.value]);
            loading.value = false;
        }, 1000); // Simulate network delay
    }
};

// Set up Intersection Observer to detect when user reaches the bottom
const scrollContainer = ref(null);
const { stop } = useIntersectionObserver(
    scrollContainer,
    ([{ isIntersecting }]) => {
        if (isIntersecting) loadNextPage();
        console.log(scrollContainer);
    },
    { threshold: 1 }
);
console.log(useIntersectionObserver());
onMounted(() => {
    watchEffect(() => {
        // Clean up observer if all pages are loaded
        if (currentPage.value === pageData.length - 1) stop();
    });
});
</script>

<style scoped>
.infinite-container {
    height: 55vh;
    overflow-y: auto;
    /* border: 1px solid #ccc; */
    padding: 2px;
}
.page-content {
    margin-bottom: 1px;
}
.loading-indicator {
    text-align: center;
    padding: 1px;
}
</style>
