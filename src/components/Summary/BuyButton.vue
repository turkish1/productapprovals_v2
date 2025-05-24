<!-- BuyButton.vue -->
<script setup>
import useDownloadpdf from '@/composables/Signpdf/use-downloadpdf';

import { usePermitappStore } from '@/stores/permitapp';
import { tryOnMounted, useLocalStorage } from '@vueuse/core';

const permitStore = usePermitappStore();

// import { loadStripe } from '@stripe/stripe-js';
import { ref } from 'vue';
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY;

const { getNumber, secondFetch } = useDownloadpdf(muniProcessNumber.value);

const buyButtonId = process.env.VITE_BUY_BTN_ID;

const timedOut = ref(false);
const handleTime = tryOnMounted(() => {
    getNumber();
    setTimeout(() => {
        timedOut.value = true;
    }, 3000);
    console.log(muniProcessNumber.value);
    timedOut.value = false;
    console.log(publishableKey, buyButtonId);
    captureSession();
});
const store = useLocalStorage('my-storage', {
    processNumber: muniProcessNumber.value
});
const captureSession = async (event) => {
    console.log('Entered CaptureSession', event);
    console.log(getNumber);

    const url = new URL(window.location.href);

    secondFetch(store.value);
    console.log(store.value);
};
</script>

<template>
    <stripe-buy-button :buy-button-id="buyButtonId" :publishable-key="publishableKey" @update="captureSession">Pay</stripe-buy-button>

    <!-- Vue passes props as HTML attributes, kebab‑case required -->
    <!-- <stripe-buy-button :buy-button-id="buyButtonId" :publishable-key="publishableKey"> </stripe-buy-button> -->
    <!-- <stripe-buy-button :buy-button-id="buyButtonId" :publishable-key="publishableKey"> </stripe-buy-button> -->
</template>
