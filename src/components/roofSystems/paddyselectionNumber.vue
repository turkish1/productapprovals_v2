<template>
    <div class="autocomplete">
        <div class="w-64 gap-2 mt-3 space-y-2 mb-2" style="margin-left: 20px">
            <!-- @keypress="checkInput" -->
            <FloatLabel>
                <InputText id="tilenoa" v-tooltip.bottom="'Press Tab after value'" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @change="grabInput" />
                <label for="ac">Tile NOA: 00000000</label>
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
import useDouble from '@/composables/fetchTech/use-doublepdNumber';
import useSingle from '@/composables/fetchTech/use-singlepdNumber';

import { computed, onMounted, ref } from 'vue';

// Define the emit event to send data to parent

const { callFunction, singleStore } = useSingle();
const { callFunctions, doubleStore } = useDouble();

// Input query
const query = ref('');

// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);

onMounted(() => {
    callFunction();
    callFunctions();
    suggestions.value = isSinglepaddyValid.value === true ? singleStore.$state : doubleStore.$state;
    console.log(suggestions.value);
});

// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];
    else if (isSinglepaddyValid) {
        return suggestions.value.singlepdInput[0].singlepdNumber.noa.filter((item) => item.toString().includes(query.value));
    }
    // let singlepd = suggestions.value.singlepdInput[0].singlepdNumber.noa;
    // let doublepd = suggestions.value.doublepdInput[0].doublepdNumber.noa;
    // let goOn = (isSinglepaddyValid.value = true ? singlepd : doublepd);
    else return suggestions.value.doublepdInput[0].doublepdNumber.noa.filter((item) => item.toString().includes(query.value));
});

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
