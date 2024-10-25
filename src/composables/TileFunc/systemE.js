import { usetilesysEStore } from '@/stores/tilesysEStore';

import useTileSystemE from '@/composables/InputLogic/tileSystemEInput';
import { reactive, ref } from 'vue';

export default function useUDL() {
    const udlTiles = reactive({
        noa: '',
        manufacturer: '',
        material: '',
        system: [],
        designPressure: [],
        Anchor_Base_Sheet: [],
        TileCap_Sheet_Description: [],
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
        arrDesignPressure: [],
        systemSelected: '',
        dP: '',
        tileCap: '',
        Anchor_Base: ''
    });
    const etileStore = usetilesysEStore();
    const { inputsystem, getV, noaNum, error, systemDataE } = useTileSystemE();
    let Edatamounted = ref(etileStore.$state.tilesysEinput);

    function EcheckInput() {
        if (Edatamounted.value.length !== null) {
            Edatamounted.value.forEach((item, index) => {
                console.log(item);
                udlTiles.noa = item.systemDataE.noa;
                udlTiles.manufacturer = item.systemDataE.manufacturer;
                udlTiles.material = item.systemDataE.material;
                udlTiles.system = item.systemDataE.system;
                udlTiles.Anchor_Base_Sheet = item.systemDataE.Anchor_Base_Sheet;
            });
            console.log(Edatamounted.value);
        }
    }

    return { EcheckInput, Edatamounted, udlTiles, etileStore, inputsystem, getV, noaNum, error, systemDataE };
}
