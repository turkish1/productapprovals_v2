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
        city: '',
        license_status: '',
        expiration_date: '',
        address: '',
        zipcode: ''
    });
    const result = execute().then((res) => {
        contractors.value = data.value;

        // area.value = '';
        // type.value = '';

        return results;
    });
    function retrieveAccount(cccNum) {
        console.log(cccNum);
        cccInput.value = cccNum;
        fndContract(cccInput.value);
    }

    const cValue = ref('');
    const foundContractor = ref([]);
    function fndContract(val) {
        console.log(val);
        cValue.value = val;
        for (let i = 0; i < contractors.value.length - 1; i++) {
            if (cValue.value === contractors.value[i].alt_license) {
                foundContractor.value.push(contractors.value[i]);
            }
        }
        console.log(foundContractor.value);
        (cccAccounts.license = foundContractor.value[0].alt_license),
            (cccAccounts.dba = foundContractor.value[0].dba),
            (cccAccounts.name = foundContractor.value[0].name),
            (cccAccounts.license_status = foundContractor.value[0].secondary_status),
            (cccAccounts.city = foundContractor.value[0].city),
            (cccAccounts.expiration_date = foundContractor.value[0].expiration_date),
            (cccAccounts.effective_date = foundContractor.value[0].effective_date),
            (cccAccounts.address = foundContractor.value[0].address1),
            (cccAccounts.zipcode = foundContractor.value[0].zip);
    }

    const cccstore = usecccStore();

    return { error, retrieveAccount, responseMessage, results, fndContract, contractors, licenseNumbers, cccAccounts };
}
