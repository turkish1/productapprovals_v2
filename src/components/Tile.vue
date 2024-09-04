<script setup>
// import TileTable1 from '@/components/TileTable.vue';
// import { useRoofListStore } from '@/stores/roofList';
// import { invoke, until } from '@vueuse/shared';
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
<style scoped>
/* .container {
    padding-bottom: 3px;
    padding-top: 1px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 200px;
    min-width: 150px;
    top: 10vh;
} */

/* .ql-container {
    padding-bottom: 30px;
    padding-top: 12px;
    padding-right: 30px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 250px;
    min-width: 250px;
    top: 10vh;
} */
</style>
