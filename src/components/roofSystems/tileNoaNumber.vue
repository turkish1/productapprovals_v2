<template>
    <div class="autocomplete">
        <div class="w-64 gap-2 mt-3 space-y-2 mb-2" style="margin-left: 20px">
            <FloatLabel>
                <!--
          1) We trigger 'grabInput()' on Enter, Tab, or when user leaves the input,
             ensuring 'query' is used properly.
        -->
                <InputText id="tilenoa" v-tooltip.bottom="'Press Tab after value'" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @change="grabInput" @update="checkPaddCategory" />
                <!--     @keydown.tab.exact.stop="grabInput"  @click="grabInput"
                    @change="grabInput"      @keydown.tab.exact.stop="grabInput"-->
                <label for="ac">Tile NOA: 00000000</label>
            </FloatLabel>
        </div>
        <!-- <Button @click="updateMessage">update</Button> -->
        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @mousedown="selectSuggestion(suggestion)">
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import usetileInputsingle from '@/composables/InputLogic/use-tileInputsinglepaddy';

import usetileInputdouble from '@/composables/InputLogic/use-tileInputDoublepaddy';
import useDouble from '@/composables/fetchTech/use-doublepdNumber';
import useSingle from '@/composables/fetchTech/use-singlepdNumber';
import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { usePaddyoptionStore } from '@/stores/paddyCatStore';
import { usePaddyStore } from '@/stores/singlepaddyStore';

import { usevalueStore } from '@/stores/tilevalueStore';
import { storeToRefs } from 'pinia';

// ----------------------------
// 1) Extract the needed composable methods and store references
// ----------------------------

// this returns the data for the individual noas
const { getTilenoas } = usetileInputsingle();
const { getTilenoa } = usetileInputdouble();

const { callFunction, singleStore } = useSingle();
const { callFunctions, doubleStore } = useDouble();

const paddyCat = usePaddyoptionStore();

const pdStore = usevalueStore();
const paddyStore = usePaddyStore();
const { inputdata } = storeToRefs(paddyStore);

const useDoublepaddy = useDoublePaddyStore();
const { inputdatas } = storeToRefs(useDoublepaddy);
// ----------------------------
// 2) Local refs/reactives
// ----------------------------
const query = ref('');
const suggestions = ref([]);
const showSuggestions = ref(false);
const isPaddyvaluesingle = ref(false);

const paddyCategory = ref(paddyCat.$state.paddycatInput[0].paddyValues);

const suggestionTempSingle = ref([]);

const suggestionTempDouble = ref([]);
// We store the first item from paddyStore, if found:
const firstItem = ref(null);
const secondItem = ref(null);
// Our "tileValues" that we eventually commit to another store:

const singlePaddydata = computed(() => paddyStore.inputdata);
const doublePaddydata = computed(() => useDoublepaddy.inputdatas);
// ----------------------------
// 3) onMounted: fetch or prepare data
// ----------------------------
onMounted(() => {
    // Call the store action to populate singleStore.$state
    callFunctions();
    callFunction();
});
const copiedRef = ref({ ...singlePaddydata.value });
const doubleRef = ref({ ...doublePaddydata.value });

async function checkPaddCategory() {
    paddyCategory.value = paddyCat.$state.paddycatInput[0].paddyValues;
    // console.log(paddyCategory.value, doublePaddydata.value, doubleRef.value);
    if (paddyCategory.value === 'double') {
        suggestionTempDouble.value = doubleStore.$state;

        suggestions.value = suggestionTempDouble.value;
        isPaddyvaluesingle.value = false;
        console.log('Entered double paddy value', secondItem.value);
    } else {
        suggestionTempSingle.value = singleStore.$state;
        suggestions.value = suggestionTempSingle.value;
        isPaddyvaluesingle.value = true;
    }

    return suggestions.value;
}

watch(checkPaddCategory, () => {});

const filteredSuggestions = computed(() => {
    if (!query.value) return [];
    console.log(isPaddyvaluesingle.value, paddyCategory.value);
    // paddyCategory.value == 'single'  :
    // isPaddyvaluesingle.value == false ? suggestions.value.pdInputs?.[0] suggestions.value.pdInput?.[0];
    const paddyInputSelected = paddyCategory.value === 'double' ? suggestions.value.pdInputs?.[0] : suggestions.value.pdInput?.[0];
    const noaArray = paddyCategory.value === 'double' ? (paddyInputSelected?.pdNumbers?.noa ?? []) : (paddyInputSelected?.pdNumber?.noa ?? []);
    // isPaddyvaluesingle.value == false ? (paddyInputSelected?.pdNumbers?.noa ?? []) : (paddyInputSelected?.pdNumber?.noa ?? []);
    console.log(noaArray);
    return noaArray.filter((item) => item.toString().includes(query.value));
});
// ----------------------------
// 5) "grabInput" is called once the user finalizes input
// ----------------------------
async function grabInput() {
    if (!query.value) return;
    // If paddyStore inputdata is an array with at least one item

    // Keep a reference to the first item (which presumably has singlepaddyData?)
    firstItem.value = inputdata.value;
    secondItem.value = inputdatas.value;

    // }
    try {
        // 1) Attempt to fetch data for the given NOA

        // isPaddyvaluesingle.value == true
        if (paddyCategory.value === 'single') {
            console.log('Entered single paddy value', firstItem.value);
            getTilenoas(query.value);
            await paddyInputSelection(firstItem.value);
            updateMessage();
            // isPaddyvaluesingle.value = false;
        } else {
            isPaddyvaluesingle.value = false;
            console.log('Entered double paddy value', secondItem.value);
            getTilenoa(query.value);
            await doublepaddyInputSelection(secondItem.value);
            updateDoublepaddy();
        }

        // 2) Ensure we have a "firstItem" with singlepaddyData
        // if (!firstItem.value) {
        //     console.error('No valid singlepaddyData in firstItem');
        //     return;
        // }

        // console.log(copiedRef.value);
        // 3) Pass the entire item to paddyInputSelection
    } catch (error) {
        console.error('Failed to process input:', error);
    }
}

// ----------------------------
// 6) "paddyInputSelection" - fill tileValues from store data
// 23011206
// ----------------------------

const data = ref([]);

watch(
    () => paddyStore.inputdata,
    (newValue) => {
        singlePaddydata.value = newValue;

        // ...any other side effect logic
    }
);

watch(
    () => useDoublepaddy.inputdatas,
    (doubleValue) => {
        doublePaddydata.value = doubleValue;
    }
);

// These variable are for the new store
const singleSubdata = ref();
const doubleSubdata = ref();
// Paddy input selection function
const doublePdata = ref();

async function paddyInputSelection(item) {
    try {
        console.log(firstItem.value);
        // item is e.g.: { singlepaddyData: { tileDatas: {...} } }
        console.log(item);
        data.value = item;

        // console.log(tv[0].singlepaddyData.applicant);
        console.log(data.value);

        singleSubdata.value = computed(() => firstItem.value);

        console.log(singleSubdata.value);

        pdStore.addSystemvalues(singleSubdata.value);
    } catch (err) {
        console.error('Error in paddyInputSelection:', err);
    }
}

async function doublepaddyInputSelection(itemd) {
    try {
        console.log(secondItem.value);
        // item is e.g.: { singlepaddyData: { tileDatas: {...} } }
        console.log(itemd);

        doublePdata.value = itemd;
        // console.log(tv[0].singlepaddyData.applicant);
        console.log(doublePdata.value);

        doubleSubdata.value = computed(() => secondItem.value);
        console.log(doubleSubdata.value);

        pdStore.addSystemvalues(doubleSubdata.value);
    } catch (err) {
        console.error('Error in paddyInputSelection:', err);
    }
}
const single = ref();
const double = ref();

const updateMessage = () => {
    single.value = singlePaddydata.value;
    nextTick(() => {
        // Code here will execute after the DOM is updated
        console.log('DOM is updated, message is now:', single.value);
    });
    // isPaddyvaluesingle.value = false;
};

const updateDoublepaddy = () => {
    double.value = doublePaddydata.value;
    nextTick(() => {
        console.log(double.value);
    });
};
// ----------------------------
// 7) Select suggestion from the list
// ----------------------------
function selectSuggestion(suggestion) {
    query.value = suggestion;
    showSuggestions.value = false;
}

// ----------------------------
// 8) Show/hide suggestion list
// ----------------------------
function onInput() {
    showSuggestions.value = true;
}
function hideSuggestions() {
    // Delay hiding so click on the suggestion list is registered
    setTimeout(() => {
        showSuggestions.value = false;
    }, 200);
}
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
