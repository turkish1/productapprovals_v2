import { usetilesysfStore } from '@/stores/tilesysfStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemF() {
    const inputsystem = ref();
    const num = ref();
    const noaNum = ref();
    let results = ref([]);
    const store = usetilesysfStore();

    const error = ref('');

    let url = 'https://9vevtvy376.execute-api.us-east-1.amazonaws.com/systemf/systemf';

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
        num.value = Number(inputsystem.value);
        const result = execute({ params: { NOA: num.value } }).then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value[0]);
            // Object.entries(noaNum.value.result).map((obj) => {
            //     let num = Number(inputsystem.value);
            //     //     // 23061202
            //     if (noaNum.value[0].NOA === num) {
            systemData.manufacturer = noaNum.value[0].Manufacturer;
            systemData.material = noaNum.value[0].Material;

            systemData.Description_F1 = noaNum.value[0].TileCap_Sheet_Description_F1;
            systemData.Description_F2 = noaNum.value[0].TileCap_Sheet_Description_F2;
            systemData.Description_F3 = noaNum.value[0].TileCap_Sheet_Description_F3;
            systemData.Description_F4 = noaNum.value[0].TileCap_Sheet_Description_F4;
            systemData.Description_F5 = noaNum.value[0].TileCap_Sheet_Description_F5;
            systemData.Description_F6 = noaNum.value[0].TileCap_Sheet_Description_F6;
            systemData.Description_F7 = noaNum.value[0].TileCap_Sheet_Description_F7;
            systemData.designPressure = noaNum.value[0].DesignPressure;
            systemData.system = noaNum.value[0].System;
            store.addData(systemData);
            // area.value = '';
            // type.value = '';
            console.log('System added');
            //     }
            // });

            return results;
        });
    }

    // 18061905

    return { inputsystem, takef, noaNum, results, error, ...toRefs(systemData), store };
}
