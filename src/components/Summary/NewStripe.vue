<template>
    <div id="app">
        <PaymentForm />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import PaymentForm from '../Summary/PaymentForm.vue';

export default defineComponent({
    components: {
        PaymentForm
    }
});
</script>
