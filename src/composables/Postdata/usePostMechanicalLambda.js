import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://myfawca4fj3ewpg5usmepe6toi0wuvlw.lambda-url.us-east-1.on.aws/';

export default function usePostMechanicalLambda() {
    const errors = ref(null);
    const loading = ref(false);

    const { data, error: axiosError, isFetching, execute } = useAxios(lambdaUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, axios, { immediate: false });
    const run = async (body, label) => {
        loading.value = true;
        errors.value = null;
        console.log(body, label);
        try {
            const res = await execute({ data: body });
            console.log(res?.data, data?.value);
            return res?.data ?? data.value;
        } catch (e) {
            console.error(`Lambda ${label} failed:`, {
                message: e?.message,
                code: e?.code,
                status: e?.response?.status,
                data: e?.response?.data,
                ...existing,
                body: body
            });
            errors.value = e?.message || 'Request failed';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    // const dripEdge = (v) => run(v, 'dripEdge');
    const postMech = (v) => run(v, 'postMech');
    // dripEdge
    return { data, errors, isFetching, loading, postMech };
}
