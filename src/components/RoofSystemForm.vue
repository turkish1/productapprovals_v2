<script setup>
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted, useToNumber } from '@vueuse/core';
import AOS from 'aos';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { onMounted, ref } from 'vue';
import Map from './Maps/Map.vue';
const store = useRoofListStore();
const permitStore = usePermitappStore();

const MB = ref(permitStore.$state.permitapp);

const area = ref('');
const selectedItem = ref('');
const type = ref([{ name: ' ' }, { name: 'Asphalt Shingle' }, { name: 'Low Slope' }, { name: 'Mechanical Fastened Tile' }, { name: 'Adhesive Set Tile' }, { name: 'Metal Panel' }]);
const types = ref([{ name: ' ' }, { name: 'Low Slope' }, { name: 'Mechanical Fastened Tile' }, { name: 'Adhesive Set Tile' }, { name: 'Metal Panel' }]);
const isMiamiBeachValid = ref(false);
const mbVal = ref(2);
const convertMB = useToNumber(MB._value[0].miamibeach);

tryOnMounted(() => {
    if (convertMB.value === mbVal.value) {
        console.log('Entry');
        isMiamiBeachValid.value = true;
        console.log(isMiamiBeachValid.value);
    }
});
function clearSelected() {
    store.$reset();
}

onMounted(() => {
    AOS.init({
        duration: 800, // Animation duration in ms
        easing: 'ease-in-out', // Easing for animations
        once: true // Whether animation happens only once
    });
});
function addItemAndClear(item, dim1, dim2, dim3, dim4, dim5) {
    item = selectedItem.value.name;

    if (item.length === 0) {
        return;
    }
    if (item === 'Asphalt Shingle') {
        dim1 = area.value;
        store.addSystemShingle(item, dim1);
        console.log(item, dim1);
    }
    if (item === 'Low Slope') {
        dim2 = area.value;
        store.addSystemBur(item, dim2);
    }

    if (item === 'Mechanical Fastened Tile') {
        dim3 = area.value;

        store.addSystemMTile(item, dim3);
    }
    if (item === 'Adhesive Set Tile') {
        dim4 = area.value;
        store.addSystemATile(item, dim4);
    }
    if (item === 'Metal Panel') {
        dim5 = area.value;
        store.addSystemMetal(item, dim5);
    }

    clear();
    console.log(item, dim1, 'System added');
}

function clear() {
    area.value = '';

    selectedItem.value = '';
}
</script>
<template>
    <!-- style="background-color: #eae7e2" -->
    <div id="roofselect" class="card flex justify-center">
        <div class="refresh">
            <Button plain text><i class="pi pi-refresh" style="font-size: 2rem; color: grey; margin-left: 10px; margin-top: 90px" @click="clearSelected"></i></Button>
        </div>

        <div class="card flex justify-center">
            <form>
                <!-- style="background-color: #eae7e2" -->
                <div v-show="!isMiamiBeachValid" class="card flex flex-col gap-4">
                    <h1 class="h1">Select System</h1>

                    <Select v-model="selectedItem" :options="type" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" />
                    <InputText type="text" v-model="area" />
                </div>
                <div v-show="isMiamiBeachValid" class="card flex flex-col gap-4">
                    <h1 class="h1">Select System</h1>

                    <Select v-model="selectedItem" :options="types" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" />
                    <InputText type="text" v-model="area" />
                </div>
            </form>
        </div>
        <!-- Prevent the addition of a system until the roof area has been entered -->
        <div class="add">
            <i class="pi pi-plus-circle" style="font-size: 2rem; color: gray; margin-left: 1px; margin-top: 150px" @click="addItemAndClear(selectedItem, area)"></i>
        </div>

        <div class="grid grid-cols-1 gap-2 place-content-end h42 ..">
            <div>
                <Button class="button" label="Submit" raised style="margin-left: 5px; margin-top: 100px; background-color: #a4b5b9" as="router-link" to="/generalpage" @click="generatePdf"></Button>
            </div>
        </div>
    </div>
    <div data-aos="zoom-in-up">
        <div class="card flex justify-center" style="margin-left: 10px">
            <Map></Map>
        </div>
    </div>
</template>

<style scoped>
/* .add { */
/* margin-left: 280px;
    margin-top: 30px; */
/* } */
/* .refresh {
    margin-left: 40px;
    margin-top: 90px;
} */

/* .button {
    margin-left: 30px;
    margin-top: 120px;
} */
</style>
