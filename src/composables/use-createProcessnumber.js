import { useprocStore } from '@/stores/processStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usecreateProcess() {
    const responseMessage = ref('');
    let results = ref([]);
    const procStore = useprocStore();
    const error = ref('');
    let url = 'https://ojv4t7fxsipb4a2wjnyhwjl6wu0wmypm.lambda-url.us-east-1.on.aws/';

    const { execute, data } = useAxios(url, { method: 'POST' }, { immediate: false });

    let procData = reactive({});
    async function procReceive(form) {
        try {
            procData = form;
            // console.log(procData);

            if (procData.processNumber === 'meNaN') return [];

            await execute({ data: form });
            responseMessage.value = 'Form submitted successfully!';
            procStore.addData(procData);

            //     // then clear the page
            console.log('System added');
        } catch (err) {
            throw new Error(`CreateUser failed: ${(err.message, err.responseMessage)}`);
        }
    }

    return { error, results, procReceive, responseMessage, procData, procStore };
}
