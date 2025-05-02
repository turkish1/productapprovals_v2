<template>
    <div class="autocomplete">
        <div class="w-64 gap-2 mt-3 space-y-2 mb-2" style="margin-left: 20px">
            <FloatLabel>
                <InputText id="sanoa" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @change="grabInputSA" />
                <label for="ac">S/A Membrane NOA: 00000000</label>
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
import useFNumber from '@/composables/fetchTech/use-systemFNumber';
import { usetilesysfStore } from '@/stores/tilesysfStore';

import useTileSystemF from '@/composables/InputLogic/tileSystemFInput';

import { computed, defineEmits, onMounted, reactive, ref } from 'vue';

// Define the emit event to send data to parent
const emit = defineEmits(['update']);
// const inputData = ref(props.manufacturer, props.material, props.description);
const { callFunction, systemFStore } = useFNumber();
const systemStore = usetilesysfStore();

const { takef } = useTileSystemF();

let datamounted = ref(systemStore.$state.tilefinput);
// Input query
const query = ref('');
const saTiles = reactive({
    manufacturer: '',
    material: '',
    system: [],
    designpressure: [],
    description: [],
    Description_F1: '',
    Description_F2: '',
    Description_F3: '',
    Description_F4: '',
    Description_F5: '',
    Description_F6: '',
    Description_F7: '',
    Description_F8: '',
    Description_F9: '',
    Description_F10: '',
    Description_F11: '',
    arrDesignPressure: []
});
const datasystemf = ref();
// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);
onMounted(() => {
    callFunction();

    suggestions.value = systemFStore.$state;
});
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];
    return suggestions.value.sysFInput[0].sysFNumber.noa.filter((item) => item.toString().includes(query.value));
});

function grabInputSA() {
    datasystemf.value = query.value;
    if (query.value !== null) {
        takef(datasystemf.value);
    }

    checkInputSA();
}
function checkInputSA() {
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            console.log(item);
            saTiles.manufacturer = item.systemData.manufacturer;
            saTiles.material = item.systemData.material;
            saTiles.system = item.systemData.system;
        });
    }
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
