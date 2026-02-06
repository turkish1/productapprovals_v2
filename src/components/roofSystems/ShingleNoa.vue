<template>
    <div class="shinglenoa">
        <div class="w-64 gap-2 mt-8 space-y-2 mb-2" style="margin-left: 20px">
            <FloatLabel>
                <!-- <AutoComplete v-model="query" showClear :suggestions="items" @complete="search" @item-select="onSelect" inputClass="w-56" /> -->
                <AutoComplete v-model="query" showClear :suggestions="items" @complete="search" @item-select="onSelect" @itemSelect="onSelect" inputClass="w-56" />

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

const { callFunction, noaStore } = useInputwFetch();

const store = useShingleStore();
const { inputshingle } = storeToRefs(store);
const query = ref('');
const items = ref([]);
// ✅ derive the NOA list reactively from the store (no local ref copy)
const allNoas = computed(() => {
    const v = noaStore.$state.noashingle;

    const first = Array.isArray(v) ? v[0] : null;
    const candidate = first?.shingleNoaNumber?.noa ?? first?.noa ?? v?.shingleNoaNumber?.noa ?? v?.noa ?? [];

    let arr = candidate;
    if (typeof arr === 'string') {
        try {
            arr = JSON.parse(arr);
        } catch {}
    }

    return Array.isArray(arr) ? arr.map(String) : [];
});

onMounted(() => {
    callFunction();
});

const onSelect = (e) => {
    // e.value should be the selected item
    const noa = e?.value ?? query.value;
    console.log('[ShingleNoa] selected:', noa);

    emit('updated', { noa }); // ✅ parent can now see it

    // optional: if you want full payload:
    emitSelectedFromStore(noa);
};

const search = (event) => {
    const q = String(event.query ?? '').trim();
    const list = allNoas.value; // your computed list

    items.value = !q ? list.slice(0, 50) : list.filter((noa) => noa.includes(q)).slice(0, 50);
};

function emitSelectedFromStore(noa) {
    const list = Array.isArray(inputshingle.value) ? inputshingle.value : [];
    console.log(inputshingle);
    const match = list.find((x) => x?.shingleData?.noa?.toString() === noa?.toString()) || list.find((x) => x?.shingleData?.NOA?.toString() === noa?.toString());
    const sd = match?.shingleData;
    console.log(sd);
    if (!sd) {
        // at least emit noa so parent can open modal
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
watch(allNoas, (v) => console.log('allNoas len', v.length, v[0]), { immediate: true });
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
