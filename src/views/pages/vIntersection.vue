<template>
    <!-- Background container with video -->
    <div id="background-container">
        <!-- Fullscreen video background -->
        <video id="background-video" autoplay loop muted playsinline>
            <source src="@/assets/cityvideo.mp4" type="video/mp4" />
            <!-- Fallback text -->
            Your browser does not support the video tag.
        </video>

        <!-- Overlay content on top of the video -->
        <div class="content"></div>
    </div>
</template>

<script setup></script>

<style scoped>
#background-container {
    position: relative;
    width: 100%;
    height: 100vh; /* Full viewport height */
    overflow: hidden;
}
#background-video {
    position: fixed; /* Fixed positioning makes the video fill the screen */
    top: 0;
    left: 0;
    width: 110vw; /* Full viewport width */
    height: 100vh; /* Full viewport height */
    object-fit: cover; /* Ensures video covers the viewport without distortion */
    z-index: -1; /* Places video behind the content */
}
.content {
    position: relative;
    z-index: 1; /* Ensures content is above the video */
    color: white;
    text-align: center;
    padding: 20px;
}
</style>
