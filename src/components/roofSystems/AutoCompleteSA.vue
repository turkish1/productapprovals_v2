<template>
    <div class="autocomplete">
        <div class="w-64 gap-2 mt-3 space-y-2 mb-2" style="margin-left: 20px">
            <!-- @keypress="checkInput" -->
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
import useInputwFetchSA from '@/composables/fetchTech/use-InputwFetchSA';
import useSystemf from '@/composables/use-Inputsystemf';
import { usesystemfStore } from '@/stores/systemfStore';
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
const { callFunction, saStore } = useInputwFetchSA();
const systemStore = usesystemfStore();

const { input, takef } = useSystemf();
let datasbs = ref();
let datasystemf = ref();
// Input query
const query = ref('');
const selfadhered = reactive({
    samanufacturer: '',
    samaterial: '',
    sadescription: '',
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
    system: [],
    maps: [],
    arrSystem: []
});

// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);
onMounted(() => {
    callFunction();

    suggestions.value = saStore.$state;
    console.log(suggestions.value);
});

const saData = ref([]);
const saIterate = ref([]);
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];

    saData.value = suggestions.value.noasa[0]?.saNoaNumber?.noa;
    saIterate.value = saData.value.body ?? [];
    // .body ?? [];
    const stringyfied1 = JSON.stringify(saIterate.value).split('[').join();

    const stringyfied2 = JSON.stringify(stringyfied1).split(']').join();
    const newArray = computed(() => stringyfied2.split(',').map((s) => s.trim()));
    console.log(newArray.value);

    return newArray.value.filter((item) => item.toString().includes(query.value));
    // return suggestions.value.noasa[0].saNoaNumber.noa.filter((item) => item.toString().includes(query.value));
});
let systemdatamt = ref(systemStore.$state.systeminput);

function grabInputSA() {
    datasbs.value = query.value;
    datasystemf.value = query.value;
    if (query.value !== null) {
        takef(datasystemf.value);
    }
    checkInputSystem();
}

function checkInputSystem() {
    systemdatamt.value.forEach((item, index) => {
        console.log(item.systemData.Description_F1, item.systemData.Description_F2);
        selfadhered.samanufacturer = item.systemData.manufacturer;
        selfadhered.samaterial = item.systemData.material;
        selfadhered.Description_F1 = item.systemData.Description_F1;
        selfadhered.Description_F2 = item.systemData.Description_F2;
        selfadhered.Description_F3 = item.systemData.Description_F3;
        selfadhered.Description_F4 = item.systemData.Description_F4;
        selfadhered.Description_F5 = item.systemData.Description_F5;
        selfadhered.Description_F6 = item.systemData.Description_F6;
        selfadhered.Description_F7 = item.systemData.Description_F7;
        selfadhered.Description_F8 = item.systemData.Description_F8;
        selfadhered.Description_F9 = item.systemData.Description_F9;
        selfadhered.Description_F10 = item.systemData.Description_F10;
        selfadhered.Description_F11 = item.systemData.Description_F11;
        selfadhered.arrSystem = item.systemData.arraySystem;
        selfadhered.system = item.systemData.system;
    });
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
