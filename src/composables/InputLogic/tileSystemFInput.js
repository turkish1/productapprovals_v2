import { usetilesysfStore } from '@/stores/tilesysfStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemF() {
    const inputsystem = ref();
    const effort = ref([]);
    const noaNum = ref();
    let results = ref([]);
    const store = usetilesysfStore();

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

            Object.entries(noaNum.value.result).map((obj) => {
                let num = Number(inputsystem.value);
                //     // 23061202
                if (obj[1].NOA === num) {
                    systemData.manufacturer = obj[1].Manufacturer;
                    systemData.material = obj[1].Material;

                    systemData.Description_F1 = obj[1].TileCap_Sheet_Description_F1;
                    systemData.Description_F2 = obj[1].TileCap_Sheet_Description_F2;
                    systemData.Description_F3 = obj[1].TileCap_Sheet_Description_F3;
                    systemData.Description_F4 = obj[1].TileCap_Sheet_Description_F4;
                    systemData.Description_F5 = obj[1].TileCap_Sheet_Description_F5;
                    systemData.Description_F6 = obj[1].TileCap_Sheet_Description_F6;
                    systemData.Description_F7 = obj[1].TileCap_Sheet_Description_F7;
                    systemData.designPressure = obj[1].DesignPressure;
                    systemData.system = obj[1].System;
                    store.addData(systemData);
                    // area.value = '';
                    // type.value = '';
                    console.log('System added');
                }
            });

            return results;
        });
    }

    // 18061905

    return { inputsystem, takef, noaNum, results, error, ...toRefs(systemData), store };
}
