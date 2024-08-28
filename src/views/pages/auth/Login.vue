<script setup>
// import useacctStore from '@/stores/loginStore';
import { useStorage } from '@vueuse/core';
// import { tryOnMounted } from '@vueuse/core';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, watch } from 'vue';
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
    email: '',
    expiration_date: '',
    name: '',
    projects: [],
    secondary_status: '',
    license: ''
});
// const dataStore = useacctStore();

// const { login } = storeToRefs(dataStore);

async function checkAu() {
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

function checkAuth() {
    localData.value.forEach((item, index) => {
        for (let i = 0; i < item.length; i++) {
            if (username.value === item[i].password) {
                acctCompare.value.push(item[i]);

                accountUser.email = item[i].email;
                accountUser.name = item[i].name;
                accountUser.expiration_date = item[i].expiration_date;
                accountUser.projects = item[i].projects;
                accountUser.secondary_status = item[i].secondary_status;
                accountUser.license = item[i].license;

                navigateNext();
            } else {
                visible.value = true;
            }
        }
        console.log(accountUser);
    });
}
const state = useStorage('accountUser', accountUser);
console.log(state.value);
function register() {
    router.push('/registration');
}

const navigateNext = () => {
    router.push('/dashboard');
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="card flex justify-center"></div>
                    <div>
                        <Button class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2" label="Click to Register" severity="secondary" raised style="margin-left: 150px" @click="register" />
                        <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                        <InputText id="username" type="text" placeholder="username" class="w-full md:w-[30rem] mb-8" v-model="username" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                        </div>
                        <!-- as="router-link" to="/roofsystem" @change="checkAu"-->
                        <Button label="Sign In" severity="contrast" class="w-full" @click="checkAu"></Button>
                    </div>
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
