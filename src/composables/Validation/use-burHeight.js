import { ref } from 'vue';

export function useburValidation({ min = null, max = null, required = false }) {
    const errorburHeightMessage = ref(null);

    const validateburHeight = (value) => {
        console.log(value, typeof value);
        const num = value;

        if (min !== null && num < min) {
            errorburHeightMessage.value = `Number must be greater than or equal to ${min}`;
            console.log('min', num, min);
            return false;
        }

        if (max !== null && num >= min && num >= max) {
            errorburHeightMessage.value = `Number must be less than or equal to ${max}`;
            console.log('max', num);
            return false;
        }
        if (required && (value === null || value === undefined || value === '')) {
            errorburHeightMessage.value = 'This field is required';
            console.log('required');
            return false;
        }

        errorburHeightMessage.value = null;
        return true;
    };

    return {
        errorburHeightMessage,
        validateburHeight
    };
}
