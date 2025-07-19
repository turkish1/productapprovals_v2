import { useprocStore } from '@/stores/processStore';

import usePostToLambda from '@/composables/Postdata/usePostToLambda';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';
export default function usecreateProcess() {
    const responseMessage = ref('');
    let results = ref([]);
    const procStore = useprocStore();
    const { post } = usePostToLambda();
    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/process';

    const { execute, data } = useAxios(url, { method: 'POST' }, { immediate: false });

    let procData = reactive({});
    function procReceive(form) {
        // console.log(form);
        procData = form;
        console.log(procData);
        if (procData.processNumber === 'meNaN') {
            return [];
        } else {
            execute({ data: form });
            responseMessage.value = 'Form submitted successfully!';

            // store the values
            procStore.addData(procData);
            // then clear the page
            post(procData);
            console.log('System added');
        }
    }

    // 18061905

    return { error, results, procReceive, responseMessage, procData, procStore };
}
