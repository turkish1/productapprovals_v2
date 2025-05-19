<script setup>
import { useGoogleAuth } from '@/composables/Authentication/useGoogleAuth.js';
import { useGlobalState } from '@/stores/accountsStore';
import { useAuthStore } from '@/stores/auth';

import { reactive, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const { accessToken, idPayload, signIn, signOut, localData, acctUser } = useGoogleAuth();

const checked = ref(false);
const router = useRouter();
const visible = ref(false);

const acctCompare = ref([]);
const store = useAuthStore();
const emailCheck = ref([]);

let accountUser = reactive({
    dba: '',
    email: '',
    cphone: '',
    bphone: '',
    expiration_date: '',
    name: '',
    projects: [],
    secondary_status: '',
    license: '',
    phone: ''
});

const { getUser } = useGlobalState();
const checkAuth = () => {
    // function checkAuth() {
    console.log(getUser);
    localData.value.forEach((item, index) => {
        for (let i = 0; i < item.length; i++) {
            if (accessToken.value) {
                console.log(item[i].bphone);
                acctCompare.value.push(item[i]);
                accountUser.phone = item[i].bphone;
                callNavigate();
            }
        }
    });
};

function callNavigate() {
    navigateNext();
    // console.log('Line 57: callNavigate');
}

function navigateNext() {
    router.push('/permitapp');
}
watch(checkAuth, () => {});
watchEffect(() => {
    if (accessToken.value) {
        // Example: list 10 newest messages
        fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=4', { headers: { Authorization: `Bearer ${accessToken.value}` } })
            .then((r) => r.json())
            .then(console.log);
    }
});
</script>

<template>
    <div class="relative w-full h-screen overflow-hidden">
        <div class="relative z-10 flex items-center justify-center h-full bg-black/50">
            <!-- <div id="content" class="flex items-center justify-center min-h-screen min-w-full overflow-hidden"> -->
            <div style="border-radius: 20px; padding: 0.5rem">
                <div class="container w-full py-15 px-8 sm:px-2">
                    <!-- <Button label="Click to Register" severity="secondary" raised style="margin-left: 10px; margin-bottom: 20px" @click="register" /> -->
                    <div>
                        <Button class="p-button hover:bg-blue text-black" @click="signIn" @change="checkAuth" severity="Info" raised @input="email">Sign in with Google</Button>
                        <Button v-if="accessToken" @click="signOut">Sign out</Button>
                        <!-- <button id="googleBtn"></button> -->
                    </div>
                </div>

                <pre v-if="idPayload">{{ idPayload }}</pre>
            </div>
        </div>
    </div>
</template>
<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}
.container {
    padding-bottom: 10px;

    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 100px;
    margin-top: 20px;
    /* background-color: #eae7e2; */
}
#content {
    background-position: center; /* Centers the image */
    background-repeat: no-repeat; /* Prevents the image from repeating */
    background-size: cover;
    top: 0;
    left: 0;
    /* width: 80%; */
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

.p-button {
    color: black;
    background: transparent;
    border: transparent;
}
</style>
<!-- @/composables/Authentication/useGoogleAuth.js -->
