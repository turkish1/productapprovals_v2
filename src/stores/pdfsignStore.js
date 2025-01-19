import { createGlobalState } from '@vueuse/core';
// store.js
import { computed, reactive } from 'vue';
// reactive;
export const useGlobalState = createGlobalState(() => {
    // state
    // const res = ref([]);
    // const responseReactive = reactive({})
    const resp = reactive({
        status: '',
        message: '',

        isFinished: '',
        isLoading: ''
    });
    // getters
    const confirmResponse = computed(() => resp);

    // actions
    // function addResponse(rs) {
    //     console.log(rs);

    //     res.value.push(rs);
    // }
    function addResponse(newStatus, newMessage, newFinished, newLoading) {
        console.log(newStatus, newMessage, newFinished, newLoading);
        // res.value.push(rs);
        resp.status = newStatus;
        resp.message = newMessage;

        resp.isFinished = newFinished;
        resp.isLoading = newLoading;
    }

    return { resp, confirmResponse, addResponse };
});
