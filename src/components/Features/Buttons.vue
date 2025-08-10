<template>
    <Button class="p-button hover:bg-fuchsia-600" size="medium" @click="$emit('click')">
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
    max-height: 30px;
    margin-top: 10px;
}
</style>
