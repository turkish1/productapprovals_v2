import { usetilesysEStore } from '@/stores/tilesysEStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemE() {
    const inputsystem = ref();
    const num = ref();
    const noaNum = ref([]);
    let res = ref([]);
    const store = usetilesysEStore();

    const error = ref('');

    let url = 'https://q7pzfsbv8f.execute-api.us-east-1.amazonaws.com/systeme/systeme';

    const { execute, then, data } = useAxios(url, { method: 'GET' }, { immediate: false });

    const systemDataE = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: [],
        designPressure: [],
        Anchor_Base_Sheet: [],
        Anchor_Base_Sheet_E1: '',
        Anchor_Base_Sheet_E2: '',
        Anchor_Base_Sheet_E3: '',
        Anchor_Base_Sheet_E4: '',
        Anchor_Base_Sheet_E5: '',
        Anchor_Base_Sheet_E6: '',
        Anchor_Base_Sheet_E7: '',
        TileCap_Sheet_Description: [],
        TileCap_Sheet_Description_E1: '',
        TileCap_Sheet_Description_E2: '',
        TileCap_Sheet_Description_E3: '',
        TileCap_Sheet_Description_E4: '',
        TileCap_Sheet_Description_E5: '',
        TileCap_Sheet_Description_E6: '',
        TileCap_Sheet_Description_E7: '',
        arraySystem: [],
        Maps: [],
        systemCheck: []
    });
    const systemCheck = ref([]);

    function getV(saNo) {
        inputsystem.value = saNo;
        console.log(inputsystem.value, saNo);
        num.value = Number(inputsystem.value);
        const result = execute({ params: { NOA: num.value } }).then((result) => {
            noaNum.value = data.value;

            // Object.entries(noaNum.value.result).map((obj) => {
            // let num = Number(inputsystem.value);
            //     // 23061202
            // if (noaNum.value[0].NOA === num) {
            systemDataE.manufacturer = noaNum.value[0].Manufacturer;
            systemDataE.material = noaNum.value[0].Material;
            systemDataE.Anchor_Base_Sheet_E1 = noaNum.value[0].Anchor_Base_Sheet_E1;
            systemDataE.Anchor_Base_Sheet_E1 = noaNum.value[0].Anchor_Base_Sheet_E1;
            systemDataE.Anchor_Base_Sheet_E2 = noaNum.value[0].Anchor_Base_Sheet_E2;
            systemDataE.Anchor_Base_Sheet_E3 = noaNum.value[0].Anchor_Base_Sheet_E3;
            systemDataE.Anchor_Base_Sheet_E4 = noaNum.value[0].Anchor_Base_Sheet_E4;
            systemDataE.Anchor_Base_Sheet_E5 = noaNum.value[0].Anchor_Base_Sheet_E5;
            systemDataE.Anchor_Base_Sheet_E6 = noaNum.value[0].Anchor_Base_Sheet_E6;
            systemDataE.Anchor_Base_Sheet_E7 = noaNum.value[0].Anchor_Base_Sheet_E7;

            systemDataE.TileCap_Sheet_Description_E1 = noaNum.value[0].TileCap_Sheet_Description_E1;
            systemDataE.TileCap_Sheet_Description_E2 = noaNum.value[0].TileCap_Sheet_Description_E2;
            systemDataE.TileCap_Sheet_Description_E3 = noaNum.value[0].TileCap_Sheet_Description_E3;
            systemDataE.TileCap_Sheet_Description_E4 = noaNum.value[0].TileCap_Sheet_Description_E4;
            systemDataE.TileCap_Sheet_Description_E5 = noaNum.value[0].TileCap_Sheet_Description_E5;
            systemDataE.TileCap_Sheet_Description_E6 = noaNum.value[0].TileCap_Sheet_Description_E6;
            systemDataE.TileCap_Sheet_Description_E7 = noaNum.value[0].TileCap_Sheet_Description_E7;
            systemDataE.system = noaNum.value[0].System;
            systemDataE.designPressure = noaNum.value[0].DesignPressure;
            systemDataE.Maps = noaNum.value[0].Maps;
            systemDataE.Anchor_Base_Sheet = noaNum.value[0].Anchor_Base_Sheet;
            systemDataE.TileCap_Sheet_Description = noaNum.value[0].TileCap_Sheet_Description;
            store.addData(systemDataE);
            // area.value = '';
            // type.value = '';
            console.log('System added');
            //     }
            // });
        });
    }
    // 18061905
    return { inputsystem, getV, noaNum, error, ...toRefs(systemDataE), store };
}
