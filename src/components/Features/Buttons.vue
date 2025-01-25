<template>
    <Button severity=" " variant=" " @click="$emit('click')">
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
