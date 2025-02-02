<template>
    <div v-if="step === 1" class="signature-form">
        <h1>Customer Identity Verification</h1>
        <form @submit.prevent="submitSignature">
            <div class="form-group">
                <label for="customerName">Customer Name:</label>
                <InputText id="customerName" v-model="formData.name" type="text" placeholder="Enter your name" required />

                <label for="email">Email:</label>
                <InputText id="email" v-model="formData.email" type="email" required />
                <!--
                <button type="submit">Next</button> -->
            </div>

            <div class="form-group">
                <label>Signature:</label>
                <!-- Canvas for signature capture -->

                <canvas ref="signatureCanvas" width="500" height="200" style="border: 1px solid #000"></canvas>
            </div>

            <div class="button-group">
                <Button type="button" @click="clearSignature">Clear Signature</Button>
                <!-- <Button type="button" @click="nextStep">Next</Button> -->
                <Button type="submit">Submit</Button>
            </div>
        </form>
        <!-- Step 3: Identity Verification -->
        <!-- v-if="step === 2" -->
        <div>
            <h2>Step 3: Identity Verification</h2>

            <form @submit.prevent="handleIDUpload">
                <div class="card">
                    <Toast />
                    <!-- url="/api/upload" -->

                    <FileUpload name="demo[]" @change="onFileChange" :multiple="true" accept="image/*" :maxFileSize="1000000">
                        <template #empty>
                            <span>Drag and drop files to here to upload.</span>
                        </template>
                        <!-- <Button type="submit">Upload & Verify</Button> -->
                    </FileUpload>

                    <!-- <label for="idUpload">Upload a photo of your ID:</label> -->
                    <!-- <Input id="idUpload" type="file" @change="onFileChange" accept="image/*" required /> -->
                    <!-- <Button type="submit">Upload & Verify</Button> -->
                </div>
                <Button type="submit">Upload & Verify</Button>
            </form>
            <div v-if="uploading" class="info-message">Verifying identity...</div>
            <div v-if="verificationError" class="error-message">{{ verificationError }}</div>
        </div>

        <!-- Step 4: Final Notarization -->
        <!-- v-if="step === 3" -->
        <div>
            <h2>Step 4: Finalize Notarization</h2>
            <p>Your details, signature, and identity have been collected.</p>
            <Button @click="finalizeNotarization">Finalize Notarization</Button>
        </div>

        <!-- Step 5: Notarization Complete -->
        <!-- v-if="step === 4" -->
        <div>
            <h2>Notarization Complete</h2>
            <p>Your document has been notarized. Here is your notary certificate:</p>
            <pre>{{ notarizationCertificate }}</pre>
        </div>
    </div>
</template>

<script setup>
import SignaturePad from 'signature_pad';
import { onMounted, ref, watch } from 'vue';

// Reactive references for the customer name and the canvas element
const customerName = ref('');
const signatureCanvas = ref(null);
const step = ref(1);
// For identity verification
const idFile = ref(null);
const uploading = ref(false);
const verificationError = ref('');
const signatureData = ref(null);
// Notary certificate (simulated)
const notarizationCertificate = ref('');
const notarizationSignature = ref();
// Initialize SignaturePad when the canvas is mounted or when we enter Step 2
watch(step, (newStep) => {
    if (newStep === 2 && signatureCanvas.value) {
        // If the signaturePad is not yet initialized, create it
        if (!signaturePad) {
            signaturePad = new SignaturePad(signatureCanvas.value);
        }
    }
});
const formData = ref({
    name: '',
    email: ''
});
// This variable will hold the instance of SignaturePad
let signaturePad = null;

// Initialize SignaturePad when the component is mounted
onMounted(() => {
    if (signatureCanvas.value) {
        signaturePad = new SignaturePad(signatureCanvas.value);
    }
});

// Function to clear the signature from the canvas
function clearSignature() {
    signaturePad.clear();
}
function nextStep() {
    // Before moving from the signature step, ensure a signature is provided
    if (step.value === 3) {
        if (signaturePad.isEmpty()) {
            alert('Please provide your signature before proceeding.');
            return;
        }
        signatureData.value = signaturePad.toDataURL();
    }
    step.value++;
}
// Handle the file input for ID upload
function onFileChange(event) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
        idFile.value = file;
        console.log(idFile.value);
    }
}

// Simulate the identity verification process
async function handleIDUpload() {
    if (!idFile.value) {
        alert('Please select an ID image to upload.');
        return;
    }
    uploading.value = true;
    verificationError.value = '';
    console.log(verificationError.value);
    // In a real system, you would upload the file to an identity verification service.
    // Here we simulate a delay and a successful verification.
    try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const isVerified = true; // Change this based on real verification response

        if (isVerified) {
            // step.value++; // Proceed to the final notarization step
        } else {
            verificationError.value = 'Identity verification failed. Please try again.';
        }
    } catch (error) {
        verificationError.value = 'An error occurred during verification. Please try again.';
    } finally {
        uploading.value = false;
    }
}

function submitSignature() {
    // Ensure that a signature is present
    if (signaturePad.isEmpty()) {
        alert('Please provide a signature before submitting.');
        return;
    }

    // Capture the signature data as a Base64-encoded image
    signatureData.value = signaturePad.toDataURL();
    notarizationSignature.value = signatureData.value;
    // Here you could send the data to an API for verification
    // For demonstration, we log the details to the console.
    console.log('Customer Name:', formData.name);
    console.log('Signature Data:', signatureData, notarizationSignature.value);

    alert('Signature submitted successfully!');

    // Optionally, reset the form
    //   formData.name = '';
    // clearSignature();
}
async function finalizeNotarization() {
    // Combine all collected data
    console.log(signatureData.value, notarizationSignature.value);
    const notarizationPayload = {
        name: formData.value.name,
        email: formData.value.email,
        signature: signatureData.value,
        // For demonstration, we include the name of the uploaded file.
        idDocument: idFile.value ? idFile.value.name : null
    };
    console.log(notarizationPayload);
    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real system, you would receive a certificate from your remote notarization service.
    // Here we simulate a certificate as a JSON string.
    notarizationCertificate.value = JSON.stringify(
        {
            certificateId: 'CERT-' + Math.floor(Math.random() * 1000000000),
            notarizedAt: new Date().toISOString(),
            details: notarizationPayload
        },
        null,
        2
    );
    console.log(notarizationCertificate.value);
    // step.value++; // Move to the final "Notarization Complete" step
}
// Function to handle form submission
// function submitSignature() {
//     // Ensure that a signature is present
//     if (signaturePad.isEmpty()) {
//         alert('Please provide a signature before submitting.');
//         return;
//     }

//     // Capture the signature data as a Base64-encoded image
//     const signatureData = signaturePad.toDataURL();

//     // Here you could send the data to an API for verification
//     // For demonstration, we log the details to the console.
//     console.log('Customer Name:', formData.name);
//     console.log('Signature Data:', signatureData);

//     alert('Signature submitted successfully!');

//     // Optionally, reset the form
//     //   formData.name = '';
//     // clearSignature();
// }
</script>

<style scoped>
.signature-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
}

.button-group {
    display: flex;
    gap: 1rem;
}

.button-group button {
    padding: 0.5rem 1rem;
    cursor: pointer;
}
</style>
