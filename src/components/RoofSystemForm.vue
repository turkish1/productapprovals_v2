<script setup>
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted, useToNumber } from '@vueuse/core';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { ref } from 'vue';

import { useGeneralpdfStore } from '@/stores/generalpageStore';

const generalpageStore = useGeneralpdfStore();

const store = useRoofListStore();
const permitStore = usePermitappStore();

// Assume that permitStore.$state.permitapp is an array and that the first item
// has a property "miamibeach" that can be converted to a number.
const MB = ref(permitStore.$state.permitapp[0]?.miamibeach);

const area = ref('');
const selectedItem = ref(null);
const type = ref([{ name: ' ' }, { name: 'Asphalt Shingle' }, { name: 'Low Slope' }, { name: 'Mechanical Fastened Tile' }, { name: 'Adhesive Set Tile' }, { name: 'Metal Panel' }]);
const types = ref([{ name: ' ' }, { name: 'Low Slope' }, { name: 'Mechanical Fastened Tile' }, { name: 'Adhesive Set Tile' }, { name: 'Metal Panel' }]);

const isMiamiBeachValid = ref(false);
const mbVal = ref(2);
// Use MB.value (not MB._value) to access the reactive value.
const convertMB = useToNumber(MB.value);

tryOnMounted(() => {
    console.log(MB.value);
    console.log(permitStore.$state);
    if (convertMB.value === mbVal.value) {
        console.log('Entry');
        isMiamiBeachValid.value = true;
        console.log(isMiamiBeachValid.value);
    }
});

// Reset the roof list store.
function clearSelected() {
    store.$reset();
}
const checked = ref(false);
const dataGeneral = {
    roofCheck: ''
};
// When the user changes the selection, add the item based on the entered area.
function addItemAndClear() {
    // Get the selected item name (if any)
    const item = selectedItem.value ? selectedItem.value.name : '';
    if (!item || item.trim() === '') {
        return;
    }
    // Check the item name and call the appropriate store method.
    if (item === 'Asphalt Shingle') {
        const dim1 = area.value;
        store.addSystemShingle(item, dim1);
        console.log(item, dim1);
    } else if (item === 'Low Slope') {
        const dim2 = area.value;
        store.addSystemBur(item, dim2);
    } else if (item === 'Mechanical Fastened Tile') {
        const dim3 = area.value;
        store.addSystemMTile(item, dim3);
    } else if (item === 'Adhesive Set Tile') {
        const dim4 = area.value;
        store.addSystemATile(item, dim4);
    } else if (item === 'Metal Panel') {
        const dim5 = area.value;
        store.addSystemMetal(item, dim5);
    }
    dataGeneral.roofCheck = checked;
    generalpageStore.addgeneralpdfData(dataGeneral);
    clear();
}

// Clear the input fields.
function clear() {
    area.value = '';
    selectedItem.value = null;
}
</script>

<template>
    <div id="roofselect" class="flex card justify-center">
        <div class="refresh">
            <Button plain text>
                <i class="pi pi-refresh" style="font-size: 1.5rem; color: grey; margin-left: 50px; margin-top: 90px" @click="clearSelected"></i>
            </Button>
        </div>
        <div class="flex justify-center">
            <form>
                <!-- If Miami Beach is NOT valid, use one set of options -->
                <div v-show="!isMiamiBeachValid" class="flex flex-col gap-4">
                    <label>Enter Square Footage</label>
                    <InputText type="text" v-model="area" />
                    <label>Select System</label>
                    <Select v-model="selectedItem" :options="type" optionLabel="name" placeholder="Select roof system" class="w-full md:w-72" @change="addItemAndClear" />
                </div>
                <!-- If Miami Beach IS valid, use a different set of options -->
                <div v-show="isMiamiBeachValid" class="card flex flex-col gap-4">
                    <label>Enter Square Footage</label>
                    <InputText type="text" v-model="area" />
                    <label>Select System</label>
                    <Select v-model="selectedItem" :options="types" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" @change="addItemAndClear" />
                </div>

                <!-- <div class="flex flex-wrap mt-4 space-y-6 justify-center gap-6">
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="newroof" name="checked" value="newroof" />
                        <label for="newroof" class="ml-2" style="color: #122620">New Roof </label>
                    </div>
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
                        <label for="reroof" class="ml-2" style="color: #122620">Re-Roof </label>
                    </div>
                </div> -->
            </form>
        </div>

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
    background-color: grey;
}
</style>
