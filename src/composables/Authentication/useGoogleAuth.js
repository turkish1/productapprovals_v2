import { useGlobalState } from '@/stores/accountsStore';
import { useStorage } from '@vueuse/core';
import { useAxios } from '@vueuse/integrations/useAxios';
import { onMounted, reactive, ref } from 'vue';

const url = 'https://ph2b5e3vusvx74ojurdlrlx5ie0ksqeg.lambda-url.us-east-1.on.aws/';

export function useGoogleAuth() {
    const accessToken = ref(null); // Gmail calls
    const idPayload = ref(null); // basic profile
    let tokenClient = null;
    const localData = ref([]);
    // const Data = reactive({});
    // const results = ref([]);

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
    // , submit()
    const signIn = () => tokenClient.requestAccessToken({ prompt: 'consent' });

    const signOut = () => {
        if (!accessToken.value) return;
        google.accounts.oauth2.revoke(accessToken.value, () => {
            accessToken.value = null;
            idPayload.value = null;
        });
    };

    async function handleCredentialResponse(resp) {
        if (resp.error) return console.error(resp);
        accessToken.value = resp.access_token;
        const id = useStorage('sessionTokenId', accessToken.value, sessionStorage); // returns Ref<string>

        /* 2. Get the e‑mail that the user just picked on the Google screen */
        const profile = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${resp.access_token}` }
        }).then((r) => r.json());

        userEmail.value = profile.email;
        await getUserdata();
    }

    const { execute } = useAxios(
        url,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        },
        { immediate: false }
    );
    // After successful API

    async function getUserdata() {
        try {
            const response = await execute({
                data: { email: userEmail.value }
            });
            const Data = response.data.value.body;
            localData.value = [Data];
            await checkEmail(userEmail);

            return Data;
        } catch (err) {
            console.error('API Error:', err.response?.data || err.message);
        }
    }

    // { credential }
    /* 3. Google callback */

    async function checkEmail(userEmail) {
        const emailToFind = userEmail.value; // plain string

        for (const user of localData.value) {
            // <-- iterate over objects
            if (user.email?.toLowerCase() === emailToFind.toLowerCase()) {
                // Populate the reactive acctUser (no await needed – values are plain)

                acctUser.email = user.email;
                acctUser.name = user.name;
                acctUser.dba = user.dba;
                acctUser.cphone = user.cphone;
                acctUser.bphone = user.bphone;
                acctUser.phone = user.bphone;
                acctUser.expiration_date = user.expiration_date;
                acctUser.projects = user.projects ?? [];
                acctUser.secondary_status = user.secondary_status;
                acctUser.license = user.license;
                //     // add any other fields you need

                await addUser(acctUser);
                return; // stop after first match
            }
        }

        console.log('No user found with email', emailToFind);
    }

    return { accessToken, idPayload, signIn, signOut, getUserdata, checkEmail, localData, acctUser };
}
