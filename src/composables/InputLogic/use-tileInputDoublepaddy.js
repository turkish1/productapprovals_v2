import { useDoublePaddyStore } from '@/stores/doublepaddyStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { ref } from 'vue';

export default function usetileInputdouble() {
    const loading = ref(false);
    const responseMessage = ref('');
    const error = ref('');

    const useDoublepaddy = useDoublePaddyStore();
    const url = 'https://ewa5ibqdkpzvdvtynh2z7agljm0epptp.lambda-url.us-east-1.on.aws/';

    // Initialize useAxios
    const { execute } = useAxios(url, { method: 'GET' }, { immediate: false });

    /**
     * FIXED: Streamlined normalization
     * Lambda Function URLs return a JSON string in 'body'.
     * Axios parses the top-level JSON, so we just need to parse 'body'.
     */
    const extractData = (axiosResponse) => {
        // Axios puts the Lambda JSON response in .data
        const lambdaResponse = axiosResponse?.data;
        if (!lambdaResponse) return null;

        let finalData = lambdaResponse;

        // If Lambda sent it as a stringified body (standard for Function URLs)
        if (lambdaResponse.body && typeof lambdaResponse.body === 'string') {
            try {
                finalData = JSON.parse(lambdaResponse.body);
            } catch (e) {
                console.error('Failed to parse Lambda body string', e);
            }
        } else if (lambdaResponse.body) {
            // If Lambda already parsed it
            finalData = lambdaResponse.body;
        }

        // Handle case where body itself is a list or a single object
        return Array.isArray(finalData) ? finalData[0] : finalData;
    };

    const buildPayload = (entry) => {
        if (!entry) return null;

        // Based on your console log:
        // entry.NOA exists (uppercase)
        // entry.applicant exists (lowercase)
        // entry.AdhesiveMaterial is an Array

        const base = {
            noa: entry.NOA || '',
            manufacturer: (entry.applicant || '').trim(),
            description: entry.description || '',
            Table2: entry.Table2 || '',
            Table3: entry.Table3 || '',
            select_tile: entry.Select_Tile || '',
            tile_map: entry.Tile_Map || '',
            Table2_Map: entry.Table2_Map || '',
            resistance: entry.Resistance || '',
            paddy_cat: entry.paddy_category || ''
        };

        // If material is a list (like in your log), we handle it
        return {
            ...base,
            material: Array.isArray(entry.AdhesiveMaterial) ? entry.AdhesiveMaterial.join(', ') : entry.material || '',
            selection: entry.AdhesiveMaterials || ''
        };
    };
    async function getTilenoas(number) {
        // ... loading/error logic ...
        try {
            const response = await execute({
                params: { NOA: String(number).trim() }
            });

            // The critical change:
            const result = extractData(response);

            // If result is a Ref, get .value. If it's an array, get [0].
            const entry = (result?.__v_isRef ? result.value : result)?.[0] || result;

            console.log('Final Unwrapped Entry:', entry);

            if (!entry || Object.keys(entry).length === 0) {
                responseMessage.value = 'No record found';
                return null;
            }

            const payload = buildPayload(entry);
            useDoublepaddy.addtileDatas(payload);
            return payload;
        } catch (e) {
            console.error('Fetch error:', e);
            return null;
        } finally {
            loading.value = false;
        }
    }

    return {
        getTilenoas,
        useDoublepaddy,
        responseMessage,
        loading,
        buildPayload,
        error
    };
}
