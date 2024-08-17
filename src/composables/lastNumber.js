import DataService from '@/services/DataService';

import { ref } from 'vue';

export default function useLast() {
    const resNum = ref(null);
    // const lastNum = async () => {
    // await
    const lastNum = ref(null);
    DataService.getLastProcess()

        .then((response) => {
            // responseMessage.value = 'Form submitted successfully!';
            resNum.value = response.data;

            resNum.value.forEach((element) => {
                console.log(element.processNumber);
                lastNum.value = element.processNumber;
            });
        })

        .catch((error) => {
            // responseMessage.value = 'An error occurred while submitting the form.';
            console.error('Error:', error);
        });
    // };

    return { resNum, lastNum };
}
