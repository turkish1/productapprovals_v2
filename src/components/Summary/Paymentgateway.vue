<template>
    <div class="card-system">
        <VueSpinnerBall v-show="isloading" color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
            <div class="payment-widget">
                <h2 style="color: black">Credit Card Payment</h2>

                <BuyButton @click="handleTime" />
            </div>
        </div>
    </div>
</template>

<script setup>
import BuyButton from '@/components/Summary/BuyButton.vue';
import useDownloadpdf from '@/composables/Signpdf/use-downloadpdf';
import useSignpdf from '@/composables/Signpdf/use-signpdf.js';
import { countStore } from '@/stores/countStore';
import { usedownloadStore } from '@/stores/downloadpdfStore';
import { useGlobalState } from '@/stores/pdfsignStore';
import { usePermitappStore } from '@/stores/permitapp';
import { sessionStore } from '@/stores/sessionStore';
import { invoke, tryOnMounted, until, useLocalStorage, watchOnce } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { VueSpinnerBall } from 'vue3-spinners';
const permitStore = usePermitappStore();
const sessStore = sessionStore();
const cntStore = countStore();
const count = ref(0);

// const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

// State for the form and payment

// State for toggles
const isdataValid = ref(false);
const isloading = ref(false);
const isUrldownloadValid = ref(false);
const status = ref(false);
const timedOut = ref(false);
const isSigned = ref(false);

const { getSignpdf } = useSignpdf();
const callPdfSign = tryOnMounted(() => {
    // This creates the digital signature
    // getNumbers(muniProcessNumber.value);
    setTimeout(() => {
        isSigned.value = true;
    }, 2000);
    getSignpdf(store.value.processNumber);

    console.log(muniProcessNumber.value);
});
// Example fixed payment amount

// Download composable

const pdfstore = usedownloadStore();
const { downloadinput } = storeToRefs(pdfstore.$state);

// Global state
const { resp } = useGlobalState();

// On mount
onMounted(() => {
    count.value = 1;

    // Example: call your logic if the response is valid
    if (resp.value?.status?.status === 200) {
        status.value = true;
        console.log(resp.value.status.status);
    }
    // localStorage.clear();
    // cntStore.$reset();
});

const store = useLocalStorage('my-storage', {
    processNumber: muniProcessNumber.value
});
const { getNumber, secondFetch } = useDownloadpdf();
// const { getNumber, secondFetch } = useDownloadpdf(store.value.processNumber);

// Example function that triggers a store/composable call
const handleTime = tryOnMounted(() => {
    // getNumber();
    secondFetch(store.value.processNumber);
    cntStore.addCount(muniProcessNumber.value);
    console.log(cntStore.$state);
    // cntStore.addCount(store.value.processNumber);
    setTimeout(() => {
        timedOut.value = true;
    }, 1000);
    console.log(muniProcessNumber.value);
    // console.log(store.value.processNumber);

    isUrldownloadValid.value = true;
    // downloadFile();
});
watchOnce(handleTime, () => {});
watchOnce(callPdfSign, () => {});
invoke(async () => {
    await until(isSigned).toBe(true);
});
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
    isUrldownloadValid.value = true;
    // OR isUrldownloadValid.value = true;
};
</script>

<style>
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
</style>
