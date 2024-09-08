<template>
    <div class="editor-container">
        <!-- Editor Drop Zone -->
        <div class="drop-zone" @dragover.prevent @dragenter.prevent="onDragEnter" @dragleave="onDragLeave" @drop.prevent="onDrop">
            <p v-if="!images.length && !dragging" class="instructions">Drag and drop plans here</p>
            <p v-if="dragging" class="instructions dragging">Release to drop the images</p>
        </div>

        <!-- Display Uploaded Images -->
        <div class="image-gallery" v-if="images.length">
            <h3>Uploaded Images</h3>
            <div class="images-grid">
                <div v-for="(image, index) in images" :key="index" class="image-wrapper">
                    <img :src="image" alt="Uploaded Image" class="uploaded-image" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive variables
const images = ref([]); // Stores the image URLs
const dragging = ref(false); // Tracks if the user is dragging something over the drop zone

// Handle drag events
function onDragEnter() {
    dragging.value = true; // Change state when the user drags files over the zone
}

function onDragLeave() {
    dragging.value = false; // Reset the state when the user leaves the zone
}

// Handle drop event
function onDrop(event) {
    dragging.value = false; // Reset dragging state

    // Get dropped files
    const droppedFiles = event.dataTransfer.files;

    // Loop through each file and process if it's an image
    for (const file of droppedFiles) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                images.value.push(e.target.result); // Add the image to the gallery
            };

            reader.readAsDataURL(file); // Read the file as a data URL for display
        }
    }
}
</script>

<style scoped>
.editor-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}

.drop-zone {
    width: 100%;
    max-width: 500px;
    height: 300px;
    border: 2px dashed #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    margin-bottom: 20px;
    transition: background-color 0.3s;
}

.drop-zone.dragging {
    background-color: #e0e0e0;
    border-color: #666;
}

.instructions {
    color: #999;
    font-size: 1.2em;
    text-align: center;
}

.instructions.dragging {
    color: #333;
}

.image-gallery {
    width: 100%;
    max-width: 800px;
}

.images-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

.image-wrapper {
    width: 250px;
    height: 250px;
    overflow: hidden;
}

.uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}
</style>
