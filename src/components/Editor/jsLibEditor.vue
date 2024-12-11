<template>
    <div>
        <h1>PDF Editor</h1>

        <!-- File Upload -->
        <input type="file" @change="handleFileUpload" accept="application/pdf" />

        <div v-if="pdfLoaded">
            <h2>Modify PDF</h2>

            <!-- Add Text -->
            <label>
                Text to Add:
                <input type="text" v-model="textToAdd" />
            </label>
            <button @click="addTextToPdf">Add Text</button>

            <!-- Add Image -->
            <label>
                Upload Image:
                <input type="file" @change="handleImageUpload" accept="image/*" />
            </label>
            <button @click="addImageToPdf" :disabled="!image">Add Image</button>

            <!-- Download Modified PDF -->
            <button @click="downloadPdf">Download PDF</button>
        </div>

        <!-- Display PDF Status -->
        <div v-if="!pdfLoaded && pdfFile">Loading PDF...</div>
    </div>
</template>

<script setup>
import { PDFDocument } from 'pdf-lib';
import { ref } from 'vue';

const pdfFile = ref(null); // Store the uploaded file
const pdfDoc = ref(null); // Store the loaded PDFDocument instance
const pdfLoaded = ref(false); // Track if PDF is loaded
const textToAdd = ref(''); // Text to add to PDF
const image = ref(null); // Store the uploaded image

// Handle file upload
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
        pdfFile.value = file;
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc.value = await PDFDocument.load(arrayBuffer);
        pdfLoaded.value = true;
    }
};

// Add text to PDF
const addTextToPdf = async () => {
    if (pdfDoc.value && textToAdd.value) {
        const pages = pdfDoc.value.getPages();
        const firstPage = pages[0];
        firstPage.drawText(textToAdd.value, {
            x: 50,
            y: 700,
            size: 24,
            color: pdfDoc.value.context.RGB(0, 0, 0)
        });
        alert('Text added to PDF!');
    }
};

// Handle image upload
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            image.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

// Add image to PDF
const addImageToPdf = async () => {
    if (pdfDoc.value && image.value) {
        const pages = pdfDoc.value.getPages();
        const firstPage = pages[0];
        const imageBytes = await fetch(image.value).then((res) => res.arrayBuffer());
        const pngImage = await pdfDoc.value.embedPng(imageBytes);

        firstPage.drawImage(pngImage, {
            x: 50,
            y: 500,
            width: 150,
            height: 100
        });
        alert('Image added to PDF!');
    }
};

// Download the modified PDF
const downloadPdf = async () => {
    if (pdfDoc.value) {
        const pdfBytes = await pdfDoc.value.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'modified.pdf';
        link.click();
        URL.revokeObjectURL(link.href);
    }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 20px;
}
h1,
h2 {
    color: #333;
}
button {
    margin: 5px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
label {
    display: block;
    margin: 10px 0;
}
</style>
