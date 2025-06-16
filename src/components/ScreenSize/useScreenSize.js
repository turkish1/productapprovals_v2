// composables/useScreenSize.js
import { onMounted, onUnmounted, ref } from 'vue';

export function useScreenSize() {
    const width = ref(window.innerWidth);

    const update = () => (width.value = window.innerWidth);
    onMounted(() => window.addEventListener('resize', update));
    onUnmounted(() => window.removeEventListener('resize', update));

    const isUltraWide = () => width.value > 2560;
    const isMobile = () => width.value <= 768;

    return { width, isUltraWide, isMobile };
}
