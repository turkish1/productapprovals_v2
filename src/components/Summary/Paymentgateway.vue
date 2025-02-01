<template>
    <div class="card">
        <VueSpinnerBall v-show="isloading" color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
            <Button v-show="isUrldownloadValid" icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="downloadFile" />
            <!-- <Stripes /> -->
            <!-- <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems" :success-url="successURL" :cancel-url="cancelURL" @loading="(v) => (loading = v)" /> -->

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
import { usedownloadStore } from '@/stores/downloadpdfStore';
import { useGlobalState } from '@/stores/pdfsignStore';
import { usePermitappStore } from '@/stores/permitapp';
// import { default as StripeCheckout, default as StripeElementCard } from '@vue-stripe/vue-stripe';
import { tryOnMounted, watchOnce } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { VueSpinnerBall } from 'vue3-spinners';
const permitStore = usePermitappStore();

// const processNumber = ref('me20240001022');

const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');

// State for the form and payment
const token = ref(null);
const elementRef = ref(null);

// State for toggles
const isdataValid = ref(false);
const isloading = ref(false);
const loading = ref(false);
const isUrldownloadValid = ref(false);
const status = ref(false);
const timedOut = ref(false);
const submitted = ref(false);
const amount = 49.99;
const checkoutRef = ref(null);

// const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
// const successURL = ref('/paymentprocessed');
// const cancelURL = ref('/pages/notfound');
// We want to create the zip file but not download id until we click submit

// const isfinishedRes = ref(resp.isFinished);
// console.log(isfinishedRes);

const form = ref({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
});
// Example fixed payment amount
const dataMessage = ref(false);
const dataStatus = ref(false);

// console.log(procNumber.value);

// Download composable
const { getNumber } = useDownloadpdf(processNumber.value);
const pdfstore = usedownloadStore();
const { downloadinput } = storeToRefs(pdfstore.$state);

// const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
console.log(pdfstore.$state.downloadinput[0]?.downloadData?.download_url);
// Global state
const { resp } = useGlobalState();

// On mount
onMounted(() => {
    // Example: call your logic if the response is valid
    if (resp.value?.status?.status === 200) {
        status.value = true;
        console.log(resp.value.status.status);
    }
});

// Example function that triggers a store/composable call
const handleTime = tryOnMounted(() => {
    getNumber();
    setTimeout(() => {
        timedOut.value = true;
    }, 1000);
    console.log(processNumber.value);
    console.log(pdfstore.downloadinput[0]?.downloadData?.message);
});

// Submitting the payment form
const handleSubmit = (event) => {
    // $refs.checkoutRef.redirectToCheckout();
    // Quick validation
    if (!form.value.cardholderName || !form.value.cardNumber || !form.value.expiryDate || !form.value.cvv) {
        alert('Please fill out all fields.');
        return;
    }

    submitted.value = true;
    isloading.value = true;

    setTimeout(() => {
        // reset
        form.value.cardholderName = '';
        form.value.cardNumber = '';
        form.value.expiryDate = '';
        form.value.cvv = '';

        submitted.value = false;
        isloading.value = false;
    }, 2000);

    downloadFile();
};

watchOnce(handleTime, () => {});
// Download file if available in store
const downloadFile = async () => {
    console.log(pdfstore.downloadinput[0]?.downloadData?.download_url);
    const arr = pdfstore.downloadinput[0]?.downloadData?.download_url;
    console.log(arr);
    if (!arr || arr.length === 0) {
        return;
    }
    console.log(arr);

    const dlData = pdfstore.downloadinput[0]?.downloadData?.download_url;
    // arr[0]?.downloadData?.download_url;
    if (!dlData) return;

    isdataValid.value = true;

    const fileUrl = dlData;
    const fileName = 'processnumber.zip';

    // Create an anchor & trigger download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    link.remove();

    // Show or hide button as needed
    isUrldownloadValid.value = true;
    // OR isUrldownloadValid.value = true;
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
    margin-left: 320px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    /* background: #eae7e2; */
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

#custom-button {
    height: 30px;
    outline: 1px solid grey;
    background-color: green;
    padding: 5px;
    color: white;
}

#card-error {
    color: red;
}

/* .confirmation {
    margin-top: 20px;
    text-align: center;
    color: green;
} */
</style>
