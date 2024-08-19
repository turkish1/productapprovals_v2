import { ref } from 'vue';
import DataService from '../services/DataService.js';

export default function useDrip() {
    const hold = ref([]);

    const loading = ref(false);
    const error = ref(null);
    const types = ref([]);
    loading.value = true;

    function getDrip() {
        const drip = async () =>
            DataService.getdeMaterial()

                .then((response) => {
                    hold.value = response.data.result.Drip_Edge_Material_Type;
                    for (let i = 0; i < hold.value.length; i++) {
                        types.value.push(hold.value[i]);
                    }
                })
                .catch((e) => {
                    error.value = e;
                    console.log(error.value);
                });
        drip();
        loading.value = false;
        return { types, error, loading, hold, getDrip };
    }
}
