<script setup>
// ---- imports -------------------------------------------------------------
import { useprocStore } from '@/stores/processStore';
import { invoke, tryOnMounted, until, useToNumber, watchOnce } from '@vueuse/core';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import useLast from '@/composables/lastNumber.js';
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
    if (disabled.value === false && accountUsers.value[0].secondary_status === 'I') {
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
    <!-- <div id="permitapp" ref="permitapp" class="flex flex-col md:flex-row gap-2" style="margin-left: 220px; background-color: #122620"> @click="selectPermitType"-->
    <PermitInitalAgreement v-if="isDialog" />
    <!-- <div class="grid grid-cols-1 gap-2"> -->
    <div class="container md:w-1/3" style="margin-left: 650px">
        <form>
            <div class="flex flex-row">
                <div class="flex mt-4 space-y-2 flex-col gap-2">
                    <div class="font-semibold text-xl" style="color: #122620; margin-left: 230px">Permit Application</div>
                    <div class="flex justify-center">
                        <Select v-model="selectedApplication" :options="type" showClear optionLabel="name" placeholder="Select a permit type" class="w-full md:w-56" style="margin-top: 30px" />
                    </div>
                    <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3" style="max-width: 200px; margin-left: 30px">
                        <label for="license" style="color: #122620">License Status</label>
                        <InputText id="license" v-model="licenseStat" type="text" placeholder="status" />
                    </div>
                    <div class="flex mt-3 space-y-2 flex-col gap-2" style="margin-left: 30px">
                        <form class="md:w-3/4 grid grid-cols-2 gap-6" @submit="onSubmit">
                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-4">
                                <label for="processMuni" style="color: #122620">Municipality Process Number</label>
                                <InputText id="processMuni" v-tooltip.top="'Enter Municipality Process Number'" v-model="muniProcess" type="text" placeholder="municipal process number" @change="load" />
                            </div>

                            <div class="flex flex-col mt-3 w-full w-64 space-y-2 grow basis-0 gap-4">
                                <label for="addr" style="color: #122620">Property Address</label>
                                <InputText id="addr" v-tooltip.top="'Make sure that either street or avenue is spelled out, direction could be shorten (sw)'" type="text" v-model="address" placeholder="address" />
                                <!-- v-if="!loading"  -->
                                <Button id="search" type="button" label="Search" class="w-2/3" style="background-color: #a4b5b9" raised icon="pi pi-search-plus" :loading="loading" @click="load" />

                                <!-- <i v-else class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>  @input="createHtml"-->

                                <!-- pi-search-plus -->
                                <!-- <Message severity="error">Property Address Required</Message> -->
                            </div>

                            <div class="flex flex-col w-full md:w-72 mt-3 space-y-2 grow basis-0 gap-4">
                                <label for="dba" style="color: #122620">DBA </label>
                                <InputText id="dba" v-model="dba" type="text" placeholder="dba" />
                                <!-- <Message severity="error">Contractor Name Required</Message> -->
                            </div>
                            <div class="flex flex-col w-full md:w-72 mt-3 space-y-2 grow basis-0 gap-4" style="margin-left: 55px">
                                <label for="name" style="color: #122620">Contractor Name</label>
                                <InputText id="name" v-model="name" type="text" placeholder="name" />
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label id="phone" style="color: #122620">Cell Phone Number</label>
                                <InputMask v-model="formData.phNumber" mask="(999) 999-9999" placeholder="(999) 999-9999" />
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label id="Email" style="color: #122620">Email</label>
                                <InputText v-model="email" :invalid="email === null" :error="emailError" />
                                <Message v-if="invalid" severity="error">Email is required</Message>
                            </div>
                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="muni" style="color: #122620">Municipality</label>
                                <InputText id="muni" v-model="formData.muni" type="text" placeholder="municipality" :style="{ color: 'green' }" />
                            </div>
                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="folio" style="color: #122620">Folio</label>
                                <InputText id="folio" v-model="formData.folio" type="text" placeholder="folio" @input="updatemEProcess" :style="{ color: 'green' }" />
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="permit" style="color: #122620">Master Permit</label>
                                <InputText id="permit" v-model="formData.permit" type="text" placeholder="20000000" />
                            </div>
                            <div class="flex flex-col font-semibold mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="processnum" style="color: #122620">mEProcess Number</label>
                                <InputText id="processnum" v-model="formData.processNumber" type="text" placeholder="process number" />
                            </div>

                            <p v-if="responseMessage">{{ responseMessage }}</p>

                            <br />
                            <!-- formData -->
                            <Button id="submit" type="submit" disabled label="Submit" class="w-2/3" style="background-color: #a4b5b9" raised as="router-link" to="/roofsystem" @click="addItemAndClear" />
                        </form>

                        <br />
                    </div>
                </div>
            </div>
        </form>
    </div>

    <!-- </div> -->
</template>
<style scoped>
.container {
    padding-bottom: 170px;
    /* padding-top: 12px; */
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 80px;
    margin-top: 20px;
    background-color: #eae7e2;
    /* top: 10vh; */
}

.ql-container {
    height: calc(100% - 52px);
}
</style>
