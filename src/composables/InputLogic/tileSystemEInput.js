import { usetilesysEStore } from '@/stores/tilesysEStore';
import { useAxios } from '@vueuse/integrations/useAxios';

import { reactive, ref, toRefs } from 'vue';

export default function useTileSystemE() {
    const inputsystem = ref();
    const effort = ref([]);
    const noaNum = ref([]);
    let res = ref([]);
    const store = usetilesysEStore();

    const error = ref('');

    let url = 'https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint/tilesysteme';

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

        const result = execute().then((result) => {
            noaNum.value = data.value;
            console.log(noaNum.value);

            Object.entries(noaNum.value.result).map((obj) => {
                let num = Number(inputsystem.value);
                //     // 23061202
                if (obj[1].NOA === num) {
                    systemDataE.manufacturer = obj[1].Manufacturer;
                    systemDataE.material = obj[1].Material;
                    systemDataE.Anchor_Base_Sheet_E1 = obj[1].Anchor_Base_Sheet_E1;
                    systemDataE.Anchor_Base_Sheet_E1 = obj[1].Anchor_Base_Sheet_E1;
                    systemDataE.Anchor_Base_Sheet_E2 = obj[1].Anchor_Base_Sheet_E2;
                    systemDataE.Anchor_Base_Sheet_E3 = obj[1].Anchor_Base_Sheet_E3;
                    systemDataE.Anchor_Base_Sheet_E4 = obj[1].Anchor_Base_Sheet_E4;
                    systemDataE.Anchor_Base_Sheet_E5 = obj[1].Anchor_Base_Sheet_E5;
                    systemDataE.Anchor_Base_Sheet_E6 = obj[1].Anchor_Base_Sheet_E6;
                    systemDataE.Anchor_Base_Sheet_E7 = obj[1].Anchor_Base_Sheet_E7;

                    systemDataE.TileCap_Sheet_Description_E1 = obj[1].TileCap_Sheet_Description_E1;
                    systemDataE.TileCap_Sheet_Description_E2 = obj[1].TileCap_Sheet_Description_E2;
                    systemDataE.TileCap_Sheet_Description_E3 = obj[1].TileCap_Sheet_Description_E3;
                    systemDataE.TileCap_Sheet_Description_E4 = obj[1].TileCap_Sheet_Description_E4;
                    systemDataE.TileCap_Sheet_Description_E5 = obj[1].TileCap_Sheet_Description_E5;
                    systemDataE.TileCap_Sheet_Description_E6 = obj[1].TileCap_Sheet_Description_E6;
                    systemDataE.TileCap_Sheet_Description_E7 = obj[1].TileCap_Sheet_Description_E7;
                    systemDataE.system = obj[1].System;
                    systemDataE.designPressure = obj[1].DesignPressure;
                    systemDataE.Maps = obj[1].Maps;
                    systemDataE.Anchor_Base_Sheet = obj[1].Anchor_Base_Sheet;
                    systemDataE.TileCap_Sheet_Description = obj[1].TileCap_Sheet_Description;
                    store.addData(systemDataE);
                    // area.value = '';
                    // type.value = '';
                    console.log('System added');
                }
            });

            return res;
        });
    }
    // 18061905
    return { inputsystem, getV, noaNum, error, res, ...toRefs(systemDataE), store };
}
