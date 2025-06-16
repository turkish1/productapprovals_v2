// composables/useExpiry.js
import { computed } from 'vue';

export function useExpiry(dateRef) {
    const isExpired = computed(() => {
        const d = new Date(dateRef.value);
        console.log(d);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d < today;
    });
    return { isExpired };
}
