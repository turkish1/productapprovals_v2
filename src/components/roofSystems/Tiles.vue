<script setup>
import { ref } from 'vue';
import InputTile from './InputTile.vue';

let slope = ref(null);

function checkSlope() {
    console.log(slope);
}
</script>
<template>
    <div id="tile" class="card w-full space-y-1" style="margin-left: 20px">
        <input-tile :slopeEntered="slope" style="margin-left: 2px" @change="checkSlope"></input-tile>
    </div>
</template>
<style scoped></style>
