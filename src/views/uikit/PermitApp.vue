<script>
// import useinputValid from '@/composables/input.js';
import useLast from '@/composables/lastNumber.js';
import useProcess from '@/composables/process.js';
import usecreateProcessnumber from '@/composables/use-createProcessnumber';
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { tryOnMounted, useToNumber } from '@vueuse/core';

import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// import useaccountStore from '@/stores/accountStore';

import { invoke } from '@vueuse/core';
import AOS from 'aos';
const a = ref(1);

export default {
    setup() {
        const responseMessage = ref('');
        const router = useRouter();
        const isDialog = ref(false);
        const content = ref();

        const { procData, procReceive } = usecreateProcessnumber();
        const { accountUsers, getUser, addUser } = useGlobalState();
        console.log(accountUsers._value[0]);

        const prefix = ref('me');
        const store = usePermitappStore();
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
                console.log(accountUsers._value[0].phone);
                // === '' ? accountUsers._value[0].bphone : accountUsers._value[0].cphone;
            }
        });
        const pdfcleared = ref(false);
        const loading = ref(false);
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
        // const getData = reactive(accountinput);
        const load = async () => {
            try {
                const addr = ref(formData.address);
                const baseURL = 'https://www.miamidade.gov/Apps/PA/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetAddress&clientAppName=PropertySearch&myUnit=&from=1';

                const url = `${baseURL}&myAddress=${encodeURIComponent(addr.value)}&to=200`;
                const response = await fetch(url);
                loading.value = true;

                const data = await response.json();
                console.log(data);

                formData.muni = data.MinimumPropertyInfos[0].Municipality;
                formData.license = accountUsers._value[0].license;
                formData.contractor = accountUsers._value[0].name;
                formData.folio = data.MinimumPropertyInfos[0].Strap;
                console.log(lastNum.value);
                let strLength = String(lastNum.value);
                console.log(lastNum.value.length, lastNum.value, strLength);
                let newNumber = strLength.substring(2, 13);

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

                setTimeout(() => {
                    loading.value = false;
                }, 2000);
            } catch (error) {
                alert(error);
            }
        };

        const onSubmit = async () => {
            procReceive(formData);
        };

        const selectedApplication = ref();

        const type = ref([
            { name: 'Roofing Permit', code: 'RP' },
            { name: 'Doors Permit', code: 'DP' },
            { name: 'Windows Permit', code: 'WP' }
        ]);
        const navigateNext = () => {
            router.push('/roofsystem');
        };

        function addItemAndClear(formdt, permType) {
            formdt = formData;
            permType = selectedApplication.value;
            if (formdt.length === 0) {
                return;
            }
            store.addSystem(formdt, permType, checkMB.value);
            // area.value = '';
            // type.value = '';

            console.log(formdt, permType, checkMB.value, 'System added');
        }

        invoke(async () => {
            // await until(pdfcleared).changed();
        });

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
    <!-- <div id="permitapp" ref="permitapp" class="flex flex-col md:flex-row gap-2" style="margin-left: 220px; background-color: #eae7e2"> -->
    <PermitInitalAgreement v-if="isDialog" />
    <div class="md:w-3/4">
        <!-- <div class="card flex flex-col gap-4"> background-color: #eae7e2 -->
        <div class="container md:w-3/4" style="margin-left: 220px">
            <form>
                <!-- style="background-color: #eae7e2" -->
                <div class="row">
                    <!-- style="background-color: #eae7e2" -->
                    <div class="card flex flex-col gap-1">
                        <div class="font-semibold text-xl">Permit Application</div>
                        <!-- style="background-color: #eae7e2" -->
                        <div class="card flex justify-center">
                            <Select v-model="selectedApplication" :options="type" showClear optionLabel="name" placeholder="Select a permit type" class="w-full md:w-56" />
                        </div>
                        <div class="flex flex-col mt-3 grow basis-0 gap-3" style="max-width: 300px">
                            <label for="license">License Status</label>
                            <InputText id="license" v-model="licenseStatus" type="text" placeholder="name" />
                            <!-- <Message severity="error">Contractor Name Required</Message> -->
                        </div>
                        <!-- style="background-color: #eae7e2" -->
                        <div class="card flex flex-col gap-2">
                            <!-- <div class="flex flex-wrap gap-2"> -->
                            <form class="w-3/4" @submit="onSubmit">
                                <div class="flex flex-col grow basis-0 gap-2">
                                    <label for="addr">Property Address</label>
                                    <InputText id="addr" v-tooltip.top="'Make sure that either street or avenue is spelled out, direction could be shorten (sw)'" type="text" v-model="address" placeholder="address" />

                                    <Button id="search" v-if="!loading" type="button" label="Search" class="w-1/3" style="background-color: #a4b5b9" raised icon="pi pi-search-plus" :loading="loading" @click="load" @input="createHtml" />

                                    <i v-else class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>

                                    <!-- pi-search-plus -->
                                    <!-- <Message severity="error">Property Address Required</Message> -->
                                </div>

                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="dba">DBA </label>
                                    <InputText id="dba" v-model="dba" type="text" placeholder="name" />
                                    <!-- <Message severity="error">Contractor Name Required</Message> -->
                                </div>
                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="contractor">Contractor Name</label>
                                    <InputText id="contractor" v-model="contractor" type="text" placeholder="name" />
                                    <!-- <Message severity="error">Contractor Name Required</Message> -->
                                </div>

                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="phone">Cell Phone Number</label>
                                    <InputMask v-model="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="phone === ''" />
                                </div>

                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="Email">Email</label>
                                    <InputText v-model="email" :invalid="email === null" :error="emailError" />
                                    <Message v-if="invalid" severity="error">Email is required</Message>
                                    <!-- @click="navigateNext" -->
                                </div>
                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="muni">Municipality</label>
                                    <InputText id="muni" v-model="muni" type="text" placeholder="municipality" />
                                </div>
                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="folio">Folio</label>
                                    <InputText id="folio" v-model="folio" type="text" placeholder="folio" @input="updatemEProcess" />
                                </div>

                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="permit">Master Permit</label>
                                    <InputText id="permit" v-model="permit" type="text" placeholder="20000000" />
                                </div>
                                <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                    <label for="processnum">mEProcess Number</label>
                                    <InputText id="processnum" v-model="processNumber" type="text" placeholder="process number" />
                                </div>

                                <p v-if="responseMessage">{{ responseMessage }}</p>
                                <!-- <Drop /> -->
                                <br />
                                <Button id="submit" type="submit" label="Submit" class="w-1/3" style="background-color: #a4b5b9" raised as="router-link" to="/roofsystem" @click="addItemAndClear(formData, selectedApplication)" @change="generatePdf" />
                            </form>
                            <!-- <MapBox /> -->
                            <br />

                            <div data-aos="fade-up-right" data-aos-delay="500">
                                <file-saver></file-saver>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- </div> -->
        </div>
    </div>
    <!-- </div> -->
</template>
<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 350px;

    top: 10vh;
}

.ql-container {
    height: calc(100% - 52px);
}
</style>
