// composables/usePostMechanicalLambda.js
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://w5itb6hiwfnpklabxpjybslili0uytpp.lambda-url.us-east-1.on.aws/';

export default function usePostShingleLambda() {
    // const data = ref(null);
    const errors = ref(null);
    const loading = ref(false);
    var udlpayload = ref(null);
    var payload = ref(null);
    var sapayload = ref(null);
    var dimpayload = ref(null);
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

    const dripEdge = async (value) => {
        drippayload.value = value;
        console.log(drippayload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: drippayload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', error.value);
        } finally {
            loading.value = false;
        }
    };
    const roofMeasurements = async (metricvalue) => {
        dimpayload.value = metricvalue;
        console.log(dimpayload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: dimpayload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', error.value);
        } finally {
            loading.value = false;
        }
    };

    const postUDLshingle = async (udlValue) => {
        udlpayload.value = udlValue;
        console.log(udlpayload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: udlpayload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', err);
        } finally {
            loading.value = false;
        }
    };
    const postShingle = async (value) => {
        payload.value = value;
        console.log(payload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: payload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', error.value);
        } finally {
            loading.value = false;
        }
    };

    const postSAshingle = async (saValue) => {
        sapayload.value = saValue;
        console.log(sapayload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: sapayload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', error.value);
        } finally {
            loading.value = false;
        }
    };

    return { data, errors, isFetching, dripEdge, roofMeasurements, loading, postShingle, postUDLshingle, postSAshingle };
}
