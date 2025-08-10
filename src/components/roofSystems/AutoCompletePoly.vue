<template>
    <div class="autocompletepoly">
        <div class="w-64 gap-2 mt-3 space-y-2 mb-2" style="margin-left: 20px">
            <!-- @keypress="checkInput" -->
            <FloatLabel>
                <InputText id="udlInput" inputId="ac" v-model="query" @change="grabInputUDL" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" />

                <!-- <InputText id="shinglenoa" v-model="query"  @change="grabInput" /> -->
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
import useInputwFetchPoly from '@/composables/fetchTech/use-InputwFetchPoly';

import useInputpoly from '@/composables/use-Inputpoly';
import { usePolyStore } from '@/stores/polyStore';

import { storeToRefs } from 'pinia';
import { computed, defineEmits, defineProps, onMounted, reactive, ref } from 'vue';

// Receive data from the parent component via props
const props = defineProps({
    manufacturer: String,
    material: String,
    description: String
});
const { inp, takp } = useInputpoly();
// Define the emit event to send data to parent
const emit = defineEmits(['updatedPoly']);
const inputPolyData = ref(props.manufacturer, props.material, props.description);
const { callFunction, polyStores } = useInputwFetchPoly();
const polyStore = usePolyStore();
const { polyinput } = storeToRefs(polyStore);
// const { input, takeValue } = useInputs();
let datapoly = ref();
// Input query
const query = ref('');
const underlayment = reactive({
    umanufacturer: '',
    umaterial: '',
    udescription: ''
});
// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);
onMounted(() => {
    callFunction();

    suggestions.value = polyStores.$state;
    console.log(suggestions.value);
});
// Computed property to filter suggestions based on user input

const polyData = ref([]);
const polyIterate = ref([]);
const filteredSuggestions = computed(() => {
    if (!query.value) return [];

    polyData.value = suggestions.value?.noapoly[0]?.polyNoaNumber?.noa;
    console.log(polyData.value);
    polyIterate.value = polyData.value.body ?? [];
    const stringyfied1 = JSON.stringify(polyIterate.value).split('[').join();

    const stringyfied2 = JSON.stringify(stringyfied1).split(']').join();
    const newArray = computed(() => stringyfied2.split(',').map((s) => s.trim()));
    console.log(newArray.value);

    return newArray.value.filter((item) => item.toString().includes(query.value));
    // return suggestions.value.noapoly[0].polyNoaNumber.noa.filter((item) => item.toString().includes(query.value));
    // .polyNoaNumber.noa.filter((item) => item.toString().includes(query.value));
});
let polydatamt = ref(polyinput._object.polyinput);
// let datamounted = ref(inputshingle._object.inputshingle);
function grabInputUDL() {
    datapoly.value = query.value;
    if (query.value !== null) {
        takp(datapoly.value);
    }
    checkInputPoly();
}
function checkInputPoly() {
    if (polydatamt.value.length !== null) {
        polydatamt.value.forEach((item, index) => {
            underlayment.umanufacturer = item.polyData.applicant;
            underlayment.umaterial = item.polyData.material;
            underlayment.udescription = item.polyData.description;
        });
    }
    sendPolyDataToParent();
}

// Method to send data back to parent
const sendPolyDataToParent = () => {
    // Emitting the 'update' event with data
    emit('updatedPoly', inputPolyData.value);
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
.autocompletepoly {
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
