<template>
    <div class="autocomplete">
        <div class="w-64 gap-2 mt-3 space-y-2 mb-2" style="margin-left: 20px">
            <!-- @keypress="checkInput" -->
            <FloatLabel>
                <InputText id="udlInput" v-tooltip.bottom="'Press Tab after value'" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @change="grabInputUDL" />
                <label for="ac">Fastened UDL NOA: 00000000</label>
            </FloatLabel>
        </div>
        <!-- Suggestions list -->
        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @mousedown="selectSuggestion(suggestion)">
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import useENumber from '@/composables/fetchTech/use-systemENumber';
import { usetilesysEStore } from '@/stores/tilesysEStore';

import useTileSystemE from '@/composables/InputLogic/tileSystemEInput';

import { computed, defineEmits, onMounted, reactive, ref } from 'vue';

// Define the emit event to send data to parent
const emit = defineEmits(['update']);
const { callFunction, systemEStore } = useENumber();
const systemStore = usetilesysEStore();

const { getV } = useTileSystemE();

let Edatamounted = ref(systemStore.$state.tilesysEinput);
// Input query
const query = ref('');
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
    arrDesignPressure: []
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
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];
    return suggestions.value.sysEInput[0].sysENumber.noa.filter((item) => item.toString().includes(query.value));
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
    // 23111506
    console.log(datamountedsystemE);
    datamountedsystemE.value.forEach((item, index) => {
        udlTile.Maps = item.systemDataE.Maps;

        Anchor_Base.Anchor_Base_Sheet_E1 = item.systemDataE.Anchor_Base_Sheet_E1;
        Anchor_Base.Anchor_Base_Sheet_E2 = item.systemDataE.Anchor_Base_Sheet_E2;
        Anchor_Base.Anchor_Base_Sheet_E3 = item.systemDataE.Anchor_Base_Sheet_E3;
        Anchor_Base.Anchor_Base_Sheet_E4 = item.systemDataE.Anchor_Base_Sheet_E4;
        Anchor_Base.Anchor_Base_Sheet_E5 = item.systemDataE.Anchor_Base_Sheet_E5;
        Anchor_Base.Anchor_Base_Sheet_E6 = item.systemDataE.Anchor_Base_Sheet_E6;
        Anchor_Base.Anchor_Base_Sheet_E7 = item.systemDataE.Anchor_Base_Sheet_E7;
        Anchor_Base.Anchor_Base_Sheet_E8 = item.systemDataE.Anchor_Base_Sheet_E8;
        Anchor_Base.Anchor_Base_Sheet_E9 = item.systemDataE.Anchor_Base_Sheet_E9;
        Anchor_Base.Anchor_Base_Sheet_E10 = item.systemDataE.Anchor_Base_Sheet_E10;
        Anchor_Base.Anchor_Base_Sheet_E11 = item.systemDataE.Anchor_Base_Sheet_E11;
        Anchor_Base.Anchor_Base_Sheet_E12 = item.systemDataE.Anchor_Base_Sheet_E12;
        Anchor_Base.Anchor_Base_Sheet_E13 = item.systemDataE.Anchor_Base_Sheet_E13;
        console.log(Anchor_Base.Anchor_Base_Sheet_E2, item.systemDataE.Anchor_Base_Sheet_E1);
        udlTile.TileCap_Sheet_Description_E1 = item.systemDataE.TileCap_Sheet_Description_E1;
        udlTile.TileCap_Sheet_Description_E2 = item.systemDataE.TileCap_Sheet_Description_E2;
        udlTile.TileCap_Sheet_Description_E3 = item.systemDataE.TileCap_Sheet_Description_E3;
        udlTile.TileCap_Sheet_Description_E4 = item.systemDataE.TileCap_Sheet_Description_E4;
        udlTile.TileCap_Sheet_Description_E5 = item.systemDataE.TileCap_Sheet_Description_E5;
        udlTile.TileCap_Sheet_Description_E6 = item.systemDataE.TileCap_Sheet_Description_E6;
        udlTile.TileCap_Sheet_Description_E7 = item.systemDataE.TileCap_Sheet_Description_E7;
        udlTile.TileCap_Sheet_Description_E8 = item.systemDataE.TileCap_Sheet_Description_E8;
        udlTile.TileCap_Sheet_Description_E9 = item.systemDataE.TileCap_Sheet_Description_E9;
        udlTile.TileCap_Sheet_Description_E10 = item.systemDataE.TileCap_Sheet_Description_E10;
        udlTile.TileCap_Sheet_Description_E11 = item.systemDataE.TileCap_Sheet_Description_E11;

        udlTile.TileCap_Sheet_Description_E12 = item.systemDataE.TileCap_Sheet_Description_E12;
        udlTile.TileCap_Sheet_Description_E13 = item.systemDataE.TileCap_Sheet_Description_E13;
        udlTile.arrDesignPressure = item.systemDataE.designPressure;
        console.log(item.systemDataE.system);
        if (item.systemDataE.system.length > 1) {
        } else {
            udlTile.system = item.systemDataE.system;
        }
        //  updateselectSystemE();
    });
}

// Method to send data back to parent

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
    }, 200);
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
