<script setup>
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted, useToNumber } from '@vueuse/core';

import Button from 'primevue/button';
import Select from 'primevue/select';
import { ref } from 'vue';
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
}

function clear() {
    area.value = '';

    selectedItem.value = '';
}
</script>
<template>
    <div id="roofselect" class="card flex justify-center">
        <div class="refresh">
            <Button plain text><i class="pi pi-refresh" style="font-size: 2rem; color: grey; margin-left: 10px; margin-top: 90px" @click="clearSelected"></i></Button>
        </div>

        <div class="card flex justify-center">
            <form>
                <div v-show="!isMiamiBeachValid" class="card flex flex-col gap-4">
                    <h1 class="h1">Select System</h1>

                    <Select v-model="selectedItem" :options="type" optionLabel="name" placeholder="Select roof system" class="w-full md:w-72" />
                    <InputText type="text" v-model="area" />
                </div>
                <div v-show="isMiamiBeachValid" class="card flex flex-col gap-4">
                    <h1 class="h1">Select System</h1>

                    <Select v-model="selectedItem" :options="types" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" />
                    <InputText type="text" v-model="area" />
                </div>
            </form>
        </div>
        <div class="add">
            <i class="pi pi-plus-circle" style="font-size: 2rem; color: gray; margin-left: 1px; margin-top: 150px" @click="addItemAndClear(selectedItem, area)"></i>
        </div>
        <!-- grid grid-cols-1 mt-3 w-full w-64 gap-4 place-content-end h36 .. -->
        <div class="flex flex-col gap-4">
            <div>
                <Button class="button" label="Submit" raised style="margin-right: 90px; margin-top: 230px; background-color: #a4b5b9" as="router-link" to="/generalpage"></Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    background-size: cover;
}
</style>
