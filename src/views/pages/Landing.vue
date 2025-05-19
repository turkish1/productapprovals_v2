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
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" size="xlarge" />
                <span class="text-2xl font-medium">Donna Romito</span>
                <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="slide-down" data-aos-duration="1000">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" size="xlarge" />
                <span class="text-2xl font-medium">Nancy Perez</span>
                <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="slide-right" data-aos-duration="1000">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" size="xlarge" />
                <span class="text-2xl font-medium">Flavio Gomez</span>
                <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
        </div>
        <div class="h-[30rem]"></div>
        <div class="flex flex-wrap justify-center gap-8">
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-left" data-aos-duration="1000">
                <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">850K</span>
                <span class="text-2xl font-bold">Customers</span>
                <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>

            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-right" data-aos-duration="1000">
                <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span>
                <span class="text-2xl font-bold">Revenue</span>
                <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>

            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="zoom-in-down" data-aos-duration="1000">
                <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">140K</span>
                <span class="text-2xl font-bold">Sales</span>
                <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
            </div>
        </div>
        <div class="h-[30rem]"></div>
        <div class="flex flex-wrap justify-center gap-8">
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-right" data-aos-duration="1000">
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-wifi !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold">Support </span>
                <span class="text-center">Click here for support </span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-up" data-aos-duration="1000">
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-database !text-2xl"></i>
                </div>
                <span class="text-2xl font-bold" @click="navRegister">Register </span>
                <span class="text-center">Click to Register</span>
            </div>
            <div class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="flip-left" data-aos-duration="1000">
                <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                    <i class="pi pi-arrows-v !text-2xl"></i>
                </div>
                <span class="text-center">Click to Login</span>
                <span class="text-2xl font-bold">
                    <Button icon="pi pi-user" severity="info" variant="text" rounded aria-label="Login Page" :size="size" :loading="loading" @click="load" />
                    <!-- <Button label="Login Page" severity="secondary" variant="text" :loading="loading" @click="load" />-->
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import AOS from 'aos';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
// import { login } from '@/views/pages/auth/Login.vue'
const router = useRouter();
defineProps({
    heading: { type: String, required: true },
    tagline: String
});
const loading = ref(false);

const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
    navLogin();
};
onMounted(() => {
    AOS.init({
        duration: 800, // Animation duration in ms
        easing: 'ease-in-out', // Easing for animations
        once: true // Whether animation happens only once
    });
});

function navLogin() {
    router.push('/login');
}

function navRegister() {
    router.push('/registration');
}
</script>
