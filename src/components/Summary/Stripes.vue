<!-- StripePayment.vue -->
<template>
    <div>
        <h1>Pay with Stripe</h1>
        <form id="payment-form" @submit.prevent="handleSubmit">
            <div id="card-element">
                <!-- Stripe Card Element will be inserted here -->
            </div>
            <button type="submit" :disabled="isProcessing">
                {{ isProcessing ? 'Processing...' : 'Pay Now' }}
            </button>
            <div id="card-errors" role="alert">{{ errorMessage }}</div>
        </form>
    </div>
</template>

<script setup>
// import { loadStripe } from '@stripe/stripe-js';
import { onMounted, ref } from 'vue';

// Stripe state
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const errorMessage = ref('');
const isProcessing = ref(false);
// const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

// Load Stripe.js and initialize Elements
onMounted(async () => {
    elements.value = stripe.value.elements();

    // Create and mount the Card Element
    const style = {
        base: {
            fontSize: '16px',
            color: '#32325d'
        }
    };
    cardElement.value = elements.value.create('card', { style });
    cardElement.value.mount('#card-element');
});

// Handle form submission
const handleSubmit = async () => {
    if (!stripe.value || !elements.value) {
        return;
    }

    isProcessing.value = true;
    errorMessage.value = '';

    // Create a payment method
    const { error, paymentMethod } = await stripe.value.createPaymentMethod({
        type: 'card',
        card: cardElement.value
    });

    if (error) {
        errorMessage.value = error.message;
        isProcessing.value = false;
    } else {
        // Send paymentMethod.id to your server to complete the payment
        const response = await fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentMethodId: paymentMethod.id })
        });

        const paymentResult = await response.json();
        console.log(paymentResult);
        if (paymentResult.error) {
            errorMessage.value = paymentResult.error;
        } else {
            // Payment succeeded
            alert('Payment successful!');
        }

        isProcessing.value = false;
    }
};
</script>

<style scoped>
#card-element {
    /* margin: 20px 0;
    padding: 10px;
    border: 1px solid #02141a;
    border-radius: 4px; */
    max-width: 1200px;
    margin-left: 320px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #eae7e2;
}

#card-errors {
    color: red;
    margin-top: 10px;
}
</style>
