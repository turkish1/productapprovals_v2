<template>
    <div class="card">
        <VueSpinnerBall v-show="isloading" color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
            <!-- <Stripes /> -->
            <!-- -->
            <div class="payment-widget">
                <h2 style="color: black">Download Link</h2>
                <Button v-show="isUrldownloadValid" @click="startDownload" severity="contrast">Wait for download</Button>
                <!-- <Button v-show="isUrldownloadValid" icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="startDownload" /> -->
                <Toast></Toast>
                <ProgressBar :value="value1" severity="contrast" />
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
import { sessionStore } from '@/stores/sessionStore';
import { invoke, tryOnMounted, until, useLocalStorage, watchOnce } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { VueSpinnerBall } from 'vue3-spinners';

const permitStore = usePermitappStore();
const sessStore = sessionStore();
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
const router = useRouter();
// Global state
const { resp } = useGlobalState();
// onMounted(() => {
//     startProgress();
// });

// onBeforeUnmount(() => {
//     endProgress();
// });

const toast = useToast();
const value1 = ref(0);
const interval = ref();
// const startProgress = () => {
//     interval.value = setInterval(() => {
//         let newValue = value1.value + Math.floor(Math.random() * 10) + 1;
//         if (newValue >= 100) {
//             newValue = 100;
//             toast.add({ severity: 'contrast', summary: 'Success', detail: 'Process Completed', life: 1000 });
//         }
//         value1.value = newValue;
//     }, 1000);
// };
// const endProgress = () => {
//     clearInterval(interval.value);
//     interval.value = null;
// };

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
    setTimeout(() => {
        timedOut.value = true;
    }, 500);
    isUrldownloadValid.value = true;
});

watchOnce(handleTime, () => {});

function startDownload() {
    secondFetch(store.value);
    downloadFile();
}

const setOffdownload = tryOnMounted(() => {
    setTimeout(() => {
        timedOut.value = true;
    }, 200);
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

    const dlData = pdfstore.downloadinput[0]?.downloadData?.download_url;

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
    navigateNext();
};

watchOnce(setOffdownload, () => {});
invoke(async () => {
    await until(setOffdownload).toBe(true);
});

const navigateNext = () => {
    console.log('Entered Navigate');
    setTimeout(() => {
        timedOut.value = true;
    }, 1000);

    router.push('/download');
};
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
