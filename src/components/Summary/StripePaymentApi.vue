<script setup>
import { loadStripe } from '@stripe/stripe-js';
import { onMounted, ref } from 'vue';

// lazy‑load Stripe when the page renders
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const elements = ref(null);
const clientSecret = ref(null);
const paymentEl = ref(null); // DOM node for mount

onMounted(async () => {
    // 1) ask your backend for a PaymentIntent
    const res = await fetch('/api/create-payment-intent', { method: 'POST' });
    console.log(res);
    const { client_secret } = await res.json();
    clientSecret.value = client_secret;

    // 2) mount Payment Element
    const stripe = await stripePromise;
    elements.value = stripe.elements({ clientSecret: client_secret });
    const paymentElement = elements.value.create('payment');
    paymentElement.mount(paymentEl.value);
});

// Form submit
async function pay() {
    const stripe = await stripePromise;
    const { error } = await stripe.confirmPayment({
        elements: elements.value,
        confirmParams: { return_url: window.location.origin + '/success' }
    });
    if (error) alert(error.message);
}
</script>

<template>
    <form @submit.prevent="pay">
        <div ref="paymentEl" class="my-4" />
        <button type="submit" class="btn">Pay</button>
    </form>

    <!-- <div class="card">
        <VueSpinnerBall v-show="isloading" color="#784EA7" size="100px" style="margin-top: 500px; margin-left: 850px" />

        <div class="flex flex-col w-1/3 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 550px; margin-top: 440px">
            <Button v-show="isUrldownloadValid" icon="pi pi-arrow-circle-down" severity="info" aria-label="User" @click="downloadFile" />
            <Stripes />
            <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems" :success-url="successURL" :cancel-url="cancelURL" @loading="(v) => (loading = v)" />

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
    </div> -->
</template>
