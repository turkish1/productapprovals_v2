import { ref } from 'vue';

export function useHeightValidation({ min = null, max = null, required = false }) {
    const errorHeightMessage = ref(null);

    const validateTileHeight = (value) => {
        const num = value;

        if (min !== null && num < min) {
            errorHeightMessage.value = `Number must be greater than or equal to ${min}`;
            console.log('min', num, min);
            return false;
        }

        if (max !== null && num >= min && num >= max) {
            errorHeightMessage.value = `Number must be less than or equal to ${max}`;
            console.log('max', num);
            return false;
        }
        if (required && (value === null || value === undefined || value === '')) {
            errorHeightMessage.value = 'This field is required';
            console.log('required');
            return false;
        }

        errorHeightMessage.value = null;
        return true;
    };

    return { errorHeightMessage, validateTileHeight };
}
