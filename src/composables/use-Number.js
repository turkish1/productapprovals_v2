import { ref } from 'vue';

export default function useNumberValidation({ min = null, max = null, required = false }) {
    const errorMessage = ref(null);

    const validateNumber = (value) => {
        console.log(value, typeof value);
        const num = value;

        if (min !== null && num < min) {
            errorMessage.value = `Number must be greater than or equal to ${min}`;
            console.log('min', num, min);
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
        return true;
    };

    return {
        errorMessage,
        validateNumber
    };
}
