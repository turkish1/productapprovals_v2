<script setup>
import useDripSize from '@/composables/use-dripedgesize';
import { onMounted, reactive, ref, watch } from 'vue';

import AgreementsDialogShingle from './AgreementsDialogShingle.vue';
import InputItems from './InputItems.vue';
onMounted(() => {
    isDialog = true;
});
const roofType = ref('Shingle');
let slope = ref(null);
//
let isDialog = ref(false);
const selectDripEdge = ref(null);
const selectDripEdgeSize = ref(null);

let sizes = ref();
let size = ref([]);

const save = useDripSize();
const type = reactive(save.types.value);
const sze = ref([save.typeSize.value]);

let deriv1 = ref();

function checkValue() {
    let devArray = [];

    deriv1 = sze.value[0][0];
    for (let i = 0; i < sze.value[0].length; i++) {
        devArray.push(sze.value[0][i]);
    }

    sizes = devArray;
}

function getdripSize() {
    console.log(sizes, selectDripEdge.value);
    if (selectDripEdge.value !== null) {
        console.log('Enter if state');
        if (selectDripEdge.value === 'Galvanized Steel Metal ¹') {
            size = sizes[0];
            console.log(size);
        }
        if (selectDripEdge.value === 'Stainless Steel Metal ²') {
            size = sizes[1];
        }
        if (selectDripEdge.value === 'Aluminum Metal ³') {
            size = sizes[2];
        }
        if (selectDripEdge.value === 'Copper Metal ⁴') {
            size = sizes[3];
        }
    } else {
        console.log('The element not mounted yet');
    }
}
watch(selectDripEdge, getdripSize, size, () => {
    console.log(selectDripEdge, selectDripEdgeSize);
});

function checkSlope() {
    console.log(slope);
}
</script>
<template>
    <AgreementsDialogShingle v-show="isDialog === true"></AgreementsDialogShingle>

    <div class="card md:w-3/4 container space-y-1" style="margin-left: 50px">
        <div class="card w-96 grid gap-1 grid-cols-1">
            <label>Drip Edge Material</label>
            <Select v-model="selectDripEdge" :options="type" placeholder="make selection" @click="checkValue" />
            <!-- @change="checkValue" -->
            <label>Drip Edge Size</label>
            <Select v-model="selectDripEdgeSize" :options="size" placeholder="make selection" @click="getdripSize" />
        </div>
        <input-items :slopeEntered="slope" style="margin-left: 2px" @change="checkSlope"></input-items>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 1px;
    padding-top: 0.5px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 600px;
    /* min-width: 600px; */
    top: 10vh;
}

/* .ql-container-top {
    padding-bottom: 10px;
    padding-top: 0.2px;
    padding-right: 30px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 650px;
    min-width: 250px;
    top: 10vh;
} */
/* .ql-container-bottom {
    padding-bottom: 3px;
    padding-top: 12px;
    padding-right: 30px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 200px;
    min-width: 250px;
    top: 10vh;
} */
</style>
