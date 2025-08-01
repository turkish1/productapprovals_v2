import { useprocStore } from '@/stores/processStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';

export default function usecreateProcess() {
    const responseMessage = ref('');
    let results = ref([]);
    const procStore = useprocStore();
    const error = ref('');
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/process';

    const { execute, data } = useAxios(url, { method: 'POST' }, { immediate: false });

    let procData = reactive({});
    async function procReceive(form) {
        // console.log(form);

        try {
            procData = form;
            console.log(procData);

            if (procData.processNumber === 'meNaN') return [];

            await execute({ data: form });
            responseMessage.value = 'Form submitted successfully!';
            procStore.addData(procData);

            //     // then clear the page
            console.log('System added');
        } catch (err) {
            throw new Error(`CreateUser failed: ${(err.message, err.responseMessage)}`);
        }
        //     // store the values
        //     procStore.addData(procData);
        //     // then clear the page
        //     console.log('System added');
        // }

        // if (procData.processNumber === 'meNaN') {
        //     return [];
        // } else {
        //     await execute({ data: form });
        //     responseMessage.value = 'Form submitted successfully!';

        //     // store the values
        //     procStore.addData(procData);
        //     // then clear the page
        //     console.log('System added');
        // }
    }

    // 18061905

    return { error, results, procReceive, responseMessage, procData, procStore };
}
