<template>
    <div class="tile">
        <div class="w-64 gap-2 mt-8 space-y-2 mb-2">
            <FloatLabel>
                <AutoComplete v-model="query" :suggestions="items" @complete="search" @item-select="onSelect" inputClass="w-56" showClear />
                <label for="ac">Tile NOA: 00000000</label>
            </FloatLabel>
            <!-- Optional mini badge to show which DB is active -->
            <small class="text-xs text-gray-500"> Source: {{ isDouble ? 'Double Paddy' : 'Single Paddy' }} </small>
        </div>
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

onMounted(async () => {
    // callFunction();
});
// --- local state ---
// const query = ref('');
const query = ref('');
const items = ref([]);
const showSuggestions = ref(false);
// 🔔 Emit "cleared" whenever the field is emptied
watch(query, (v) => {
    if (v == null || String(v).trim() === '') emit('cleared');
});

const isDouble = computed(() => paddyCat.activeCategory === 'double');
const currentNOAs = computed(() => {
    console.log(doubleStore);
    const list = isDouble.value ? doubleStore.noaList : singleStore.noaList;
    console.log(inputdatas, inputdata);
    return Array.isArray(list) ? list.map(String) : [];
});

watch(
    [isDouble, () => singleStore.noaList, () => doubleStore.noaList],
    () => {
        console.log('[live]', isDouble.value, singleStore.noaList?.length, doubleStore.noaList?.length);
    },
    { immediate: true }
);

const onSelect = (e) => {
    // e.value should be the selected item
    const noa = e?.value ?? query.value;
    console.log('[TileNoa] selected:', noa);

    emit('updated', { noa }); // ✅ parent can now see it

    // optional: if you want full payload:
    emitSelectedFromStore(noa);
};

const search = (event) => {
    const q = String(event.query ?? '').trim();
    console.log(q);
    const list = currentNOAs.value; // your computed list
    console.log(list);
    items.value = !q ? list.slice(0, 50) : list.filter((noa) => noa.includes(q)).slice(0, 50);
};

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
// async function emitSelectedFromStore(noa) {
//     if (!noa) return;

//     try {
//         // 1. Fetch the data
//         const payload = isDouble.value ? await getTilenoas(noa) : await getTilenoa(noa);

//         // 2. THE FIX: Check if payload is null before doing ANYTHING else
//         if (!payload) {
//             console.log('Payload is still loading or not found...');
//             return; // Exit the function early so it doesn't crash below
//         }

//         // 3. Now it is safe to access properties
//         console.log('Successfully received payload:', payload);

//         emit('confirmed', payload);

//         // We use the keys defined in your buildPayload function (manufacturer, material, etc.)
//         emit('updated', {
//             noa: noa,
//             manufacturer: payload.manufacturer || '',
//             material: payload.material || '',
//             description: payload.description || ''
//         });
//     } catch (e) {
//         console.error('Data mapping failed:', e);
//     }
// }
async function emitSelectedFromStore(noa) {
    if (!noa) return;

    try {
        // 1. Await the fetch
        // Make sure isDouble.value is correctly toggling based on the store
        const payload = isDouble.value ? await getTilenoas(noa) : await getTilenoa(noa);

        console.log('[Component] Received payload from composable:', payload);

        if (!payload) {
            console.warn('No payload found for NOA:', noa);
            return;
        }

        // 2. Emit 'confirmed' for the modal to open/populate
        emit('confirmed', payload);

        // 3. Emit 'updated' for general form state
        emit('updated', {
            noa: noa,
            manufacturer: payload.manufacturer || '',
            material: payload.material || '',
            description: payload.description || ''
        });
    } catch (e) {
        console.error('Data mapping failed in component:', e);
    }
}
defineExpose({
    clearInput: () => (query.value = ''),
    commit: emitSelectedFromStore
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
