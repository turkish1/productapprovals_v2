import { onMounted, ref } from 'vue';

let gisLoaded = false; // shared across every component
let promptActive = false;

export function useGoogleAuth() {
    const users = ref(null);
    const loading = ref(true);
    const error = ref(null);

    // Called by Google when sign‑in succeeds
    function handleResponse(response) {
        try {
            // response.credential is a JWT ID token
            const base64Url = response.credential.split('.')[1];
            const json = decodeURIComponent(
                atob(base64Url)
                    .split('')
                    .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
                    .join('')
            );
            users.value = JSON.parse(json);
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    onMounted(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // or process.env.VUE_APP_GOOGLE_CLIENT_ID
            callback: handleResponse
        });

        google.accounts.id.renderButton(document.getElementById('googleSignInDiv'), { theme: 'outline', size: 'large' });

        // Auto‑prompt the One‑Tap dialog (optional)
        google.accounts.id.prompt();
    });

    function signOut() {
        google.accounts.id.disableAutoSelect();
        users.value = null;
    }

    return { users, loading, error, signOut };
}
