import { useGlobalState } from '@/stores/accountsStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { onMounted, reactive, ref } from 'vue';

export function useGoogleAuth() {
    const accessToken = ref(null); // Gmail calls
    const idPayload = ref(null); // basic profile
    let tokenClient = null;
    const localData = ref([]);
    let Data = reactive({});

    const acctUser = reactive({
        dba: '',
        email: '',
        cphone: '',
        bphone: '',
        expiration_date: '',
        name: '',
        projects: [],
        secondary_status: '',
        license: '',
        projects: [],

        phone: ''
    });

    const userEmail = ref(null);
    const { addUser } = useGlobalState();
    onMounted(() => {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // ⬅️ your ID

            scope: ['openid', 'email', 'profile', 'https://www.googleapis.com/auth/gmail.readonly'].join(' '),
            callback: handleCredentialResponse
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

            for (const [key, value] of Object.entries(Data)) {
                localData.value.push(value);
            }
        });
    }
    // { credential }
    /* 3. Google callback */

    async function handleCredentialResponse(resp) {
        if (resp.error) return console.error(resp);
        accessToken.value = resp.access_token;

        /* 2. Get the e‑mail that the user just picked on the Google screen */
        const profile = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${resp.access_token}` }
        }).then((r) => r.json());

        userEmail.value = profile.email;
        checkEmail(userEmail);
    }

    async function checkEmail(userEmail) {
        const uEmail = await userEmail.value;

        for (let i = 0; i <= localData.value[0].length; i++) {
            if (localData.value[0][i].email === uEmail) {
                acctUser.email = await localData.value[0][i].email;
                acctUser.name = await localData.value[0][i].name;

                acctUser.dba = localData.value[0][i].dba;
                acctUser.cphone = localData.value[0][i].cphone;
                acctUser.bphone = localData.value[0][i].bphone;
                acctUser.phone = localData.value[0][i].bphone;
                acctUser.expiration_date = localData.value[0][i].expiration_date;
                acctUser.projects = localData.value[0][i].projects;
                acctUser.secondary_status = localData.value[0][i].secondary_status;
                acctUser.email = localData.value[0][i].email;
                acctUser.license = localData.value[0][i].license;

                addUser(acctUser);
            }
        }
    }
    return { accessToken, idPayload, signIn, signOut, checkEmail, localData, acctUser };
}
