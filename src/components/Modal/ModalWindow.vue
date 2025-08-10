<template>
    <div class="modal-wrapper shadow-xl">
        <slot></slot>

        <ModalClose @click="$emit('closePopup')" />
    </div>
</template>

<script setup>
import ModalClose from '@/components/Modal/ModalClose.vue';
import { ref } from 'vue';
const visible = ref(false);
</script>
<style lang="scss">
.modal-wrapper {
    position: fixed;
    left: 250px;
    top: 100px;
    z-index: 500;
    width: 40vw;
    height: 50vh;
    background: #eae7e2;
    // background: rgba(20, 7, 207, 0.2);

    display: grid;
    place-items: left;
    color: var(--black-color);

    .inner {
        background-color: #17dda1;
        padding: 30px;
        border-radius: 12px;
        display: center;
        flex-direction: column;
        position: relative;
        max-width: 200px;
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
                border: 1px solid #c2c2c2;
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
