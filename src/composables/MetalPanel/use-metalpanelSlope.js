import { reactive, ref } from 'vue';

export default function usemetalSlope(fn) {
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
            '2 plies ASTM #30 with a 19" head, lap use 1 ¼" RS Nails &amp; Tin Caps 6" o/c @ Laps &amp; 1 row 12" o/c',
            '2 plies NOA UDL with a 19" headlap, lap use 1 ¼" RS Nails &amp; Tin Caps 6" o/c @ Laps &amp; 1 row 12" o/c',
            '(S/A) membrane adhered directly to a wood deck, per MDC NOA system F',
            '(S/A) membrane, adhered to a fastened base/anchor sheet per MDC NOA'
        ],
        slope_more_4: [
            '  -- Select Underlayment/Basesheet -- ',
            '1 ply ASTM #30 with a 4" headlap lap use 1 ¼" RS Nails &amp; Tin Caps 6" o/c @ Laps &amp; 2 rows 12" o/c',
            '1 ply NOA UDL, lap use 1 ¼" RS Nails &amp; Tin Caps 6" o/c @ Laps &amp; 2 rows 12" o/c',
            '(S/A) membrane adhered directly to a wood deck, per MDC NOA system F',
            '(S/A) membrane, adhered to a fastened base/anchor sheet per MDC NOA'
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
