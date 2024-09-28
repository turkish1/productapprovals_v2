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

import usetileInputdouble from '@/composables/InputLogic/use-tileInputDoublepaddy';
import usetileInputsingle from '@/composables/InputLogic/use-tileInputsinglepaddy';
import { useGlobalState } from '@/stores/exposurecStore';

import { computed, defineEmits, onMounted, reactive, ref, watch } from 'vue';

// Define the emit event to send data to parent
const emit = defineEmits(['update']);
const { callFunction, singleStore } = useSingle();
const { callFunctions, doubleStore } = useDouble();

const { zones } = useGlobalState();

const { getTilenoa, tileData } = usetileInputdouble();

const { getTilenoas, tileDatas } = usetileInputsingle();
const slopeOptions = {
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7
};

const isDataValid = ref(true);
// Input query
const query = ref('');
let datatilenoa = ref(tileData);
let datatilenoas = ref(tileDatas);
const zoneone = reactive({
    zone: '',
    lambda1: '',
    mg1: '',
    mr1: '',
    mf1: ''
});

const zonetwo = reactive({
    zone: '',
    lambda2: '',
    mg2: '',
    mr2: '',
    mf2: ''
});
const zonethree = reactive({
    zone: '',
    lambda3: '',
    mg3: '',
    mr3: '',
    mf3: ''
});

function checkData() {
    if (tileData.Table3.two === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.three === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.four === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.five === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.six === 'N/A') {
        isDataValid.value = false;
    }
    if (tileData.Table3.seven === 'N/A') {
        isDataValid.value = false;
    }
}
function checkDatas() {
    if (tileDatas.Table3.two === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.three === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.four === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.five === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.six === 'N/A') {
        isDataValid.value = false;
    }
    if (tileDatas.Table3.seven === 'N/A') {
        isDataValid.value = false;
    }
}
const selectedOption = ref(null);
// Array of suggestions containing 8-digit numbers (can be fetched from an API or hardcoded)
const suggestions = ref([]);
// State to control suggestions visibility
const showSuggestions = ref(false);
const isSinglepaddyValid = ref(false);
const paddySeleted = ref('');
onMounted(() => {
    callFunction();
    callFunctions();
    suggestions.value = isSinglepaddyValid.value = true ? singleStore.$state : doubleStore.$state;
    console.log(suggestions.value);
});
const tilenoas = reactive({
    manufacturer: '',
    material: [],
    description: '',
    resistance: [],
    Table2: [],
    Table3: []
});
function selectPaddy() {
    if (selectedOption.value === 'single') {
        isSinglepaddyValid.value = true;
    }
}

const selectedExposures = ref(null);
function selectedExposure() {
    console.log(selectedExposures.value);
}
watch(
    selectPaddy,
    selectedExposure,
    () => {
        paddySeleted.value = selectedOption.value;

        console.log(selectedOption.value, selectedExposures.value);
    },
    { immediate: true }
);
// Computed property to filter suggestions based on user input
const filteredSuggestions = computed(() => {
    if (!query.value) return [];
    // let singlepd = suggestions.value.singlepdInput[0].singlepdNumber.noa;
    // let doublepd = suggestions.value.doublepdInput[0].doublepdNumber.noa;
    // let goOn = (isSinglepaddyValid.value = true ? singlepd : doublepd);
    return suggestions.value.singlepdInput[0].singlepdNumber.noa.filter((item) => item.toString().includes(query.value));
});

function grabInput() {
    datatilenoa.value = query.value;
    datatilenoas.value = query.value;

    if (query.value !== null) {
        // 18061905
        console.log(selectedOption.value, 'Outside');
        if (selectedOption.value === 'single') {
            console.log(selectedOption.value, 'Entered');
            getTilenoas(datatilenoas.value);
        } else getTilenoa(datatilenoa.value);
    }
    checkInput();
}
let ismrValid = ref(false);
let ismrInvalid = ref(false);
function checkInput() {
    if (datatilenoa.value.length !== null) {
        tilenoas.manufacturer = isSinglepaddyValid.value === true ? tileDatas.applicant : tileData.applicant;
        tilenoas.description = isSinglepaddyValid.value === true ? tileDatas.description : tileData.description;
        console.log(zones._value, tilenoas.manufacturer);

        zones._value.forEach((item, index) => {
            zoneone.zone = item[0];
            zonetwo.zone = item[1];
            zonethree.zone = item[2];
        });
    }
}
const MF = computed(updateMF, () => {
    zoneone.mf1 = mfupdate.value;
    zonetwo.mf2 = mfupdate.value;
    zonethree.mf3 = mfupdate.value;
});
const maps = ref([]);
const vals = ref([]);
const mfupdate = ref();
function updateMF(event) {
    // tileData.selection;
    console.log(event.value);
    let mat = isSinglepaddyValid.value === true ? tileDatas.selection : tileData.selection;
    console.log(mat);
    resistanceCheck.value = Object.entries(mat).map((obj) => {
        const k = obj[0];
        const v = obj[1];

        maps.value.push(k);
        vals.value.push(v);
        console.log(v, k);

        console.log(vals.value[0], vals.value[1]);

        // pdfcleared.value = true;
        // 23052403
    });
    for (let i = 0; i < maps.value.length; i++) {
        console.log(vals.value[i]);
        mfupdate.value = vals.value[i];
        if (maps.value[i] === event.value) {
            console.log(vals.value[i]);
            zoneone.mf1 = vals.value[i];
            zonetwo.mf2 = vals.value[i];
            zonethree.mf3 = vals.value[i];
        }

        const mfcheck1 = useToNumber(zoneone.mf1);
        const mfcheck2 = useToNumber(zoneone.mf2);
        const mfcheck3 = useToNumber(zoneone.mf3);

        console.log(mfcheck1.value);
        if (zoneone.mr1 > mfcheck1.value || event.value) {
            console.log('I am in mr greater', ismrInvalid, event.value);
            ismrInvalid = false;
        }
        if (zoneone.mr1 < mfcheck1.value || event.value) {
            ismrValid.value = true;
            ismrInvalid = false;
        }
        if (zonetwo.mr2 > mfcheck2.value) {
            console.log('I am in mr greater', ismrInvalid.value);
            ismrInvalid = true;
        } else {
            ismrValid.value = true;
            ismrInvalid = false;
        }
        if (zonethree.mr3 > mfcheck3.modelValue) {
            console.log('I am in mr greater', ismrInvalid.value);
            ismrInvalid = true;
        } else {
            ismrValid.value = true;
            ismrInvalid = false;
        }
        // } else if (zoneone.mr1 < mfcheck1 || event.value || zonetwo.mr2 < mfcheck2 || zonethree.mr3 < mfcheck3) {
        //     ismrValid.value = true;
        //     console.log('I am in mr1', ismrValid.value);
        //     visible.value = true;
    }
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
