<template>
    <!-- grid grid-cols-3 gap-4 card flex flex-row gap-16-->
    <div class="md:w-1/2 card flex flex-row gap-3" style="margin-left: 200px">
        <div class="basis-1/7"><InputNumber v-model="value1" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid /></div>
        <div class="basis-1/7"><InputNumber v-model="value2" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid /></div>
        <div class="basis-1/7"><InputNumber v-model="value3" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid /></div>
        <div class="basis-1/7"><InputNumber v-model="value4" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid /></div>
        <div class="basis-1/7"><InputNumber v-model="value5" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5" fluid /></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(null);
</script>

<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 200px;
    /* min-width: 600px; */
    top: 10vh;
}
.custom-otp-input {
    width: 48px;
    height: 48px;
    font-size: 24px;
    appearance: none;
    text-align: center;
    transition: all 0.2s;
    border-radius: 0;
    border: 1px solid var(--p-inputtext-border-color);
    background: transparent;
    outline-offset: -2px;
    outline-color: transparent;
    border-right: 0 none;
    transition: outline-color 0.3s;
    color: var(--p-inputtext-color);
}

.custom-otp-input:focus {
    outline: 2px solid var(--p-focus-ring-color);
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right-width: 1px;
    border-right-style: solid;
    border-color: var(--p-inputtext-border-color);
}
</style>
