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
import { computed, ref, watch } from 'vue';

import usetileInputdouble from '@/composables/InputLogic/use-tileInputDoublepaddy';
import usetileInputsingle from '@/composables/InputLogic/use-tileInputsinglepaddy';
import useDouble from '@/composables/fetchTech/use-doublepdNumber';
import useSingle from '@/composables/fetchTech/use-singlepdNumber';
import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { usePaddyoptionStore } from '@/stores/paddyCatStore';
import { usePaddyStore } from '@/stores/singlepaddyStore';

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

// const emit = defineEmits(['update', 'cleared']);
const emit = defineEmits(['update', 'cleared', 'confirmed']);

// --- local state ---
const query = ref('');
const showSuggestions = ref(false);
// 🔔 Emit "cleared" whenever the field is emptied
watch(query, (v) => {
    if (v == null || String(v).trim() === '') emit('cleared');
});

const isDouble = computed(() => paddyCat.activeCategory === 'double');
const currentNOAs = computed(() => {
    const list = isDouble.value ? doubleStore.noaList : singleStore.noaList;
    return Array.isArray(list) ? list.map(String) : [];
});
watch(
    [isDouble, () => singleStore.noaList, () => doubleStore.noaList],
    () => {
        console.log('[live]', isDouble.value, singleStore.noaList?.length, doubleStore.noaList?.length);
    },
    { immediate: true }
);

// filter suggestions by the query (case-insensitive)
const filteredSuggestions = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return [];
    return currentNOAs.value.filter((n) => n.toLowerCase().includes(q));
});

watch(
    () => paddyCat.activeCategory,
    async (cat) => {
        console.log('[tileNoaNumber] category ->', cat);
        if (cat !== 'single' && cat !== 'double') return;

        if (cat === 'single') {
            console.log('[tileNoaNumber] BEFORE single noaList length', singleStore.noaList?.length);
            await callFunction();
            console.log('[tileNoaNumber] AFTER single noaList length', singleStore.noaList?.length);
        } else {
            console.log('[tileNoaNumber] BEFORE double noaList length', doubleStore.noaList?.length);
            await callFunctions();
            console.log('[tileNoaNumber] AFTER double noaList length', doubleStore.noaList?.length);
        }
    },
    { immediate: true }
);

// commit current query: fetch detail from the correct DB and push into pdStore

async function grabInput() {
    const val = query.value?.trim();
    if (!val) return;

    try {
        let payload;

        if (isDouble.value) {
            payload = await getTilenoas(val); // ✅ return payload from composable
        } else {
            payload = await getTilenoa(val); // ✅ return payload from composable
        }

        if (payload) {
            emit('confirmed', payload); // ✅ send payload to parent
        }
    } catch (e) {
        console.error('grabInput failed:', e);
    } finally {
        showSuggestions.value = false;
    }
}

// temp watch
watch(
    () => singleStore.noaList,
    (v) => console.log('[tileNoaNumber] singleStore.noaList changed len=', v?.length, v?.slice?.(0, 5)),
    { deep: true }
);
watch(
    () => doubleStore.noaList,
    (v) => console.log('[tileNoaNumber] doubleStore.noaList changed len=', v?.length, v?.slice?.(0, 5)),
    { deep: true }
);

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
defineExpose({
    clearInput: () => (query.value = ''),
    commit: grabInput
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
