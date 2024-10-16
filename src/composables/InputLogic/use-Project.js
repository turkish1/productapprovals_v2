// import DataService from '@/services/DataService';
import { useprojectStore } from '@/stores/userprojects/userprojectStore';
import { useAxios } from '@vueuse/integrations/useAxios';
import { reactive, ref, toRefs } from 'vue';

export default function useInputs() {
    const input = ref();

    const noaNum = ref([]);
    let results = ref([]);
    const store = useprojectStore();

    const error = ref('');

    let url = 'https://37v3xlsjw0.execute-api.us-east-1.amazonaws.com/projects/projects';
    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    const userProject = reactive({
        address: [],

        muni: [],

        license: '',

        folio: [],

        contractor: '',

        permit: [],

        processNumber: [],

        date: ''
    });
    function takeValue(license) {
        input.value = license;

        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await execute({ params: { license: input.value } }).then((response) => {
                licenseNum.value = data.value;

                return licenseNum.value;
            });
            console.log(response.length);
            if (response.length === 0) {
                // alert('No data found!');
            } else {
                console.log(licenseNum.value);
                userProject.address = licenseNum.value[0].address;
                userProject.muni = licenseNum.value[0].muni;
                userProject.license = licenseNum.value[0].license;
                userProject.folio = licenseNum.value[0].folio;
                userProject.contractor = licenseNum.value[0].contractor;
                userProject.permit = licenseNum.value[0].permit;
                userProject.processNumber = licenseNum.value[0].processNumber;
                userProject.date = licenseNum.value[0].date;
                store.addData(userProject);

                console.log(userProject, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { input, fetchData, takeValue, noaNum, error, results, ...toRefs(userProject), store };
}
