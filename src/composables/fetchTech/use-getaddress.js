// composables/useFetchJson.js
import { ref } from 'vue';

export function getAddress() {
    const datas = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const addrValue = ref('');

    function getaddress(addr) {
        addrValue.value = addr;
        console.log(addr, addrValue.value);
        fetchData();
    }
    const base1URL = `https://6x2kydgvuahfitwvxkkfbybv6u0kbxgl.lambda-url.us-east-1.on.aws/?address=${encodeURIComponent(addrValue.value)}&to=200`;

    const url = base1URL;

    const fetchData = async (url, options = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await fetch(url, options);
            console.log(url);
            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`);
            // }
            datas.value = await response.json();
            console.log(datas.value);
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return { datas, error, loading, fetchData, getaddress };
}
