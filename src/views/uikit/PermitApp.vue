<script setup>
// ---- imports -------------------------------------------------------------
import { useScreenSize } from '@/composables/ScreenSize/useScreenSize.js';
import useLast from '@/composables/lastNumber.js';
import { useprocStore } from '@/stores/processStore';
import { invoke, tryOnMounted, until, useToNumber, watchOnce } from '@vueuse/core';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
// import useProcess from '@/composables/process.js';
import useCreateProcessNumber from '@/composables/use-createProcessnumber';

import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';

// ---- state ----------------------------------------------------------------
const loading = ref(false);
const responseMessage = ref('');
const isDialog = ref(false);
const content = ref();

const router = useRouter();
const procStore = useprocStore();
// composables & stores
const { procData, procReceive } = useCreateProcessNumber();
const { accountUsers, getUser, addUser } = useGlobalState();
const store = usePermitappStore();

// static options
const type = ref([
    { name: 'Roofing Permit', code: 'RP' },
    { name: 'Doors Permit', code: 'DP' },
    { name: 'Windows Permit', code: 'WP' }
]);
const prefix = ref('me');

onMounted(() => {
    const { width, isUltraWide, height, isLongScreen } = useScreenSize();
    console.log(width, isUltraWide);
    return { width, isUltraWide, height, isLongScreen };
});
// reactive form model
const formData = reactive({
    address: '',
    muni: '',
    license: '',
    folio: '',
    contractor: '',
    permit: '',
    processNumber: '',
    phNumber: '',
    emails: '',
    muniProc: '',
    date: new Date()
});

// misc refs
const muniProcess = ref('');
const muniProcessdata = ref('');
const cccValid = ref(true);
const isPhoneValid = ref(false);
const licenseStat = ref('');
const dba = ref('');
const phone = ref('');
const name = ref('');
const email = ref('');
const googleAccount = ref([]);
const address = ref('');

const disabled = ref(false);
// ---- lifecycle ------------------------------------------------------------

onMounted(() => {
    if (disabled.value === false && accountUsers.value[0]?.secondary_status === 'I') {
        console.log(disabled.value);
        alert('Your license is Inactive!');
    } else {
        disabled.value = true;
    }
});
tryOnMounted(() => {
    setProperties();

    isDialog.value = true;
    localStorage.clear();
});
const cellPhn = computed(() => {
    if (accountUsers.value[0]?.bphone !== '') {
        isPhoneValid.value = true;
        phone.value = accountUsers.value[0].bphone;
        console.log(phone.value);
    }
    return isPhoneValid.value === true ? phone.value : accountUsers.value[0]?.bphone;
});

watchOnce(setProperties, cellPhn, () => {
    /* noop */
    // console.log(setProperties);
});

async function setProperties() {
    googleAccount.value = await accountUsers.value[0];

    // phone.value = googleAccount.value?.bphone || '';
    name.value = googleAccount.value?.name || '';
    email.value = googleAccount.value?.email || '';
    licenseStat.value = googleAccount.value?.secondary_status || '';
    console.log(licenseStat.value);
    dba.value = googleAccount.value?.dba || '';
    address.value = procStore.$state.processinput[0]?.procData?.address;
    phone.value = accountUsers.value[0]?.bphone;
    // processN.value = procStore.$state.processinput[0]?.procData?.processNumber;
}
invoke(async () => {
    await until(isPhoneValid).toBe(true);
});

// ---- computed -------------------------------------------------------------
const selectedApplication = computed(() => (cccValid.value ? type.value[0] : ''));

// composables returning refs

const { resNum } = useLast();

// other refs for api
const checkMB = ref('');
const checkV = ref('');
const datas = ref(null);
const data = ref('');
const error = ref(null);
const convMB = ref('');
// ---- helpers --------------------------------------------------------------
async function fetchData(url) {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch(url);

        datas.value = await response.json();
        data.value = datas.value.MinimumPropertyInfos[0];
        console.log(data.value);
        formData.muni = data.value.Municipality;
        formData.folio = data.value.Strap;

        checkV.value = formData.folio;
        convMB.value = checkV.value.substring(1, 2);
        checkMB.value = useToNumber(convMB);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

async function load() {
    try {
        loading.value = true;
        setTimeout(() => (loading.value = false), 1000);

        muniProcessdata.value = muniProcess.value;
        const addr = address.value;
        console.log(addr);
        const url = `https://6x2kydgvuahfitwvxkkfbybv6u0kbxgl.lambda-url.us-east-1.on.aws/?address=${addr}`;
        console.log(url);
        await fetchData(url);
        console.log(muniProcess.value);
        // enrich form
        Object.assign(formData, {
            license: licenseStat.value,
            contractor: dba.value,
            emails: email.value,
            muniProc: muniProcess.value,
            phNumber: phone.value
        });

        const newNumber = String(resNum.value).substring(3, 19);
        const nextNum = useToNumber(newNumber).value + 1;
        formData.processNumber = prefix.value.concat(String(nextNum));
        formData.muniProc = muniProcess.value;
        formData.address = address.value;
        console.log(formData);
        procReceive(formData);
    } catch (err) {
        alert(err);
    }
}

function onSubmit() {
    procReceive(formData);
}

// function navigateNext() {
//     router.push('/roofsystem');
// }

function addItemAndClear() {
    // if (!formData.address) return;
    console.log(address.value);
    store.addSystem(formData, selectedApplication.value, checkMB.value, muniProcess.value, muniProcessdata.value, address.value);

    console.log(store);
}
</script>
<template>
    <!-- dialog stays unchanged -->
    <PermitInitalAgreement v-if="isDialog" />

    <section class="hero">
        <div class="card">
            <!-- heading -->
            <h1 class="title">Permit Application</h1>

            <!-- permit selector -->
            <Select v-model="selectedApplication" :options="type" optionLabel="name" placeholder="Select a permit type" class="w-full permit-select" />

            <!-- main form -->
            <form class="grid-form" @submit.prevent="onSubmit">
                <!-- license status -->
                <div class="field">
                    <label for="license">License Status</label>
                    <InputText id="license" v-model="licenseStat" placeholder="active / inactive" />
                </div>
                <!-- municipality process # -->
                <div class="field">
                    <label for="processMuni">Municipality Process #</label>
                    <InputText id="processMuni" v-model="muniProcess" placeholder="00000000" @change="load" />
                </div>
                <!-- property address & search -->
                <div class="field span-2">
                    <label for="addr">Property Address</label>
                    <div class="input-row">
                        <InputText id="addr" v-model="address" placeholder="123 SW 1st St" />
                        <Button type="button" icon="pi pi-search" :loading="loading" @click="load" />
                    </div>
                </div>

                <!-- DBA -->
                <div class="field">
                    <label for="dba">DBA</label>
                    <InputText id="dba" v-model="dba" placeholder="company alias" />
                </div>

                <!-- contractor name -->
                <div class="field span-2">
                    <label for="name">Contractor Name</label>
                    <InputText id="name" v-model="name" placeholder="full name" />
                </div>

                <!-- phone -->
                <div class="field">
                    <label for="phone">Cell Phone</label>
                    <InputMask id="phone" v-model="formData.phNumber" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                </div>

                <!-- email -->
                <div class="field">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="email" :invalid="invalid" placeholder="you@example.com" />
                    <small v-if="invalid" class="error">Email is required</small>
                </div>

                <!-- municipality -->
                <div class="field">
                    <label for="muni">Municipality</label>
                    <InputText id="muni" v-model="formData.muni" placeholder="Miami Beach" />
                </div>

                <!-- folio -->
                <div class="field">
                    <label for="folio">Folio</label>
                    <InputText id="folio" v-model="formData.folio" placeholder="00-0000-000-0000" @input="updatemEProcess" />
                </div>

                <!-- master permit -->
                <div class="field">
                    <label for="permit">Master Permit</label>
                    <InputText id="permit" v-model="formData.permit" placeholder="20000000" />
                </div>

                <!-- mEProcess # -->
                <div class="field">
                    <label for="processnum">mEProcess #</label>
                    <InputText id="processnum" v-model="formData.processNumber" placeholder="auto-generated" />
                </div>

                <!-- server response -->
                <p v-if="responseMessage" class="response span-2">{{ responseMessage }}</p>

                <!-- submit -->
                <div class="span-2 submit-row">
                    <Button label="Submit" type="submit" :loading="loading" severity="contrast" raised as="router-link" to="/roofsystem" @click="addItemAndClear" />
                </div>
            </form>
        </div>
    </section>
</template>
<style scoped>
/* ─── 1. CSS custom properties for easy theme tweaks ─────────────────────── */
:root {
    --c-bg: #f4f4f4;
    --c-bg-card: rgba(255, 255, 255, 0.85);
    --c-bg-card-dark: rgba(30, 41, 59, 0.85);
    --c-primary: #00857a;
    --c-primary-dark: #10bda7;
    --c-text: #1b1b1b;
    --c-text-light: #ffffff;
    --radius: 1.2rem;
    --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

@media (prefers-color-scheme: dark) {
    :root {
        --c-bg: #0f172a;
        --c-text: #e2e8f0;
    }
}

/* ─── 2. Layout wrappers ─────────────────────────────────────────────────── */
.hero {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 4rem 1rem;
    background: var(--c-bg);
    background-image: radial-gradient(at 10% 20%, #e0f7fa 0%, transparent 50%), radial-gradient(at 90% 80%, #ccfbf1 0%, transparent 50%);
}

.card {
    width: 100%;
    max-width: 48rem;
    background: var(--c-bg-card);
    backdrop-filter: blur(12px);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 3rem 2.5rem;
}

/* dark mode card tint */
@media (prefers-color-scheme: dark) {
    .card {
        background: var(--c-bg-card-dark);
    }
}

/* ─── 3. Typography ──────────────────────────────────────────────────────── */
.title {
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
    color: var(--c-primary);
    margin-bottom: 1.75rem;
}

/* ─── 4. Form grid ───────────────────────────────────────────────────────── */
.grid-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1.25rem 2rem;
}

/* span helpers */
.span-2 {
    grid-column: span 2;
}
@media (max-width: 640px) {
    .span-2 {
        grid-column: span 1;
    }
}

/* individual field block */
.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field label {
    font-weight: 500;
    color: var(--c-text);
    font-size: 0.9rem;
}

/* horizontal input + button combo */
.input-row {
    display: flex;
    gap: 0.5rem;
}

/* response text */
.response {
    text-align: center;
    color: #e11d48; /* rose-600 */
    font-weight: 500;
}

/* submit row → centre button */
.submit-row {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
}

/* ─── 5. PrimeVue component tweaks via :deep() ───────────────────────────── */
:deep(.p-inputtext),
:deep(.p-inputmask),
:deep(.p-dropdown) {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid #cbd5e1;
    padding: 0.55rem 0.75rem;
    transition: box-shadow 0.15s ease;
}

:deep(.p-inputtext:focus),
:deep(.p-inputmask:focus),
:deep(.p-dropdown:not(.p-disabled):focus) {
    border-color: var(--c-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-primary) 35%, transparent);
}

:deep(.p-button) {
    background: var(--c-primary);
    border: none;
    color: var(--c-text-light);
    padding: 0.55rem 1.75rem;
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
:deep(.p-button.p-disabled) {
    opacity: 0.6;
    cursor: not-allowed;
}

/* error helper */
.error {
    font-size: 0.75rem;
    color: #e11d48;
}

/* permit type selector extra spacing (optional) */
.permit-select {
    margin-bottom: 1.5rem;
}
</style>
