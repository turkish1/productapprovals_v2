<script setup>
import { ref } from 'vue';

const isProcessing = ref(false);
const resultData = ref(null);

const selectedFile = ref(null); // Stores the file for the 'Verify' button

// const convertPdfToImage = async (fileObj) => {
//     try {
//         const arrayBuffer = await fileObj.arrayBuffer();

//         // Use the global pdfjsLib loaded from index.html
//         const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//         const page = await pdf.getPage(1);
//         const viewport = page.getViewport({ scale: 2.0 });

//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;

//         await page.render({ canvasContext: context, viewport }).promise;

//         // Convert to JPEG for Textract
//         const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
//         return dataUrl.split(',')[1];
//     } catch (error) {
//         console.error('PDF Conversion Error:', error);
//         throw new Error('Could not process PDF. Please try a JPEG or PNG.');
//     }
// };
//         const LAMBDA_URL = 'https://werbea42zljk4wi4tol7er46xq0yxvwi.lambda-url.us-east-1.on.aws/';

async function uploadToLambda(file) {
    const reader = new FileReader();

    reader.onload = async (e) => {
        // 1. Get the full Data URL (e.g., "data:image/jpeg;base64,/9j/4AAQ...")
        const fullDataUrl = e.target.result;

        // 2. IMPORTANT: Strip the prefix so only the raw base64 string remains
        // Textract will fail if it sees "data:image/jpeg;base64,"
        const base64Data = fullDataUrl.split(',')[1];

        try {
            const response = await fetch(LAMBDA_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    document: base64Data
                })
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Textract results:', result.blocks);
            } else {
                console.error('Lambda Error:', result.error);
            }
        } catch (err) {
            console.error('Network Error:', err);
        }
    };

    reader.readAsDataURL(file);
}
// Main Event Handler
const onFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    selectedFile.value = file; // Save it so the 'Verify' button becomes active
};

const runVerification = async () => {
    if (!selectedFile.value) return;

    isProcessing.value = true;
    let base64Payload;

    try {
        if (selectedFile.value.type === 'application/pdf') {
            base64Payload = await convertPdfToImage(selectedFile.value);
        } else {
            base64Payload = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.readAsDataURL(selectedFile.value);
            });
        }

        // --- ADD THIS LOG ---
        console.log('Payload length:', base64Payload?.length);

        if (!base64Payload) {
            throw new Error('Conversion resulted in empty payload');
        }

        await uploadToLambda(base64Payload);
    } catch (err) {
        console.error(err);
    } finally {
        isProcessing.value = false;
    }
};
</script>
<template>
    <div class="modal-wrapper shadow-xl p-6">
        <div class="clear-pane border-2 border-dashed p-10 text-center mb-4">
            <h1 class="text-xl font-bold mb-4">Permit Application Verification</h1>

            <input type="file" @change="onFileChange" accept=".pdf,.jpg,.jpeg,.png" class="mb-4" />

            <p v-if="selectedFile" class="text-sm mb-4">Selected: {{ selectedFile.name }}</p>

            <button @click="runVerification" class="bg-blue-600 text-white px-6 py-2 rounded shadow-md disabled:bg-gray-400" :disabled="isProcessing || !selectedFile">
                {{ isProcessing ? 'Processing...' : 'Verify Application' }}
            </button>
        </div>

        <div v-if="resultData" class="mt-8 space-y-4 overflow-y-auto max-h-40">
            <div class="p-4 border-l-4 border-green-500 bg-green-50">
                <h3 class="font-bold">LICENSE: {{ resultData.license_found || 'NOT DETECTED' }}</h3>
                <p>Status: {{ resultData.contractor_info?.status || 'Unknown' }}</p>
                <p>Signatures: {{ resultData.signatures_detected ? '✅ Found' : '❌ Missing' }}</p>
            </div>
        </div>
    </div>
</template>
<!-- <template>
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
            <h1 class="text-xl font-bold mb-4">Permit Application Verification Portal</h1>

            <input type="file" @change="onFileChange($event)" accept=".pdf,.jpg,.jpeg,.png" />
            <p class="mt-2">Upload Application (PDF/Image)</p>
             @click="convertPdfToImage"
            <Buttons class="bg-blue-600 text-black px-6 py-2 rounded shadow-md" :disabled="loading || !file" severity="contrast">
                {{ loading ? 'Verifying...' : 'Verify Application' }}
            </Buttons>
        </div>

        <div v-if="results" class="mt-8 space-y-4">
            <div v-for="(check, key) in results.checks" :key="key" :class="['p-4 border-l-4', check.passed ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50']">
                <h3 class="font-bold uppercase">{{ key.replace('_', ' ') }}</h3>
                <p>{{ check.message }}</p>
                <span class="text-sm italic">Source: {{ check.source }}</span>
            </div>
        </div>
    </div>
</template>  -->
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
