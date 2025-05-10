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

    let url = 'https://jmw33q400d.execute-api.us-east-1.amazonaws.com/systemFstaging';
    // ('https://t0bxt7ukv8.execute-api.us-east-1.amazonaws.com/systemfdev');

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
        Description_F8: '',
        Description_F9: '',
        arraySystem: [],
        // maps: [],
        systemCheck: [],
        slope: 0,
        height: 0,
        dripEdgeMaterial: [],
        dripEdgeSize: [],
        deckType: '',
        expiration_date: '',
        prescriptiveSelection: ''
    });
    const systemCheck = ref([]);
    function takef(saNoa) {
        inputsystem.value = saNoa;
        num.value = Number(inputsystem.value);

        console.log(num.value);
        fetchData();
    }

    const fetchData = async () => {
        try {
            const response = await execute({ params: { NOA: num.value } }).then((response) => {
                noaNum.value = data.value;

                return noaNum.value;
            });

            console.log(response.length);
            if (response.length === 0) {
                alert('No data found!');
            } else {
                console.log(noaNum.value);
                systemData.noa = noaNum.value[0].NOA;
                systemData.manufacturer = noaNum.value[0].Manufacturer;
                systemData.material = noaNum.value[0].Material;

                systemData.Description_F1 = noaNum.value[0].TileCap_Sheet_Description_F1;
                systemData.Description_F2 = noaNum.value[0].TileCap_Sheet_Description_F2;
                systemData.Description_F3 = noaNum.value[0].TileCap_Sheet_Description_F3;
                systemData.Description_F4 = noaNum.value[0].TileCap_Sheet_Description_F4;
                systemData.Description_F5 = noaNum.value[0].TileCap_Sheet_Description_F5;
                systemData.Description_F6 = noaNum.value[0].TileCap_Sheet_Description_F6;
                systemData.Description_F7 = noaNum.value[0].TileCap_Sheet_Description_F7;
                systemData.Description_F8 = noaNum.value[0].TileCap_Sheet_Description_F8;
                systemData.Description_F9 = noaNum.value[0].TileCap_Sheet_Description_F9;
                systemData.designPressure = noaNum.value[0].DesignPressure;
                systemData.system = noaNum.value[0].System;
                store.addData(systemData);
                // area.value = '';
                // type.value = '';
                console.log('System added');
            }
        } catch (error) {
            console.log('Error, fectching data', error);
            alert('An error occurred while fetching data.');
        }
        return results;
    };

    // 18061905

    return { inputsystem, takef, noaNum, results, error, ...toRefs(systemData), store };
}
