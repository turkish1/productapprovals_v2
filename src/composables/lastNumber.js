import DataService from '@/services/DataService';

import { ref } from 'vue';

export default function useLast() {
    const resNum = ref(0);
    const lastNum = async () => {
        await DataService.getLastProcess()

            .then((response) => {
                // responseMessage.value = 'Form submitted successfully!';
                resNum.value = response.data;
                console.log('Response:', response.data, resNum.value);
            })

            .catch((error) => {
                // responseMessage.value = 'An error occurred while submitting the form.';
                console.error('Error:', error);
            });
    };
    return { resNum, lastNum };
}
