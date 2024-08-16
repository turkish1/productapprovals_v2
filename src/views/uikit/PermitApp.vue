<script>
// import useinputValid from '@/composables/input.js';
import useLast from '@/composables/lastNumber.js';
import useProcess from '@/composables/process.js';
import DataService from '@/services/DataService';
import { usePermitappStore } from '@/stores/permitapp';
import { reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const responseMessage = ref('');
        const router = useRouter();
        const store = usePermitappStore();
        const formData = reactive({
            address: '',
            muni: '',
            folio: '',
            contractor: '',
            permit: '',
            processNumber: '',
            phone: '',
            email: '',
            date: new Date()
        });

        const loading = ref(false);

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
            formData.processNumber = pNum.value;

            setTimeout(() => {
                loading.value = false;
            }, 2000);
        };
        const { pNum } = useProcess();
        const { lastNum, resNum } = useLast();

        const onSubmit = async () => {
            await DataService.postProcessnumber(formData.processNumber)

                .then((response) => {
                    responseMessage.value = 'Form submitted successfully!';
                    console.log('Response:', response.data);

                    // value = '';
                })
                .catch((error) => {
                    responseMessage.value = 'An error occurred while submitting the form.';
                    console.error('Error:', error);
                });
        };
        // const { isValid, inp, iValid, uValid } = useinputValid();
        const selectedApplication = ref();

        const type = ref([
            { name: '', code: ' ' },
            { name: 'Roofing Permit', code: 'RP' },
            { name: 'Doors Permit', code: 'DP' },
            { name: 'Windows Permit', code: 'WP' }
        ]);
        const navigateNext = () => {
            router.push('/generalpage');
        };

        function addItemAndClear(formdt, permType) {
            formdt = formData;
            permType = selectedApplication.value;
            if (formdt.length === 0) {
                return;
            }
            store.addSystem(formdt, permType);
            // area.value = '';
            // type.value = '';
            console.log(formdt, permType, 'System added');
        }

        return {
            onSubmit,
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
            load
        };
    }
};
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4" style="margin-left: 320px">
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
                                            <label for="addr">Property Address</label>
                                            <InputText id="addr" type="text" v-model="address" placeholder="address" />
                                            <Button v-if="!loading" type="button" label="Search" severity="contrast" icon="pi pi-search-plus" :loading="loading" @click="load" />

                                            <i v-else class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>

                                            <!-- pi-search-plus -->
                                            <!-- <Message severity="error">Property Address Required</Message> -->
                                        </div>
                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="contractor">Contractor Name</label>
                                            <InputText id="zip" v-model="contractor" type="text" placeholder="name" />
                                            <!-- <Message severity="error">Contractor Name Required</Message> -->
                                        </div>
                                        <!-- <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="phone">Phone Number</label>
                                            <InputText id="phone" v-model="phone" type="text" placeholder="000-000-0000" />
                                            <Message severity="error">Phone Required</Message>
                                        </div> -->
                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="phone">Cell Phone Number</label>
                                            <InputMask v-model="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="phone === ''" />
                                        </div>

                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="Email">Email</label>
                                            <!-- label="Email" type="email" v-model="email"  id="email1" v-model="email" :error="emailError" type="text"-->
                                            <InputText v-model="email" :invalid="email === null" />
                                            <!-- <Message v-if="invalid" severity="error">Email is required</Message> @click="navigateNext"-->
                                        </div>
                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="muni">Municipality</label>
                                            <InputText id="muni" v-model="muni" type="text" placeholder="municipality" />
                                        </div>
                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="folio">Folio</label>
                                            <InputText id="folio" v-model="folio" type="text" placeholder="folio" @input="updatemEProcess" />
                                        </div>

                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="permit">Master Permit</label>
                                            <InputText id="permit" v-model="permit" type="text" placeholder="20000000" />
                                        </div>
                                        <div class="flex flex-col grow basis-0 gap-3">
                                            <label for="processnum">mEProcess Number</label>
                                            <InputText id="processnum" v-model="processNumber" type="text" placeholder="process number" />
                                        </div>

                                        <br />
                                        <Button type="submit" label="Submit" severity="contrast" raised as="router-link" to="/generalpage" @click="addItemAndClear(formData, selectedApplication)" />
                                    </form>
                                    <p v-if="responseMessage">{{ responseMessage }}</p>
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
