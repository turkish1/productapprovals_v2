<template>
    <div class="card">
        <VueSpinnerBall v-show="isloading" color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
            <Terminal />

            <div class="payment-widget">
                <h2 style="color: black">Credit Card Payment</h2>
                Thank you for your payment! Your transaction ID is
                <strong>{{ transactionId }}</strong
                >.
                <form @submit.prevent="handleSubmit">
                    <!-- <button type="submit">Pay</button> -->
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
import { useGlobalState } from '@/stores/accountsStore';
import { usedownloadStore } from '@/stores/downloadpdfStore';
import { usePermitappStore } from '@/stores/permitapp';
import { tryOnMounted, watchOnce } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { VueSpinnerBall } from 'vue3-spinners';

import Terminal from '@/components/Maps/Terminal.vue';
const permitStore = usePermitappStore();

// const processNumber = ref('me20240001022');
const { accountUsers } = useGlobalState();
const transactionId = ref('TX123456789');
const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');

// State for the form and payment
function displayUserInfo() {
    accountUsers.value.forEach((item, index) => {
        dba.value = item.dba;
        console.log(item);
    });

    // getNumber(processnumber.value);
}

onMounted(() => {
    displayUserInfo();
});

// State for toggles
const isdataValid = ref(false);
const isloading = ref(false);

const isUrldownloadValid = ref(false);
const status = ref(false);
const timedOut = ref(false);
const submitted = ref(false);
const amount = 49.99;

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

console.log(pdfstore.$state.downloadinput[0]?.downloadData?.download_url);
// Global state
const { resp } = useGlobalState();

// On mount
onMounted(() => {
    // Example: call your logic if the response is valid
    // if (resp.value?.status?.status === 200) {
    //     status.value = true;
    //     console.log(resp.value.status.status);
    // }
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
const handleSubmit = () => {
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
    isUrldownloadValid.value = false;
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
