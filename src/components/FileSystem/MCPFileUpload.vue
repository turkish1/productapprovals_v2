<script setup>
import { ref } from 'vue';

const isProcessing = ref(false);
const resultData = ref(null);
const fileName = ref([]);
const totalSize = ref(0);
const totalSizePercent = ref(0);
const selectedFile = ref([]); // Stores the file for the 'Verify' button

// Handle drop event
const onFileChange = async (event) => {
    // Get the files from the drop even
    console.log(event);
    selectedFile.value = event.target.files[0];
    console.log(selectedFile);
    fileName.value.push(selectedFile);
    console.log(fileName.value);

    uploadfiles();
};
const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 1;
    callback();
};
// const uploadfiles = async () => {
//     // try {
//     // fileName.value
//     for (const fileItem of fileName.value) {
//         console.log('Uploading file:', fileItem.value.name);

//         // Build the object key using the file's name (or any naming logic you like)
//         const s3Url = `https://amzn-s3-temp-upload-bucket.s3.us-east-1.amazonaws.com/pdfdir/${fileItem.value.name}`;

//         // If the File is already a PDF, you can just pass it directly in the body
//         // and set the Content-Type header appropriately.
//         // If you need to ensure it's recognized as a Blob,
//         // you can do: const pdfBlob = new Blob([fileItem], { type: 'application/pdf' });

//         const response = await fetch(s3Url, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/pdf'
//             },
//             // Body should be a Blob/File, NOT the filename string
//             body: fileItem
//         });

//         if (!response.ok) {
//             console.error(`Failed to upload ${fileItem.name}. Status: ${response.status}`);
//             continue;
//         }

//         console.log(`Successfully uploaded ${fileItem.name} to S3.`);
//     }

//     // } catch (error) {
//     //     console.error('Error uploading to S3:', error);
//     //     alert('Failed to upload file.');
//     // }
// };

const uploadfiles = async () => {
    isProcessing.value = true;

    // Use the actual selected file
    const fileToUpload = selectedFile.value;
    if (!fileToUpload) return;

    console.log('Uploading file:', fileToUpload.name);

    // Ensure the bucket name and region are correct
    const s3Url = `https://amzn-s3-temp-upload-bucket.s3.us-east-1.amazonaws.com/${fileToUpload.name}`;

    try {
        const response = await fetch(s3Url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/pdf' // Or fileToUpload.type
            },
            body: fileToUpload // Browser sends the raw binary data
        });

        if (response.ok) {
            console.log(`Successfully uploaded ${fileToUpload.name} to S3.`);
            // Trigger your next step here
        } else {
            console.error(`S3 Rejected Upload. Status: ${response.status}`);
            if (response.status === 403) {
                alert('S3 Access Denied. Check CORS or Bucket Policy.');
            }
        }
    } catch (error) {
        console.error('Network/CORS Error:', error);
    } finally {
        isProcessing.value = false;
    }
};
</script>
<template>
    <div class="modal-wrapper shadow-xl space-y-8 p-6">
        <div class="clear-pane border-2 border-dashed p-10 text-center mb-4">
            <h1 class="text-xl font-bold mb-4">Permit Application Verification</h1>

            <input type="file" @change="onFileChange" accept=".pdf,.jpg,.jpeg,.png" class="mb-4" />

            <p v-if="selectedFile" class="text-sm mb-4">Selected: {{ selectedFile.name }}</p>

            <button @click="uploadfiles" class="bg-blue-600 text-black px-6 py-2 rounded shadow-md disabled:bg-gray-400" :disabled="isProcessing || !selectedFile">
                {{ isProcessing ? 'Processing...' : 'Verify Application' }}
            </button>
            <div class="flex flex-wrap gap-4">
                <div v-for="(file, index) of selectedFile.value" :key="index + file.url + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                    <div>
                        <Button @click="uploadEvent()" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!selectedFile.value || selectedFile.value.length === 0"></Button>
                    </div>

                    <span class="font-semibold text-ellipsis max-w-250 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Completed" class="mt-4" severity="success" />
                    <Button icon="pi pi-times" @click="removeFile(index)" outlined rounded severity="danger" />
                </div>
            </div>
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
