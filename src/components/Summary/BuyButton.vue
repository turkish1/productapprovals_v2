<!-- BuyButton.vue new-->
<script setup>
const publishableKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY
// import.meta.env.VITE_STRIPE_PK
const buyButtonId    = process.env.VITE_BUY_BTN_ID
</script>

<template>
  <!-- Vue passes props as HTML attributes, kebab‑case required -->
  <stripe-buy-button
    :buy-button-id="buyButtonId"
    :publishable-key="publishableKey">
  </stripe-buy-button>
</template>
