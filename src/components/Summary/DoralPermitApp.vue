<script setup>
import { ref } from 'vue';
// import PdfOutput from '../jsPDF/PdfOutput.vue';
const selectedClass1 = ref();
const selectedClass2 = ref();
const selectedClass3 = ref();
const workone = ref([
    { name: 'NEW CONSTRUCTION COMMERCIAL', code: '01' },
    { name: 'New CONSTRUCTION  RESIDENTIAL', code: '02' },
    { name: 'ADDITION', code: '03' },
    { name: 'ALTERATION-INTERIOR', code: '04' },
    { name: 'ALTERATION-EXTERIOR', code: '05' },
    { name: 'FIRE-PLACE', code: '06' }
]);

const worksecond = ref([
    { name: 'DEMOLISH-REROOF', code: '06' },
    { name: 'DRIVEWAY/PAVERS/SLAB', code: '07' },
    { name: 'FENCE/WALL', code: '08' },
    { name: 'POOL/SPA', code: '09' },
    { name: 'ALTERATION-EXTERIOR', code: '10' },
    { name: 'SHED/ACCESSORY BLDG', code: '11' }
]);

const workthird = ref([
    { name: 'SHUTTER', code: '12' },
    { name: 'SHOP DRAWING', code: '13' },
    { name: 'ELECTRICAL WALL SIGN', code: '14' },
    { name: 'FLOODPLAIN DEVELOPMENT', code: '15' }
]);
</script>

<template>
    <div class="card px-7 py-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:px-0" style="background-color: darkgray">
        <div class="flex items-center">
            <label>SELECT APPLICATION TYPE</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="newroof" name="checked" value="newroof" />
            <label for="newroof" class="ml-2"> MASTER/PRIMARY PERMIT</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2"> TRADE/SUB PERMIT OR SHOP DWG</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2"> REVISION</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2">RENEWAL</label>
        </div>
    </div>
    <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">FOLIO #(13-digits)</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Margot Foster</dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">Job Address</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">UNIT #</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">ZIP</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">LOT:</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">BLOCK:</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">PLAT BOOK/PAGE:</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">SUBDIVISION:</dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
        </dl>
    </div>
    <label>BUILDING PERMIT TYPE(Select master/sub permit type. See below for REVISION DISCIPLINES.)</label>
    <Divider />
    <div class="card px-7 py-6 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0" style="background-color: darkgray">
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="newroof" name="checked" value="newroof" />
            <label for="newroof" class="ml-2">BUILDING</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2">MECHANICAL/FIRE</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2">ROOFING</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2">ELECTRICAL</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2">PLUMBING/GAS</label>
        </div>
        <div class="flex items-center">
            <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
            <label for="reroof" class="ml-2">FLOODPLAIN</label>
        </div>
    </div>
    <!-- CREATE A SELECT BOX -->
    <div class="card px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0" style="background-color: bisque">
        <div class="card flex justify-center" style="background-color: bisque">
            <Listbox v-model="selectedClass1" :options="workone" multiple optionLabel="name" class="w-full md:w-56" />
        </div>

        <div class="card flex justify-center" style="background-color: bisque">
            <Listbox v-model="selectedClass2" :options="worksecond" multiple optionLabel="name" class="w-full md:w-56" />
        </div>

        <div class="card flex justify-center" style="background-color: bisque">
            <Listbox v-model="selectedClass3" :options="workthird" multiple optionLabel="name" class="w-full md:w-56" />
        </div>
        <!-- <PdfOutput /> -->
    </div>
</template>
