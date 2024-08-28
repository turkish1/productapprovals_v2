import { usesystemfStore } from '@/stores/systemfStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemE() {
    const inputsystem = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let results = ref([]);
    const store = usesystemfStore();

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilesysteme';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const systemData = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: [],
        designPressure: [],
        Anchor_Base_Sheet: [],
        TileCap_Sheet_Description: [],
        TileCap_Sheet_Description_E1: '',
        TileCap_Sheet_Description_E2: '',
        TileCap_Sheet_Description_E3: '',
        TileCap_Sheet_Description_E4: '',
        TileCap_Sheet_Description_E5: '',
        TileCap_Sheet_Description_E6: '',
        TileCap_Sheet_Description_E7: '',
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
                    systemData.TileCap_Sheet_Description_E1 = item.TileCap_Sheet_Description_E1;
                    systemData.TileCap_Sheet_Description_E2 = item.TileCap_Sheet_Description_E2;
                    systemData.TileCap_Sheet_Description_E3 = item.TileCap_Sheet_Description_E3;
                    systemData.TileCap_Sheet_Description_E4 = item.TileCap_Sheet_Description_E4;
                    systemData.TileCap_Sheet_Description_E5 = item.TileCap_Sheet_Description_E5;
                    systemData.TileCap_Sheet_Description_E6 = item.TileCap_Sheet_Description_E6;
                    systemData.TileCap_Sheet_Description_E7 = item.TileCap_Sheet_Description_E7;
                    systemData.systemCheck = item.System;
                    systemData.designPressure = item.DesignPressure;

                    systemData.Anchor_Base_Sheet = item.Anchor_Base_Sheet;
                    systemData.TileCap_Sheet_Description = item.TileCap_Sheet_Description;
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
                    //     systemData.system = item.System;
                    //     systemData.description = item.Description;
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
