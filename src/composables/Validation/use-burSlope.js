import { ref } from 'vue';

export function useburSlopeValidation({ min = null, max = null, required = false }) {
    const errorburMessage = ref(null);

    const validateburSlope = (value) => {
        console.log(value, typeof value);
        const num = value;

        if (min !== null && num < min) {
            errorburMessage.value = `Number must be greater than or equal to ${min}`;
            console.log('min', num, min);
            return false;
        }

        if (max !== null && num >= min && max < num) {
            errorburMessage.value = `Number must be less than 1.50!!!!`;
            console.log('max', num);
            return false;
        }
        if (required && (value === null || value === undefined || value === '')) {
            errorburMessage.value = 'This field is required';
            console.log('required');
            return false;
        }

        errorburMessage.value = null;
        return true;
    };

    return {
        errorburMessage,
        validateburSlope
    };
}
