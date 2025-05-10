<template>
    <div>
        <form @submit.prevent="handlePayment">
            <input v-model="cardNumber" type="text" placeholder="Card Number" />
            <input v-model="expiryDate" type="text" placeholder="Expiry Date (MM/YY)" />
            <input v-model="cvc" type="text" placeholder="CVC" />
            <button type="submit">Pay</button>
        </form>
    </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { ref } from 'vue';
import { createPaymentIntent } from '../../services/stripe';

export default {
    setup() {
        const cardNumber = ref('');
        const expiryDate = ref('');
        const cvc = ref('');

        const handlePayment = async () => {
            const stripe = await loadStripe('your-publishable-key-here');
            const clientSecret = await createPaymentIntent(1000); // Amount in cents

            const card = {
                number: cardNumber.value,
                exp_month: parseInt(expiryDate.value.split('/')[0]),
                exp_year: parseInt(expiryDate.value.split('/')[1]),
                cvc: cvc.value
            };

            const { error, paymentIntent } = await stripe
                .createPaymentMethod({
                    type: 'card',
                    card: card
                })
                .then((result) =>
                    stripe.confirmCardPayment(clientSecret, {
                        payment_method: result.paymentMethod.id
                    })
                );

            if (error) {
                console.error(error);
            } else {
                if (paymentIntent.status === 'succeeded') {
                    alert('Payment successful!');
                } else {
                    alert('Payment failed.');
                }
            }
        };

        return {
            cardNumber,
            expiryDate,
            cvc,
            handlePayment
        };
    }
};
</script>
