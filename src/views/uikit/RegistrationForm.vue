<script>
import usecreateAccount from '@/composables/Authentication/use-createAccount';
import useRegAxios from '@/composables/Authentication/use-registrationAxios';
import { useAuthStore } from '@/stores/auth.js';
import { tryOnUnmounted } from '@vueuse/core';
import { jsPDF } from 'jspdf';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        // Use a ref for events (assuming contractors is returned as a ref)
        const events = ref([]);
        const authStore = useAuthStore();
        const { message } = storeToRefs(authStore);

        const router = useRouter();
        const disabled = ref(false);
        const isGmailValid = ref(false);
        // Define form data. Note: removed duplicate "password" and added "city".
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

        // Get the contractors from the registration Axios composable.
        const { cccAccounts, retrieveAccount, foundContrator } = useRegAxios();
        const dataLic = ref('');

        onMounted(() => {
            // Assuming contractors is a ref, assign its value to events.
        });

        const license_stat = ref('');
        const { Data, takp } = usecreateAccount();

        // onSubmit calls your account creation function, resets fields, then navigates.
        const onSubmit = async () => {
            if (!isFormValid.value) return; // safety net
            takp(formDatas);
            // Reset fields
            formDatas.license = '';
            formDatas.name = '';
            formDatas.license_status = '';
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
        function retriveContractor() {
            retrieveAccount(formDatas.license);

            events.value = cccAccounts;
            console.log('Contractors:', events.value);
            formDatas.dba = events.value.dba;
            formDatas.name = events.value.name;
            formDatas.expiration_date = events.value.expiration_date;
            formDatas.address = events.value.address;
            formDatas.city = events.value.city;
            formDatas.expiration_date = events.value.expiration_date;
            formDatas.license_status = events.value.license_status;
            license_stat.value = events.value.license_status;
            console.log(formDatas, license_stat.value);
            licenseStatus();
        }

        const isFormValid = computed(() => formDatas.license_status.trim() !== '' && formDatas.license_status.trim() !== 'I' && formDatas.email.trim() !== '');

        // Set the textual status based on the license secondary status.
        function licenseStatus() {
            if (license_stat.value === '') {
                formDatas.license_status = '';
            } else if (license_stat.value === 'A') {
                formDatas.license_status = 'Active';
            } else if (license_stat.value === 'I') {
                formDatas.license_status = 'Inactive';
            }
        }

        const navigateNext = () => {
            router.push('/');
        };

        const toast = useToast();
        const fileupload = ref();

        const upload = () => {
            if (fileupload.value && fileupload.value.upload) {
                fileupload.value.upload();
            }
        };

        const onUpload = () => {
            toast.add({
                severity: 'contrast',
                summary: 'Contrast',
                detail: 'File Uploaded',
                life: 3000
            });
        };

        // Dropdown items for state and city selections.
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

        // Selected values for dropdowns.
        const trades = ref(null);
        const dropdownItemstSelected = ref(null);
        const dropdownItemctSelected = ref(null);

        // Function to generate a PDF from the element with id "shingle".
        const generatePdf = () => {
            const element = document.getElementById('shingle');
            console.log('Element to capture:', element);
            if (!element) {
                console.error('Element with id "shingle" not found');
                return;
            }
            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
                const pdfBlob = pdf.output('blob');
                savePdfBlobSilently(pdfBlob);
            });
        };

        // // Save the generated PDF using the File System Access API.
        const savePdfBlobSilently = async (blob) => {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: 'permitapp.pdf',
                    types: [
                        {
                            description: 'PDF file',
                            accept: { 'application/pdf': ['.pdf'] }
                        }
                    ]
                });
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
                console.log('PDF saved successfully without popping download dialog!');
            } catch (error) {
                console.error('Error saving file:', error);
            }
        };

        // When the component unmounts, generate the PDF.
        tryOnUnmounted(() => {
            generatePdf();
            console.log('Component unmounted: PDF generated.');
        });

        return {
            formDatas,
            ...toRefs(formDatas),
            disabled,
            navigateNext,
            authStore,
            message,
            isFormValid,
            trade,
            trades,
            onSubmit,
            onUpload,
            upload,
            retriveContractor,
            dropdownItemCt,
            dropdownItemSt,
            dropdownItemct: dropdownItemctSelected,
            dropdownItemst: dropdownItemstSelected,
            generatePdf
        };
    }
};
</script>
<template>
    <form class="container md:w-2/3" @submit.prevent="onSubmit" style="margin-left: 350px; margin-top: 50px">
        <!-- grid h-56 grid-cols-3 content-start gap-4 flex flex-col w-64 space-y-2 gap-4... -->
        <div class="h-[10rem]"></div>
        <div class="grid h-56 grid-cols-3 content-start gap-4" style="margin-left: 50px; margin-top: 50px; margin-right: 40px">
            <div class="font-semibold text-xl">Contractor Information</div>
            <div class="flex flex-col gap-4">
                <label for="lic1" style="color: #122620">State of Florida License No.</label>
                <!-- :invalid="formDatas.license === ''" -->
                <InputText v-tooltip="'Enter your license and hit tab'" type="text" v-model="formDatas.license" placeholder="CRC000000" @change="checkLicense" :invalid="formDatas.license === ''" @keydown.tab="retriveContractor" />
            </div>
            <div class="flex flex-wrap gap-2">
                <label for="trade" style="color: #122620">Trade</label>
                <Select id="trad" v-model="trades" :options="trade" optionLabel="name" placeholder="Select One" class="w-full"></Select>
            </div>
            <div class="flex flex-col gap-2">
                <label for="dba" style="color: #122620">DBA</label>
                <InputText id="dba" type="text" v-model="formDatas.dba" placeholder=" " :invalid="formDatas.dba === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="name" style="color: #122620">Qualifier Name</label>
                <InputText id="name" type="text" v-model="formDatas.name" placeholder=" " :invalid="formDatas.name === ''" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="secondary_status" style="color: #122620">License Status</label>
                <InputText id="secondary_status" type="text" v-model="formDatas.license_status" placeholder=" " :invalid="formDatas.license_status === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="license" style="color: #122620">License Expiration Date</label>
                <InputText id="license" type="text" v-model="formDatas.expiration_date" placeholder=" " :invalid="formDatas.expiration_date === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="license" style="color: #122620">Insurance Policy Number</label>
                <InputText id="license" type="text" v-model="formDatas.insurance" placeholder=" " :invalid="formDatas.insurance === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="license" style="color: #122620">Insurance Carrier</label>
                <InputText id="license" type="text" v-model="formDatas.carrier" placeholder=" " :invalid="formDatas.carrier === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="username" style="color: #122620">User Name</label>
                <InputText id="username" type="text" v-model="formDatas.username" placeholder="user name" :invalid="formDatas.username === ''" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="fname" style="color: #122620">Password</label>
                <Password v-model="formDatas.password" :invalid="formDatas.pasword === ''">
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
            </div>
        </div>
        <div class="h-[10rem]"></div>
        <!-- <div class="font-semibold text-xl" style="margin-left: 50px">Contact Info</div> -->
        <div class="grid h-64 grid-cols-3 content-around gap-12 ..." style="margin-left: 250px; margin-right: 40px">
            <!-- class="flex flex-col grow basis-0 gap-3" -->
            <div class="flex flex-col gap-4">
                <label for="addr" style="color: #122620">Business Address</label>
                <InputText id="addr" type="text" v-model="formDatas.address" placeholder="address" />
            </div>
            <!-- class="flex flex-col grow basis-1 gap-3" -->
            <div class="flex flex-col gap-4">
                <label for="state" style="color: #122620">City</label>
                <!-- <Select id="state" v-model="dropdownItemct" :options="dropdownItemCt" optionLabel="name" placeholder="Select One" class="w-full"></Select> -->
                <InputText id="city" type="text" v-model="formDatas.city" placeholder="city" />
            </div>
            <!-- class="flex flex-wrap gap-2 w-full" -->
            <div class="flex flex-col gap-4">
                <label for="state" style="color: #122620">State</label>
                <Select id="state" v-model="dropdownItemst" :options="dropdownItemSt" optionLabel="name" placeholder="Select One" class="w-full"></Select>
            </div>
            <!-- class="flex flex-col grow basis-0 gap-3" -->
            <div class="flex flex-col gap-4">
                <label for="bphone" style="color: #122620">Business Phone</label>
                <InputMask v-model="formDatas.bphone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="formDatas.bphone === ''" />
                <!-- <InputMask id="bphone" v-model="formDatas.phone" mask="000-000-0000" placeholder="000-000-0000" /> -->
            </div>
            <div class="flex flex-col gap-4">
                <label for="cphone" style="color: #122620">Cell Phone Number</label>
                <InputMask v-model="formDatas.cphone" mask="(999) 999-9999" placeholder="(999) 999-9999" :invalid="formDatas.cphone === ''" />
            </div>
            <div class="flex flex-col gap-4">
                <label for="email1" style="color: #122620">Gmail account</label>
                <InputText v-tooltip="'Enter your gmail account in order to submit'" id="email1" v-model="formDatas.email" type="text" placeholder="email" :invalid="formDatas.email === ''" />
            </div>
        </div>

        <div class="md:w-1/4 flex justify-center flex-wrap gap-4" style="margin-left: 50px">
            <Button label="Submit" severity="contrast" raised @click="onSubmit" :disabled="!isFormValid" />
            <!-- <NewButton :isActive="MiamiBC" @click="checkValue">Check</NewButton> -->
        </div>

        <div class="md:w-2/3 flex flex-col gap-2" style="margin-top: 120px">
            <label for="addr" style="color: #122620">Upload Insurance Information</label>
            <Toast />
            <file-saver class="w-2/3"></file-saver>
        </div>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
    <!-- </div> -->
    <!-- </Fluid> -->
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
    background-color: #eae7e2;
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
