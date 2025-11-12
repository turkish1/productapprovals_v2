// composables/usePostToLambda.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://neiyrwtsedlm7brkgmzer3w4xe0shdfl.lambda-url.us-east-1.on.aws/';

export default function usePostToLambda() {
    const errors = ref(null);
    const loading = ref(false);

    const { data, error: axiosError, isFetching, execute } = useAxios(lambdaUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, axios, { immediate: false });
    const run = async (body, label) => {
        loading.value = true;
        errors.value = null;
        try {
            const res = await execute({ data: body });
            console.log(res?.data);
            return res?.data ?? data.value;
        } catch (e) {
            console.error(`Lambda ${label} failed:`, {
                message: e?.message,
                code: e?.code,
                status: e?.response?.status,
                data: e?.response?.data
            });
            errors.value = e?.message || 'Request failed';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    // const dripEdge = (v) => run(v, 'dripEdge');
    // const roofMeasurements = (v) => run(v, 'roofMeasurements');
    const post = (v) => run(v, 'post');

    return { data, errors, isFetching, loading, post };
}
