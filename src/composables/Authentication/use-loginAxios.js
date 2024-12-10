import { useAxios } from '@vueuse/integrations/useAxios';

// we are going to need a store for this one

let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/retriveaccounts';

const { execute, data } = useAxios(url, { method: 'GET' }, { immediate: false });

let Data = reactive({});
function confirmAuth(userAccount) {
    console.log(userAccount);
    Data = userAccount;
    execute({ data: userAccount });

    responseMessage.value = 'Form submitted successfully!';

    // store the values

    return { confirmAuth, error, responseMessage, ...toRefs(userAccount) };
}
