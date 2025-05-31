<script setup>
import { useToNumber } from '@vueuse/core';
import AOS from 'aos';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import useLast from '@/composables/lastNumber.js';
// import useProcess from '@/composables/process.js';
import usecreateProcessnumber from '@/composables/use-createProcessnumber';
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';

const router = useRouter();
const isDialog = ref(false);
const loading = ref(false);
const responseMessage = ref('');

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

const phone = ref('');
const name = ref('');
const email = ref('');
const dba = ref('');
const licenseStatus = ref('');
const content = ref('');
const cccValid = ref(true);
const phCheck = ref('');
const checkMB = ref('');
const checkV = ref('');
const error = ref(null);
const data = ref(null);
const datas = ref(null);

const type = ref([
    { name: 'Roofing Permit', code: 'RP' },
    { name: 'Doors Permit', code: 'DP' },
    { name: 'Windows Permit', code: 'WP' }
]);
const prefix = ref('me');
const muniProcess = ref('');
const muniProcessdata = ref('');

const selectedApplication = computed(() => (cccValid.value ? type.value[0] : ''));
const { accountUsers, getUser, addUser } = useGlobalState();
const store = usePermitappStore();

const { procReceive } = usecreateProcessnumber();
const { resNum } = useLast();

onMounted(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    isDialog.value = true;

    const user = accountUsers.value[0];
    if (user) {
        name.value = user.name;
        email.value = user.email;
        licenseStatus.value = user.secondary_status;
        dba.value = user.dba;
    }
});
const location = ref('');

const load = async () => {
    try {
        loading.value = true;
        const addr = location.value;
        muniProcessdata.value = muniProcess.value;
        console.log(addr);
        const base1URL = `https://6x2kydgvuahfitwvxkkfbybv6u0kbxgl.lambda-url.us-east-1.on.aws/?` + `address=${encodeURIComponent(addr)}&to=200`;
        const url = base1URL;
        fetchData(url);

        let strLength = String(resNum.value);
        let newNumber = strLength.substring(3, 19);
        const number = useToNumber(newNumber);
        const createStr = String(number.value + 1);

        formData.processNumber = prefix.value + createStr;

        if (accountUsers.value[0]?.bphone || accountUsers.value[0]?.cphone) {
            updateTick();
        }

        procReceive(formData);
    } catch (err) {
        alert(err);
    } finally {
        loading.value = false;
    }
};

const updateTick = () => {
    phCheck.value = accountUsers.value[0]?.bphone;

    nextTick(() => {
        const user = accountUsers.value[0];
        console.log(user?.bphone, user?.cphone);
        if (user?.bphone || user?.cphone) {
            phone.value = phCheck.value;
            formData.license = user.license;
            formData.contractor = user.name;
            formData.emails = user.email;
            formData.muniProc = muniProcess.value;
            formData.phNumber = user.bphone;
        }
    });
};

const fetchData = async (url) => {
    try {
        loading.value = true;
        error.value = null;

        const response = await fetch(url);
        console.log(url);
        datas.value = await response.json();
        data.value = datas.value.MinimumPropertyInfos[0];

        formData.muni = data.value.Municipality;
        formData.folio = data.value.Strap;

        checkV.value = formData.folio;
        checkMB.value = checkV.value.substring(1, 2);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const onSubmit = () => {
    procReceive(formData);
};

const navigateNext = () => {
    router.push('/roofsystem');
};

const addItemAndClear = () => {
    if (!formData.address) return;

    store.addSystem(formData, selectedApplication.value, checkMB.value, muniProcess.value, muniProcessdata.value);
};
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
                        <InputText id="license" v-model="licenseStatus" type="text" placeholder="status" />
                        <!-- <Message severity="error">Contractor Name Required</Message> -->
                    </div>
                    <div class="flex mt-3 space-y-2 flex-col gap-2" style="margin-left: 30px">
                        <form class="md:w-3/4 grid grid-cols-2 gap-6" @submit="onSubmit">
                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-4">
                                <label for="processMuni" style="color: #122620">Municipality Process Number</label>
                                <InputText id="processMuni" v-tooltip.top="'Enter Municipality Process Number'" v-model="muniProcess" type="text" placeholder="municipal process number" @change="load" />
                            </div>

                            <div class="flex flex-col mt-3 w-full w-64 space-y-2 grow basis-0 gap-4">
                                <label for="addr" style="color: #122620">Property Address</label>
                                <InputText id="addr" v-tooltip.top="'Make sure that either street or avenue is spelled out, direction could be shorten (sw)'" type="text" v-model="location" placeholder="address" />
                                <!-- v-if="!loading"  -->
                                <Button id="search" type="button" label="Search" class="w-2/3" style="background-color: #a4b5b9" raised icon="pi pi-search-plus" :loading="loading" @click="load" @input="createHtml" />

                                <!-- <i v-else class="pi pi-spin pi-spinner" style="font-size: 2rem"></i> -->

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
                                <!-- <Message severity="error">Contractor Name Required</Message> -->
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label id="phone" style="color: #122620">Cell Phone Number</label>
                                <InputMask v-model="phone" mask="(999) 999-9999" />
                                <!-- placeholder="(999) 999-9999" :invalid="phone === ''" -->
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label id="Email" style="color: #122620">Email</label>
                                <InputText v-model="email" :invalid="email === null" :error="emailError" />
                                <Message v-if="invalid" severity="error">Email is required</Message>
                                <!-- @click="navigateNext" -->
                            </div>
                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="muni" style="color: #122620">Municipality</label>
                                <InputText id="muni" v-model="muni" type="text" placeholder="municipality" />
                            </div>
                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="folio" style="color: #122620">Folio</label>
                                <InputText id="folio" v-model="folio" type="text" placeholder="folio" @input="updatemEProcess" />
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="permit" style="color: #122620">Master Permit</label>
                                <InputText id="permit" v-model="permit" type="text" placeholder="20000000" />
                            </div>
                            <div class="flex flex-col font-semibold mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="processnum" style="color: #122620">mEProcess Number</label>
                                <InputText id="processnum" v-model="processNumber" type="text" placeholder="process number" />
                            </div>

                            <p v-if="responseMessage">{{ responseMessage }}</p>

                            <br />
                            <Button id="submit" type="submit" label="Submit" class="w-2/3" style="background-color: #a4b5b9" raised as="router-link" to="/roofsystem" @click="addItemAndClear(formData, selectedApplication)" />
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
