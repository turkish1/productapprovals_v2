<template>
    <div class="video-container">
        <video autoplay muted loop class="background-video">
            <source src="/public/demo/images/Tile.mp4" type="video/mp4" />
        </video>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// Load the next page when user scrolls to the bottom

onMounted(() => {
    setTimeout(() => {
        router.push('/scroll'); // Replace '/another-page' with your desired route
    }, 6000);
});
// Set up Intersection Observer to detect when user reaches the bottom

/* stop the observer once everything is loaded */
</script>

<style scoped>
.video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1; /* Puts video behind content */
}

.background-video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the video covers the entire screen */
}
.content-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    z-index: 1; /* Places content above the video */
}
</style>
