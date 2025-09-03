// composables/usePostShingleLambda.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://w5itb6hiwfnpklabxpjybslili0uytpp.lambda-url.us-east-1.on.aws/';

export default function usePostShingleLambda() {
    const errors = ref(null);
    const loading = ref(false);

    const { data, error: axiosError, isFetching, execute } = useAxios(lambdaUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, axios, { immediate: false });

    const run = async (body, label) => {
        loading.value = true;
        errors.value = null;
        try {
            const res = await execute({ data: body });
            if (axiosError.value) {
                const e = axiosError.value;
                const msg = e?.response?.data?.error ?? e?.response?.data ?? e?.message ?? String(e);
                console.error(`Lambda ${label} failed:`, msg, e?.response?.status, e?.response?.data);
                throw e;
            }
            return res?.data ?? data.value;
        } catch (e) {
            const msg = e?.response?.data?.error ?? e?.response?.data ?? e?.message ?? String(e);
            errors.value = msg;
            console.error(`Lambda ${label} failed:`, msg);
            throw e;
        } finally {
            loading.value = false;
        }
    };

    const dripEdge = (v) => run(v, 'dripEdge');
    const roofMeasurements = (v) => run(v, 'roofMeasurements');
    const postUDLshingle = (v) => run(v, 'postUDLshingle');
    const postShingle = (v) => run(v, 'postShingle');
    const postSAshingle = (v) => run(v, 'postSAshingle');

    return { data, errors, isFetching, loading, dripEdge, roofMeasurements, postShingle, postUDLshingle, postSAshingle };
}
