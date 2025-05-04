import { onMounted, onUnmounted } from 'vue';

let gisLoaded = false; // shared across every component
let promptActive = false;

export function useGoogleOAuth() {
    onMounted(() => {
        /* global google */
        if (!gisLoaded) {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: onCred
            });
            gisLoaded = true;
        }

        if (!promptActive) {
            promptActive = true;
            google.accounts.id.prompt(() => {
                promptActive = false;
            });
        }
    });

    onUnmounted(() => google.accounts.id.cancel()); // abort if the page is left early
}
