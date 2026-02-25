<template>
    <div class="shinglenoa">
        <div class="w-64 gap-2 mt-8 space-y-2 mb-2" style="margin-left: 20px">
            <FloatLabel>
                <AutoComplete v-model="query" showClear :suggestions="items" @complete="search" @item-select="onSelect" inputClass="w-56" />
                <label for="ac">Shingle NOA: 00000000</label>
            </FloatLabel>
        </div>
    </div>
</template>

<script setup>
import useInputwFetch from '@/composables/fetchTech/use-InputwFetch';
import { useShingleStore } from '@/stores/shingleStore';
import { storeToRefs } from 'pinia';
import AutoComplete from 'primevue/autocomplete';
import { computed, onMounted, ref, watch } from 'vue';

const emit = defineEmits(['updated']);

// Destructure composable
const { callFunction, noaStore } = useInputwFetch();
const store = useShingleStore();
const { inputshingle } = storeToRefs(store);

const query = ref('');
const items = ref([]);

/**
 * FIXED: Reactive list derivation
 * Checks common Pinia storage patterns to find the array
 */
const allNoas = computed(() => {
    const state = noaStore.$state.noashingle;
    if (!state) return [];

    // Case 1: Data is nested in the first element of an array (your current logic)
    const deepData = state[0]?.shingleNoaNumber?.noa || state[0]?.noa;
    if (Array.isArray(deepData)) return deepData;

    // Case 2: Data is the state itself
    if (Array.isArray(state)) return state;

    return [];
});

onMounted(() => {
    callFunction();
});

/**
 * FIXED: Search Logic
 * This was empty in your snippet, which is why the dropdown was empty!
 */
const search = (event) => {
    const q = String(event.query ?? '')
        .toLowerCase()
        .trim();
    const list = allNoas.value;

    if (!q) {
        items.value = list.slice(0, 50);
    } else {
        items.value = list.filter((noa) => String(noa).toLowerCase().includes(q)).slice(0, 50);
    }
};

const onSelect = (e) => {
    const noa = e?.value ?? query.value;
    emit('updated', { noa });
    emitSelectedFromStore(noa);
};

function emitSelectedFromStore(noa) {
    const list = Array.isArray(inputshingle.value) ? inputshingle.value : [];
    const match = list.find((x) => x?.shingleData?.noa?.toString() === noa?.toString() || x?.shingleData?.NOA?.toString() === noa?.toString());

    const sd = match?.shingleData;
    if (!sd) {
        emit('updated', { noa });
        return;
    }

    emit('updated', {
        noa,
        manufacturer: sd.applicant ?? sd.manufacturer ?? '',
        material: sd.material ?? '',
        description: sd.description ?? ''
    });
}

// Helpful debug watch
watch(
    allNoas,
    (newVal) => {
        console.log('[ShingleNoa] Computed allNoas updated. Count:', newVal.length);
    },
    { immediate: true }
);
</script>

<style scoped>
.shinglenoa {
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
    width: 10%;
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
