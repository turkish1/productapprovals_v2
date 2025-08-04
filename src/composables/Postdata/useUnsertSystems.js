// composables/usePermitData.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://ckig7oytf33xby6o2ufxtfncoi0cnrzw.lambda-url.us-east-1.on.aws/';

export default function useInsertData() {
    const loading = ref(false);
    const errors = ref(null);
    const payload = ref(null);

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

    const createSystemPost = async (formdataSent) => {
        payload.value = formdataSent;
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

    return {
        data,
        errors,
        isFetching,
        loading,
        createSystemPost
    };
    //  genData
}
