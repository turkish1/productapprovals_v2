<template>
    <div class="editor-container">
        <!-- Editor Drop Zone -->
        <div class="drop-zone" @dragover.prevent @dragenter.prevent="onDragEnter" @dragleave="onDragLeave" @drop.prevent="onDrop" @change="handleFileUpload">
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
                <ul class="list-image-[url(/demo/images/checkmark.png)] ...">
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
import useSignpdf from '@/composables/Signpdf/use-signpdf.js';
import { usePermitappStore } from '@/stores/permitapp';
import { ref } from 'vue';

const permitStore = usePermitappStore();

const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
const objName = processNumber.value.length !== 0 ? processNumber.value : 'filez';
const images = ref([]); // Stores the image URLs
const dragging = ref(false); // Tracks if the user is dragging something over the drop zone
const files = ref([]);
const { getNumbers } = useSignpdf();
const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${objName}/${files}`;
// Handle drag events

function onDragEnter() {
    dragging.value = true; // Change state when the user drags files over the zone
}

function onDragLeave() {
    dragging.value = false; // Reset the state when the user leaves the zone
}
const pdfFile = ref('');
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

        console.log(files.value[0].name);
        // editPdf(pdfFile.value);
    }
}
// Format file size
// const formatBytes = (bytes) => {
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   if (bytes === 0) return '0 Bytes';
//   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
//   return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
// };

// async function zipAndUpload() {
//     try {
//         if (!files.value.length) return;

//         // 1. Create a new JSZip instance
//         const zip = new JSZip();

//         // 2. Add each file to the ZIP
//         for (const file of files.value) {
//             // file.name is the filename
//             // "file" is a Blob/File object
//             zip.file(file.name, file);
//         }

//         // 3. Generate the ZIP as a Blob
//         const zipBlob = await zip.generateAsync({ type: 'blob' });

//         // 4. Upload the ZIP Blob to S3 via a presigned URL
//         //    (or direct PUT if bucket is publicly writable — not recommended)
//         const response = await fetch(s3Url, {
//             method: 'PUT',
//             body: zipBlob,
//             headers: {
//                 // If your presigned URL expects specific headers, set them here
//                 // e.g. "Content-Type": "application/zip"
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Upload failed with status ${response.status}`);
//         }

//         alert('Upload succeeded!');
//     } catch (error) {
//         console.error('Error zipping/uploading:', error);
//         alert('Error: ' + error.message);
//     }
// }
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
    background-color: #3a7249;
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
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
}
</style>
