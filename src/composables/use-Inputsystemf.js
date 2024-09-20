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
        arraySystem: [],
        maps: [],
        systemCheck: []
    });
    const systemCheck = ref([]);
    function takef(saNoa) {
        inputsystem.value = saNoa;
        num.value = Number(inputsystem.value);
        const result = execute({ params: { NOA: num.value } }).then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value);
            // results.value = noaNum.value.forEach((noaNum.value[0], index) => {
            // let num = Number(inputsystem.value);

            // if (noaNum.value[0].NOA === num) {

            systemData.manufacturer = noaNum.value[0].Manufacturer;
            systemData.material = noaNum.value[0].Material;
            systemData.Description_F1 = noaNum.value[0].Description_F1;
            systemData.Description_F2 = noaNum.value[0].Description_F2;
            systemData.Description_F3 = noaNum.value[0].Description_F3;
            systemData.Description_F4 = noaNum.value[0].Description_F4;
            systemData.Description_F5 = noaNum.value[0].Description_F5;
            systemData.Description_F6 = noaNum.value[0].Description_F6;
            systemData.Description_F7 = noaNum.value[0].Description_F7;
            systemData.systemCheck = noaNum.value[0].System;
            if (systemData.systemCheck.length >= 3) {
                console.log('Maps created');
                systemData.maps = noaNum.value[0].Maps;
                console.log(noaNum.value[0].Maps);
                for (const [key] of Object.entries(systemData.maps)) {
                    systemData.arraySystem.push(`${key}`);
                    console.log(`${key}`);
                    // descriptionSAdata.value.push(`${value}`);
                }
                console.log(systemData.arraySystem);
            } else {
                systemData.system = noaNum.value[0].System;
                systemData.description = noaNum.value[0].Description;
            }

            // systemData.expiration_date = noaNum.value[0].Expiration_Date;
            // systemData.System_F1 = noaNum.value[0];
            // System_F1.Underlayment_Uplift_Design_Pressure;
            store.addData(systemData);
            // area.value = '';
            // type.value = '';
            console.log(systemData, 'System added');
            //     }
            // });
            return results;
        });
    }

    // 18061905

    return { inputsystem, takef, noaNum, error, results, ...toRefs(systemData), store };
}
