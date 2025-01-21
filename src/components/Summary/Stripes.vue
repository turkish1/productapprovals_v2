<template>
    <div>
        <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems" :success-url="successURL" :cancel-url="cancelURL" @loading="(v) => (loading = v)" />
        <button @click="submit">Pay now!</button>
    </div>
</template>

<script>
import StripeCheckout from '@vue-stripe/vue-stripe';

export default {
    components: {
        StripeCheckout
    },
    data() {
        this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
        return {
            loading: false,
            lineItems: [
                {
                    price: 'prod_RbrOFZ705d3c2E', // The id of the one-time price you created in your Stripe dashboard
                    quantity: 1
                }
            ],
            successURL: '/paymentprocessed',
            cancelURL: '/pages/notfound'
        };
    },
    methods: {
        submit() {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        }
    }
};
</script>
