import { ref } from 'vue';
import DataService from '../services/DataService.js';

export default function useDripSize() {
    const holdSize = ref([]);

    const hold = ref([]);
    const typeSize = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const types = ref([]);
    function getDrip() {
        const dripSync = async () =>
            DataService.getDripMaterials()

                .then((response) => {
                    holdSize.value = response.data.result;

                    hold.value = response.data.result.Drip_Edge_Material_Type;

                    for (let i = 0; i < hold.value.length; i++) {
                        types.value.push(hold.value[i]);
                    }

                    typeSize.value.push(holdSize.value.size1, holdSize.value.size2, holdSize.value.size3, holdSize.value.size4);
                })
                .catch((e) => {
                    error.value = e;
                    console.log(error.value);
                });
        loading.value = false;
        dripSync();
        return { types, error, loading, typeSize, holdSize, hold, getDrip };
    }
}
