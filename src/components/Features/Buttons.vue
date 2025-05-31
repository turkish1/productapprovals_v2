<template>
    <Button class="p-button" size="large" @click="$emit('click')">
        {{ label }}
    </Button>
</template>

<script setup>
import Button from 'primevue/button';
defineEmits(['click']);
defineProps({
    label: String,
    variant: String,
    severity: String
});
</script>
<style scoped>
.p-button {
    background-color: black;
    font-style: normal;
    size: 20px;
}
</style>
