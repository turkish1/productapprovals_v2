import { ref } from 'vue';

export function useNumberValidation({ min = null, max = null, required = false }) {
    const errorMessage = ref(null);
    const result = ref('');
    const validateNumber = (value) => {
        const num = value;

        if (min !== null && num < min) {
            errorMessage.value = `Number must be greater than or equal to ${min}`;

            return false;
        }

        if (max !== null && num >= min && num >= max) {
            errorMessage.value = `Number must be less than or equal to ${max}`;
            console.log('max', num);
            return false;
        }
        if (required && (value === null || value === undefined || value === '')) {
            errorMessage.value = 'This field is required';
            console.log('required');
            return false;
        }

        errorMessage.value = null;
        result.value = true;
        return true;
    };

    return {
        errorMessage,
        validateNumber,
        result
    };
}
