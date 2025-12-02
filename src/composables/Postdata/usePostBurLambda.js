// composables/usePostMechanicalLambda.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://22htn7hygfhaexzkjltjm5jpni0pibfi.lambda-url.us-east-1.on.aws/';

export default function usePostBurLambda() {
    const errors = ref(null);
    const loading = ref(false);

    const { data, error: axiosError, isFetching, execute } = useAxios(lambdaUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, axios, { immediate: false });
    const run = async (body) => {
        loading.value = true;
        errors.value = null;
        try {
            const res = await execute({ data: body });
            // console.log(res?.data);
            return res?.data ?? data.value;
        } catch (e) {
            console.error(`Lambda failed:`, {
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

    const postBur = (v) => run(v, 'postBur');
    return { data, errors, isFetching, loading, postBur };
}
