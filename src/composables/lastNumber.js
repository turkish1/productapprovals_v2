// import DataService from '@/services/DataService';
import { useprocdataStore } from '@/stores/processDataStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function useLast() {
    const resNum = ref(null);
    const results = ref([]);
    // const lastNum = async () => {
    // await
    const lastNum = ref();
    let url = 'https://lnu3pj9h41.execute-api.us-east-1.amazonaws.com/lastNumber/lastNumber';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const processStore = useprocdataStore();
    // const fetchData = async () => {
    // try {
    // const response = await execute().then((response) => {
    //     lastNum.value = data.value;
    //     console.log(lastNum.value, response);
    //     return lastNum.value;
    // });
    results.value = execute().then((result) => {
        lastNum.value = result.data.value;
        console.log(result);

        if (result.data.value === 0) {
            // alert('No data found!');
        } else {
            console.log(lastNum.value);
            processStore.addData(lastNum);
            // store.addShingle(shingleData);

            // console.log(shingleData, 'System added');
        }
    });

    // } catch (error) {
    //     console.log('Error, fectching data', error);
    //     // alert('An error occurred while fetching data.');
    // }
    return { resNum, lastNum };
    // };
    // DataService.getLastProcess()

    //     .then((response) => {
    //         // responseMessage.value = 'Form submitted successfully!';
    //         resNum.value = response.data;

    //         resNum.value.forEach((element) => {
    //             console.log(element.processNumber);
    //             lastNum.value = element.processNumber;
    //         });
    //     })

    //     .catch((error) => {
    //         // responseMessage.value = 'An error occurred while submitting the form.';
    //         console.error('Error:', error);
    //     });
    // };
}
