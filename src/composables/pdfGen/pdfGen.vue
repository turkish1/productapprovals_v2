<!-- PdfGenerator.vue -->
<template>
    <div>
        <div id="content">
            <h1>{{ title }}</h1>
            <p>{{ content }}</p>
        </div>
        <button @click="generatePdf">Generate PDF</button>
    </div>
</template>

<script setup>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ref } from 'vue';

// Example data to be converted to PDF
const title = ref('Hello, World!');
const content = ref('This is some example content to be included in the PDF.');

// Function to generate PDF from HTML content
const generatePdf = () => {
    const element = document.getElementById('content');

    // Use html2canvas to capture the element as a canvas
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF();

        // Add the captured image data to the PDF
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

        // Save the generated PDF
        pdf.save('generated.pdf');

        const pdfBlob = pdf.output('blob');

        // Save the PDF Blob using the File System Access API
        savePdfBlob(pdfBlob);
    });

    const savePdfBlob = async (blob) => {
        // Check if the File System Access API is supported
        if (window.showSaveFilePicker) {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: 'generated.pdf',
                    types: [
                        {
                            description: 'PDF file',
                            accept: {
                                'application/pdf': ['.pdf']
                            }
                        }
                    ]
                });

                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
            } catch (error) {
                console.error('Error saving file:', error);
            }
        } else {
            // Fallback for unsupported browsers
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };
};
</script>

<style>
#content {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
}
</style>
