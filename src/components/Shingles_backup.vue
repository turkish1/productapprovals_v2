<script>
// import useDrip from '@/composables/use-dripedge.js';
import { onMounted, ref } from 'vue';
import AgreementsDialogShingle from './AgreementsDialogShingle.vue';
import InputItems from './InputItems.vue';
export default {
    components: {
        AgreementsDialogShingle,
        InputItems
    },

    setup() {
        onMounted(() => {
            isDialog.value = true;
        });

        function valueEntered(n) {
            slope.value = n;
            console.log('clicked: ', slope.value);
        }
        const selectedDeck = ref();
        const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
        const slope = ref();
        const area = ref();
        const height = ref();
        const isDialog = ref(false);
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
            // slopes,
            // isSlopeLessFour,
            // isSlopeMoreFour,
            // isSelectVisible1,
            // isSelectVisible2,
            // typeSize,
            selectDripEdgeSize,
            // hold,
            // types,
            // error,
            // holdSize,
            selectDripEdge,
            isDialog,
            selectedDeck,
            type,
            slope,
            height,
            area
            // slopetypeless,
            // slopetypemore
        };
    }
};
</script>
<template>
    <AgreementsDialogShingle v-show="isDialog === true"></AgreementsDialogShingle>
    <!-- <div class="flex flex-col md:flex-row gap-8" style="margin-left: 320px">
        <div class="md:w-3/4">
            <div class="card flex flex-col gap-4">
                <div class="container">
                    <div class="card flex justify-left">
                        <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" />
                    </div>
                    <div class="w-64" style="margin-left: 20px">
                        <label for="slope">Slope</label><label class="px-1" style="color: red">*</label>
                        <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" />
                    </div>
                    <div class="w-64" style="margin-left: 20px">
                        <label for="height">Height</label><label class="px-1" style="color: red">*</label>
                        <InputText id="height" v-model="height" type="text" placeholder="height" />
                    </div>
                    <div class="w-64" style="margin-left: 20px">
                        <label for="area">Area</label>
                        <InputText id="area" v-model="area" type="text" placeholder="area" />
                    </div>
                    <div v-show="isSelectVisible1" class="card w-96 grid gap-4 grid-cols-1">
                        <label>Select Underlayment (UDL)</label><label class="px-1" style="color: red">*</label>
                        <Select ref="selectedAttachment" v-model="isSlopeLessFour" :options="slopetypeless" placeholder="make selection" />
                    </div>
                    <div v-show="isSelectVisible2" class="card w-96 grid gap-4 grid-cols-1">
                        <label>Select Underlayment (S/A)</label> <label class="px-1" style="color: red">*</label>
                        <Select ref="selectedAttachment" v-model="isSlopeMoreFour" :options="slopetypemore" placeholder="make selection" />
                    </div>

                    <div class="card w-96 grid gap-4 grid-cols-1">
                        <label>Drip Edge Material</label>
                        <Select ref="selectedValue" v-model="selectDripEdge" :options="types" placeholder="make selection" />

                        <label>Drip Edge Size</label>
                        <Select v-model="selectDripEdgeSize" :options="typeSize" placeholder="make selection" />
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="card md:w-1/2 ql-container" style="margin-left: 200px">
        <input-items @value-entered="valueEntered" style="margin-left: 20px"></input-items>
    </div>

    <Divider />

    <div class="card md:w-3/4 ql-container" style="margin-left: 200px">
        <div class="flex space-x-4 md:w-1/4">
            <div v-show="isUDLNOAValid" class="flex space-x-4 md:w-1/4">
                <div class="flex flex-col gap-2">
                    <label for="manufacturer">(UDL) NOA Applicant</label>
                    <InputText id="manufacturer" v-model="manufacturer" aria-describedby="username-help" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="material">(UDL) Material</label>
                    <InputText id="material" v-model="material" aria-describedby="username-help" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="description">(UDL) Description</label>
                    <InputText id="description" v-model="description" aria-describedby="username-help" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="expiredate_sa">Expiration Date:</label>
                    <InputText id="expiredate_sa" v-model="expiredate_sa" aria-describedby="username-help" />
                </div>
            </div>

            <div v-show="isSAValid" class="flex space-x-4 md:w-1/4">
                <div class="flex flex-col gap-2">
                    <label for="saapplicant">S/A Applicant</label>
                    <InputText id="saapplicant" v-model="saapplicant" aria-describedby="username-help" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="samaterial">S/A Material Type</label>
                    <InputText id="saaterial" v-model="samaterial" aria-describedby="username-help" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="sadescription">S/A Description</label>
                    <InputText id="sadescription" v-model="sadescription" aria-describedby="username-help" />
                </div>
                <!-- <div class="flex flex-col gap-2">
                <label for="designpressure">Design psf:</label>
                <InputText id="designpressure" v-model="designpressure" aria-describedby="username-help" />
            </div> -->

                <!-- <div class="flex flex-col gap-2">
                <label for="expiredate_sa">Expiration Date:</label>
                <InputText id="expiredate_sa" v-model="expiredate_sa" aria-describedby="username-help" />
            </div> -->
            </div>
            <Divider />
            <div class="flex flex-col gap-2">
                <label for="tilenoa">Shingle Noa</label>
                <InputText id="tilenoa" v-model="tilenoa" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="manufacturer">Manufacturer</label>
                <InputText id="manufacturer" v-model="manufacturer" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="material"> Material</label>
                <InputText id="material" v-model="material" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="description">Description</label>
                <InputText id="description" v-model="description" aria-describedby="username-help" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 300px;
    /* min-width: 600px; */
    top: 10vh;
}

.ql-container {
    padding-bottom: 30px;
    padding-top: 12px;
    padding-right: 30px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 250px;
    /* min-width: 250px; */
    top: 10vh;
}
</style>
