import { usesystemfStore } from '@/stores/systemfStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemF() {
    const inputsystem = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    const store = usesystemfStore();

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilesystemf';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const systemData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: [],
        designPressure: [],
        description: '',
        Description_F1: '',
        Description_F2: '',
        Description_F3: '',
        Description_F4: '',
        Description_F5: '',
        Description_F6: '',
        Description_F7: '',
        arraySystem: [],
        // maps: [],
        systemCheck: []
    });
    const systemCheck = ref([]);
    function takef(saNoa) {
        inputsystem.value = saNoa;

        const result = execute().then((result) => {
            noaNum.value = data.value;

            results.value = noaNum.value.forEach((item, index) => {
                let num = Number(inputsystem.value);

                if (item.NOA === num) {
                    systemData.manufacturer = item.Manufacturer;
                    systemData.material = item.Material;
                    systemData.Description_F1 = item.Description_F1;
                    systemData.Description_F2 = item.Description_F2;
                    systemData.Description_F3 = item.Description_F3;
                    systemData.Description_F4 = item.Description_F4;
                    systemData.Description_F5 = item.Description_F5;
                    systemData.Description_F6 = item.Description_F6;
                    systemData.Description_F7 = item.Description_F7;
                    systemData.designPressure = item.DesignPressure;
                    systemData.systemCheck = item.System;
                    console.log(systemData.systemCheck, item.System, systemData.systemCheck.length);
                    // if (systemData.systemCheck.length >= 3) {
                    //     console.log('Maps created');
                    //     systemData.maps = item.maps;
                    //     for (const [key] of Object.entries(systemData.maps)) {
                    //         systemData.arraySystem.push(`${key}`);
                    //         console.log(`${key}`);
                    //         // descriptionSAdata.value.push(`${value}`);
                    //     }
                    //     console.log(systemData.arraySystem);
                    // } else {
                    systemData.system = item.System;
                    systemData.description = item.Description;
                    // }

                    // systemData.expiration_date = item.Expiration_Date;
                    // systemData.System_F1 = item;
                    // System_F1.Underlayment_Uplift_Design_Pressure;
                    store.addData(systemData);
                    // area.value = '';
                    // type.value = '';
                    console.log(systemData, 'System added');
                }
            });
            return results;
        });
    }

    // 18061905

    return { inputsystem, takef, noaNum, error, results, ...toRefs(systemData), store };
}
