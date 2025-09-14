import { ref } from 'vue';

import useSlope from '@/composables/use-updateSlope';

export default function useTile(fn) {
    const { slopeCondition, isSlopeLessFour, isSlopeMoreFour } = useSlope();

    const isUDLValid = ref('');
    const isUDLNOAValid = ref('');
    const isSAValid = ref('');
    const underlaymentType = ref([
        { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
        { selectedBasesheet: 'Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
        { selectedBasesheet: '(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F', key: 2 },
        { selectedBasesheet: '(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E', key: 3 }
    ]);

    watch(selectedUnderlayment, () => {
        save.value = selectedUnderlayment.value.key;
        console.log(save.value);
        if (save.value === 1) {
            isTileValid.value = true;
            isUDLValid.value = false;
            isUDLNOAValid.value = false;
            isSAValid.value = false;
        } else if (save.value === 2) {
            isUDLValid.value = false;
            isUDLNOAValid.value = false;
            isSAValid.value = true;
        } else if (save.value === 3) {
            isUDLValid.value = true;
            isUDLNOAValid.value = true;
            isSAValid.value = true;
        } else if (save.value === 0) {
            isUDLValid.value = false;
            isUDLNOAValid.value = false;
            isSAValid.value = false;
            isTileValid.value = false;
        }
    });
    return { underlaymentType, underlaymentType };
}
