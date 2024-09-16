import { ref } from 'vue';

export function useShingleHghtValidation({ min = null, max = null, required = false }) {
    const errorshHeightMessage = ref(null);

    const validateShingleHeight = (value) => {
        console.log(value, typeof value);
        const num = value;

        if (min !== null && num < min) {
            errorshHeightMessage.value = `Number must be greater than or equal to ${min}`;
            console.log('min', num, min);
            return false;
        }

        if (max !== null && num >= min && num >= max) {
            errorshHeightMessage.value = `Number must be less than or equal to ${max}`;
            console.log('max', num);
            return false;
        }
        if (required && (value === null || value === undefined || value === '')) {
            errorshHeightMessage.value = 'This field is required';
            console.log('required');
            return false;
        }

        errorshHeightMessage.value = null;
        return true;
    };

    return { errorshHeightMessage, validateShingleHeight };
}
