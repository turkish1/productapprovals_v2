<script setup>
// import vIntersection from '@/views/pages/vIntersection.vue';
import { useGoogleAuth } from '@/composables/Authentication/useGoogleAuth';
import { useGlobalState } from '@/stores/accountsStore';
import { useAuthStore } from '@/stores/auth';
import { useAxios } from '@vueuse/integrations/useAxios';
import AOS from 'aos';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const { user, loading, error, signOut } = useGoogleAuth();
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

/**
 * Holds the decoded JWT payload returned by Google.
 * Type can be refined if needed (e.g., { name: string; email: string; picture: string; … }).
 */
const users = ref(null);
const googleBtn = ref(null);

function handleCredentialResponse(response) {
    // Google returns a JWT in response. Decode payload to get users info.
    try {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        users.value = payload;
        console.info('Google JWT payload →', payload);
    } catch (err) {
        console.error('Failed to parse Google credential:', err);
    }
}

function handleLogout() {
    users.value = null;
    /* global google */
    if (typeof google !== 'undefined') {
        // Prevent automatic sign‑in on page refresh.
        google.accounts.id.disableAutoSelect();
    }
}

onMounted(() => {
    /* global google */
    if (typeof google === 'undefined') {
        console.error('Google Identity Services script not loaded. Make sure the <script> tag is present.');
        return;
    }

    google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(googleBtn.value, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        width: 240
    });

    // Display the One Tap prompt (optional)
    google.accounts.id.prompt();
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
    <FloatingConfigurator />

    <div id="content" class="flex items-center justify-center min-h-screen min-w-full overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div data-aos="flip-up" data-aos-duration="1000">
                <div style="border-radius: 56px; padding: 0.3rem">
                    <div class="container w-full py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <!-- <div>
                            <Button label="Click to Register" severity="secondary" raised style="margin-left: 150px" @click="register" />

                             <label style="color: black" for="username" class="block text-surface-900 dark:text-surface-0 text-black text-xl font-medium mb-2">Username</label>
                            <InputText id="username" type="text" placeholder="username" class="w-full md:w-[30rem] mb-8" v-model="username" :error="userError" />

                            <label style="color: black" for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
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
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-contrast">Forgot password?</span>
                            </div>

                            <Button id="singin" class="w-1/3" data-testid="SignIn" label="Sign In" severity="secondary" @click="submit" raised @keyup.enter="submit" />
                        </div> -->
                        <div v-if="loading">Loading…</div>
                        <div v-else-if="!users">
                            <!-- Place the Google Sign‑In button here -->
                            <div id="googleSignInDiv"></div>
                        </div>
                        <div v-else>
                            <p>Welcome, {{ users.name }} ({{ users.email }})</p>
                            <img :src="users.picture" alt="avatar" />
                            <button @click="signOut">Sign Out</button>
                        </div>
                        <div v-if="error" class="error">Error: {{ error.message }}</div>
                        <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                            <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Sign in</h1>

                            <!-- Google Sign‑In button will be rendered into this element -->
                            <div ref="googleBtn"></div>

                            <p v-if="users" class="mt-6 text-center text-gray-700 dark:text-gray-200">
                                Welcome, <span class="font-semibold">{{ users.given_name }}</span
                                >!
                                <button @click="handleLogout" class="ml-2 text-sm underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500">Logout</button>
                            </p>
                        </div>
                        <div v-if="loading">Loading…</div>
                        <div v-else-if="!user">
                            <!-- Place the Google Sign‑In button here -->
                            <div id="googleSignInDiv"></div>
                        </div>
                        <div v-else>
                            <p>Welcome, {{ user.name }} ({{ user.email }})</p>
                            <img :src="user.picture" alt="avatar" />
                            <button @click="signOut">Sign Out</button>
                        </div>
                        <div v-if="error" class="error">Error: {{ error.message }}</div>
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
    /* top: 10vh; */
}
#content {
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents the image from repeating */
    background-size: cover;
    top: 0;
    left: 0;
    width: 90%;
    height: 100%;
    /* Semi-transparent background for blending */
    background-color: rgba(0, 0, 0, 0);
    /* mix-blend-mode: difference; Blending mode for overlay */
    display: flex;
    align-items: center;
    justify-content: center;
}
.pi-eye-slash {
    transform: scale(1.1);
    margin-right: 1rem;
}
.error {
    color: red;
    margin-top: 1em;
}
</style>
@/composables/Authentication/useGoogleAuth
