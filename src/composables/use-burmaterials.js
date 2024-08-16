import { ref } from 'vue';
import DataService from '../services/DataService.js';

export default function useBurMat() {
    const system = ref([]);
    const loading = ref(false);
    const bMaters = ref([]);
    const error = ref('');
    DataService.getnewburMaterial()

        .then((response) => {
            loading.value = true;
            system.value = response.data.result;
            bMaters.value = response.data.result.material;
        })
        .catch((e) => {
            error.value = e;
            console.log(error.value);
        });
    loading.value = false;

    return { bMaters, system, loading, error };
}
