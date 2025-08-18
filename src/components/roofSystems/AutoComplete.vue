<template>
    <div class="autocomplete">
        <div class="w-64 gap-2 mt-8 space-y-2 mb-2" style="margin-left: 20px">
            <!-- @keypress="checkInput" -->
            <FloatLabel>
                <InputText id="shinglenoa" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @change="grabInput" />
                <label for="ac">Shingle NOA: 00000000</label>
            </FloatLabel>
        </div>
        <!-- Suggestions list -->
        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @pointerdown.prevent="selectSuggestion(suggestion)">
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import useInputwFetch from '@/composables/fetchTech/use-InputwFetch';
import useInputs from '@/composables/use-Inputs';
import { useShingleStore } from '@/stores/shingleStore';
import { storeToRefs } from 'pinia';
import { computed, defineEmits, defineProps, onMounted, reactive, ref } from 'vue';

// Receive data from the parent component via props
const props = defineProps({
    manufacturer: String,
    material: String,
    description: String
});

// Define the emit event to send data to parent
const emit = defineEmits(['update']);
const inputData = ref(props.manufacturer, props.material, props.description);
const { callFunction, noaStore } = useInputwFetch();
const store = useShingleStore();
const { inputshingle } = storeToRefs(store);
const { input, takeValue } = useInputs();
let data = ref();
// Input query
const query = ref('');
const shingles = reactive({
    manufacturer: '',
    material: '',
    description: ''
});
// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);

const shingleData = ref([]);
const shingleIterate = ref([]);

onMounted(() => {
    callFunction();

    suggestions.value = noaStore.$state.noashingle;
    // console.log(suggestions.value);
});
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];

    shingleData.value = suggestions.value[0]?.shingleNoaNumber?.noa;
    console.log(shingleData.value.body);
    shingleIterate.value = shingleData.value.body;
    // console.log('line 69', shingleIterate.value);
    const stringyfied1 = JSON.stringify(shingleIterate.value).split('[').join();

    const stringyfied2 = JSON.stringify(stringyfied1).split(']').join();
    const newArray = computed(() => stringyfied2.split(',').map((s) => s.trim()));
    console.log(newArray.value);

    return newArray.value.filter((item) => item.toString().includes(query.value));

    // return suggestions.value[0].shingleNoaNumber.noa.filter((item) => item.toString().includes(query.value));
});

let datamounted = ref(inputshingle._object.inputshingle);
function grabInput() {
    data.value = query.value;

    if (query.value !== null) {
        takeValue(data.value);
        checkInput();
    }
}
function checkInput() {
    if (datamounted.value.length !== null) {
        datamounted.value.forEach((item, index) => {
            // console.log(item.shingleData, index);
            shingles.manufacturer = item.shingleData.applicant;
            shingles.material = item.shingleData.material;
            shingles.description = item.shingleData.description;
        });
    }
    sendDataToParent();
}

// Method to send data back to parent
const sendDataToParent = () => {
    // Emitting the 'update' event with data
    emit('updated', inputData.value);
};
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
