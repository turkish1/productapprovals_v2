import { usesystemfStore } from '@/stores/systemfStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useSystemf() {
    const inputsystem = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    const store = usesystemfStore();
    const num = ref();
    const error = ref('');

    let url = 'https://3z97hfdsmb.execute-api.us-east-1.amazonaws.com/sbsapi/sbsapi';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const systemData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: [],
        description: '',
        expiration_date: '',
        Description_F1: '',
        Description_F2: '',
        Description_F3: '',
        Description_F4: '',
        Description_F5: '',
        Description_F6: '',
        Description_F7: '',
        Description_F8: '',
        Description_F9: '',
        Description_F10: '',
        Description_F11: '',

        arraySystem: [],
        maps: [],
        systemCheck: []
    });
    const systemCheck = ref([]);
    function takef(saNoa) {
        inputsystem.value = saNoa;
        num.value = Number(inputsystem.value);

        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await execute({ params: { NOA: num.value } }).then((response) => {
                noaNum.value = data.value;

                return noaNum.value;
            });

            if (response.length === 0) {
                // alert('No data found!');
            } else {
                systemData.manufacturer = noaNum.value[0].Manufacturer;
                systemData.material = noaNum.value[0].Material;
                systemData.Description_F1 = noaNum.value[0].Description_F1;
                systemData.Description_F2 = noaNum.value[0].Description_F2;
                systemData.Description_F3 = noaNum.value[0].Description_F3;
                systemData.Description_F4 = noaNum.value[0].Description_F4;
                systemData.Description_F5 = noaNum.value[0].Description_F5;
                systemData.Description_F6 = noaNum.value[0].Description_F6;
                systemData.Description_F7 = noaNum.value[0].Description_F7;
                systemData.Description_F8 = noaNum.value[0].Description_F8;
                systemData.Description_F9 = noaNum.value[0].Description_F9;
                systemData.Description_F10 = noaNum.value[0].Description_F10;
                systemData.Description_F11 = noaNum.value[0].Description_F11;

                systemData.system = noaNum.value[0].System;
                systemData.systemCheck = noaNum.value[0].System;
                if (systemData.systemCheck.length >= 2) {
                    systemData.maps = noaNum.value[0].Maps;

                    for (const [key] of Object.entries(systemData.maps)) {
                        systemData.arraySystem.push(`${key}`);
                        console.log(`${key}`);
                    }
                } else {
                    systemData.system = noaNum.value[0].System;
                    systemData.description = noaNum.value[0].Description;
                }

                store.addData(systemData);

                console.log(systemData, 'System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            // alert('An error occurred while fetching data.');
        }
        return results;
    };

    return { inputsystem, fetchData, takef, noaNum, error, results, ...toRefs(systemData), store };
}
