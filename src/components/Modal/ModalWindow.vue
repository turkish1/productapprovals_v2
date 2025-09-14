<template>
    <div class="modal-wrapper shadow-xl">
        <!-- <slot :local="local" /> -->
        <slot></slot>
        <ModalClose @click="$emit('closePopup')" />
    </div>
</template>

<script setup>
import ModalClose from '@/components/Modal/ModalClose.vue';
import { ref } from 'vue';

// const props = defineProps({ initialData: { type: Object, default: () => ({}) } });
// const emit = defineEmits(['update:modelValue', 'closePopup']);

// const local = ref({});

// function resetLocal() {
//     // every mount/re-mount gets a fresh copy
//     local.value = structuredClone(toRaw(props.initialData || {}));
// }

// onMounted(resetLocal);
// watch(() => props.initialData, resetLocal, { deep: true });

// // when the modal is confirmed/closed, emit the local back (if you want)
// function closeAndEmit() {
//     emit('update:modelValue', local.value);
//     emit('closePopup');
// }
const visible = ref(false);
</script>
<style lang="scss">
.modal-wrapper {
    position: fixed;
    left: 150px;
    top: 100px;
    z-index: 500;
    width: 55vw;
    height: 50vh;

    background-color: rgba(174, 180, 181, 0.1); // Clear light blue with 10% opacity
    backdrop-filter: blur(15px); // Strong frosted glass effect
    border-radius: 12px;
    border: 1px solid rgba(102, 198, 203, 0.3); // Light sky blue border
    box-shadow: 0 0 25px rgba(135, 206, 250, 0.4); // Light blue glow
    color: var(--black-color); // Very light blue text for readability
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    font-size: 1rem;
    text-transform: uppercase; // High-tech aesthetic
    transition: all 0.3s ease; // Smooth hover effect

    .clear-pane:hover {
        background-color: rgba(173, 216, 230, 0.15); // Slightly more opaque light blue on hover
        box-shadow: 0 0 30px rgba(135, 206, 250, 0.6); // Brighter light blue glow on hover
    }
    .inner {
        background-color: #17dda1;
        padding: 30px;
        border-radius: 12px;
        display: center;
        flex-direction: column;
        position: relative;
        max-width: 250px;
        width: 100%;

        h3 {
            font-size: 16px;
            font-weight: 700;
            line-height: 21px;
            margin-bottom: 20px;
        }

        .form {
            display: flex;
            flex-direction: column;
            max-width: 80%;

            label {
                font-size: 12px;
                font-weight: 500;
                line-height: 16px;
                letter-spacing: 1em;
                text-align: left;
            }

            input,
            select,
            textarea {
                font-size: 12px;
                font-weight: 400;
                line-height: 16px;
                letter-spacing: 0.25em;
                text-align: left;
                // border: 1px solid #c2c2c2;
                border-radius: 4px;
                padding: 8px 12px;
                margin-top: 5px;

                &::placeholder {
                    color: #a6a6a6;
                }
            }

            .btn {
                width: 5px;
                padding-inline: 10px;
            }
        }
    }
}
</style>
