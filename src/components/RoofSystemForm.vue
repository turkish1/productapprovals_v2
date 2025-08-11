<script setup>
import useGeneral from '@/composables/GeneralPage/use-Generalpage.js';
// import useInsertData from '@/composables/Postdata/useInsertSystems';
import { usePermitappStore } from '@/stores/permitapp';
import { useroofCheckStore } from '@/stores/roofCheckStore';
import { useRoofListStore } from '@/stores/roofList';
import { tryOnMounted, useToNumber } from '@vueuse/core';
import { reactive, ref } from 'vue';
import RoofSystemList from './RoofSystemList.vue';
// PrimeVue Components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';

// Store references
const permitStore = usePermitappStore();
const roofCheck = useroofCheckStore();
const roofStore = useRoofListStore();
// Roof system options
const roofTypesDefault = [{ name: ' ' }, { name: 'Asphalt Shingle' }, { name: 'Low Slope' }, { name: 'Mechanical Fastened Tile' }, { name: 'Adhesive Set Tile' }, { name: 'Metal Panel' }];
const roofTypesMiamiBeach = roofTypesDefault.slice(2); // all except the empty one

// Form state
const area = ref('');
const selectedItem = ref(null);
const checked = ref(false);

// Validation flags
const isMiamiBeachValid = ref(false);
const mbExpectedValue = 2;

// Permit logic
const MB = ref(permitStore.$state.permitapp[0]?.formdt?.checkIfBeach);
const convertMB = useToNumber(MB.value);

tryOnMounted(() => {
    console.log(permitStore.$state, MB.value, convertMB.value);
    isMiamiBeachValid.value = MB.value === mbExpectedValue;
    console.log(isMiamiBeachValid.value, roofTypesMiamiBeach);
});

// General page logic
const { addRoof, roofArea } = useGeneral();
const dataGeneral = reactive({ roofCheck: '' });
// const showGeneralPage = ref('');

// Add selected roof item to store and clear inputs
async function addItemAndClear() {
    const itemName = selectedItem.value?.name?.trim();
    if (!itemName) return;

    const dim = area.value;

    const systemMap = {
        'Asphalt Shingle': () => roofStore.addSystemShingle(itemName, dim),
        'Low Slope': () => roofStore.addSystemBur(itemName, dim),
        'Mechanical Fastened Tile': () => roofStore.addSystemMTile(itemName, dim),
        'Adhesive Set Tile': () => roofStore.addSystemATile(itemName, dim),
        'Metal Panel': () => roofStore.addSystemMetal(itemName, dim)
    };

    systemMap[itemName]?.();
    console.log(checked.value, systemMap);
    dataGeneral.roofCheck = checked.value;
    roofCheck.addCheck(dataGeneral);
    // roofArea(roofStore);
    clearInputs();
}

// Submit full general page data
function addGeneralpageData() {
    addRoof(checked);
    clearInputs();
}

// Reset roof system inputs
function clearInputs() {
    area.value = '';
    selectedItem.value = null;
}

// Reset full roof list
function clearSelected() {
    roofStore.$reset();
}
</script>

<!-- ───────────────────────── template (modern) ────────────────────────── -->
<!-- RoofUploadView.vue  ─────────────────────────────────────────────── -->

<template>
    <!-- ── Top navigation bar with brand ─────────────────────────────── -->
    <!-- <header class="topbar">
        <img src="/logo-mepermit.svg" alt="mEPermit logo" class="logo" />
    </header> -->

    <!-- ── 2-column layout container ────────────────────────────────── -->
    <main class="layout">
        <!-- ── Glass card: Roof System form ───────────────────────────── -->
        <aside class="card glass">
            <Button class="icon-btn" plain text @click="clearSelected">
                <i class="pi pi-refresh"></i>
            </Button>
            <h2 class="title">Roof System</h2>

            <form class="grid-form" @submit.prevent>
                <div class="field">
                    <label for="area">Square Footage</label>
                    <InputText id="area" v-model="area" placeholder="e.g. 1200" />
                </div>

                <div class="field">
                    <label for="system">Roof System</label>
                    <Select id="system" v-model="selectedItem" :options="isMiamiBeachValid ? roofTypesMiamiBeach : roofTypesDefault" optionLabel="name" placeholder="Select roof system" class="w-full" @change="addItemAndClear" />
                </div>
                <div class="flex flex-wrap mt-4 space-y-6 justify-center gap-8">
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="newroof" name="checked" value="newroof" />
                        <label for="newroof" class="ml-2" style="color: #122620">New Roof </label>
                    </div>
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
                        <label for="reroof" class="ml-2" style="color: #122620">Re-Roof </label>
                    </div>
                </div>
            </form>

            <footer class="footer">
                <Button label="Submit" severity="contrast" raised as="router-link" to="/dynamicstepper" @click="addGeneralpageData" />
            </footer>
            <br />
            <roof-system-list></roof-system-list>

            <!-- ── Blueprint PDF drop-zone ────────────────────────────────── -->
        </aside>

        <!-- ── Blueprint PDF drop-zone ────────────────────────────────── -->
        <section class="card dropzone" @dragover.prevent="dragOver = true" @dragleave="dragOver = false" @drop.prevent="handleDrop">
            <p class="dz-title">For Images documents</p>
            <p class="dz-sub">Drag &amp; drop files here<br />or click to upload</p>
            <input type="file" accept="application/pdf" multiple class="file-input" @change="handleFiles" />
        </section>
    </main>
</template>

<!-- ──────────────────────────── styles ───────────────────────────────── -->

<style scoped>
/* ── 1. Theme tokens ─────────────────────────────────────────────── */
:root {
    --c-bg: #8e959a;
    --c-primary: #1312113c;
    --c-primary-dark: #414747;
    --c-card-blur: 14px;
    --c-radius: 1.4rem;
    --c-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.2);
    --c-gradient: linear-gradient(135deg, #00e5ff 0%, #00bfa5 50%, #00e5ff 100%);
}

@media (prefers-color-scheme: dark) {
    :root {
        --c-bg: #0f172a;
    }
}

/* ── 2. Basic layout ─────────────────────────────────────────────── */
body {
    background: var(--c-bg);
}
.topbar {
    display: flex;
    align-items: center;
    height: 64px;
    padding-inline: 1.5rem;
}
.logo {
    height: 32px;
}

.layout {
    min-block-size: calc(100vh - 64px);
    display: grid;
    padding: clamp(1rem, 5vw, 3rem);
    gap: clamp(1.5rem, 4vw, 3rem);
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    place-items: start center;
}

/* ── 3. Re-usable card base + animated border ────────────────────── */
.card {
    position: relative;
    padding: 1.5rem 2rem;
    border-radius: var(--c-radius);
    box-shadow: var(--c-shadow);
    overflow: hidden;
    isolation: isolate;
}
.card::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px; /* border thickness */
    border-radius: inherit;
    background: var(--c-gradient);
    mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: borderMove 6s linear infinite;
    z-index: -1;
}
@keyframes borderMove {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 200% 0;
    }
}

/* ── 4. Glass variant for the form ───────────────────────────────── */

.glass {
    backdrop-filter: blur(var(--c-card-blur));
    background-color: rgba(255, 255, 255, 0.8);
}
@media (prefers-color-scheme: dark) {
    .glass {
        background-color: rgba(30, 41, 59, 0.75);
    }
}

/* ── 5. Card-specific layouts ────────────────────────────────────── */
.title {
    text-align: center;
    margin-block-end: 1.8rem;
    font-size: clamp(1.4rem, 2vw, 1.8rem);
    font-weight: 600;
    color: var(--c-primary);
}
.icon-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.4rem;
    color: #64748b;
}
.grid-form {
    display: grid;
    gap: 1.25rem;
}
.wide-btn {
    width: 100%;
    margin-block-start: 0.5rem;
}
.footer {
    display: flex;
    justify-content: flex-end;
    margin-block-start: 2rem;
}

/* ── 6. Drop-zone styling & interaction ─────────────────────────── */
.dropzone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: url('/blueprint.jpg') center/cover; */
    min-block-size: 260px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    transition: filter 0.25s ease;
}
.dz-title {
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: 0.02em;
}
.dz-sub {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-block-start: 0.5rem;
}

.dropzone:hover {
    filter: brightness(1.05);
}
.dropzone.drag-over {
    outline: 3px dashed var(--c-primary);
    outline-offset: -8px;
}

.file-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
}

/* ── 7. PrimeVue component overrides (same as before) ───────────── */
:deep(.p-inputtext),
:deep(.p-dropdown) {
    width: 100%;
    border-radius: 0.55rem;
    border: 1px solid #cbd5e1;
    padding: 0.55rem 0.75rem;
    transition:
        box-shadow 0.15s,
        transform 0.15s;
}
:deep(.p-inputtext:hover),
:deep(.p-dropdown:hover) {
    transform: translateY(-2px);
}
:deep(.p-inputtext:focus),
:deep(.p-dropdown:focus) {
    border-color: var(--c-contrast);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-primary) 35%, transparent);
}

:deep(.p-button) {
    background: var(--c-primary);
    border: none;
    color: #0a090b;
    padding: 0.55rem 1.7rem;
    border-radius: 999px;
    font-weight: 600;
    transition: background 0.15s ease;
}
:deep(.p-button:hover) {
    background: var(--c-primary-dark);
}
:deep(.p-button:focus) {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-primary) 45%, transparent);
}
</style>
