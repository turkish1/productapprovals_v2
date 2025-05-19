<template>
    <div class="drag-drop-container" @dragover.prevent @drop="handleDrop">
        <p style="color: #eae7e2">Drag and drop files here or <input type="file" multiple @change="handleFileSelect" /></p>
        <ul>
            <li v-for="file in files" :key="file.name">{{ file.name }} ({{ formatBytes(file.size) }})</li>
        </ul>
        <button @click="zipAndUpload" :disabled="files.length === 0" style="color: #eae7e2">Upload to S3</button>
    </div>
</template>

<script setup>
// import { usePermitappStore } from '@/stores/permitapp';

import JSZip from 'jszip';
import { ref } from 'vue';

// State
const files = ref([]);
const dir = ref('');
// const permitStore = usePermitappStore();
const objName = ref('me20240000924');
const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
const muniProcessNumber = ref(permitStore.$state.permitapp[0].formdt?.muniProc || '');
// const objName = processNumber.value.length !== 0 ? processNumber.value : 'filess';
// const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${objName}/${dir.value}`;

// Handle file drop
const handleDrop = (event) => {
    const droppedFiles = event.dataTransfer.files;
    for (const file of droppedFiles) {
        files.value.push(file);
        console.log(files);
    }
};

// Handle file selection via input
const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    for (const file of selectedFiles) {
        files.value.push(file);
    }
};

// Format file size
const formatBytes = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
};

// Zip files and upload to S3
const zipAndUpload = async () => {
    try {
        // Create a new zip
        const zip = new JSZip();
        for (const file of files.value) {
            zip.file(file.name, file);
        }
        console.log(zip);
        const zipFileName = `uploaded_files_${Date.now()}.zip`;
        dir.value = zipFileName;
        const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${objName}/${dir.value}`;
        // Generate the zip file
        // const zipBlob = await zip.generateAsync({ type: 'blob' });
        // const zipFileName = `uploaded_files_${Date.now()}.zip`;
        //  if (!files.value.length) return;

        //         // 1. Create a new JSZip instance

        //         // 2. Add each file to the ZIP
        //         for (const file of files.value) {
        //             // file.name is the filename
        //             // "file" is a Blob/File object
        //             zip.file(file.name, file);
        //         }

        //         // 3. Generate the ZIP as a Blob
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        //         // 4. Upload the ZIP Blob to S3 via a presigned URL
        //         //    (or direct PUT if bucket is publicly writable — not recommended)
        const response = await fetch(s3Url, {
            method: 'PUT',
            body: zipBlob,
            headers: {
                // If your presigned URL expects specific headers, set them here
                // e.g. "Content-Type": "application/zip"
            }
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`);
        }

        alert('Upload succeeded!');
    } catch (error) {
        console.error('Error uploading to S3:', error);
        alert('Failed to upload file.');
    }
};
</script>

<style>
.drag-drop-container {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
}
</style>
