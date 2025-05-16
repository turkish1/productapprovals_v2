import { usecccStore } from '@/stores/contractorStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref } from 'vue';
export default function useRegAxios() {
    const responseMessage = ref('');
    const error = ref('');
    const results = ref('');
    const cccInput = ref('');
    const licenseNumbers = ref('');
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/contractors';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const contractors = reactive({});
    let cccAccounts = reactive({
        license: '',
        dba: '',
        name: '',
        license_status: '',
        expiration_date: '',
        address: '',
        phone: '',
        email: ''
    });

    const cccstore = usecccStore();

    const result = execute().then((result) => {
        contractors.value = data.value;

        cccAccounts = contractors.value;

        // area.value = '';
        // type.value = '';

        return results;
    });
    // function retrieveAccount(cccNum) {
    //     cccNum;
    //     cccInput.value = cccNum;

    // }
    return { error, responseMessage, contractors, licenseNumbers, cccAccounts };
}
