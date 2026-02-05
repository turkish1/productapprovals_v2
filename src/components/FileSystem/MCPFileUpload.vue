<script setup>
import { ref } from 'vue';

const file = ref(null);
const results = ref(null);
const loading = ref(false);

const LAMBDA_URL = 'https://werbea42zljk4wi4tol7er46xq0yxvwi.lambda-url.us-east-1.on.aws/';

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
};
const isProcessing = ref(false);
const resultData = ref(null);

// const convertPdfToImage = async (file) => {
//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//     const page = await pdf.getPage(1);
//     const viewport = page.getViewport({ scale: 2.0 }); // Good balance for Textract

//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     await page.render({ canvasContext: context, viewport }).promise;
//     // Convert to clean base64 string without the "data:image/jpeg;base64," prefix
//     return canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
// };

const sendToLambda = async (base64Data) => {
    isProcessing.value = true;
    try {
        const response = await fetch(LAMBDA_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': SHARED_SECRET // This secures your Lambda URL
            },
            body: JSON.stringify({
                document: base64Data
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Server Error: ${errText}`);
        }

        resultData.value = await response.json();
        console.log('Verification Success:', resultData.value);
    } catch (error) {
        console.error('Upload failed:', error);
        alert('Verification failed: ' + error.message);
    } finally {
        isProcessing.value = false;
    }
};

const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    let base64Payload;

    if (file.type === 'application/pdf') {
        base64Payload = await convertPdfToImage(file);
    } else {
        // For JPEG/PNG, just extract the raw base64
        const reader = new FileReader();
        base64Payload = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });
    }

    await sendToLambda(base64Payload);
};
</script>

<template>
    <div class="modal-wrapper shadow-xl p-6">
        <div class="clear-pane:hover border-2 border-dashed p-10 text-center mb-4">
            <div class="upload-container">
                <h2>Permit Verification</h2>
                <input type="file" @change="onFileChange" accept=".pdf,.jpg,.jpeg,.png" :disabled="isProcessing" />

                <div v-if="isProcessing">Processing Document...</div>

                <div v-if="resultData" class="results">
                    <h3>Results:</h3>
                    <p><strong>License Found:</strong> {{ resultData.license_found || 'None' }}</p>
                    <p><strong>Status:</strong> {{ resultData.contractor_info?.status }}</p>
                    <p><strong>Signatures:</strong> {{ resultData.signatures_detected }}</p>
                </div>
            </div>
            <!-- <h1 class="text-xl font-bold mb-4">Permit Application Verification Portal</h1>

            <input type="file" @change="handleFileUpload" accept=".pdf,.jpg,.png" />
            <p class="mt-2">Upload Application (PDF/Image)</p>
            <Buttons class="bg-blue-600 text-black px-6 py-2 rounded shadow-md" @click="verifyDocument" :disabled="loading || !file" severity="contrast">
                {{ loading ? 'Verifying...' : 'Verify Application' }}
            </Buttons>
        </div>


        <div v-if="results" class="mt-8 space-y-4">
            <div v-for="(check, key) in results.checks" :key="key" :class="['p-4 border-l-4', check.passed ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50']">
                <h3 class="font-bold uppercase">{{ key.replace('_', ' ') }}</h3>
                <p>{{ check.message }}</p>
                <span class="text-sm italic">Source: {{ check.source }}</span>
            </div> -->
        </div>
    </div>
</template>
<style lang="scss">
.modal-wrapper {
    position: fixed;
    left: 150px;
    top: 300px;
    z-index: 500;
    width: 25vw;
    height: 50vh;
    background-color: rgba(174, 180, 181, 0.1); // Clear light blue with 10% opacity
    backdrop-filter: blur(15px); // Strong frosted glass effect
    border-radius: 12px;
    border: 1px solid rgba(102, 198, 203, 0.3); // Light sky blue border
    box-shadow: 0 0 25px rgba(135, 206, 250, 0.4); // Light blue glow
    color: var(--black-color); // Very light blue text for readability
    display: flex;
    align-items: left;
    justify-content: left;
    font-family: 'Arial', sans-serif;
    font-size: 1rem;
    text-transform: uppercase; // High-tech aesthetic
    transition: all 0.3s ease; // Smooth hover effect

    .clear-pane:hover {
        background-color: rgba(173, 216, 230, 0.15); // Slightly more opaque light blue on hover
        box-shadow: 0 0 30px rgba(135, 206, 250, 0.6); // Brighter light blue glow on hover
    }
    .inner {
        background-color: #17dda1;
        padding: 30px;
        border-radius: 12px;
        display: left;
        flex-direction: row;
        position: bottom;
        max-width: 100px;
        width: 100%;

        h1 {
            font-size: 11px;
            font-weight: 200;
            line-height: 12px;
            margin-bottom: 20px;
        }

        .form {
            display: bottom;
            flex-direction: column;
            max-width: 80%;

            label {
                font-size: 12px;
                font-weight: 200;
                line-height: 1px;
                letter-spacing: 0.5em;
                text-align: left;
            }

            input,
            select,
            textarea {
                font-size: 12px;
                font-weight: 200;
                // line-height: 12px;
                letter-spacing: 0.25em;
                text-align: left;
                // border: 1px solid #c2c2c2;
                border-radius: 4px;
                // padding: 8px 12px;
                margin-top: 5px;

                &::placeholder {
                    color: #a6a6a6;
                }
            }

            .btn {
                width: 25px;
                padding-inline: 10px;
            }
        }
    }
}
</style>
