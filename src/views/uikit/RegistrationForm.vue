<script>
import usecreateAccount from '@/composables/Authentication/use-createAccount';
// import useGlobalState from '@/composables/Authentication/use-createAccount';
// import { useGlobalState } from '@/stores/accountsStore';
import useRegAxios from '@/composables/Authentication/use-registrationAxios';
import { useAuthStore } from '@/stores/auth.js';
import { tryOnUnmounted } from '@vueuse/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { onMounted, reactive, ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import FileSaver from '../../components/DropZone/upload/FileSaver.vue';

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
            bphone: '',
            email: '',
            date: new Date()
        });
        const { contractors } = useRegAxios();
        const dataLic = ref('');
        // const contractStore = usecccStore();
        // let contractor = ref(contractStore);

        onMounted(() => {
            events = contractors;
            console.log(events);
        });
        const license_stat = ref('');
        const { Data, takp } = usecreateAccount();
        const onSubmit = async () => {
            takp(formDatas);
            formDatas.license = '';
            formDatas.name = '';
            formDatas.secondary_status = '';
            formDatas.dba = '';
            formDatas.username = '';
            formDatas.password = '';
            formDatas.address = '';
            formDatas.cphone = '';
            formDatas.bphone = '';
            formDatas.email = '';
            formDatas.insurance = '';
            formDatas.carrier = '';
            navigateNext();
        };
        function checkLicense() {
            // if(events.value === '' || events.value === 'invalid'){}
            events.value.forEach((item) => {
                // CRC002120 CRC026270
                dataLic.value = formDatas.license.toUpperCase();

                // const current = Date.now();
                if (dataLic.value === item.alt_license) {
                    formDatas.dba = item.DBA;
                    formDatas.name = item.name;
                    formDatas.expiration_date = item.expiration_date;
                    formDatas.address = item.address1;
                    formDatas.city = item.city;
                    license_stat.value = item.secondary_status;
                    console.log(item.DBA, formDatas.dba);
                }
                licenseStatus();
                // if (formDatas.secondary_status !== 'A') {
                //     console.log('Not active', formDatas.secondary_status);
                // alert('License is not Activite ');
                // disabled = true;
                // }
                // if (item.expiration_date < current) {
                //     console.log('Expired');
                //     alert('Expired License');
                //     disabled = true;
                // }
            });
        }

        watch(licenseStatus, () => {});

        function licenseStatus() {
            if (license_stat.value === '') {
                formDatas.secondary_status = '';
            }
            if (license_stat.value === 'A') {
                formDatas.secondary_status = 'Active';
            }
            if (license_stat.value === 'I') {
                formDatas.secondary_status = 'Inactive';
            }
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
        const generatePdf = () => {
            const element = document.getElementById('shingle');
            console.log(element);
            // Use html2canvas to capture the element as a canvas
            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                // Create a new jsPDF instance
                const pdf = new jsPDF();

                // Add the captured image data to the PDF
                pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

                const pdfBlob = pdf.output('blob');

                // Save the PDF Blob using the File System Access API
                savePdfBlobSilently(pdfBlob);
            });

            const savePdfBlobSilently = async (blob) => {
                try {
                    // Use the File System Access API to request a file handle
                    const fileHandle = await window.showSaveFilePicker({
                        suggestedName: 'permitapp.pdf',
                        types: [
                            {
                                description: 'PDF file',
                                accept: {
                                    'application/pdf': ['.pdf']
                                }
                            }
                        ]
                    });

                    // Create a writable stream
                    const writable = await fileHandle.createWritable();

                    // Write the Blob data to the file
                    await writable.write(blob);

                    // Close the writable stream
                    await writable.close();

                    console.log('PDF saved successfully without popping download dialog!');
                } catch (error) {
                    console.error('Error saving file:', error);
                }
            };
        };
        tryOnUnmounted(generatePdf, () => {
            console.log('Called Unmounted');
        });
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
                    <div class="flex flex-col grow basis-1 gap-3">
                        <label for="state">City</label>
                        <!-- <Select id="state" v-model="dropdownItemct" :options="dropdownItemCt" optionLabel="name" placeholder="Select One" class="w-full"></Select> -->
                        <InputText id="city" type="text" v-model="formDatas.city" placeholder="city" />
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

            <div class="card md:w-1/3 flex flex-col gap-2">
                <label for="addr">Upload Insurance Information</label>
                <Toast />
                <file-saver class="w-2/3"></file-saver>
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
