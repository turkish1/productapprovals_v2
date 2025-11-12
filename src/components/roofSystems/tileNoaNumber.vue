<template>
    <div class="tile">
        <div class="w-64 gap-2 mt-8 space-y-2 mb-2">
            <FloatLabel>
                <InputText id="tilenoa" v-model="query" inputId="ac" @focus="showSuggestions = true" @blur="hideSuggestions" @input="onInput" @keydown.enter.prevent="grabInput" @keydown.tab.prevent="grabInput" />
                <label for="ac">Tile NOA: 00000000</label>
            </FloatLabel>
            <!-- Optional mini badge to show which DB is active -->
            <small class="text-xs text-gray-500"> Source: {{ isDouble ? 'Double Paddy' : 'Single Paddy' }} </small>
        </div>

        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions" role="listbox" aria-label="NOA suggestions">
            <li v-for="(suggestion, index) in filteredSuggestions" :key="index" role="option" @pointerdown.prevent="selectSuggestion(suggestion)">
                {{ suggestion }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';

import usetileInputdouble from '@/composables/InputLogic/use-tileInputDoublepaddy';
import usetileInputsingle from '@/composables/InputLogic/use-tileInputsinglepaddy';
import useDouble from '@/composables/fetchTech/use-doublepdNumber';
import useSingle from '@/composables/fetchTech/use-singlepdNumber';

import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { usePaddyoptionStore } from '@/stores/paddyCatStore';
import { usePaddyStore } from '@/stores/singlepaddyStore';
import { usevalueStore } from '@/stores/tilevalueStore';

// --- composables that fetch NOA detail by number ---
const { getTilenoa } = usetileInputsingle();
const { getTilenoas } = usetileInputdouble();

// --- composables that load the NOA lists for tile ---
const { callFunction, singleStore } = useSingle(); // single pd list
const { callFunctions, doubleStore } = useDouble(); // double pd list

// --- stores ---
const paddyCat = usePaddyoptionStore();
const paddyStore = usePaddyStore();
const { inputdata } = storeToRefs(paddyStore);

const doublePaddy = useDoublePaddyStore();
const { inputdatas } = storeToRefs(doublePaddy);

const pdStore = usevalueStore();
const emit = defineEmits(['update', 'cleared']);

// --- local state ---
const query = ref('');
const showSuggestions = ref(false);
// 🔔 Emit "cleared" whenever the field is emptied
watch(query, (v) => {
    if (v == null || String(v).trim() === '') emit('cleared');
});
// current category: 'single' | 'double' (defaults to 'single' if nothing yet)
const paddyCategory = computed(() => {
    const list = paddyCat.$state?.paddycatInput;
    console.log(list);
    if (!Array.isArray(list) || list.length === 0) return 'single';

    // modern: Array.prototype.findLast
    const last = [...list].reverse().find((it) => it?.paddyValues);
    return last?.paddyValues || 'single';
});
const isDouble = computed(() => paddyCategory.value === 'double');

// normalize current NOA suggestions from the active list
const currentNOAs = computed(() => {
    const src = isDouble.value ? doubleStore?.$state?.pdInputs?.[0]?.pdNumbers?.noa?.body : singleStore?.$state?.pdInput?.[0]?.pdNumber?.noa?.body;
    console.log(isDouble.value, paddyCat.$state?.paddycatInput?.[0]?.paddyValues, doubleStore?.$state, paddyCategory.value, paddyCat.$state?.paddycatInput?.[1]?.paddyValues);
    if (Array.isArray(src)) return src.map(String);
    if (typeof src === 'string') {
        return src
            .split(',')
            .map((s) => s.replace(/[[\]"']/g, '').trim())
            .filter(Boolean);
    }
    return [];
});

// filter suggestions by the query (case-insensitive)
const filteredSuggestions = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return [];
    return currentNOAs.value.filter((n) => n.toLowerCase().includes(q));
});

// preload both lists once
onMounted(async () => {
    await Promise.allSettled([callFunction(), callFunctions()]);
});

// if the user flips categories after mount, ensure that list is present
watch(isDouble, async (d) => {
    if (d) {
        if (!doubleStore?.$state?.pdInputs?.length) callFunctions();
    } else {
        if (!singleStore?.$state?.pdInput?.length) callFunction();
    }
});

// commit current query: fetch detail from the correct DB and push into pdStore
async function grabInput() {
    const val = query.value?.trim();
    if (!val) return;

    try {
        if (isDouble.value) {
            await getTilenoas(val); // populates double store (inputdatas)
            pdStore.addSystemvalues(inputdatas.value);
        } else {
            await getTilenoa(val); // populates single store (inputdata)
            pdStore.addSystemvalues(inputdata.value);
        }
    } catch (e) {
        console.error('grabInput failed:', e);
    } finally {
        showSuggestions.value = false;
    }
}

// suggestion click commits immediately
function selectSuggestion(s) {
    query.value = s;
    grabInput();
}

function onInput() {
    showSuggestions.value = true;
}

function hideSuggestions() {
    // small delay so click registers before blur hides the list
    setTimeout(() => (showSuggestions.value = false), 100);
}

// let parent clear the field if needed
defineExpose({
    clearInput: () => (query.value = '')
});
</script>

<style scoped>
.tile {
    position: relative;
    width: 300px;
}
input {
    width: 80%;
    padding: 8px;
    font-size: 12px;
}
.suggestions {
    color: #111;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    position: absolute;
    width: 100%;
    max-height: 180px;
    overflow-y: auto;
    background: #fff;
    z-index: 1000;
    border-radius: 8px;
}
.suggestions li {
    padding: 8px 10px;
    cursor: pointer;
    line-height: 1.25;
}
.suggestions li:hover {
    background-color: #f5f5f5;
}
</style>
