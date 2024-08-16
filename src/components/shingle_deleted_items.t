



const selectedDeck = ref();
        const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);

const { types, typeSize, holdSize } = useDripSize;

 const selectedValue = ref(null);
 // const { hold, types, error, holdSize, typeSize } = useDripSize();
        // const { slopes, slopetypeless, slopetypemore, isSlopeLessFour, isSlopeMoreFour, isSelectVisible1, validateSlope, isSelectVisible2 } = useSlope(slope.value);
        const selectDripEdge = ref();
        const selectDripEdgeSize = ref();
        const selectedless = ref();
        const selectedmore = ref();

        const selectedAttachment = ref(null);

        // watchEffect(() => {
        //     if (selectedValue.value) {
        //         if (selectedValue.value.label === 'Galvanized Steel Metal ¹') {
        //             typeSize.value = holdSize.value.size1;
        //         }
        //         if (selectedValue.value.label === 'Stainless Steel Metal ²') {
        //             typeSize.value = holdSize.value.size2;
        //         }
        //         if (selectedValue.value.label === 'Aluminum Metal ³') {
        //             typeSize.value = holdSize.value.size3;
        //         }
        //         if (selectedValue.value.label === 'Copper Metal ⁴') {
        //             typeSize.value = holdSize.value.size4;
        //         }
        //     } else {
        //         console.log('The element not mounted yet');
        //     }

        // });



        return {
            valueEntered,
            onMounted,
            selectedValue,
            selectedAttachment,
            selectedless,
            selectedmore,

            selectDripEdgeSize,

            selectDripEdge,
            isDialog,
            selectedDeck,
            type,
            slope,
            height,
            area

        };
