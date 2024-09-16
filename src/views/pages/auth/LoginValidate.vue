<template>
    <FloatingConfigurator />
    <Form @submit="onSubmit">
        <div
            class="flex flex-col items-center justify-center"
            style="max-width: 600px; margin-left: 250px; margin-top: 200px; border-radius: 56px; padding: 2.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
        >
            <div class="w-full pt-40 bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                <Button class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2" label="Click to Register" severity="contrast" raised style="margin-left: 150px" @click="register" />

                <div class="card w-3/4 flex flex-col gap-4 justify-center">
                    <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                    <InputText id="email" type="text" placeholder="username" class="w-full md:w-[15rem] mb-1" v-bind="emailAttrs" />
                    <!-- v-model="username" :error="userError" -->

                    <div>{{ errors.email }}</div>
                    <label for="password" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-1">Password</label>
                    <InputText id="password" type="text" placeholder="username" v-model="password" class="w-full md:w-[15rem] mb-2" v-bind="passwordAttrs" />

                    <!-- <input v-model="password" v-bind="passwordAttrs" /> -->
                    <div>{{ errors.password }}</div>

                    <Button label="Sign In" severity="contrast"></Button>
                </div>
            </div>
        </div>
    </Form>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { useAuthStore } from '@/stores/auth';
import { toTypedSchema } from '@vee-validate/zod';
import { useAxios } from '@vueuse/integrations/useAxios';
import { useForm } from 'vee-validate';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { string } from 'zod';

const checked = ref(false);
const router = useRouter();
const visible = ref(false);
const localData = ref([]);
let Data = reactive({});
const acctCompare = ref([]);
let accountUser = reactive({
    dba: '',
    email: '',
    cphone: '',
    expiration_date: '',
    name: '',
    projects: [],
    secondary_status: '',
    license: ''
});

const store = useAuthStore();
// const { login } = storeToRefs(dataStore);
function clearSelected() {
    store.$reset();
}

onMounted(() => {
    clearSelected();
    console.log('Ran reset');
});
const { errors, defineField, handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        object({
            email: string().min(1).email(),
            password: string().min(6)
        })
    )
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

async function submit() {
    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/getaccounts';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });
    // const loginStore = useacctStore();
    // const username = ref('');

    let results = ref([]);
    results.value = execute().then((result) => {
        Data = data.value;

        for (const [key, value] of Object.entries(Data)) {
            localData.value.push(value);
        }
    });

    console.log(validations, username, password, useField());
}
watch(checkAuth, () => {});
const { accountUsers, getUser, addUser } = useGlobalState();
function checkAuth() {
    localData.value.forEach((item, index) => {
        for (let i = 0; i < item.length; i++) {
            if (username.value === item[i].password) {
                acctCompare.value.push(item[i]);
                console.log(item[i].dba, accountUser.dba, accountUser);
                accountUser.email = item[i].email;
                accountUser.name = item[i].name;
                accountUser.dba = item[i].dba;
                accountUser.phone = item[i].cphone;
                accountUser.expiration_date = item[i].expiration_date;
                accountUser.projects = item[i].projects;
                accountUser.secondary_status = item[i].secondary_status;

                accountUser.license = item[i].license;

                addUser(accountUser);
                navigateNext();
            }
        }

        console.log('UserData', accountUser);
    });
}
function register() {
    router.push('/registration');
}

const navigateNext = () => {
    router.push('/permitapp');
};

const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
    navigateNext();
});
</script>
