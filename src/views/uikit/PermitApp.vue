<script setup>
// ---- imports -------------------------------------------------------------
import usePermitData from '@/composables/Postdata/usePermitappData';
import { useScreenSize } from '@/composables/ScreenSize/useScreenSize.js';
import useLast from '@/composables/lastNumber.js';
// import { useprocStore } from '@/stores/processStore';
import { invoke, tryOnMounted, until, useToNumber, watchOnce } from '@vueuse/core';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import useCreateProcessNumber from '@/composables/use-createProcessnumber';

import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';

// ---- state ----------------------------------------------------------------
const loading = ref(false);
const responseMessage = ref('');
const isDialog = ref(false);

const permitAppPdf = reactive({
    dba: '',
    jobaddress: '',
    municipality: '',
    muniprocessnumber: '',
    processnumber: '',
    masterpermit: '',
    license: ''
});
// add this ref; your logic will set this to true/false
const isHistoric = ref(false);

const router = useRouter();
// const procStore = useprocStore();
// composables & stores
const { procReceive } = useCreateProcessNumber();
// getUser, addUser these two go after accountUsers but are not being used - marked for removal
const { accountUsers } = useGlobalState();
const store = usePermitappStore();
const { callPermitdata } = usePermitData();
// static options
const type = ref([
    { name: 'Roofing Permit', code: 'RP' },
    { name: 'Doors Permit', code: 'DP' },
    { name: 'Windows Permit', code: 'WP' }
]);
const prefix = ref('me');

onMounted(() => {
    const { width, isUltraWide, height, isLongScreen } = useScreenSize();
    // console.log(width, isUltraWide);
    return { width, isUltraWide, height, isLongScreen };
});
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
    historic: Boolean,
    date: new Date(),
    checkIfBeach: 0
});

// misc refs
const muniProcess = ref('');
const muniProcessdata = ref('');
const cccValid = ref(true);
const isPhoneValid = ref(false);
const glAccount = reactive({
    licenseStat: '',
    dba: '',
    phone: '',
    name: '',
    email: ''
});

const googleAccount = ref([]);
const inputAddress = ref('');

const disabled = ref(false);
// ---- lifecycle ------------------------------------------------------------

onMounted(() => {
    // console.log(accountUsers.value[0]?.secondary_status);
    // console.log(accountUsers.value[0]?.secondary_status);
    if (disabled.value === false && accountUsers.value[0]?.secondary_status === 'I') {
        formData.license = 'Inactive';

        alert('Your license is Inactive!');
    } else {
        formData.license = 'Active';
        // console.log(formData.license);
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
        phone.value = accountUsers.value[0]?.bphone;
    }
    return isPhoneValid.value === true ? phone.value : accountUsers.value[0]?.bphone;
});

watchOnce(setProperties, cellPhn, () => {
    /* noop */
    console.log(setProperties);
});

async function setProperties() {
    googleAccount.value = accountUsers.value[0];
    // await
    glAccount.name = googleAccount.value?.name || '';
    glAccount.email = googleAccount.value?.email || '';
    // glAccount.licenseStat = googleAccount.value?.secondary_status || '';
    glAccount.dba = googleAccount.value?.dba || '';
    glAccount.phone = googleAccount.value?.cphone || '';
}
invoke(async () => {
    await until(isPhoneValid).toBe(true);
});

// ---- computed -------------------------------------------------------------
const selectedApplication = computed(() => (cccValid.value ? type.value[0] : ''));

// composables returning refs

const { resNum } = useLast();

// other refs for api
const checkV = ref('');
const datas = ref(null);
const data = ref('');
const error = ref(null);
const convMB = ref('');
// ---- helpers --------------------------------------------------------------

const checkMB = ref(null);
async function fetchData(url) {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch(url);
        datas.value = await response.json();
        data.value = datas.value.body.MinimumPropertyInfos[0];
        formData.contractor = glAccount.dba;
        // formData.license = data.value.secondary_status;
        formData.muni = data.value.Municipality;
        formData.folio = data.value.Strap;
        // console.log(datas.value);
        // It seems that I need to add the address in all caps for the historic function work properly.
        // Further investigation pending 08112025
        isHistoric.value = await datas.value.body.isHistoric;
        // console.log(isHistoric.value);
        checkV.value = formData.folio;
    } catch (err) {
        alert('No data found or enter correct address!');
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

async function convertFolio(folios) {
    // const miamibeach = folios.value;

    if (folios.value === 2) {
        formData.checkIfBeach = folios.value;
    }
}

async function load() {
    try {
        loading.value = true;

        muniProcessdata.value = muniProcess.value;
        const addr = inputAddress.value.toUpperCase();
        // This takes in the address as a field which lambda is expecting under the address below.
        const url = `https://6x2kydgvuahfitwvxkkfbybv6u0kbxgl.lambda-url.us-east-1.on.aws/?address=${addr}`;

        await fetchData(url);

        // enrich form
        Object.assign(formData, {
            license: glAccount.licenseStat,
            dba: glAccount.dba,
            emails: glAccount.email,
            muniprocessnumber: muniProcess.value,
            phonenumber: glAccount.phone
        });

        const newNumber = String(resNum.value).substring(3, 19);
        const nextNum = useToNumber(newNumber).value + 1;
        formData.processNumber = prefix.value.concat(String(nextNum));

        formData.muniProc = muniProcess.value;
        formData.address = inputAddress.value;
        Object.assign(permitAppPdf, {
            dba: formData.contractor,
            jobaddress: formData.address,
            municipality: formData.muni,
            muniprocessnumber: formData.muniProc,
            processnumber: formData.processNumber,
            masterpermit: formData.permit,
            license: formData.license
        });
        convMB.value = checkV.value.substring(1, 2);
        checkMB.value = useToNumber(convMB);
        convertFolio(checkMB.value);

        store.addSystem(formData);
        // commented because of the onSubmit
        await procReceive(formData);
        await callPermitdata(permitAppPdf);
    } catch (err) {
        alert(err);
    }
}

async function onSubmit() {
    // await procReceive(formData);

    store.addSystem(formData, mbId);
}

function addItemAndClear() {
    // post(formData);

    store.addSystem(formData, mbId);
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
                    <InputText id="license" v-model="formData.license" placeholder="active / inactive" />
                </div>
                <!-- municipality process # -->
                <div class="field">
                    <label for="processMuni">Municipality Process #</label>
                    <!-- @change="load"  this v-model is the input -->
                    <InputText id="processMuni" v-model="muniProcess" placeholder="00000000" />
                </div>
                <!-- property address & search -->
                <div class="field">
                    <label for="addr">Property Address</label>
                    <div class="input-row">
                        <InputText id="addr" v-model="inputAddress" placeholder="123 SW 1st St" />
                        <!-- blinking label -->

                        <Button type="button" icon="pi pi-search" :loading="loading" @click="load" />
                    </div>
                </div>
                <div class="field">
                    <span v-if="isHistoric" class="historic-indicator">Property is Historic</span>
                </div>

                <!-- <br /> -->
                <!-- DBA -->
                <div class="field">
                    <label for="dba">DBA</label>
                    <InputText id="dba" v-model="glAccount.dba" placeholder="company alias" />
                </div>

                <!-- contractor name -->
                <div class="field">
                    <label for="name">Contractor Name</label>
                    <InputText id="name" v-model="glAccount.name" placeholder="full name" />
                </div>

                <!-- phone -->
                <div class="field">
                    <label for="phone">Cell Phone</label>
                    <InputMask id="phone" v-model="glAccount.phone" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                </div>

                <!-- email -->
                <div class="field">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="glAccount.email" :invalid="invalid" placeholder="you@example.com" />
                    <small v-if="invalid" class="error">Email is required</small>
                </div>

                <!-- municipality -->
                <div class="field">
                    <label for="muni">Municipality</label>
                    <InputText id="muni" v-model="formData.muni" placeholder="Miami" />
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
                    <!-- @click="addItemAndClear"  -->
                    <Button label="Submit" type="submit" :loading="loading" severity="contrast" raised as="router-link" to="/roofsystem" @update="addItemAndClear" />
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
    width: 50%;
    max-width: 52rem;
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
    margin-bottom: 1rem;
}

/* blinking animation */
@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.historic-indicator {
    margin: 0 0.5rem;
    padding: 0.25rem 0.5rem;
    font-weight: 600;
    color: #2eca6f;
    display: inline-block; /* or `display:block` */
    min-width: 100%; /* now it stretches full width */
    background-color: var(--c-primary);
    border-radius: 0.65rem;
    animation: blink 1s step-start infinite;
}
</style>
