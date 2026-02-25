import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { ref } from 'vue'; // IDE strips this if it thinks nothing uses it

const lambdaUrl = 'https://qradmib67fkrfazvxztycmw76q0igkad.lambda-url.us-east-1.on.aws/';

export default function useMuniapp() {
    const loading = ref(false);
    const localError = ref(null); // Rename this to avoid conflict with useAxios
    const payload = ref(null);

    const {
        data,
        error: axiosError,
        isFetching,
        execute
    } = useAxios(
        lambdaUrl,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        },
        axios,
        { immediate: false }
    );

    const postMuniAppData = async (formdataSent) => {
        // Use the refs here clearly so the IDE sees them as 'active'
        payload.value = formdataSent;
        loading.value = true;
        localError.value = null;

        try {
            // Note: execute returns the response, but useAxios updates 'data' ref automatically
            return await execute({ data: payload.value });
        } catch (err) {
            localError.value = err.message; // Fixed typo: message
            console.error('Lambda post failed:', err);
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        errors: localError, // Return your local ref
        axiosError, // Return the axios-specific error
        isFetching,
        loading,
        postMuniAppData
    };
}

// import { useAxios } from '@vueuse/integrations/useAxios';
// import axios from 'axios';
// import { ref } from 'vue';

// const lambdaUrl = 'https://qradmib67fkrfazvxztycmw76q0igkad.lambda-url.us-east-1.on.aws/';

// export default function useMuniapp() {
//     const loading = ref(false);
//     const errors = ref(null);
//     const payload = ref(null);

//     const { data, error, isFetching, execute } = useAxios(
//         // ① give the URL up front
//         lambdaUrl,
//         // ② options object
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' }
//             // you can omit `data` here
//         },
//         // ③ axios instance
//         axios,
//         // ④ don't fire immediately
//         { immediate: false }
//     );

//     /**
//      * post an object to the Lambda
//      * @param {Object} obj — any JSON‐serializable object
//      */
//     const postMuniAppData = async (formdataSent) => {
//         payload.value = formdataSent;
//         console.log(payload.value);
//         loading.value = true;
//         error.value = null;
//         try {
//             return await execute({ data: payload.value });
//         } catch (err) {
//             error.value = err.massage;
//             console.error('Lambda post failed:', err);
//         } finally {
//             loading.value = false;
//         }
//     };

//     return {
//         data,
//         errors,
//         isFetching,
//         loading,
//         postMuniAppData
//     };
// }
