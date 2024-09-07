<template>
    <div class="card dock-demo">
        <UserDash />
        <!-- https://primefaces.org/cdn/primevue/images/dock/window.jpg -->
        <div class="dock-window" style="background-image: 'url((/closeup-programming-code-language.jpg))'">
            <Dock :model="items" :position="position">
                <template #itemicon="{ item }">
                    <img v-tooltip.top="item.label" :alt="item.label" :src="item.icon" style="width: 100%" />
                </template>
            </Dock>
        </div>
    </div>
</template>

<script setup>
import UserDash from '@/components/UserLanding/UserDash.vue';
import Dock from 'primevue/dock';
import { ref } from 'vue';
const items = ref([
    {
        label: 'Finder',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/finder.svg'
    },
    {
        label: 'App Store',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/appstore.svg'
    },
    {
        label: 'Photos',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/photos.svg'
    },
    {
        label: 'Trash',
        icon: 'https://primefaces.org/cdn/primevue/images/dock/trash.png'
    }
]);
// const position = ref('bottom');
// const positions = ref([
//     {
//         label: 'Bottom',
//         value: 'bottom'
//     },
//     {
//         label: 'Top',
//         value: 'top'
//     },
//     {
//         label: 'Left',
//         value: 'left'
//     },
//     {
//         label: 'Right',
//         value: 'right'
//     }
// ]);
</script>

<style scoped>
.dock-demo > .dock-window {
    width: 100%;
    height: 450px;
    position: relative;
    background-image: url('/Users/hugo/Desktop/Code/project_v2/public/closeup-programming-code-language.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
}

.dock-demo > .p-dock {
    z-index: 1000;
}
</style>
