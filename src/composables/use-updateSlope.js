//use-updateSlope.js
import { reactive, ref } from 'vue';

export default function useSlope(fn) {
    const isSlopeLessFour = ref(false);
    const isSelectVisible1 = ref(false);
    const isSelectVisible2 = ref(false);
    const slopetypeless = ref([]);
    const slopetypemore = ref([]);
    const slopes = ref(fn);
    const slopeNumber = ref();
    const isSlopeMoreFour = ref(false);

    const slopeCondition = reactive({
        slope_less_4: [
            ' -- Select Underlayment -- ',
            'ASTM #30 2 Plies with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c',
            'Polypropylene 2 Plies with 19" headlap, fastened 6" o/c @ Laps & 1 row 12" o/c',
            '(S/A) membrane adhered directly to a wood deck, per the NOA system F'
        ],
        slope_more_4: [
            '  -- Select Underlayment/Basesheet -- ',
            'ASTM #30 1 Ply with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c',
            'Polypropylene 1 Ply with 4" headlap, fastened 6" o/c @ Laps 2 rows 12" o/c',
            '(S/A) membrane adhered directly to a wood deck, per the NOA system F'
        ]
    });
    function validateSlope() {
        if (slopes.value) {
            slopeNumber.value = Number(slopes.value);

            if (slopeNumber.value > 4 && slopeNumber.value <= 12) {
                isSlopeValid.value = true;
                isSlopeMoreFour.value = true;
                isSelectVisible2.value = true;
                isSelectVisible1.value = false;
            }
            if (slopeNumber.value >= 2 && slopeNumber.value <= 4) {
                console.log('Entered on 3: ', slopeNumber.value, isSelectVisible1.value);
                isSlopeValid.value = true;
                isSlopeLessFour.value = true;
                isSelectVisible1.value = true;
                isSelectVisible2.value = false;
            }
            if (slopeNumber.value < 2) {
                isSlopeValid.value = false;
            }
        } else {
            console.log('Not Mounted');
        }
    }
    return { slopes, validateSlope, slopetypemore, slopetypeless, slopeNumber, slopeCondition, isSlopeLessFour, isSlopeMoreFour, isSelectVisible1, isSelectVisible2 };
}
