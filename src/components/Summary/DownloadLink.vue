<template>
    <!-- <div class="card-system">
        <i class="pi pi-home" style="font-size: 2rem" @click="navigateNext"></i>
        <Button icon="pi pi-home" severity="info" style="font-size: 2rem" @click="navigateNext" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
            <div class="payment-widget">
                <h2 style="color: black">Download Link</h2>
                <Button v-show="isUrldownloadValid" icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="startDownload" />
            </div>
            <div v-if="submitted" class="confirmation">
                <p>Thank you, {{ Name }}! Your payment of ${{ 107.0 }} was processed.</p>
            </div>
        </div>
    </div> -->

    <div class="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl mt-10">
        <h2 class="text-2xl font-bold mb-6 text-center">Checkout</h2>

        <form @submit.prevent="handleCheckout" class="grid gap-4">
            <!-- Customer Info -->
            <div>
                <label class="text-sm font-medium">Full Name</label>
                <input v-model="form.name" type="text" required class="input" />
            </div>
            <div>
                <label class="text-sm font-medium">Email</label>
                <input v-model="form.email" type="email" required class="input" />
            </div>
            <div>
                <label class="text-sm font-medium">Phone Number</label>
                <input v-model="form.phone" type="tel" class="input" />
            </div>

            <!-- Address -->
            <div>
                <label class="text-sm font-medium">Billing Address</label>
                <input v-model="form.address" type="text" required class="input" />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="text-sm font-medium">City</label>
                    <input v-model="form.city" type="text" required class="input" />
                </div>
                <div>
                    <label class="text-sm font-medium">Zip Code</label>
                    <input v-model="form.zip" type="text" required class="input" />
                </div>
            </div>
            <div class="payment-widget">
                <h2 style="color: black">Download Link</h2>
                <Button v-show="isUrldownloadValid" icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="startDownload" />
            </div>
            <div v-if="submitted" class="confirmation">
                <p>Thank you, {{ Name }}! Your payment of ${{ 107.0 }} was processed.</p>
            </div>
            <!-- Payment Info (for demo only, should use secure tokenization like Stripe Elements in production) -->
            <!-- <div>
        <label class="text-sm font-medium">Card Number</label>
        <input v-model="form.cardNumber" type="text" maxlength="16" class="input" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium">Expiry</label>
          <input v-model="form.expiry" type="text" placeholder="MM/YY" class="input" />
        </div>
        <div>
          <label class="text-sm font-medium">CVC</label>
          <input v-model="form.cvc" type="text" maxlength="4" class="input" />
        </div>
      </div>

      <button type="submit" class="mt-6 bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition">
        Pay $99.00
      </button> -->
        </form>

        <div v-if="successMessage" class="mt-6 text-green-600 text-center font-medium">
            {{ successMessage }}
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
import { useRouter } from 'vue-router';

const permitStore = usePermitappStore();

const cntStore = countStore();
const count = ref(0);

const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');
const { secondFetch } = useDownloadpdf(muniProcessNumber.value);
// State for the form and payment

// State for toggles
const isdataValid = ref(false);
const isUrldownloadValid = ref(false);
const status = ref(false);
const timedOut = ref(false);
const submitted = ref(false);

const checkoutRef = ref(null);

// const { getNumber, result, secondFetch } = useDownloadpdf();
const pdfstore = usedownloadStore();
const { downloadinput } = storeToRefs(pdfstore.$state);

// Global state
const { resp } = useGlobalState();
const router = useRouter();
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
    isUrldownloadValid.value = true;
});

watchOnce(handleTime, () => {});

function startDownload() {
    secondFetch(store.value.processNumber);
    downloadFile();
}

// const setOffdownload = tryOnMounted(() => {
//     setTimeout(() => {
//         timedOut = true;
//     }, 1000);
//     secondFetch(store.value.processNumber);

//     downloadFile();
// });

const navigateNext = () => {
    router.push('/');
};
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
    // localStorage.clear();
};
// setOffdownload,
watchOnce(startDownload, () => {});
invoke(async () => {
    // setOffdownload,
    await until().toBe(true);
});
</script>

<style>
.card {
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
