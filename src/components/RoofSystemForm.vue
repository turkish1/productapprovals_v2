<script setup>
import { useRoofListStore } from '@/stores/roofList';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { ref } from 'vue';

const store = useRoofListStore();
const area = ref('');
const selectedItem = ref('');
const type = ref([{ name: 'Low Slope' }, { name: 'Asphalt Shingle' }, { name: 'Mechanical Fastened Tile' }, { name: 'Mortar/Adhesive Tile' }, { name: 'Metal Panel' }]);

function addItemAndClear(item, dim) {
    item = selectedItem.value.name;
    dim = area.value;
    if (item.length === 0) {
        return;
    }
    store.addSystem(item, dim);
    clear();
    console.log(item, dim, 'System added');
}

function clear() {
    area.value = '';
    // type.value.Clear();
}
</script>
<template>
    <div class="card flex justify-center">
        <!-- addItemAndClear(roofSystem) -->

        <form>
            <div class="card flex flex-col gap-4">
                <h1 class="h1">Select System</h1>

                <Select v-model="selectedItem" :options="type" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" />
                <InputText type="text" v-model="area" />
            </div>
        </form>
        <div class="add">
            <i class="pi pi-plus-circle" style="font-size: 2rem; color: green" @click="addItemAndClear(selectedItem, area)"></i>
        </div>
        <div class="grid grid-cols-2 gap-4 place-content-end h72 ..">
            <div>
                <Button class="button" label="Submit" severity="contrast" as="router-link" to="/permitapp"></Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.add {
    margin-left: 80px;
    margin-top: 110px;
}

.button {
    margin-left: 70px;
    margin-top: 300px;
}
</style>
