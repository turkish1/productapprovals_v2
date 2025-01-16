<template>
    <div class="card">
        <VueSpinnerBall v-show="isloading" color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
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
import { useGlobalState } from '@/stores/pdfsignStore';
import { usePermitappStore } from '@/stores/permitapp';
import { invoke, until } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { VueSpinnerBall } from 'vue3-spinners';

const permitStore = usePermitappStore();
const objName = ref('');
const { getNumbers, res1 } = useSignpdf();
const isdataValid = ref(false);
const isloading = ref(false);
const isSigned = ref(false);
// changing the value from some external store/composables
// const processNumber = ref('me20240000976');
const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);

objName.value = processNumber.value.length !== 0 ? processNumber.value : 'files';

// State for the form and payment
function signPdfs() {
    getNumbers(objName.value);
    isSigned.value = true;
    console.log(objName.value);
}

onMounted(() => {
    signPdfs();
});

const isUrldownloadValid = ref(false);
const { getNumber } = useDownloadpdf();
const submitted = ref(false);
const amount = 49.99;
const { confirmResponse, res } = useGlobalState();
console.log(res, confirmResponse);
// const notNUll = ref(confirmResponse);
const confirm = ref(confirmResponse);

const timedOut = ref(false);

const handleTime = () => {
    setTimeout(() => {
        timedOut.value = true;
    }, 3000);
    console.log('time passed', res, confirmResponse);
    getNumber(objName.value);
};
invoke(async () => {
    await until(isSigned).toBe(true);
    // await until(notNUll).not.toBeNull();
    console.log(confirmResponse);
    await until(timedOut).toBe(true, { timeout: 4000 });
    handleTime();
    // will throw if timeout
});

const form = ref({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
});
// Example fixed payment amount

// console.log(procNumber.value);
const pdfstore = usedownloadStore();

const { downloadinput } = storeToRefs(pdfstore.$state.downloadinput);

const downloadState = ref(pdfstore.$state.downloadinput);

const handleSubmit = () => {
    console.log(objName.value);
    console.log(downloadState.value.length);
    console.log(downloadState.value[0].downloadData);

    // Basic validation can be added here
    if (!form.value.cardholderName || !form.value.cardNumber || !form.value.expiryDate || !form.value.cvv) {
        alert('Please fill out all fields.');
        return;
    }

    // Fake submission
    submitted.value = true;
    isloading.value = true;
    // Reset form after submission

    setTimeout(() => {
        form.value.cardholderName = '';
        form.value.cardNumber = '';
        form.value.expiryDate = '';
        form.value.cvv = '';
        submitted.value = false;
        isloading.value = false;
    }, 2000);

    downloadFile();
};

const downloadFile = async () => {
    // Define the file URL and filename
    console.log(downloadState.value.length);
    console.log(downloadState.value[0].downloadData);

    const objState = ref(downloadState.value.length);
    // const downloadState = await ref(pdfstore.$state.downloadinput.length)
    if (objState.value === 0) {
        return true;
    } else {
        isdataValid.value = true;
        const dlData = ref(downloadState.value[0].downloadData);
        console.log(dlData.value);

        const fileUrl = dlData.value; // Replace with your actual file path
        console.log(fileUrl);
        // Replace with your actual file path

        const fileName = 'processnumber.zip';

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        isUrldownloadValid.value = true;
        link.click();
        link.remove();
        // Programmatically click the anchor to trigger the download
    }

    // // Programmatically click the anchor to trigger the download

    // // Clean up by removing the temporary anchor link.remove()
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
    /* height: 150%; */
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
