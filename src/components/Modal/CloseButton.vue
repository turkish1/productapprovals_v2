<script setup>
import { defineEmits } from 'vue';

// Emit close event to parent
const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};
</script>

<template>
    <button class="close-btn" @click="closeModal" aria-label="Close modal" role="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
            <path fill="currentColor" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z" />
        </svg>
    </button>
</template>

<style lang="scss">
.close-btn {
    display: inline-flex; /* shrink to fit icon */
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition:
        transform 0.2s ease,
        opacity 0.2s ease;

    /* Position top-right inside modal */
    position: absolute;
    top: 8px;
    right: 10px;

    &:hover {
        transform: scale(1.1);
        opacity: 0.8;
    }

    &:focus {
        outline: 2px solid #27c71c; /* Accessibility */
        outline-offset: 2px;
    }
}
</style>
