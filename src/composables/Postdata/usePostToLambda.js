// composables/usePostToLambda.js
// import { useAxios } from '@vueuse/integrations/useAxios';
// import axios from 'axios';
import { ref } from 'vue';

// const api = axios.create({
//     baseURL:   'https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/', // full Function URL
//     //
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

export default function usePostToLambda() {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const post = async (payload) => {
        console.log(payload);
        loading.value = true;
        //  https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/'
        try {
            const response = await fetch('https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP error ${response.status}`);

            const json = await response.json();
            data.value = json;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return { data, error, loading, post };
}
