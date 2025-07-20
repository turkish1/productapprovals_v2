import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { reactive, ref } from 'vue';

const api = axios.create({
    baseURL: 'https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/', // full Function URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// This picks the individual NOAS
export default function usePostToMongo() {
    const response = ref(null);
    const error = ref(null);
    const loading = ref(false);
    var Data = reactive({});

    // const data = ref(null);

    let url = 'https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/';

    const { execute, then, data } = useAxios(url, { method: 'POST' }, { immediate: false });

    function postData(dataObject) {
        console.log(dataObject);
        Data = dataObject;
        // pushData();
    }

    function jobData(ccObject) {
        Data = ccObject;
        console.log(Data, ccObject);
        post(Data);
    }

    const pushData = async (payload) => {
        console.log(payload);
        try {
            const response = await execute({ params: { payload } }).then((res) => {
                console.log(payload);
                return res;
            });
            console.log(response);
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }

        // return response;
    };

    const post = async (payload) => {
        loading.value = true;
        console.log(payload);
        try {
            const { data: response } = await useAxios(
                '',
                {
                    method: 'POST',
                    data: payload
                },
                api
            );
            data.value = response.value;
            console.log(response.value);
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };
    // , pushData
    return { response, error, Data, data, post, pushData, loading, postData, jobData };
}
//
// const response = await fetch('https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(payload)
// });

// if (!response.ok) throw new Error(`HTTP error ${response.status}`);

// const json = await response.json();
// data.value = json;
