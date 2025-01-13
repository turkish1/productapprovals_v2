<template>
    <div class="card">
        <!-- <VueSpinnerBall v-show="spinnerValid" size="50" color="green" style="margin-left: 300px" /> -->
        <!-- v-show="download_url" -->
        <!-- margin-left: 550px; margin-top: 390px; -->
        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 850px; margin-top: 440px">
            <!-- <Button v-show="isUrldownloadValid" icon="pi-arrow-circle-down" label="Download Files" variant="Link" style="color: whitesmoke; background-color: #020507" @click="downloadFile" /> -->
            <Button v-show="isUrldownloadValid" icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="downloadFile" />
            <div class="payment-widget">
                <h2 style="color: black">Credit Card Payment</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="cardholder-name">Cardholder Name</label>
                        <input type="text" id="cardholder-name" v-model="form.cardholderName" placeholder="Boris Gomez" required />
                    </div>

                    <div class="form-group">
                        <label for="card-number">Card Number</label>
                        <input type="text" id="card-number" v-model="form.cardNumber" maxlength="19" placeholder="1234 5678 9012 3456" required />
                    </div>

                    <div class="form-group small-inputs">
                        <div>
                            <label for="expiry-date">Expiry Date</label>
                            <input type="text" id="expiry-date" v-model="form.expiryDate" maxlength="5" placeholder="MM/YY" required />
                        </div>
                        <div>
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" v-model="form.cvv" maxlength="4" placeholder="123" required />
                        </div>
                    </div>

                    <button type="submit">Pay</button>
                </form>
                <!-- v-show="isUrldownloadValid" -->

                <div v-if="submitted" class="confirmation">
                    <p>Thank you, {{ form.cardholderName }}! Your payment of ${{ amount }} was processed.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useDownloadpdf from '@/composables/Signpdf/use-downloadpdf';
import useSignpdf from '@/composables/Signpdf/use-signpdf.js';
import { usedownloadStore } from '@/stores/downloadpdfStore';
import { usePermitappStore } from '@/stores/permitapp';
import { onMounted, ref } from 'vue';

const permitStore = usePermitappStore();
const objName = ref('');
const { getNumbers } = useSignpdf();

// if (permitStore.$state.permitapp[0].formdt.length >= 0) {
const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
// } else {
//     processNumber.value = ref('');
// }

objName.value = processNumber.value.length !== 0 ? processNumber.value : 'files';
console.log(objName.value);
// State for the form and payment
function signPdfs() {
    getNumbers(objName.value);
}

onMounted(() => {
    signPdfs();
});
const form = ref({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
});
const isUrldownloadValid = ref(false);
const { getNumber } = useDownloadpdf();
const submitted = ref(false);
const spinnerValid = ref(false);
const amount = 49.99; // Example fixed payment amount

// console.log(procNumber.value);
const pdfstore = usedownloadStore();
const download_url = ref('');

const handleSubmit = () => {
    getNumber(objName.value);
    console.log(objName.value);

    // Basic validation can be added here
    if (!form.value.cardholderName || !form.value.cardNumber || !form.value.expiryDate || !form.value.cvv) {
        alert('Please fill out all fields.');
        return;
    }

    // Fake submission
    submitted.value = true;

    // Reset form after submission
    spinnerValid.value = true;

    setTimeout(() => {
        form.value.cardholderName = '';
        form.value.cardNumber = '';
        form.value.expiryDate = '';
        form.value.cvv = '';
        submitted.value = false;
    }, 3000);
    spinnerValid.value = false;
    isUrldownloadValid.value = true;
    download_url.value = pdfstore.$state.downloadinput[0].downloadData;
};

const downloadFile = () => {
    // Define the file URL and filename

    const fileUrl = download_url.value; // Replace with your actual file path
    console.log(fileUrl);
    const fileName = 'processnumber.zip';
    // Check if the file URL is valid (non-empty)
    // if (!fileUrl || fileUrl.length !== 0) {
    //     isUrldownloadValid.value = true;
    //     return;
    // }
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    // Programmatically click the anchor to trigger the download
    link.click();

    // Clean up by removing the temporary anchor
    link.remove();
};
</script>

<style>
.card {
    background-image: url('/demo/images/architectHomebg.jpeg');

    background-repeat: no-repeat;
    background-size: cover;
    /* the attachment addresses shiftting of the image */
    background-attachment: fixed;
    background-position: center;
    width: 100%;
    height: 120vh;
    /* width: 1800px;
    height: 980px; */
    /* height: 100%;
    width: 100%; */
}
.payment-widget {
    max-width: 1200px;
    margin-left: 350px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #eae7e2;
}

h2 {
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.small-inputs {
    display: flex;
    gap: 10px;
}

.small-inputs div {
    flex: 1;
}

button {
    /* width: 100%; */
    padding: 10px;
    background-color: #020507;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

/* .confirmation {
    margin-top: 20px;
    text-align: center;
    color: green;
} */
</style>
