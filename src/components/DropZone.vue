<template>
    <div class="bg-clip-content p-6 bg-gray w-2/3 border-4 border-midnight border-dashed">
        <div class="file-drop-zone" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop" @dragleave.prevent="handleDragLeave">
            <p v-if="!files.length">Drag and drop files here, or click to select files</p>
            <input type="file" multiple @change="handleFileSelect" ref="fileInput" style="display: none" />
            <div class="file-previews">
                <div v-for="(file, index) in files" :key="index" class="file-preview">
                    <img v-if="isImage(file)" :src="file.preview" alt="File preview" />
                    <p>{{ file.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const files = reactive([]);
const fileInput = ref(null);

const handleDragOver = () => {
    // Add a class to indicate dragging over the drop zone
};

const handleDragLeave = () => {
    // Remove the class when leaving the drop zone
};

const handleDrop = (event) => {
    const droppedFiles = event.dataTransfer.files;
    handleFiles(droppedFiles);
};

const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    handleFiles(selectedFiles);
};

const handleFiles = (filesList) => {
    Array.from(filesList).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            file.preview = e.target.result;
            files.push(file);
        };
        if (isImage(file)) {
            reader.readAsDataURL(file);
        } else {
            files.push(file);
        }
    });
};

const isImage = (file) => {
    return file.type.startsWith('image/');
};
</script>

<style scoped>
.file-drop-zone {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
}

.file-drop-zone:hover {
    border-color: #aaa;
}

.file-previews {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.file-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.file-preview img {
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
}

.file-preview p {
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
    word-break: break-word;
}
</style>
