<template>
    <!-- <div ref="scrollContainer" class="infinite-container"> -->
    <div v-for="(page, index) in pages" :key="index" class="page-content">
        <!-- <div style="background-color: #262b26"> -->
        <!-- <div class="flex flex-col items-center gap-2" style="margin-left: 1200px; background-color: #eae7e2">
                    <span class="text-xl font-medium" style="background-color: #eae7e2">Scroll Down</span>
                    <span class="slidedown-icon h-8 w-8 text-primary-contrast rounded-full inline-flex items-center justify-center" style="background-color: #eae7e2">
                        <i class="pi pi-arrow-down" />
                    </span>
                </div> -->
        <!-- landing-wrapper overflow-hidden  -->
        <div class="video-background">
            <div id="home" class="video-bg">
                <div class="video-container">
                    <video autoplay muted loop class="background-video" style="">
                        <!-- <source src="@/assets/background.mp4" type="video/mp4" /> -->
                    </video>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->

    <div v-if="loading" class="loading-indicator">Loading more content...</div>
    <!-- </div> -->
</template>

<script setup>
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
/* .infinite-container {
    height: 100vh;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 2px;
} */
/* .page-content {
    margin-bottom: 1px;
} */
.loading-indicator {
    text-align: center;
    padding: 1px;
}
/* Make the video container full screen */
.video-background {
    /* position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover; */
    /* z-index: 1; */
    /*  Ensure the video stays in the background */
    position: fixed;
    left: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
}

/* Style the video to cover the entire screen */
.video-bg {
    /* position: fixed;

    width: 10px;
    height: 100px;
    object-fit: cover; /* Ensure the video covers the whole area */
    /* transform: translate(-10%, -10%);   */
    position: fixed;
    left: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    -webkit-transform: scale(0.999);
    transform: scale(0.999);
}

/* Overlay content on top of the video */
/* .content-overlay {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    padding: 20px;
} */

h1,
p {
    margin: 0;
    padding: 0;
}
</style>
