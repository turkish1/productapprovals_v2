<template>
    <div class="autocomplete">
        <div class="w-64 gap-2 space-y-2 mb-2" style="margin-left: 20px">
            <!-- @keypress="checkInput" -->
            <FloatLabel>
                <InputText id="udlInput" v-tooltip.bottom="'Press Tab after value'" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @change="grabInputUDL" />
                <label for="ac">Fastened UDL NOA: 00000000</label>
            </FloatLabel>
        </div>
        <!-- Suggestions list -->
        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @mousedown.passive="selectSuggestion(suggestion)">
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import useENumber from '@/composables/fetchTech/use-systemENumber';
import { usetilesysEStore } from '@/stores/tilesysEStore';

import useTileSystemE from '@/composables/InputLogic/tileSystemEInput';

import { computed, defineEmits, onMounted, reactive, ref, watch } from 'vue';

// Define the emit event to send data to parent
const emit = defineEmits(['update', 'cleared']);
const { callFunction, systemEStore } = useENumber();
const systemStore = usetilesysEStore();
const query = ref('');
const { getV } = useTileSystemE();

// Input model for this component

// 🔔 Emit "cleared" whenever the field is emptied
watch(query, (v) => {
    if (v == null || String(v).trim() === '') emit('cleared');
});
let Edatamounted = ref(systemStore.$state.tilesysEinput);
// Input query

const udlTile = reactive({
    noa: '',
    manufacturer: '',
    material: '',
    system: [],
    designPressure: [],
    Anchor_Base_Sheet: [],
    TileCap_Sheet_Description: [],
    Anchor_Base_Sheet_E1: '',
    Anchor_Base_Sheet_E2: '',
    Anchor_Base_Sheet_E3: '',
    Anchor_Base_Sheet_E4: '',
    Anchor_Base_Sheet_E5: '',
    Anchor_Base_Sheet_E6: '',
    Anchor_Base_Sheet_E7: '',
    Anchor_Base_Sheet_E8: '',
    Anchor_Base_Sheet_E9: '',
    Anchor_Base_Sheet_E10: '',
    Anchor_Base_Sheet_E11: '',
    Anchor_Base_Sheet_E12: '',
    Anchor_Base_Sheet_E13: '',
    TileCap_Sheet_Description: [],
    TileCap_Sheet_Description_E1: '',
    TileCap_Sheet_Description_E2: '',
    TileCap_Sheet_Description_E3: '',
    TileCap_Sheet_Description_E4: '',
    TileCap_Sheet_Description_E5: '',
    TileCap_Sheet_Description_E6: '',
    TileCap_Sheet_Description_E7: '',
    TileCap_Sheet_Description_E8: '',
    TileCap_Sheet_Description_E9: '',
    TileCap_Sheet_Description_E10: '',
    TileCap_Sheet_Description_E11: '',
    TileCap_Sheet_Description_E12: '',
    TileCap_Sheet_Description_E13: '',
    arrDesignPressure: [],
    Maps: []
});
let datamountedsystemE = ref(systemStore.$state.tilesysEinput);
// etileStore.$state.tilesysEinput
const datasystemE = ref();
// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);
onMounted(() => {
    callFunction();

    suggestions.value = systemEStore.$state;
});

const systemENOA = ref([]);
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    console.log(suggestions.value.sysEInput?.[0].sysENumber.noa.body);
    // paddyCategory.value === 'double' ? suggestions.value.pdInputs?.[0].pdNumbers.noa.body
    if (!query.value) return [];
    systemENOA.value = suggestions.value.sysEInput?.[0].sysENumber.noa.body;
    const stringyfield1 = JSON.stringify(systemENOA.value).split('[').join();
    const stringyfield2 = JSON.stringify(stringyfield1).split(']').join();
    // .filter((item) => console.log(item));
    console.log(stringyfield2);
    const newArray = computed(() => stringyfield2.split(',').map((s) => s.trim()));
    console.log(newArray.value);

    return newArray.value.filter((item) => item.toString().includes(query.value));
    // return suggestions.value.sysEInput?.[0].sysENumber.noa.filter((item) => console.log(item))
    // filter((item) => item.toString().includes(query.value));
});

function grabInputUDL() {
    datasystemE.value = query.value;

    if (query.value !== null) {
        //  17040522
        console.log(udlInput.value);
        getV(datasystemE.value);
    }

    sysEcheckInput();
}

function sysEcheckInput() {
    console.log(Edatamounted.value);
    if (Edatamounted.value.length !== null) {
        Edatamounted.value.forEach((item, index) => {
            udlTile.manufacturer = item.systemDataE.manufacturer;
            udlTile.material = item.systemDataE.material;
            udlTile.system = item.systemDataE.system;
        });
    }
    EcheckInputSystem();
}

const Anchor_Base = reactive({
    Anchor_Base_Sheet_E1: '',
    Anchor_Base_Sheet_E2: '',
    Anchor_Base_Sheet_E3: '',
    Anchor_Base_Sheet_E4: '',
    Anchor_Base_Sheet_E5: '',
    Anchor_Base_Sheet_E6: '',
    Anchor_Base_Sheet_E7: '',
    Anchor_Base_Sheet_E8: '',
    Anchor_Base_Sheet_E9: '',
    Anchor_Base_Sheet_E10: '',
    Anchor_Base_Sheet_E11: '',
    Anchor_Base_Sheet_E12: '',
    Anchor_Base_Sheet_E13: ''
});

function EcheckInputSystem() {
    const items = datamountedsystemE?.value;
    if (!Array.isArray(items) || items.length === 0) return;

    // Grab the first entry that actually has systemDataE
    const sd = items.find((it) => it && it.systemDataE)?.systemDataE;
    if (!sd) return;

    // Core maps/arrays
    udlTile.Maps = sd.Maps ?? {};
    udlTile.arrDesignPressure = Array.isArray(sd.designPressure) ? sd.designPressure.slice() : [];

    // If you need these basics too (optional):
    udlTile.noa = sd.noa ?? udlTile.noa;
    udlTile.manufacturer = sd.manufacturer ?? udlTile.manufacturer;
    udlTile.material = sd.material ?? udlTile.material;

    // Normalize systems to an array for the <Select>
    udlTile.system = Array.isArray(sd.system) ? sd.system.slice() : sd.system ? [sd.system] : [];

    // Fill Anchor_Base_Sheet_E1..E13 and TileCap_Sheet_Description_E1..E13
    for (let i = 1; i <= 13; i++) {
        const aKey = `Anchor_Base_Sheet_E${i}`;
        const dKey = `TileCap_Sheet_Description_E${i}`;

        Anchor_Base[aKey] = sd[aKey] ?? '';
        udlTile[dKey] = sd[dKey] ?? '';
    }
    // Method to send data back to parent
}
// Method to update the input field with selected suggestion
const selectSuggestion = (suggestion) => {
    query.value = suggestion;
    showSuggestions.value = false;
};

// Method to handle input change
const onInput = () => {
    showSuggestions.value = true;
};

// Method to hide suggestions when input loses focus (with a delay to allow clicking suggestions)
const hideSuggestions = () => {
    setTimeout(() => {
        showSuggestions.value = false;
    }, 100);
};
</script>

<style scoped>
.autocomplete {
    position: relative;
    width: 300px;
}

input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
}

.suggestions {
    color: black;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    position: absolute;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    background: white;
    z-index: 1000;
}

.suggestions li {
    padding: 8px;
    cursor: pointer;
}

.suggestions li:hover {
    background-color: #f0f0f0;
}
</style>
