<script setup>
import { useToNumber } from '@vueuse/core';
import RadioButton from 'primevue/radiobutton';
import { computed, onMounted, reactive, ref } from 'vue';
// Stores & composables
import useGeneral from '@/composables/GeneralPage/use-Generalpage.js';
import { usePermitappStore } from '@/stores/permitapp';
import { useroofCheckStore } from '@/stores/roofCheckStore';
import { useRoofListStore } from '@/stores/roofList';

// Local components (existing files)
import RoofList from './RoofSystemList.vue';

// PrimeVue
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

// ───────────────────────────────── state ─────────────────────────────────
const permitStore = usePermitappStore();
const roofCheck = useroofCheckStore();
const roofStore = useRoofListStore();

const area = ref('');
const selectedSystem = ref(null);
const roofKind = ref(''); // 'newroof' | 'reroof'
const dragOver = ref(false);
const files = ref([]);

const { addRoof } = useGeneral();
const dataGeneral = reactive({ roofCheck: '' });

// Options
const ROOF_TYPES = [{ name: 'Asphalt Shingle' }, { name: 'Low Slope' }, { name: 'Mechanical Fastened Tile' }, { name: 'Adhesive Set Tile' }, { name: 'Metal Panel' }];

// Miami Beach constraint: if MB==2, disallow first two options (Shingle/Low Slope)
const MB = ref(permitStore.$state.permitapp?.[0]?.formdt?.checkIfBeach);
const isMiamiBeach = computed(() => useToNumber(MB.value).value === 2);
const roofOptions = computed(() => (isMiamiBeach.value ? ROOF_TYPES.slice(1) : ROOF_TYPES));

// ─────────────────────────────── methods ───────────────────────────────
function addSelectedSystem() {
    // if (!isFormValid.value) return;

    const name = selectedSystem.value.name;
    const sqft = Number(area.value);

    const byName = {
        'Asphalt Shingle': () => roofStore.addSystemShingle(name, sqft),
        'Low Slope': () => roofStore.addSystemBur(name, sqft),
        'Mechanical Fastened Tile': () => roofStore.addSystemMTile(name, sqft),
        'Adhesive Set Tile': () => roofStore.addSystemATile(name, sqft),
        'Metal Panel': () => roofStore.addSystemMetal(name, sqft)
    };
    byName[name]?.();
    dataGeneral.roofCheck = roofKind.value;
    console.log(dataGeneral.roofCheck);
    roofCheck.addCheck({ ...dataGeneral });

    // clear inputs for next add
    area.value = '';
    selectedSystem.value = null;
}

function submitGeneral() {
    // Persist the general choice (new vs reroof) & continue
    addRoof(roofKind);
}

function clearAll() {
    roofStore.$reset();
}

function onDrop(e) {
    dragOver.value = false;
    const list = [...(e.dataTransfer?.files || [])];
    if (!list.length) return;
    files.value = list;
}

function onPick(e) {
    const list = [...(e.target?.files || [])];
    if (!list.length) return;
    files.value = list;
}

// Prefill if user already has something in the store
onMounted(() => {
    if (!selectedSystem.value && roofOptions.value.length) {
        selectedSystem.value = roofOptions.value[0];
    }
});
</script>

<template>
    <main class="page">
        <!-- Left: form -->
        <section class="card">
            <header class="card__header">
                <h2>Roof System</h2>
                <Button class="icon" text plain @click="clearAll" v-tooltip.bottom="'Reset list'">
                    <i class="pi pi-refresh" />
                </Button>
            </header>

            <div class="form">
                <div class="field">
                    <label for="sqft">Square Footage</label>
                    <InputText id="sqft" v-model="area" type="number" inputmode="numeric" placeholder="e.g. 1200" />
                </div>

                <div class="field">
                    <label for="system">Roof System</label>
                    <Select id="system" class="w-full" :options="roofOptions" optionLabel="name" v-model="selectedSystem" placeholder="Select roof system" @change="addSelectedSystem" />
                    <small v-if="isMiamiBeach" class="hint">Miami Beach restrictions apply.</small>
                </div>

                <div class="field row">
                    <div class="check">
                        <RadioButton inputId="kind-new" name="roofKind" value="newroof" v-model="roofKind" />
                        <label for="kind-new">New Roof</label>
                    </div>
                    <div class="check">
                        <RadioButton inputId="kind-reroof" name="roofKind" value="reroof" v-model="roofKind" />
                        <label for="kind-reroof">Re-Roof</label>
                    </div>
                </div>

                <div class="actions">
                    <RouterLink to="/dynamicstepper">
                        <Button severity="contrast" label="Continue" @click="submitGeneral" />
                    </RouterLink>
                </div>
            </div>

            <Divider />

            <!-- Current selections -->
            <RoofList />
        </section>

        <!-- Right: dropzone + terminal -->
        <section class="side">
            <div class="dropzone" :class="{ over: dragOver }" @dragover.prevent="dragOver = true" @dragleave="dragOver = false" @drop.prevent="onDrop">
                <p class="dz-title">Blueprints & images</p>
                <p class="dz-sub">Drag & drop files here, or click to select</p>
                <input type="file" class="dz-input" multiple @change="onPick" />
                <ul v-if="files.length" class="dz-list">
                    <li v-for="f in files" :key="f.name">{{ f.name }}</li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
/* layout */
.page {
    --gap: clamp(1rem, 2vw, 2rem);
    display: grid;
    grid-template-columns: minmax(280px, 1.4fr) minmax(240px, 1fr);
    gap: var(--gap);
    padding: var(--gap);
}

.card {
    background: var(--surface-card, rgba(255, 255, 255, 0.7));
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    padding: 1rem;
}

.card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.icon :deep(.pi) {
    font-size: 1.1rem;
}

.form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
}

.field {
    display: grid;
    gap: 0.35rem;
}

.field.row {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    flex-wrap: wrap;
}

.check {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
}

.hint {
    color: var(--text-secondary, #64748b);
}

.actions {
    margin-top: 0.5rem;
    display: flex;
    gap: 0.5rem;
}

.side {
    display: grid;
    grid-auto-rows: min-content;
    align-content: start;
    gap: var(--gap);
}

/* dropzone */
.dropzone {
    position: relative;
    border: 1.5px dashed var(--surface-border, #cbd5e1);
    border-radius: 14px;
    padding: 1.25rem;
    text-align: center;
    transition: 0.15s ease-in-out;
}
.dropzone.over {
    border-color: var(--primary-color, #3b82f6);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary-color, #3b82f6) 20%, transparent);
}
.dz-title {
    font-weight: 600;
    margin-bottom: 0.2rem;
}
.dz-sub {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 0.75rem;
}
.dz-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
}
.dz-list {
    margin-top: 0.5rem;
    text-align: left;
    font-size: 0.9rem;
}

@media (max-width: 960px) {
    .page {
        grid-template-columns: 1fr;
    }
}
</style>
