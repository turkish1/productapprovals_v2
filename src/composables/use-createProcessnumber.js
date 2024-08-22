import { useprocStore } from '@/stores/processStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';
export default function usecreateProcess() {
    const responseMessage = ref('');
    let results = ref([]);
    const procStore = useprocStore();
    // let formData = reactive({
    //     license: '',
    //     dba: '',
    //     name: '',
    //     username: '',
    //     password: '',
    //     secondary_status: '',
    //     expiration_date: '',
    //     address: '',
    //     projects: [],
    //     password: '',
    //     cphone: '',
    //     phone: '',
    //     email: '',
    //     date: new Date()
    // });

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/process';

    const { execute, data } = useAxios(url, { method: 'POST' }, { immediate: false });

    let procData = reactive({});
    function procReceive(form) {
        console.log(form);
        procData = form;
        execute({ data: form });
        // console.log(data);
        // data = Data.value;
        responseMessage.value = 'Form submitted successfully!';
        procStore.addData(procData);
        // store the values

        // then clear the page

        // results.value = noaNum.value.forEach((item, index) => {
        // if (Data.length === 0) {
        //     return;
        // }
        // accountStore.addData(Data);
        // area.value = '';
        // type.value = '';
        console.log(procData, 'System added');

        // return results;
        // });
    }

    // 18061905

    return { error, results, procReceive, responseMessage, procData, procStore };
}
