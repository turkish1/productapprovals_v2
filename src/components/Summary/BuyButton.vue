<!-- BuyButton.vue -->
<script setup>
import useDownloadpdf from '@/composables/Signpdf/use-downloadpdf';

import { usePermitappStore } from '@/stores/permitapp';
import { tryOnMounted, useLocalStorage } from '@vueuse/core';

const permitStore = usePermitappStore();

// import { loadStripe } from '@stripe/stripe-js';
import { ref } from 'vue';
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const { secondFetch } = useDownloadpdf();

const buyButtonId = import.meta.env.VITE_BUY_BTN_ID;

const timedOut = ref(false);
const handleTime = tryOnMounted(() => {
    setTimeout(() => {
        timedOut.value = true;
    }, 1000);

    secondFetch(muniProcessNumber.value);
    timedOut.value = false;
    // localStorage.clear();
    captureSession();
});
const store = useLocalStorage('my-storage', {
    processNumber: muniProcessNumber.value
});
const captureSession = async (event) => {
    console.log('Entered CaptureSession', event);

    const url = new URL(window.location.href);

    // secondFetch(store.value);
};
</script>

<template>
    <stripe-buy-button :buy-button-id="buyButtonId" :publishable-key="publishableKey">Pay</stripe-buy-button>

    <!-- Vue passes props as HTML attributes, kebab‑case required -->
</template>
