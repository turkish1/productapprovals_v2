// composables/useScreenSize.js
import { onMounted, onUnmounted, ref } from 'vue';

export function useScreenSize() {
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);

    const update = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    };

    onMounted(() => window.addEventListener('resize', update));
    onUnmounted(() => window.removeEventListener('resize', update));

    const isUltraWide = () => width.value > 2560;
    const isMobile = () => width.value <= 768;
    const isShortScreen = () => height.value < 600;
    const isLongScreen = () => height.value > 1200;
    onMounted(() => {
        console.log(width.value);
    });

    return { width, isUltraWide, isMobile, height, isShortScreen, isLongScreen };
}
