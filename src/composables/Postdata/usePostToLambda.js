// composables/usePostToLambda.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/';

export default function usePostToLambda() {
    // const data = ref(null);
    const errors = ref(null);
    const loading = ref(false);

    var payload = ref(null);

    // const { execute, data } = useAxios(url, { method: 'POST' }, { immediate: false });

    const { data, error, isFetching, execute } = useAxios(
        // ① give the URL up front
        lambdaUrl,
        // ② options object
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
            // you can omit `data` here
        },
        // ③ axios instance
        axios,
        // ④ don't fire immediately
        { immediate: true }
    );

    /**
     * post an object to the Lambda
     * @param {Object} obj — any JSON‐serializable object
     */

    async function post(value) {
        try {
            payload.value = value;
            // testOptionsPreflight();
            console.log('Payload:', payload.value);
            await execute({ data: payload.value });
        } catch (e) {
            // prevents uncaught promise — you can also forward this to your UI
            console.error('Lambda post failed:', e);
        }
    }

    // const testOptionsPreflight = async () => {
    //     const res = await fetch('https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/', {
    //         method: 'OPTIONS',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     console.log(await res.text());
    // };
    // const postAction = async () => {
    //     console.log(payload);
    //     loading.value = true;

    // try {
    // const { data, error, isFetching, execute } = useAxios(
    //     () => ({
    //         url: lambdaUrl,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         // axios will JSON.stringify automatically
    //         data: payload.value
    //         // ensure CORS fetch mode (not strictly needed for axios, but in case)
    //         // If you switch to fetch: mode: 'cors'
    //     }),
    //     axios,
    //     { immediate: false }
    // );
    // } catch (err) {
    //     errors.value = err;
    // } finally {
    //     loading.value = false;

    return { data, errors, isFetching, loading, post };
}
