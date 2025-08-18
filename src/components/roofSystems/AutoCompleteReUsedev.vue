<!-- components/AutoCompleteInput.vue -->
<template>
    <div class="autocomplete relative">
        <div class="w-64 gap-2 mt-3 space-y-2 mb-2" :style="{ marginLeft }">
            <FloatLabel>
                <InputText
                    :id="id"
                    ref="inputRef"
                    :inputId="id"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :autocomplete="autocomplete"
                    :value="modelValue"
                    @focus="onFocus"
                    @blur="onBlur"
                    @input="onInputInternal"
                    @keydown.down.prevent="move(1)"
                    @keydown.up.prevent="move(-1)"
                    @keydown.enter.prevent="enter"
                    @keydown.esc.prevent="hide"
                />
                <label :for="id">{{ label }}</label>
            </FloatLabel>
        </div>

        <!-- Suggestions -->
        <ul v-if="show && items.length" class="suggestions absolute z-50 w-64 bg-white border rounded-md max-h-56 overflow-auto shadow-lg" role="listbox" :aria-activedescendant="activeId" :id="listboxId">
            <li
                v-for="(s, i) in items"
                :key="keyFor(s, i)"
                :id="optionId(i)"
                class="px-3 py-2 cursor-pointer"
                :class="{ 'bg-gray-100': i === activeIndex }"
                role="option"
                :aria-selected="i === activeIndex"
                @pointerdown.prevent="choose(s)"
                @mousemove="activeIndex = i"
            >
                <!-- default item rendering, can be replaced via slot -->
                <slot name="item" :item="s" :index="i">
                    {{ renderLabel(s) }}
                </slot>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';

/**
 * Props
 * - modelValue: v-model for the input value
 * - suggestions: array OR a function (q) => Promise<string[]|any[]>
 * - getLabel: (item) => string    for objects
 * - minChars: start searching after N chars
 * - debounce: ms delay before calling suggestions function
 * - label, placeholder, id: UI bits
 * - disabled, autocomplete: passthroughs
 * - marginLeft: style tweak to match your layout (optional)
 */
const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    suggestions: { type: [Array, Function], default: () => [] },
    getLabel: { type: Function, default: (x) => (typeof x === 'string' ? x : (x?.label ?? '')) },
    minChars: { type: Number, default: 1 },
    debounce: { type: Number, default: 150 },
    label: { type: String, default: 'Shingle NOA: 00000000' },
    placeholder: { type: String, default: '' },
    id: { type: String, default: 'ac' },
    disabled: { type: Boolean, default: false },
    autocomplete: { type: String, default: 'off' },
    marginLeft: { type: String, default: '20px' }
});

const emit = defineEmits([
    'update:modelValue', // v-model
    'select', // when a suggestion is chosen (payload: item)
    'search', // when a query triggers search (payload: query)
    'open',
    'close' // dropdown visibility changes
]);

const inputRef = ref(null);
const show = ref(false);
const query = ref(String(props.modelValue ?? ''));
const items = ref([]);
const activeIndex = ref(-1);
let t = null;

const listboxId = computed(() => `${props.id}-listbox`);
const activeId = computed(() => (activeIndex.value >= 0 ? optionId(activeIndex.value) : undefined));
const optionId = (i) => `${props.id}-opt-${i}`;

const renderLabel = (item) => props.getLabel(item);
const keyFor = (item, i) => `${renderLabel(item)}-${i}`;

// keep internal query synced with external v-model
watch(
    () => props.modelValue,
    (v) => {
        const s = String(v ?? '');
        if (s !== query.value) query.value = s;
    }
);

function onFocus() {
    if (items.value.length) open();
}

function onBlur() {
    // small delay so pointerdown can fire first
    setTimeout(hide, 50);
}

function onInputInternal(e) {
    const val = e?.target?.value ?? '';
    query.value = val;
    emit('update:modelValue', val);
    debouncedSearch(val);
}

function open() {
    if (!show.value) {
        show.value = true;
        emit('open');
    }
}

function hide() {
    if (show.value) {
        show.value = false;
        activeIndex.value = -1;
        emit('close');
    }
}

function move(delta) {
    if (!items.value.length) return;
    open();
    const next = (activeIndex.value + delta + items.value.length) % items.value.length;
    activeIndex.value = next;
    ensureInView(next);
}

function enter() {
    if (activeIndex.value >= 0 && activeIndex.value < items.value.length) {
        choose(items.value[activeIndex.value]);
    } else if (items.value.length === 1) {
        choose(items.value[0]);
    } else {
        hide();
    }
}

function choose(item) {
    const label = renderLabel(item);
    emit('update:modelValue', label);
    query.value = label;
    emit('select', item);
    hide();
}

function ensureInView(i) {
    const list = document.getElementById(listboxId.value);
    const opt = list?.querySelector(`#${optionId(i)}`);
    if (opt && list) {
        const top = opt.offsetTop;
        const bottom = top + opt.offsetHeight;
        if (top < list.scrollTop) list.scrollTop = top;
        else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    }
}

// searching
async function runSearch(q) {
    if (q.length < props.minChars) {
        items.value = [];
        hide();
        return;
    }
    emit('search', q);

    try {
        let data;
        if (typeof props.suggestions === 'function') {
            data = await props.suggestions(q);
        } else {
            const low = q.toLowerCase();
            data = props.suggestions.filter((s) => renderLabel(s).toLowerCase().includes(low));
        }
        items.value = Array.isArray(data) ? data : [];
        if (items.value.length) {
            activeIndex.value = 0;
            open();
        } else {
            hide();
        }
    } catch {
        items.value = [];
        hide();
    }
}

function debouncedSearch(q) {
    clearTimeout(t);
    t = setTimeout(() => runSearch(q), props.debounce);
}

onBeforeUnmount(() => clearTimeout(t));
</script>

<style scoped>
/* Optional minimal styles; adjust to your design system */
.suggestions li {
    list-style: none;
}
</style>
