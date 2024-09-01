<script>
import Drop from '@/components/DropZone/Drop.vue';
import usecreateAccount from '@/composables/Authentication/use-createAccount';
// import useGlobalState from '@/composables/Authentication/use-createAccount';
// import { useGlobalState } from '@/stores/accountsStore';
import useRegAxios from '@/composables/Authentication/use-registrationAxios';
import { useAuthStore } from '@/stores/auth.js';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        let events = reactive({});
        const { authStore } = useAuthStore();
        const { message } = storeToRefs(authStore);

        const router = useRouter();
        let disabled = ref(false);

        let formDatas = reactive({
            license: '',
            dba: '',
            name: '',
            username: '',
            password: '',
            secondary_status: '',
            expiration_date: '',
            address: '',
            projects: [],
            password: '',
            cphone: '',
            phone: '',
            email: '',
            date: new Date()
        });
        const { contractors } = useRegAxios();

        // const contractStore = usecccStore();
        // let contractor = ref(contractStore);

        onMounted(() => {
            events = contractors;
            console.log(events);
        });

        const { Data, takp } = usecreateAccount();
        const onSubmit = async () => {
            takp(formDatas);
            formDatas.license = '';
            formDatas.name = '';
            formDatas.secondary_status = '';
            (formDatas.dba = ''), (formDatas.username = ''), (formDatas.password = ''), (formDatas.address = ''), (formDatas.cphone = ''), (formDatas.phone = ''), (formDatas.email = ''), (formDatas.insurance = ''), (formDatas.carrier = '');
            navigateNext();
        };
        function checkLicense() {
            events.value.forEach((item) => {
                // CRC002120 CRC026270

                // const current = Date.now();
                if (formDatas.license === item.alt_license) {
                    (formDatas.dba = item.DBA), (formDatas.name = item.name), (formDatas.secondary_status = item.secondary_status), (formDatas.expiration_date = item.expiration_date), (formDatas.address = item.address1);
                }
                if (formDatas.value.secondary_status !== 'A') {
                    console.log('Not active', formDatas.value.secondary_status);
                    alert('License is not Activite ');
                    disabled = true;
                }
                // if (item.expiration_date < current) {
                //     console.log('Expired');
                //     alert('Expired License');
                //     disabled = true;
                // }
            });
        }
        const navigateNext = () => {
            router.push('/');
        };

        const toast = useToast();
        const fileupload = ref();

        const upload = () => {
            fileupload.value.upload();
        };

        const onUpload = () => {
            toast.add({ severity: 'constrast', summary: 'Contrast', detail: 'File Uploaded', life: 3000 });
        };
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

        const trades = ref(null);
        const dropdownItemst = ref(null);
        const dropdownItemct = ref(null);

        return {
            formDatas,
            ...toRefs(formDatas),
            disabled,
            navigateNext,
            authStore,
            message,
            checkLicense,
            trade,
            trades,
            onSubmit,
            onUpload,
            onMounted,
            upload,
            dropdownItemCt,
            dropdownItemSt,
            dropdownItemct,
            dropdownItemst
        };
    }
};
</script>

<template>
    <form class="container w-1/2" @submit.prevent="onSubmit" style="margin-left: 300px">
        <div class="card flex flex-col gap-7">
            <div class="font-semibold text-xl">Contractor Information</div>
            <div class="flex flex-col gap-2">
                <label for="lic1">State of Florida License No.</label>

                <InputText type="text" v-model="formDatas.license" placeholder="CRC000000" :invalid="formDatas.license === ''" @input="checkLicense" />
            </div>
            <div class="flex flex-wrap gap-2">
                <label for="trade">Trade</label>
                <Select id="trad" v-model="trades" :options="trade" optionLabel="name" placeholder="Select One" class="w-full"></Select>
            </div>
            <div class="flex flex-col gap-2">
                <label for="dba">DBA</label>
                <InputText id="dba" type="text" v-model="formDatas.dba" placeholder=" " :invalid="formDatas.dba === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="name">Qualifier Name</label>
                <InputText id="name" type="text" v-model="formDatas.name" placeholder=" " :invalid="formDatas.name === ''" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="secondary_status">License Status</label>
                <InputText id="secondary_status" type="text" v-model="formDatas.secondary_status" placeholder=" " :invalid="formDatas.secondary_status === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="license">License Expiration Date</label>
                <InputText id="license" type="text" v-model="formDatas.expiration_date" placeholder=" " :invalid="formDatas.expiration_date === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="license">Insurance Policy Number</label>
                <InputText id="license" type="text" v-model="formDatas.insurance" placeholder=" " :invalid="formDatas.expiration_date === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="license">Insurance Carrier</label>
                <InputText id="license" type="text" v-model="formDatas.carrier" placeholder=" " :invalid="formDatas.expiration_date === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="username">User Name</label>
                <InputText id="username" type="text" v-model="formDatas.username" placeholder="user name" :invalid="formDatas.username === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="fname">Password</label>
                <Password v-model="formDatas.password">
                    <template #header>
                        <div class="font-semibold text-xm mb-4">Pick a password</div>
                    </template>
                    <template #footer>
                        <Divider />
                        <ul class="pl-2 ml-2 my-0 leading-normal">
                            <li>At least one lowercase</li>
                            <li>At least one uppercase</li>
                            <li>At least one numeric</li>
                            <li>Minimum 8 characters</li>
                        </ul>
                    </template>
                </Password>

                <div class="font-semibold text-xl">Contact Info</div>
                <div class="flex flex-wrap gap-4">
                    <div class="flex flex-col grow basis-0 gap-3">
                        <label for="addr">Business Address</label>
                        <InputText id="addr" type="text" v-model="formDatas.address" placeholder="address" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="state">City</label>
                        <Select id="state" v-model="dropdownItemct" :options="dropdownItemCt" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="state">State</label>
                        <Select id="state" v-model="dropdownItemst" :options="dropdownItemSt" optionLabel="name" placeholder="Select One" class="w-full"></Select>
                    </div>

                    <div class="flex flex-col grow basis-0 gap-3">
                        <label for="bphone">Business Phone</label>
                        <InputMask v-model="formDatas.bphone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="formDatas.bphone === ''" />
                        <!-- <InputMask id="bphone" v-model="formDatas.phone" mask="000-000-0000" placeholder="000-000-0000" /> -->
                    </div>
                    <div class="flex flex-col grow basis-0 gap-3">
                        <label for="cphone">Cell Phone Number</label>
                        <InputMask v-model="formDatas.cphone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="formDatas.cphone === ''" />
                    </div>
                    <div class="flex flex-col grow basis-0 gap-3">
                        <label for="email1">Email</label>
                        <InputText id="email1" v-model="formDatas.email" type="text" placeholder="email" :invalid="formDatas.email === ''" />
                    </div>
                </div>
                <div class="card md:w-1/4 flex justify-center flex-wrap gap-4">
                    <Button label="Submit" severity="contrast" raised @click="onSubmit" :disabled="disabled" />
                    <!-- <NewButton :isActive="MiamiBC" @click="checkValue">Check</NewButton> -->
                </div>
            </div>
            <div class="flex flex-col items-center gap-2">
                <span class="text-xl font-medium">Scroll Down</span>
                <span class="slidedown-icon h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
                    <i class="pi pi-arrow-down" />
                </span>
            </div>

            <div class="card md:w-1/3 flex flex-col gap-3">
                <label for="addr">Upload Insurance Information</label>
                <Toast />
                <Drop />
                <!-- <FileUpload ref="fileupload" mode="basic" name="demo[]" url="http://localhost:8080/upload" accept="*" :maxFileSize="10000000000" @upload="onUpload" />
                <Button label="Upload" @click="upload" severity="contrast" :disabled="disabled" /> -->
            </div>
        </div>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
    <!-- </div> -->
    <!-- </Fluid> -->
</template>
<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 600px;
    min-width: 400px;
    top: 10vh;
}
@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }

    100% {
        transform: translateY(0);
    }
}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
</style>
