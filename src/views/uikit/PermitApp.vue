<script>
// import useinputValid from '@/composables/input.js';
import Drop from '@/components/DropZone/Drop.vue';
import useLast from '@/composables/lastNumber.js';
import useProcess from '@/composables/process.js';
import usecreateProcessnumber from '@/composables/use-createProcessnumber';
import { useGlobalState } from '@/stores/accountStore';
import { usePermitappStore } from '@/stores/permitapp';
import { tryOnMounted, useToNumber } from '@vueuse/core';

import jsPDF from 'jspdf';
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// import useaccountStore from '@/stores/accountStore';
const a = ref(1);

export default {
    setup() {
        const responseMessage = ref('');
        const router = useRouter();
        const content = ref();
        const canvas = ref();
        const doc = ref();
        const { procData, procReceive } = usecreateProcessnumber();
        const { accountUsers, getUser, addUser } = useGlobalState();
        console.log(accountUsers._value[0].name);

        // watch(createHtml, () => {});
        // const useacctStore = useaccountStore();
        // const { accountinput } = storeToRefs(useacctStore);
        const prefix = ref('me');
        const store = usePermitappStore();
        const formData = reactive({
            address: '',
            muni: '',
            // licenseStatus: '',
            folio: '',
            // contractor: '',
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
        tryOnMounted(() => {
            if (accountUsers._value[0].name === '') {
                return router.push('/');
            } else {
                contractor.value = accountUsers._value[0].name;
                email.value = accountUsers._value[0].email;
                phone.value = accountUsers._value[0].phone;
                licenseStatus.value = accountUsers._value[0].secondary_status;
                console.log(email.value, contractor.value);
            }
        });
        const loading = ref(false);
        const { pNum } = useProcess();
        const { lastNum, resNum } = useLast();
        const permitapp = ref(null);
        const checkMB = ref('');
        const checkV = ref('');
        // const getData = reactive(accountinput);
        const load = async () => {
            const addr = ref(formData.address);
            const baseURL = 'https://www.miamidade.gov/Apps/PA/PApublicServiceProxy/PaServicesProxy.ashx?Operation=GetAddress&clientAppName=PropertySearch&myUnit=&from=1';

            const url = `${baseURL}&myAddress=${encodeURIComponent(addr.value)}&to=200`;
            const response = await fetch(url);
            loading.value = true;

            const data = await response.json();
            console.log(data);

            formData.muni = data.MinimumPropertyInfos[0].Municipality;

            formData.folio = data.MinimumPropertyInfos[0].Strap;
            let strLength = String(lastNum.value);
            console.log(lastNum.value.length, lastNum.value, strLength);
            let newNumber = strLength.substring(2, 13);

            const number = useToNumber(newNumber);
            let addNumber = number.value + 1;
            let createStr = String(addNumber);
            formData.processNumber = prefix.value.concat(createStr);
            console.log(formData.processNumber);
            checkV.value = formData.folio;
            checkMB.value = checkV.value.substring(0, 2);
            console.log(checkMB.value);

            procReceive(formData);
            // if checkMB.value === 13 after number conversion disable shingle roof.
            setTimeout(() => {
                loading.value = false;
            }, 2000);
        };

        const onSubmit = async () => {
            procReceive(formData);
            createHtml();
        };

        const selectedApplication = ref();

        const type = ref([
            { name: '', code: ' ' },
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

        function createHtml() {
            doc.value = new jsPDF();
            const html = html.$refs.permitapp.innerHTML;
            doc.value.fromHTML(html, 15, 15, {
                width: 150
            });
            doc.save('output.pdf');
            // content.value = permitapp.value;
            // canvas.value = html2canvas(content, {
            //     scale: 0.5,
            //     width: content.clientWidth / 160,
            //     height: content.clientHeith / 120
            // });

            // doc.value = new jsPDF('p', 'mm', 'a0');
            // doc.html(document.querySelector('#permitapp'), {
            //     callback: function (pdf) {
            //         pdf.saveGraphicState();
            //     }
            // });
            console.log(doc.value);
        }
        return {
            createHtml,
            onSubmit,
            accountUsers,
            getUser,
            email,
            phone,
            contractor,
            licenseStatus,
            addUser,
            navigateNext,
            addItemAndClear,
            selectedApplication,
            type,
            resNum,
            // updatemEProcess,
            ...toRefs(formData),
            responseMessage,
            lastNum,
            useLast,
            load,
            checkMB,
            checkV,
            content,
            canvas,
            doc
        };
    }
};
</script>

<template>
    <div id="permitapp" ref="permitapp" class="flex flex-col md:flex-row gap-4" style="margin-left: 220px">
        <div class="md:w-2/3">
            <!-- <div class="card flex flex-col gap-4"> -->
            <div class="container">
                <form>
                    <div class="row">
                        <div class="card flex flex-col gap-2">
                            <div class="font-semibold text-xl">Permit Application</div>
                            <div class="card flex justify-center">
                                <Select v-model="selectedApplication" :options="type" showClear optionLabel="name" placeholder="Select a permit type" class="w-full md:w-56" />
                            </div>

                            <div class="card flex flex-col gap-4">
                                <div class="flex flex-wrap gap-4">
                                    <form class="w-3/4" @submit="onSubmit">
                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                                <label for="license">License Status</label>
                                                <InputText id="license" v-model="licenseStatus" type="text" placeholder="name" />
                                                <!-- <Message severity="error">Contractor Name Required</Message> -->
                                            </div>
                                            <label for="addr">Property Address</label>
                                            <InputText id="addr" type="text" v-model="address" placeholder="address" />
                                            <Button v-if="!loading" type="button" label="Search" severity="contrast" icon="pi pi-search-plus" :loading="loading" @click="load" @input="createHtml" />

                                            <i v-else class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>

                                            <!-- pi-search-plus -->
                                            <!-- <Message severity="error">Property Address Required</Message> -->
                                        </div>
                                        <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                            <label for="contractor">Contractor Name</label>
                                            <InputText id="contractor" v-model="contractor" type="text" placeholder="name" />
                                            <!-- <Message severity="error">Contractor Name Required</Message> -->
                                        </div>
                                        <!-- <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="phone">Phone Number</label>
                                            <InputText id="phone" v-model="phone" type="text" placeholder="000-000-0000" />
                                            <Message severity="error">Phone Required</Message>
                                        </div> -->
                                        <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                            <label for="phone">Cell Phone Number</label>
                                            <InputMask v-model="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="phone === ''" />
                                        </div>

                                        <div class="flex flex-col mt-3 grow basis-0 gap-3">
                                            <label for="Email">Email</label>
                                            <!-- label="Email" type="email" v-model="email"  id="email1" v-model="email" :error="emailError" type="text"-->
                                            <InputText v-model="email" :invalid="email === null" />
                                            <!-- <Message v-if="invalid" severity="error">Email is required</Message> @click="navigateNext"-->
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

                                        <br />

                                        <Button type="submit" label="Submit" severity="contrast" raised as="router-link" to="/roofsystem" @click="addItemAndClear(formData, selectedApplication)" />
                                    </form>
                                    <p v-if="responseMessage">{{ responseMessage }}</p>
                                    <drop />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- </div> -->
            </div>
        </div>
    </div>
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
    /* min-width: 600px; */
    top: 10vh;
}

.ql-container {
    height: calc(100% - 52px);
}
</style>
