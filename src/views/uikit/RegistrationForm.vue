<script setup>
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import usecreateAccount from '@/composables/Authentication/use-createAccount';
import useRegAxios from '@/composables/Authentication/use-registrationAxios';
import { useAuthStore } from '@/stores/auth.js';

const router = useRouter();
const toast = useToast();

const authStore = useAuthStore();
const { message } = storeToRefs(authStore);

const showTerms = ref(true);
const disabled = ref(false);
const isDateValid = ref(false);
const isGmailValid = ref(false);

const formDatas = reactive({
    license: '',
    dba: '',
    name: '',
    username: '',
    password: '',
    license_status: '',
    expiration_date: '',
    address: '',
    city: '',
    projects: [],
    cphone: '',
    bphone: '',
    email: '',
    insurance: '',
    carrier: '',
    date: new Date()
});

const { cccAccounts, retrieveAccount } = useRegAxios();
const { takp } = usecreateAccount();

const events = ref([]);
const license_stat = ref('');
const fileupload = ref(null);

const trades = ref(null);
const dropdownItemstSelected = ref(null);
const dropdownItemctSelected = ref(null);

const dropdownItemSt = ref([
    { name: 'Florida', code: 'Florida' },
    { name: 'Georgia', code: 'Georgia' }
]);
const dropdownItemCt = ref([
    { name: 'Miami', code: 'Miami' },
    { name: 'Homestead', code: 'Homestead' },
    { name: 'Miami Beach', code: 'Miami Beach' },
    { name: 'Miami Gardens', code: 'Miami Gardens' }
]);
const trade = ref([
    { name: 'Roofing Contractor', code: 'Roofing' },
    { name: 'General Contractor', code: 'General' }
]);

const isFormValid = computed(() => formDatas.insurance.trim() !== '' && formDatas.carrier.trim() !== '' && formDatas.license_status.trim() !== '' && formDatas.license_status.trim() !== 'I' && formDatas.email.trim() !== '');

function onSubmit() {
    if (!isFormValid.value) return;
    takp(formDatas);
    Object.assign(formDatas, {
        license: '',
        name: '',
        license_status: '',
        dba: '',
        address: '',
        cphone: '',
        bphone: '',
        email: '',
        insurance: '',
        carrier: ''
    });
    navigateNext();
}

function retriveContractor() {
    retrieveAccount(formDatas.license);
    events.value = cccAccounts;

    const e = events.value;
    formDatas.dba = e.dba;
    formDatas.name = e.name;
    formDatas.expiration_date = e.expiration_date;
    formDatas.address = e.address;
    formDatas.city = e.city;
    formDatas.license_status = e.license_status;
    license_stat.value = e.license_status;

    licenseStatus();
}

function licenseStatus() {
    if (license_stat.value === '') {
        formDatas.license_status = '';
    } else if (license_stat.value === 'A') {
        formDatas.license_status = 'Active';
        DateCheck();
    } else if (license_stat.value === 'I') {
        formDatas.license_status = 'Inactive';
        alert('Your license is Inactive!');
        navigateNext();
    }
}

function DateCheck() {
    const selected = new Date(formDatas.expiration_date);
    const now = new Date();
    selected.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    if (selected <= now) {
        isDateValid.value = true;
        alert('Your license is Expired!');
        navigateNext();
    }
}

function handleAccepted() {
    router.push('/registration');
}

function navigateNext() {
    router.push('/');
}

function upload() {
    if (fileupload.value?.upload) {
        fileupload.value.upload();
    }
}

function onUpload() {
    toast.add({
        severity: 'contrast',
        summary: 'Contrast',
        detail: 'File Uploaded',
        life: 3000
    });
}
</script>
<template>
    <section class="hero">
        <div class="card">
            <!-- heading -->
            <h1 class="title">Registration</h1>
            <form class="grid-form" @submit.prevent="onSubmit">
                <div class="h-[10rem]"></div>
                <div class="font-semibold text-xl">Contractor Information</div>
                <div class="field">
                    <label for="lic1" style="color: #122620">State of Florida License No.</label>
                    <!-- :invalid="formDatas.license === ''" -->
                    <InputText v-tooltip="'Enter your license and hit tab'" type="text" v-model="formDatas.license" placeholder="CRC000000" @change="checkLicense" :invalid="formDatas.license === ''" @keydown.tab="retriveContractor" />
                    <!-- <p v-if="!isDateValid">Your license is expired.</p> -->
                </div>
                <div class="field">
                    <label for="trade" style="color: #122620">Trade</label>
                    <Select id="trad" v-model="trades" :options="trade" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                </div>
                <div class="field">
                    <label for="dba" style="color: #122620">DBA</label>
                    <InputText id="dba" type="text" v-model="formDatas.dba" placeholder=" " :invalid="formDatas.dba === ''" />
                </div>
                <div class="field">
                    <label for="addr" style="color: #122620">Business Address</label>
                    <InputText id="addr" type="text" v-model="formDatas.address" placeholder="address" />
                </div>
                <div class="field span-2">
                    <label for="name" style="color: #122620">Qualifier Name</label>
                    <InputText id="name" type="text" v-model="formDatas.name" placeholder=" " :invalid="formDatas.name === ''" />
                </div>

                <div class="field">
                    <label for="secondary_status" style="color: #122620">License Status</label>
                    <InputText id="secondary_status" type="text" v-model="formDatas.license_status" placeholder=" " :invalid="formDatas.license_status === ''" />
                </div>
                <div class="field">
                    <label for="license" style="color: #122620">License Expiration Date</label>
                    <InputText id="license" type="text" v-model="formDatas.expiration_date" placeholder=" " :invalid="formDatas.expiration_date === ''" />
                </div>
                <div class="field">
                    <label for="license" style="color: #122620">Insurance Policy Number</label>
                    <InputText id="license" type="text" v-model="formDatas.insurance" placeholder=" " :invalid="formDatas.insurance === ''" />
                </div>
                <div class="field">
                    <label for="license" style="color: #122620">Insurance Carrier</label>
                    <InputText id="license" type="text" v-model="formDatas.carrier" placeholder=" " :invalid="formDatas.carrier === ''" />
                </div>

                <!-- <div class="h-[10rem]"></div> -->

                <!-- class="flex flex-col grow basis-1 gap-3" -->
                <div class="field">
                    <label for="state" style="color: #122620">City</label>
                    <!-- <Select id="state" v-model="dropdownItemct" :options="dropdownItemCt" optionLabel="name" placeholder="Select One" class="w-full"></Select> -->
                    <InputText id="city" type="text" v-model="formDatas.city" placeholder="city" />
                </div>
                <!-- class="flex flex-wrap gap-2 w-full" -->
                <div class="field">
                    <label for="state" style="color: #122620">State</label>
                    <Select id="state" v-model="dropdownItemstSelected" :options="dropdownItemSt" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                </div>
                <!-- class="flex flex-col grow basis-0 gap-3" -->
                <div class="field">
                    <label for="bphone" style="color: #122620">Business Phone</label>
                    <InputMask v-model="formDatas.bphone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="formDatas.bphone === ''" />
                    <!-- <InputMask id="bphone" v-model="formDatas.phone" mask="000-000-0000" placeholder="000-000-0000" /> -->
                </div>
                <div class="field">
                    <label for="cphone" style="color: #122620">Cell Phone Number</label>
                    <InputMask v-model="formDatas.cphone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="formDatas.cphone === ''" />
                </div>
                <div class="field">
                    <label for="email1" style="color: #122620">Gmail account</label>
                    <InputText v-tooltip="'Enter your gmail account in order to submit'" id="email1" v-model="formDatas.email" type="text" placeholder="email" :invalid="formDatas.email === ''" />
                </div>

                <div class="span-2 submit-row">
                    <Button label="Submit" severity="contrast" raised @click="onSubmit" :disabled="!isFormValid" />
                    <!-- <NewButton :isActive="MiamiBC" @click="checkValue">Check</NewButton> -->
                </div>

                <div class="full:w-3/4 flex flex-col gap-2" style="margin-top: 120px">
                    <label for="addr" style="color: #122620">Upload Insurance Information</label>
                    <Toast />
                    <file-saver class="w-3/4"></file-saver>
                </div>
            </form>
            <p v-if="responseMessage">{{ responseMessage }}</p>
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
