<template>
    <div class="card flex flex-col items-center overflow-hidden">
        <div class="flex flex-col items-center gap-2">
            <span class="text-xl font-medium">Scroll Down</span>
            <span class="animate-bounce h-8 w-8 bg-secondary text-secondary-contrast rounded-full inline-flex items-center justify-center">
                <i class="pi pi-arrow-down" />
            </span>
        </div>
        <div class="h-[30rem]"></div>
        <div class="flex flex-wrap justify-center gap-8">
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-left" data-aos-duration="1000">
                <div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-user !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Roofing</span>
                <span class="text-muted-color text-center">We provide roofing permit automation</span>
            </div>

            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-up" data-aos-duration="1000">
                <div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-spin pi-cog !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Windows and Doors </span>
                <span class="text-muted-color text-center">Soon to come </span>
            </div>

            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000">
                <div class="rounded-full bg-secondary text-secondary-contrast w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-align-justify !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Private Providers</span>
                <span class="text-muted-color text-center">Soon to come</span>
            </div>
        </div>
        <div class="h-[30rem]"></div>
        <div class="flex flex-wrap justify-center gap-8">
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="slide-up" data-aos-duration="1000">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" size="xlarge" />
                <span class="text-2xl font-medium">Boris Sursky</span>
                <span class="text-center">Creator and Founder.</span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="slide-down" data-aos-duration="1000">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" size="xlarge" />
                <span class="text-2xl font-medium">Hugo Blanco</span>
                <span class="text-center">Developer and co-Founder.</span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="slide-right" data-aos-duration="1000">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" size="xlarge" />
                <span class="text-2xl font-medium">Future Investor</span>
                <span class="text-center">Position to be filled.</span>
            </div>
        </div>
        <div class="h-[30rem]"></div>
        <div class="flex flex-wrap justify-center gap-8">
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000">
                <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">150K</span>
                <span class="text-2xl font-bold">Permits Issued</span>
                <span class="text-center">Number of permits accepted by cities.</span>
            </div>

            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000">
                <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span>
                <span class="text-2xl font-bold">Cost Saving</span>
                <span class="text-center">How much the city saved.</span>
            </div>

            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000">
                <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">14K</span>
                <span class="text-2xl font-bold">Time Saved in hours</span>
                <span class="text-center">The time cities now have to allocated to other projects.</span>
            </div>
        </div>
        <div class="h-[20rem]"></div>
        <div class="flex flex-wrap justify-center gap-8">
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000">
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-question-circle !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Support </span>
                <span class="text-center">Click here for support </span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-up" data-aos-duration="1000">
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-database !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Click to Register </span>
                <span class="text-center"> <Button id="register" icon="pi pi-building" severity="contrast" variant="text" rounded aria-label="Register" :size="size" :loading="loading" @click="navRegister" /> </span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-left" data-aos-duration="1000">
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-sign-in !text-2xl"></i>
                </div>
                <span class="text-center">Click to Login</span>
                <span class="text-2xl font-bold">
                    <Button icon="pi pi-user" severity="contrast" rounded :loading="loading" @click="signIn" @change="checkAuth" raised @input="email" />
                </span>

                <pre v-if="idPayload">{{ idPayload }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGoogleAuth } from '@/composables/Authentication/useGoogleAuth.js';
import { useScreenSize } from '@/composables/ScreenSize/useScreenSize.js';
import { useGlobalState } from '@/stores/accountsStore';
import AOS from 'aos';
import { useRouter } from 'vue-router';
// import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive, ref, watch, watchEffect } from 'vue';

const { accessToken, idPayload, signIn, localData } = useGoogleAuth();
const acctCompare = ref([]);
const router = useRouter();
defineProps({
    heading: { type: String, required: true },
    tagline: String
});
const loading = ref(false);

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
    console.log(getUser);
    localData.value.forEach((item, index) => {
        for (let i = 0; i < item.length; i++) {
            if (accessToken.value) {
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

onMounted(() => {
    const { width, isUltraWide } = useScreenSize();
    return { width, isUltraWide };
});

onMounted(() => {
    AOS.init({
        duration: 800, // Animation duration in ms
        easing: 'ease-in-out', // Easing for animations
        once: true // Whether animation happens only once
    });
    localStorage.clear();
});

// function navLogin() {
//     router.push('/login');
// }

function navRegister() {
    router.push('/registration');
}
</script>
