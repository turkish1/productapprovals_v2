import { useacctStore } from '@/stores/accountStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';
export default function usecreateAccount() {
    const effort = ref([]);
    const noaNum = ref([]);
    const responseMessage = ref('');
    let results = ref([]);
    const acctStore = useacctStore();
    let formData = reactive({
        license: '',
        dba: '',
        name: '',
        username: '',
        password: '',
        secondary_status: '',
        expiration_date: '',
        address: '',
        projects: [],
        password: '',
        cphone: '',
        phone: '',
        email: '',
        date: new Date()
    });

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/accounts';

    const { execute, data } = useAxios(url, { method: 'POST' }, { immediate: false });

    let Data = reactive({});
    function takp(formd) {
        console.log(formd);
        Data = formd;
        execute({ data: formd });

        responseMessage.value = 'Form submitted successfully!';
        acctStore.addData(Data);
        // store the values

        // then clear the page

        // accountStore.addData(Data);

        console.log(Data, 'System added');
    }

    // 18061905

    return { takp, noaNum, error, results, responseMessage, ...toRefs(Data), acctStore };
}