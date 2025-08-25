<template>
    <div class="autocompletesa">
        <div class="w-64 gap-2 mt-8 space-y-2 mb-2" style="margin-left: 20px">
            <!-- @keypress="checkInput" -->
            <FloatLabel>
                <InputText id="sanoa" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @change="grabInputSA" />
                <label for="ac">S/A NOA: 00000000</label>
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
import useInputwFetchSA from '@/composables/fetchTech/use-InputwFetchSA';
import useSystemf from '@/composables/use-Inputsystemf';
import { usesystemfStore } from '@/stores/systemfStore';
import { computed, defineEmits, defineProps, onMounted, reactive, ref, watch } from 'vue';

// Receive data from the parent component via props
const props = defineProps({
    manufacturer: String,
    material: String,
    description: String
});
// Define the emit event to send data to parent
const emit = defineEmits(['updateSA']);
const inputData = ref(props.manufacturer, props.material, props.description);
const { callFunction, saStore } = useInputwFetchSA();
const systemStore = usesystemfStore();

const { input, takef } = useSystemf();
let datasbs = ref();
let datasystemf = ref();
// Input query
// const query = ref(props.sanoa);

watch(
    () => props.sanoa,
    (v) => {
        if (v !== query.value) query.value = v;
    }
);

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
    Description_F12: '',
    Description_F13: '',
    Description_F14: '',
    Description_F15: '',
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
});

const saData = ref([]);
const saIterate = ref([]);
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];

    saData.value = suggestions.value.noasa[0]?.saNoaNumber?.noa;
    console.log(suggestions.value.noasa[0]?.saNoaNumber?.noa);
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

const buildMap = (keys = [], values = []) => Object.fromEntries((keys || []).map((k, i) => [String(k), values?.[i]]));

const pickFDescriptions = (sd = {}) => {
    // Pull Description_F* keys into a map: { F1: 'desc1', F2: 'desc2', ... }
    const out = {};
    for (const key of Object.keys(sd)) {
        // matches Description_F1 ... Description_F15
        if (/^Description_F\d+$/.test(key)) {
            const sysKey = key.replace('Description_', ''); // -> F1
            const raw = sd[key];
            out[sysKey] = Array.isArray(raw) ? (raw[0] ?? '') : (raw ?? '');
        }
    }
    return out;
};

const sysFMap = ref({}); // { F1: dp, F2: dp, ... }
const sysFDescMap = ref({}); // { F1: desc, F2: desc, ... }
// const normalizeEvtVal = (e) => (e && typeof e === 'object' && 'value' in e ? e.value : e);

function checkInputSystem() {
    const items = systemdatamt?.value;
    console.log(items);
    if (!Array.isArray(items) || items.length === 0) return;

    const entry = items.find((it) => it && it.systemData);
    if (!entry) return;
    const sd = entry.systemData;
    console.log(sd);
    // base fields
    Object.assign(selfadhered, {
        manufacturer: sd.manufacturer ?? '',
        material: sd.material ?? '',
        system: sd.system ?? [], // ['F1','F2',...]
        arrSystem: sd.arraySystem ?? '',
        noa: sd.noa ?? '',
        pressure: sd.designPressure ?? sd.pressure ?? []
    });
    console.log(selfadhered);
    // build pressure map
    const pressures = Array.isArray(sd.designPressure) ? sd.designPressure : Array.isArray(sd.pressure) ? sd.pressure : [];
    sysFMap.value = buildMap(selfadhered.system, pressures);
    console.log(sysFMap.value);
    // build description map from Description_F* keys
    sysFDescMap.value = pickFDescriptions(sd);
    console.log(sysFDescMap.value);

    // guard Object.entries with a fallback object
    for (const [fKey, desc] of Object.entries(sysFDescMap.value || {})) {
        selfadhered[`Description_${fKey}`] = desc;
    }
    sendDataToParent();
}
// Method to send data back to parent
const sendDataToParent = () => {
    // Emitting the 'update' event with data
    emit('updated', inputData.value);
};
// Method to update the input field with selected suggestion
// const selectSuggestion = (suggestion) => {
//     query.value = suggestion;
//     showSuggestions.value = false;
// };

// Method to handle input change
// const onInput = () => {
//     showSuggestions.value = true;
// };
// emit changes up whenever input changes

// const sanoa = defineModel('sanoa', { type: String, default: '' });
// const emit = defineEmits(['cleared']);

const query = ref('');

// keep query and model in sync both ways
// watch(sanoa, (v) => {
//     if (v !== query.value) query.value = v;
// });

// function onInput(e) {
//     sanoa.value = e.target.value; // updates parent via v-model
//     query.value = sanoa.value;
//     if (sanoa.value === '') emit('cleared');
// }

// function selectSuggestion(s) {
//     sanoa.value = s;
//     query.value = s;
// }

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
.autocompletesa {
    position: relative;
    width: 200px;
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
