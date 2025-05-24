<template>
    <div class="card">
        <VueSpinnerBall v-show="isloading" color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
            <!-- <Stripes /> -->
            <!-- -->
            <div class="payment-widget">
                <h2 style="color: black">Download Link</h2>
                <Button v-show="isUrldownloadValid" icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="startDownload" />
                <!--
                <BuyButton @click="handleTime" /> -->
                <!-- <div class="form-group">
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
                </form> -->

                <div v-if="submitted" class="confirmation">
                    <p>Thank you, {{ Name }}! Your payment of ${{ 107.0 }} was processed.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useDownloadpdf from '@/composables/Signpdf/use-downloadpdf';
import { countStore } from '@/stores/countStore';
import { usedownloadStore } from '@/stores/downloadpdfStore';
import { useGlobalState } from '@/stores/pdfsignStore';
import { usePermitappStore } from '@/stores/permitapp';

import { invoke, tryOnMounted, until, useLocalStorage, watchOnce } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { VueSpinnerBall } from 'vue3-spinners';
const permitStore = usePermitappStore();

const cntStore = countStore();
const count = ref(0);

const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

// State for the form and payment

// State for toggles
const isdataValid = ref(false);
const isloading = ref(false);
const isUrldownloadValid = ref(false);
const status = ref(false);
const timedOut = ref(false);
const submitted = ref(false);

const checkoutRef = ref(null);

const { getNumber, result, secondFetch } = useDownloadpdf();
const pdfstore = usedownloadStore();
const { downloadinput } = storeToRefs(pdfstore.$state);

// Global state
const { resp } = useGlobalState();

// On mount
onMounted(() => {
    count.value = 1;
    cntStore.addCount(count);
    console.log(cntStore);
    // Example: call your logic if the response is valid
    if (resp.value?.status?.status === 200) {
        status.value = true;
        console.log(resp.value.status.status);
    }
});
const sessionData = ref('');
onMounted(async () => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    sessionData.value = sessionId;
    if (!sessionId) {
        console.log(sessionId);
        return; // guard
    } else {
        console.log(sessionData.value);
    }
});

const store = useLocalStorage('my-storage', {
    processNumber: muniProcessNumber.value
});

// Example function that triggers a store/composable call
const handleTime = tryOnMounted(() => {
    getNumber();
    // setTimeout(() => {
    //     timedOut.value = true;
    // }, 1000);
    isUrldownloadValid.value = true;
    // secondFetch(store.value);
    // console.log(store.value);
});

watchOnce(handleTime, () => {});
// async function downloadPdfFromS3() {
//     try {
//         console.log(result);
//         // Construct the public URL for the file in the bucket
//         const url = result.download_url;
//         //  `https://digitalsolutionsroofs.s3.us-east-1.amazonaws.com/${muniProcessNumber.value}/${muniProcessNumber.value}.zip`;
//         // console.log(url);
//         // Fetch the PDF file as a blob
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch file. HTTP status: ${response.status}`);
//         }

//         const blob = await response.blob();
//         console.log(blob);
//         // Create a temporary link element
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = fName.value; // This sets the default file name for the download
//         document.body.appendChild(link);

//         // Trigger the download
//         link.click();

//         // Clean up
//         document.body.removeChild(link);
//         URL.revokeObjectURL(link.href);
//     } catch (error) {
//         console.error('Error downloading PDF:', error);
//     }
// }

function startDownload() {
    secondFetch(store.value);
    downloadFile();
}

const setOffdownload = tryOnMounted(() => {
    setTimeout(() => {
        timedOut.value = true;
    }, 1000);
    secondFetch(store.value);
    console.log(store.value);
    downloadFile();
});
const downloadFile = async () => {
    const arr = pdfstore.downloadinput[0]?.downloadData?.download_url;
    console.log(arr);
    if (!arr || arr.length === 0) {
        return;
    }
    console.log(arr, store.value);

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
    submitted.value = true;
    // OR isUrldownloadValid.value = true;
};

watchOnce(setOffdownload, startDownload, () => {});
invoke(async () => {
    await until(setOffdownload).toBe(true);
});
</script>

<style>
.card {
    background-image: url('/demo/images/blurredHouse.jpeg');

    background-repeat: no-repeat;
    background-size: cover;
    /* the attachment addresses shiftting of the image */
    background-attachment: fixed;
    background-position: center;
    width: 110%;
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
