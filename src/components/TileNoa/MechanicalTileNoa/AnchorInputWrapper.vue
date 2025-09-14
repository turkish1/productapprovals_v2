<template>
    <div class="input-wrapper">
        <label :for="id" class="label">Anchor Base Sheet</label>
        <input :id="id" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled" @input="$emit('update:modelValue', $event.target.value)" class="input-text" />
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

// Define props for the component
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

// Define emits for v-model support
defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 1080px;
    padding: 8px;
    border: 2px solid #374151; /* border-gray-700 */
    border-radius: 4px;
}

.input-wrapper:focus-within {
    border-color: #f97316; /* focus:border-orange-600 */
}

.label {
    color: #122620;
    font-size: 14px;
    font-weight: 500;
}

.input-text {
    height: 2.2rem; /* Consistent with :deep(.p-inputtext) in your app */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.input-text:focus {
    outline: none;
    border-color: #f97316; /* focus:border-orange-600 */
    box-shadow: 0 0 5px rgba(249, 115, 22, 0.3);
}
</style>
