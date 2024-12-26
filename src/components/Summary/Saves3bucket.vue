<script setup>
import AWS from 'aws-sdk';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

const isUploading = ref(false);

const generateAndUploadPDF = async () => {
    try {
        isUploading.value = true;

        // 1. Generate PDF with jsPDF
        const doc = new jsPDF();
        doc.text('Hello, this is a PDF generated with jsPDF!', 10, 10);
        const pdfBlob = doc.output('blob'); // Get the PDF as a Blob

        // 2. Configure AWS S3
        const s3 = new AWS.S3({
            accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID', // Replace with your AWS access key
            secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY', // Replace with your AWS secret key
            region: 'YOUR_AWS_REGION' // Replace with your S3 bucket region
        });

        // 3. Upload the PDF to S3
        const params = {
            Bucket: 'YOUR_BUCKET_NAME', // Replace with your S3 bucket name
            Key: `pdfs/generated-${Date.now()}.pdf`, // File path and name in the bucket
            Body: pdfBlob,
            ContentType: 'application/pdf', // Specify the content type
            ACL: 'public-read' // Optional: Change to 'private' if you want restricted access
        };

        const uploadResult = await s3.upload(params).promise();
        console.log('PDF uploaded successfully:', uploadResult.Location);

        // Notify user of success
        alert(`PDF uploaded to S3: ${uploadResult.Location}`);
    } catch (error) {
        console.error('Error uploading PDF to S3:', error);
        alert('Failed to upload PDF to S3.');
    } finally {
        isUploading.value = false;
    }
};
</script>

<template>
    <div>
        <h1>Generate and Upload PDF to S3</h1>
        <button @click="generateAndUploadPDF" :disabled="isUploading">
            {{ isUploading ? 'Uploading...' : 'Generate & Upload PDF' }}
        </button>
    </div>
</template>
