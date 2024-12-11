<template>
    <div>
        <h1>Upload PDF to S3</h1>
        <input type="file" @change="uploadFile" accept="application/pdf" />
        <div v-if="uploadProgress > 0">
            <p>Uploading: {{ uploadProgress }}%</p>
        </div>
        <div v-if="uploadUrl">
            <p>File uploaded successfully! <a :href="uploadUrl" target="_blank">View PDF</a></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const bucketName = 'dsr-pdfupload';
const region = 'us-east-1'; // Example: 'us-east-1'
const uploadProgress = ref(0);
const uploadUrl = ref('https://dsr-pdfupload.s3.us-east-1.amazonaws.com/files');

const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    const fileName = file.name; // Keep original name or generate a new one
    const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/files/${fileName}`;

    try {
        const response = await fetch(s3Url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type
            },
            body: file
        });

        if (response.ok) {
            uploadUrl.value = s3Url;
            alert('File uploaded successfully!');
        } else {
            alert(`Failed to upload file. Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file.');
    }
};
</script>

<style>
h1 {
    font-family: Arial, sans-serif;
    color: #333;
}
input {
    margin: 10px 0;
}
</style>
