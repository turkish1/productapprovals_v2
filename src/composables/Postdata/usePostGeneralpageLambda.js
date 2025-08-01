// composables/usePostGeneralpageLambda.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';
// onMounted, reactive,
const lambdaUrl = 'https://75tyxhvxx6be6gznfs5kcne73a0sxznj.lambda-url.us-east-1.on.aws/';

export default function usePostGeneralpageLambda() {
    // const data = ref(null);
    const errors = ref(null);
    const loading = ref(false);
    // var dimpayload = ref(null);
    var roofPayload = ref(null);
    var payload = ref(null);

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
        { immediate: false }
    );

    /**
     * post an object to the Lambda
     * @param {Object} obj — any JSON‐serializable object
     */

    const postRoofcheck = async (value) => {
        roofPayload.value = value;
        console.log(roofPayload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: roofPayload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', err);
        } finally {
            loading.value = false;
        }
    };

    const postGeneral = async (value) => {
        payload.value = value;
        console.log(payload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: payload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', err);
        } finally {
            loading.value = false;
        }
    };

    return { data, errors, isFetching, loading, postGeneral, postRoofcheck };
}
