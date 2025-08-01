// composables/usePostMechanicalLambda.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://22htn7hygfhaexzkjltjm5jpni0pibfi.lambda-url.us-east-1.on.aws/';

export default function usePostBurLambda() {
    // const data = ref(null);
    const errors = ref(null);
    const loading = ref(false);
    // var dimpayload = ref(null);
    var payload = ref(null);
    var drippayload = ref(null);

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

    const dripEdge = async (dripedge) => {
        drippayload.value = dripedge;
        console.log(drippayload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: drippayload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', err);
        } finally {
            loading.value = false;
        }
    };

    // async function dripEdge(dripedge) {
    //     try {
    //         drippayload.value = dripedge;
    //         // testOptionsPreflight();
    //         console.log('Payload:', drippayload.value);

    //         await execute({ data: drippayload.value });
    //     } catch (e) {
    //         // prevents uncaught promise — you can also forward this to your UI
    //         console.error('Lambda post failed:', e);
    //     }
    // }

    const postBur = async (value) => {
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

    // async function postBur(value) {
    //     try {
    //         payload.value = value;
    //         // testOptionsPreflight();
    //         console.log('Payload:', payload.value);

    //         await execute({ data: payload.value });
    //     } catch (e) {
    //         // prevents uncaught promise — you can also forward this to your UI
    //         console.error('Lambda post failed:', e);
    //     }
    // }

    return { data, errors, isFetching, loading, postBur, dripEdge };
}
