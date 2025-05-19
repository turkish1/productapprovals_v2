<script>
import useLast from '@/composables/lastNumber.js';
import useProcess from '@/composables/process.js';
import usecreateProcessnumber from '@/composables/use-createProcessnumber';

import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useToNumber } from '@vueuse/core';
import { computed, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import { invoke } from '@vueuse/core';
import AOS from 'aos';

export default {
    setup() {
        const loading = ref(false);
        const responseMessage = ref('');
        const router = useRouter();
        const isDialog = ref(false);
        const content = ref();

        const { procData, procReceive } = usecreateProcessnumber();
        const { accountUsers, getUser, addUser } = useGlobalState();

        // const selectedApplication = ref();

        const type = ref([
            { name: 'Roofing Permit', code: 'RP' },
            { name: 'Doors Permit', code: 'DP' },
            { name: 'Windows Permit', code: 'WP' }
        ]);

        const prefix = ref('me');
        const store = usePermitappStore();
        const muniProcess = ref('');
        const muniProcessdata = ref('');
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
        const cccValid = ref(true);
        const name = ref('');
        const email = ref('');
        const phone = ref('');
        const licenseStatus = ref('');
        const dba = ref('');
        onMounted(() => {
            AOS.init({
                duration: 800, // Animation duration in ms
                easing: 'ease-in-out', // Easing for animations
                once: true // Whether animation happens only once
            });
        });
        onMounted(() => {
            // if (accountUsers.value[0]. === '') {
            //     // return router.push('/');
            // } else {
            isDialog.value = true;
            console.log(accountUsers.value[0]);
            name.value = accountUsers.value[0].name;
            email.value = accountUsers.value[0].email;
            // phone.value = accountUsers.value[0].bphone;
            licenseStatus.value = accountUsers.value[0].secondary_status;

            dba.value = accountUsers.value[0].dba;
            // === '' ? accountUsers._value[0].bphone : accountUsers._value[0].cphone;
            // }
        });

        const selectedApplication = computed(() => {
            return cccValid.value === true ? type.value[0] : '';
        });

        const { pNum } = useProcess();
        const { lastNum, resNum } = useLast();
        // fix the phone error with if statement and validation

        const permitapp = ref(null);
        const checkMB = ref('');
        const checkV = ref('');
        const datas = ref(null);
        const data = ref('');
        const error = ref(null);
        // const loading = ref(false);
        onMounted(() => {
            isDialog.value = true;
        });
        const phCheck = ref('');

        const load = async () => {
            try {
                loading.value = true;
                setTimeout(() => {
                    loading.value = false;
                }, 1000);
                // // const ftAddress = ref('3350 SW 23 ST')
                // permitStore.$state.permitapp[0]?.formdt?.processNumber || ''
                muniProcessdata.value = muniProcess.value;

                console.log(muniProcess.value, muniProcessdata.value);
                const addr = ref(formData.address);
                // getaddress(addr.value);

                console.log(addr.value);
                const base1URL = `https://6x2kydgvuahfitwvxkkfbybv6u0kbxgl.lambda-url.us-east-1.on.aws/?address=${addr.value}`;
                // + `address=${encodeURIComponent(addr.value)}&to=200`;
                // 'https://8v6k1o1s0g.execute-api.us-east-1.amazonaws.com/getaddress';
                console.log(base1URL);
                // const city = 'FT. FORT LAUDERDALE'
                // const baseURL = 'https://www.miamidade.gov/Apps/PA/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetAddress&clientAppName=PropertySearch&myUnit=&from=1';
                // const baseBrowardURL = 'https://web.bcpa.net/BcpaClient/search.aspx/getParcelInformation'
                const url = base1URL;
                fetchData(url);
                // `${baseURL}&address=${encodeURIComponent(addr.value)}&to=200`;
                //  const url_ft = `${baseBrowardURL}&myCity${encodeURIComponent(city)}&myAddress=${encodeURIComponent(ftAddress.value)}&to=200`;
                // const base1URL = 'https://8v6k1o1s0g.execute-api.us-east-1.amazonaws.com/getaddress'
                // 3. Make the Fetch API request with CORS enabled
                // const response = (await fetch(url)).json().then(addresses);
                console.log(muniProcess.value);
                formData.license = accountUsers.value[0].license;
                formData.contractor = accountUsers.value[0].name;
                formData.emails = accountUsers.value[0].email;
                formData.muniProc = muniProcess.value;
                formData.phNumber = accountUsers.value[0].bphone;
                console.log(resNum.value);
                // let strLength = String(lastNum.value.body);
                let strLength = String(resNum.value);
                console.log(strLength);
                //  This removes quotes and backlash from the sting
                let newNumber = strLength.substring(3, 19);
                // formData.permit = selectedApplication.value;
                console.log(newNumber);
                const number = useToNumber(newNumber);
                console.log(typeof number, number.value);
                let addNumber = number.value + 1;
                let createStr = String(addNumber);
                formData.processNumber = prefix.value.concat(createStr);
                if (accountUsers.value[0].bphone || accountUsers.value[0].cphone) {
                    updateTick();
                }
                // console.log(formData.muniProcess);
                procReceive(formData);
                // if checkMB.value === 13 after number conversion disable shingle roof.

                // setTimeout(() => {
                //     loading.value = false;
                // }, 2000);
            } catch (error) {
                alert(error);
            }
        };

        const updateTick = () => {
            // isPaddySingle.value = true;
            phCheck.value = accountUsers.value?.[0].bphone;
            console.log(phCheck.value);

            nextTick(() => {
                if (accountUsers.value[0].bphone || accountUsers.value[0].cphone) {
                    phone.value = phCheck.value;
                }
            });
        };
        const fetchData = async (url) => {
            loading.value = true;
            error.value = null;

            try {
                const response = await fetch(url);
                console.log(url);
                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
                datas.value = await response.json();
                data.value = datas.value.MinimumPropertyInfos[0];
                console.log(data.value);
                formData.muni = data.value.Municipality;
                console.log(data.value.Strap);
                formData.folio = data.value.Strap;

                checkV.value = formData.folio;
                checkMB.value = checkV.value.substring(1, 2);
                console.log(checkMB.value);
            } catch (err) {
                error.value = err.message;
            } finally {
                loading.value = false;
            }
        };
        const onSubmit = async () => {
            procReceive(formData);
        };

        const navigateNext = () => {
            router.push('/roofsystem');
            // router.push('/map');
        };

        function addItemAndClear(formdt, permType) {
            formdt = formData;
            permType = selectedApplication.value;
            console.log(formdt);
            if (formdt.length === 0) {
                return;
            }
            // muniProcess.value
            store.addSystem(formdt, permType, checkMB.value, muniProcess.value, muniProcessdata.value);

            console.log(store);
            // area.value = '';
            // type.value = '';
        }

        return {
            isDialog,
            fetchData,
            onSubmit,
            accountUsers,
            getUser,
            email,
            dba,
            invoke,
            phone,
            name,
            licenseStatus,
            muniProcess,
            addUser,
            navigateNext,
            addItemAndClear,
            selectedApplication,
            type,
            resNum,

            ...toRefs(formData),
            responseMessage,
            lastNum,
            useLast,
            load,
            checkMB,
            checkV,
            content
        };
    }
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
                                <InputText id="addr" v-tooltip.top="'Make sure that either street or avenue is spelled out, direction could be shorten (sw)'" type="text" v-model="address" placeholder="address" />
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
                                <label for="phone" style="color: #122620">Cell Phone Number</label>
                                <InputMask v-model="phone" mask="(999) 999-9999" />
                                <!-- placeholder="(999) 999-9999" :invalid="phone === ''" -->
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="Email" style="color: #122620">Email</label>
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
