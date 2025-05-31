import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import Aura from '@primevue/themes/aura';
import { useGeolocation } from '@vueuse/core';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import { VueSpinnersPlugin } from 'vue3-spinners';
import App from './App.vue';
import router from './router';

import AnimateOnScroll from 'primevue/animateonscroll';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(useGeolocation);
app.use('animateonscroll', AnimateOnScroll);
app.use('tooltip', Tooltip);
app.use(VueSpinnersPlugin);
app.use(AOS);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');
