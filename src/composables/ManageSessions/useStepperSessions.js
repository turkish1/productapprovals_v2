// composables/useStepperSessions.js
import { ref, watch } from 'vue';

/* Helper to create a unique ID */
function newSessionId() {
    return crypto.randomUUID(); // widely supported; drop‑in for uuid libs
}

export function useStepperSessions() {
    const sessions = ref([]); // [{ session_id, label, completed }]
    const active = ref(0);

    /* ---------- public API ---------- */

    function addStep(label) {
        sessions.value.push({
            session_id: newSessionId(),
            label: label || `Step ${sessions.value.length + 1}`,
            completed: false
        });
    }

    function next() {
        if (active.value < sessions.value.length - 1) active.value++;
    }

    function prev() {
        if (active.value > 0) active.value--;
    }

    function markComplete(index = active.value) {
        sessions.value[index].completed = true;
    }

    /* ---------- optional persistence ---------- */
    if (typeof window !== 'undefined') {
        const key = 'stepper-sessions';

        // restore on reload
        const cached = sessionStorage.getItem(key);
        if (cached) sessions.value = JSON.parse(cached);

        // save every change
        watch(sessions, (v) => sessionStorage.setItem(key, JSON.stringify(v)), { deep: true });
    }

    return { sessions, active, addStep, next, prev, markComplete };
}
