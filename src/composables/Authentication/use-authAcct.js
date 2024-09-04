import { useAxios } from '@vueuse/integrations/useAxios';
// we are going to need a store for this one
// import useacctStore from '@/stores/loginStore';
import { reactive, ref, toRefs } from 'vue';

export default function useauthAcct() {
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/getaccounts';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    // const loginStore = useacctStore();
    // const username = ref('');
    let Data = reactive({});
    const acctCompare = ref([]);
    let accountUser = reactive({
        email: '',
        expiration_date: '',
        name: '',
        projects: [],
        secondary_status: '',
        license: '',
        dba: ''
    });

    let results = ref([]);
    const localData = ref([]);
    function confirmAuth(val) {
        console.log(val);
        username.value = val;

        results.value = execute().then((result) => {
            Data = data.value;

            for (const [key, value] of Object.entries(Data)) {
                localData.value.push(value);
            }

            localData.value.forEach((item, index) => {
                console.log(item);
                for (let i = 0; i < item.length; i++) {
                    // let a = [];

                    if (username.value === item[i].password) {
                        console.log(username.value, item[i].password);
                        acctCompare.value.push(item[i]);

                        console.log('I am in');
                    }
                }

                accountUser.email = acctCompare.value.email;
                accountUser.name = acctCompare.value.name;
                accountUser.expiration_date = acctCompare.value.expiration_date;
                accountUser.projects = acctCompare.value.projects;
                accountUser.secondary_status = acctCompare.value.secondary_status;
                accountUser.license = acctCompare.value.license;
                accountUser.dba = acctCompare.value.dba;
            });

            // store the values
            // loginStore.addLogin(accountUser);
            console.log(accountUser, 'System added');
        });
    }

    // loginStore ,
    return { confirmAuth, username, results, ...toRefs(accountUser) };
}
