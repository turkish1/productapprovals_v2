import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue';

const lambdaUrl = 'https://myfawca4fj3ewpg5usmepe6toi0wuvlw.lambda-url.us-east-1.on.aws/';

export default function usePostMechanicalLambda() {
    // const data = ref(null);
    const errors = ref(null);
    const loading = ref(false);
    var udlpayload = ref(null);
    var sapayload = ref(null);
    var dimpayload = ref(null);
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
    const postMech = async (value) => {
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
    // async function postMech(value) {
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

    // async function mechDimentions(dim) {
    //     try {
    //         dimpayload.value = dim;
    //         // testOptionsPreflight();
    //         console.log('Payload:', dimpayload.value);

    //         await execute({ data: dimpayload.value });
    //     } catch (e) {
    //         // prevents uncaught promise — you can also forward this to your UI
    //         console.error('Lambda post failed:', e);
    //     }
    // }

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
    // async function postUDLMech(udlValue) {
    //     try {
    //         udlpayload.value = udlValue;
    //         // testOptionsPreflight();
    //         console.log('Payload:', udlpayload.value);

    //         await execute({ data: udlpayload.value });
    //     } catch (e) {
    //         // prevents uncaught promise — you can also forward this to your UI
    //         console.error('Lambda post failed:', e);
    //     }
    // }
    const postUDLMech = async (udlValue) => {
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
    const postSAMech = async (saValue) => {
        sapayload.value = saValue;
        console.log(sapayload.value);
        loading.value = true;
        error.value = null;
        try {
            return await execute({ data: sapayload.value });
        } catch (err) {
            error.value = err.massage;
            console.error('Lambda post failed:', err);
        } finally {
            loading.value = false;
        }
    };
    // async function postSAMech(saValue) {
    //     try {
    //         sapayload.value = saValue;
    //         // testOptionsPreflight();
    //         console.log('Payload:', sapayload.value);

    //         await execute({ data: sapayload.value });
    //     } catch (e) {
    //         // prevents uncaught promise — you can also forward this to your UI
    //         console.error('Lambda post failed:', e);
    //     }
    // }
    return { data, errors, isFetching, loading, postMech, postUDLMech, postSAMech, dripEdge };
}
