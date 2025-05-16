import { reactive, ref, watch, watchEffect, onMounted } from 'vue';
import { useAxios } from '@vueuse/integrations/useAxios';

export function useGoogleAuth() {
    const accessToken = ref(null); // Gmail calls
    const idPayload = ref(null); // basic profile
    let tokenClient = null;
    const localData = ref([]);
    let Data = reactive({});

    onMounted(() => {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // ⬅️ your ID
            scope: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/gmail.readonly'].join(' '),
            callback: (resp) => {
                if (resp.error) return console.error(resp);
                accessToken.value = resp.access_token;

                // Optional: decode the ID token for name / picture
                const idToken = resp.id_token;
                if (idToken) idPayload.value = JSON.parse(atob(idToken.split('.')[1]));
            }
        });
    });

    const signIn = () => tokenClient.requestAccessToken({ prompt: 'consent' }, submit());

    const signOut = () => {
        if (!accessToken.value) return;
        google.accounts.oauth2.revoke(accessToken.value, () => {
            accessToken.value = null;
            idPayload.value = null;
        });
    };
    async function submit() {
        let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/getaccounts';

        const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

        let results = ref([]);
        results.value = execute().then((result) => {
            Data = data.value;
            console.log(Data);
            for (const [key, value] of Object.entries(Data)) {
                localData.value.push(value);
            }
            console.log(localData.value);
        });
    }
    return { accessToken, idPayload, signIn, signOut, localData };
}
