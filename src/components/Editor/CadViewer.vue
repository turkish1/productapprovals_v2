<template>
    <div class="editor-container">
        <!-- Editor Drop Zone -->
        <div class="drop-zone" @dragover.prevent @dragenter.prevent="onDragEnter" @dragleave="onDragLeave" @drop.prevent="onDrop">
            <p v-if="!images.length && !dragging" class="instructions">Drag and drop plans here</p>
            <p v-if="dragging" class="instructions dragging">Release to drop the images</p>

            <!-- Display Uploaded Images -->

            <div class="image-gallery" v-if="images.length">
                <h3>Uploaded Images</h3>
                <div class="images-grid">
                    <div v-for="(image, index) in images" :key="index" class="image-wrapper">
                        <img :src="image" alt="Uploaded Image" class="uploaded-image" />
                        <Button label="" severity="info" rounded @click="deleteImages(index)"></Button>
                    </div>
                </div>
            </div>

            <!-- Uploaded Files List -->
            <div v-if="files.length" class="file-list">
                <h2 class="underline hover:underline-offset-4"></h2>
                <ul class="list-image-[url(checkmark.png)] ...">
                    <li v-for="(file, index) in files" :key="index">
                        {{ file.name }}
                        <Button @click="deleteFile(index)" severity="contrast">Delete</Button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// Reactive variables
const images = ref([]); // Stores the image URLs
const dragging = ref(false); // Tracks if the user is dragging something over the drop zone
const files = ref([]);

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
        // startsWith
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
            const reader = new FileReader();

            reader.onload = (e) => {
                images.value.push(e.target.result); // Add the image to the gallery
            };

            reader.readAsDataURL(file); // Read the file as a data URL for display
        }
        files.value.push(file);
    }
}

const deleteImages = (index) => {
    // images.value.splice(index, 1);
    deleteFile(index);
};
// Delete a file by index
const deleteFile = (index) => {
    files.value.splice(index, 1);
    images.value.splice(index, 1);
    console.log(images.value, files.value);
};
</script>

<style scoped>
.editor-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 50px;
    width: 100%;
}

.drop-zone {
    width: 700px;
    height: 800px;
    border: 2px dashed #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #e0e0e0; */
    margin-bottom: 10px;
    margin-left: 40px;
    transition: background-color 0.3s;
    background-image: url('/demo/images/cad.jpeg');
    background-size: cover; /* Options: contain, cover, auto */
    background-position: center;
}

.drop-zone.dragging {
    background-color: #e0e0e0;
    border-color: #666;
}

.instructions {
    color: #0b0808;
    font-size: 1.2em;
    text-align: center;
}

.instructions.dragging {
    color: #333;
}

.image-gallery {
    width: 100%;
    max-width: 750px;
}

.images-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
}

.image-wrapper {
    width: 'object-fit';
    height: 'object-fit';
    overflow: hidden;
}

.uploaded-image {
    width: 100%;
    height: 700px;
    object-fit: cover;
    border-radius: 8px;
}
</style>
