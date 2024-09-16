import { ref } from 'vue';

export function useShingleValidation({ min = null, max = null, required = false }) {
    const errorshingleMessage = ref(null);

    const validateShingleSlope = (value) => {
        console.log(value, typeof value);
        const num = value;

        if (min !== null && num < min) {
            errorshingleMessage.value = `Number must be greater than or equal to ${min}`;
            console.log('min', num, min);
            return false;
        }

        if (max !== null && num >= min && num >= max) {
            errorshingleMessage.value = `Number must be less than or equal to ${max}`;
            console.log('max', num);
            return false;
        }
        if (required && (value === null || value === undefined || value === '')) {
            errorshingleMessage.value = 'This field is required';
            console.log('required');
            return false;
        }

        errorshingleMessage.value = null;
        return true;
    };

    return {
        errorshingleMessage,
        validateShingleSlope
    };
}
