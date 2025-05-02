<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router

const items = ref(Array.from({ length: 100000 }).map((_, i) => `Item #${i}`));

const smoothScroll = (id) => {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};

const router = useRouter(); // Access the router instance

// Function to handle countdown and redirection

onMounted(() => {
    // Set a timeout to redirect after 5 seconds (5000ms)
    // setTimeout(() => {
    //     router.push('/'); // Replace '/another-page' with your desired route
    // }, 15000);
});
</script>
<template>
    <!-- class="dark:bg-surface-900"  -->
    <div class="card">
        <!-- <VueSpinnerBall /> -->
        <!-- <div id="home" class="landing-wrapper overflow-hidden"> -->
        <VirtualScroller :items="items" :itemSize="50" :delay="150" class="border-1 surface-border border-round" style="width: 900px; height: 900px">
            <template v-slot:item="{ item, options }">
                <div :class="['flex align-items-center p-2', { 'surface-hover': options.odd }]" style="height: 50px">{{ item }}</div>
            </template>
        </VirtualScroller>
        <!-- <VueSpinnerBall size="50" color="green" style="margin-left: 300px" /> -->
        <!-- <div class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static"> -->
        <!-- <div class="video-container"> -->
        <!-- <video autoplay muted loop class="background-video">
                    <source src="/demo/images/RoofDrone.mp4" type="video/mp4" />
                </video> -->

        <!-- <Button
                    class="lg:!hidden"
                    text
                    severity="secondary"
                    rounded
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                >
                    <i class="pi pi-bars !text-2xl"></i>
                </Button> -->
        <!-- <VueSpinnerBall size="50" color="green" style="margin-left: 300px" /> -->
        <!-- <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
                    <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                        <li>
                            <a @click="smoothScroll('#hero')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#features')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Features</span>
                            </a>
                        </li>
                    </ul>
                </div> -->
        <!-- </div> -->
        <!-- </div> -->
    </div>
    <!-- </div> -->

    <!-- <div class="py-6 px-6 mx-0 mt-20 lg:mx-20">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 md:col-span-2">
                <a @click="smoothScroll('#home')" class="flex flex-wrap items-center justify-center md:justify-start md:mb-0 mb-4 cursor-pointer"> </a>
            </div>
        </div>
    </div> -->
</template>
<style scoped>
.video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1; /* Puts video behind content */
}

.background-video {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the video covers the entire screen */
}

.content-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    z-index: 1; /* Places content above the video */
}
</style>
