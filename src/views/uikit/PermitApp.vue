<script>
import useLast from '@/composables/lastNumber.js';
import useProcess from '@/composables/process.js';
import usecreateProcessnumber from '@/composables/use-createProcessnumber';
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { tryOnMounted, useToNumber } from '@vueuse/core';
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import { invoke } from '@vueuse/core';
import AOS from 'aos';
const a = ref(1);

export default {
    setup() {
        const loading = ref(false);
        const responseMessage = ref('');
        const router = useRouter();
        const isDialog = ref(false);
        const content = ref();

        const { procData, procReceive } = usecreateProcessnumber();
        const { accountUsers, getUser, addUser } = useGlobalState();
        console.log(accountUsers._value[0]);

        // const selectedApplication = ref();

        const type = ref([
            { name: 'Roofing Permit', code: 'RP' },
            { name: 'Doors Permit', code: 'DP' },
            { name: 'Windows Permit', code: 'WP' }
        ]);

        const prefix = ref('me');
        const store = usePermitappStore();
        const muniProcess = ref('');
        const formData = reactive({
            address: '',
            muni: '',
            license: '',
            folio: '',
            contractor: '',
            permit: '',
            processNumber: '',
            // phone: '',
            // email: '',
            date: new Date()
        });
        const cccValid = ref(true);
        const contractor = ref('');
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
        tryOnMounted(() => {
            if (accountUsers._value[0].name === '') {
                return router.push('/');
            } else {
                isDialog.value = true;
                contractor.value = accountUsers._value[0].name;
                email.value = accountUsers._value[0].email;
                phone.value = accountUsers._value[0].phone;
                licenseStatus.value = accountUsers._value[0].secondary_status;

                dba.value = accountUsers._value[0].dba;
                // === '' ? accountUsers._value[0].bphone : accountUsers._value[0].cphone;
            }
            // defaultPermitType();
        });

        const selectedApplication = computed(() => {
            return cccValid.value === true ? type.value[0] : '';
        });

        const { pNum } = useProcess();
        const { lastNum, resNum } = useLast();
        // fix the phone error with if statement and validation
        phone.value = accountUsers._value[0].phone;
        const permitapp = ref(null);
        const checkMB = ref('');
        const checkV = ref('');

        onMounted(() => {
            isDialog.value = true;
        });

        // const defaultPermitType = async () => {
        //     const licenseType = accountUsers._value[0].license;
        //     console.log(accountUsers._value[0]);
        //     const slicedString = computed(() => licenseType.value.slice(0, 3));
        //     console.log(slicedString);
        //     if (licenseType.value.length !== 0 && slicedString === 'ccc') {
        //         selectedApplication.value = cccValid.value === true ? type.value[0] : '';
        //     }
        // };

        const load = async () => {
            try {
                loading.value = true;
                setTimeout(() => {
                    loading.value = false;
                }, 3000);
                // // const ftAddress = ref('3350 SW 23 ST')
                // permitStore.$state.permitapp[0]?.formdt?.processNumber || ''
                const addr = ref(formData.address);
                // const city = 'FT. FORT LAUDERDALE'
                const baseURL = 'https://www.miamidade.gov/Apps/PA/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetAddress&clientAppName=PropertySearch&myUnit=&from=1';
                // const baseBrowardURL = 'https://web.bcpa.net/BcpaClient/search.aspx/getParcelInformation'
                const url = `${baseURL}&myAddress=${encodeURIComponent(addr.value)}&to=200`;
                //  const url_ft = `${baseBrowardURL}&myCity${encodeURIComponent(city)}&myAddress=${encodeURIComponent(ftAddress.value)}&to=200`;
                const response = await fetch(url);
                // const resFtLauder await fetch(url_ft);

                const data = await response.json();
                console.log(data);

                formData.muni = data.MinimumPropertyInfos[0].Municipality;
                formData.license = accountUsers._value[0].license;
                formData.contractor = accountUsers._value[0].name;
                formData.folio = data.MinimumPropertyInfos[0].Strap;
                console.log(lastNum.value);
                let strLength = String(lastNum.value);
                // console.log(lastNum.value.length, lastNum.value, strLength);
                let newNumber = strLength.substring(2, 13);
                // formData.permit = selectedApplication.value;

                const number = useToNumber(newNumber);
                let addNumber = number.value + 1;
                let createStr = String(addNumber);
                formData.processNumber = prefix.value.concat(createStr);
                console.log(formData.processNumber);
                checkV.value = formData.folio;
                checkMB.value = checkV.value.substring(1, 2);
                console.log(checkMB.value);

                procReceive(formData);
                // if checkMB.value === 13 after number conversion disable shingle roof.

                // setTimeout(() => {
                //     loading.value = false;
                // }, 2000);
            } catch (error) {
                alert(error);
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

            if (formdt.length === 0) {
                return;
            }
            store.addSystem(formdt, permType, checkMB.value, muniProcess.value);

            console.log(store);
            // area.value = '';
            // type.value = '';
        }

        return {
            isDialog,

            onSubmit,
            accountUsers,
            getUser,
            email,
            dba,
            invoke,
            phone,
            contractor,
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
    <div class="container md:w-1/3" style="margin-left: 530px">
        <form>
            <div class="flex flex-row">
                <div class="flex mt-4 space-y-2 flex-col gap-2">
                    <div class="font-semibold text-xl" style="color: #122620; margin-left: 230px">Permit Application</div>
                    <div class="flex justify-center">
                        <Select v-model="selectedApplication" :options="type" showClear optionLabel="name" placeholder="Select a permit type" class="w-full md:w-56" style="margin-top: 30px" />
                    </div>
                    <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3" style="max-width: 200px; margin-left: 30px">
                        <label for="license" style="color: #122620">License Status</label>
                        <InputText id="license" v-model="licenseStatus" type="text" placeholder="name" />
                        <!-- <Message severity="error">Contractor Name Required</Message> -->
                    </div>
                    <!-- grid grid-cols-2 gap-4    flex mt-3 space-y-2 flex-col gap-2-->
                    <div class="flex mt-3 space-y-2 flex-col gap-2" style="margin-left: 30px">
                        <form class="md:w-3/4 grid grid-cols-2 gap-6" @submit="onSubmit">
                            <div class="flex flex-col mt-3 w-full w-64 space-y-2 grow basis-0 gap-4">
                                <label for="addr" style="color: #122620">Property Address</label>
                                <InputText id="addr" v-tooltip.top="'Make sure that either street or avenue is spelled out, direction could be shorten (sw)'" type="text" v-model="address" placeholder="address" />
                                <!-- v-if="!loading"  -->
                                <Button id="search" type="button" label="Search" class="w-2/3" style="background-color: #a4b5b9" raised icon="pi pi-search-plus" :loading="loading" @click="load" @input="createHtml" />

                                <!-- <i v-else class="pi pi-spin pi-spinner" style="font-size: 2rem"></i> -->

                                <!-- pi-search-plus -->
                                <!-- <Message severity="error">Property Address Required</Message> -->
                            </div>
                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-4">
                                <label for="processMuni" style="color: #122620">Municipality Process Number</label>
                                <InputText id="processMuni" v-model="muniProcess" type="text" placeholder="municipal process number" />
                            </div>

                            <div class="flex flex-col w-full md:w-72 mt-3 space-y-2 grow basis-0 gap-4">
                                <label for="dba" style="color: #122620">DBA </label>
                                <InputText id="dba" v-model="dba" type="text" placeholder="name" />
                                <!-- <Message severity="error">Contractor Name Required</Message> -->
                            </div>
                            <div class="flex flex-col w-full md:w-64 mt-3 space-y-2 grow basis-0 gap-4" style="margin-left: 55px">
                                <label for="contractor" style="color: #122620">Contractor Name</label>
                                <InputText id="contractor" v-model="contractor" type="text" placeholder="name" />
                                <!-- <Message severity="error">Contractor Name Required</Message> -->
                            </div>

                            <div class="flex flex-col mt-3 space-y-2 grow basis-0 gap-3">
                                <label for="phone" style="color: #122620">Cell Phone Number</label>
                                <InputMask v-model="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="phone === ''" />
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
    padding-bottom: 10px;
    /* padding-top: 12px; */
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 80px;
    margin-top: 20px;
    /* top: 10vh; */
}

.ql-container {
    height: calc(100% - 52px);
}
</style>
