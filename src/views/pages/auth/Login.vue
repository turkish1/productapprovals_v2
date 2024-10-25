<script setup>
import vIntersection from '@/views/pages/vIntersection.vue';

import { useGlobalState } from '@/stores/accountsStore';
import { useAuthStore } from '@/stores/auth';
import { useAxios } from '@vueuse/integrations/useAxios';
import AOS from 'aos';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const username = ref('');
const password = ref('');
const checked = ref(false);
const router = useRouter();
const visible = ref(false);
const localData = ref([]);
let Data = reactive({});
const acctCompare = ref([]);
let accountUser = reactive({
    dba: '',
    email: '',
    cphone: '',
    expiration_date: '',
    name: '',
    projects: [],
    secondary_status: '',
    license: ''
});
// const store = useLoginStore();
const store = useAuthStore();
// const { login } = storeToRefs(dataStore);
function clearSelected() {
    store.$reset();
}

onMounted(() => {
    AOS.init({
        duration: 800, // Animation duration in ms
        easing: 'ease-in-out', // Easing for animations
        once: true // Whether animation happens only once
    });
});

onMounted(clearSelected, () => {
    console.log(store.$reset);
});
async function submit() {
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/getaccounts';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    // const loginStore = useacctStore();
    // const username = ref('');

    let results = ref([]);
    results.value = execute().then((result) => {
        Data = data.value;

        for (const [key, value] of Object.entries(Data)) {
            localData.value.push(value);
        }
    });
}

watch(checkAuth, () => {});
const { accountUsers, getUser, addUser } = useGlobalState();
function checkAuth() {
    localData.value.forEach((item, index) => {
        for (let i = 0; i < item.length; i++) {
            if (username.value === item[i].password) {
                acctCompare.value.push(item[i]);
                console.log(item[i].dba, accountUser.dba, accountUser);
                accountUser.email = item[i].email;
                accountUser.name = item[i].name;
                accountUser.dba = item[i].dba;
                accountUser.phone = item[i].cphone;
                accountUser.expiration_date = item[i].expiration_date;
                accountUser.projects = item[i].projects;
                accountUser.secondary_status = item[i].secondary_status;

                accountUser.license = item[i].license;

                addUser(accountUser);
                navigateNext();
            }
        }

        console.log('UserData', accountUser);
    });
}

// const state = useStorage('accountUser', accountUser);
// console.log(state.value);
function register() {
    router.push('/registration');
}

const navigateNext = () => {
    router.push('/permitapp');
    // router.push('/permitapplication');
};
</script>

<template>
    <vIntersection />
    <FloatingConfigurator />
    <!-- bg-surface-50 dark:bg-surface-950 style="background-color: #eae7e2" -->
    <div id="content" class="flex items-center justify-center min-h-screen min-w-full overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <!--  var(--primary-color) rgba(33, 150, 243, 0) -->
            <div data-aos="flip-up" data-aos-duration="1000">
                <!-- #eae7e2 -->
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, 10%, 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px; background-image: url('./../../../src/assets/img/world.png')">
                        <!-- <div class="card flex justify-center"></div> -->
                        <div>
                            <Button class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2" label="Click to Register" raised style="background-color: #a4b5b9; margin-left: 150px" @click="register" />
                            <label style="color: whitesmoke" for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                            <InputText id="username" type="text" placeholder="username" class="w-full md:w-[30rem] mb-8" v-model="username" :error="userError" />

                            <label style="color: whitesmoke" for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <Password
                                id="password1"
                                v-tooltip.bottom="'Press Enter after value'"
                                v-model="password"
                                :error="errorMessage"
                                placeholder="Password"
                                :toggleMask="true"
                                class="mb-4"
                                @keyup.enter="submit"
                                fluid
                                :feedback="false"
                            ></Password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div>
                            <!-- as="router-link" to="/roofsystem" @change="checkAu"-->
                            <Button id="singin" data-testid="SignIn" label="Sign In" class="w-1/3" style="background-color: #a4b5b9" @click="submit" raised @keyup.enter="submit"></Button>
                        </div>
                    </div>
                    <pdfGen />
                </div>
            </div>
        </div>

        <Dialog v-model:visible="visible" maximizable modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <p class="m-0">Try another password Boris</p>
        </Dialog>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
