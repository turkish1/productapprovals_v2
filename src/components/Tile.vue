<script>
import { default as TileTable1, default as TileTable2, default as TileTable3 } from '@/components/TileTable.vue';
import { onMounted, ref, watch } from 'vue';
import AgreementsDialog from './AgreementsDialog.vue';

export default {
    components: {
        AgreementsDialog,
        TileTable1,
        TileTable2,

        TileTable3
    },

    setup() {
        const save = ref([]);
        const isDialog = ref(false);
        const exposure = ref('');
        onMounted(() => {
            isDialog.value = true;
        });
        const selectedDeck = ref();
        const type = ref([{ name: '--Select Deck Type--' }, { name: '- 5/8" Plywood -' }, { name: '- 3/4" Plywood -' }, { name: '- 1" x 6" T & G -' }, { name: '- 1" x 8" T & G -' }, { name: '- Existing 1/2" Plywood -' }]);
        const selectedUnderlayment = ref();

        const underlaymentType = ref([
            { selectedBasesheet: '-- Select Tile Capsheet/Underlayment --', key: 0 },
            { selectedBasesheet: 'Prescriptive ASTM #90 hot mopped with Type IV Asphalt to a mechanically fastened ASTM #30', key: 1 },
            { selectedBasesheet: '(S/A) Tile Capsheet adhered diretly to a wood deck, per the NOA System F', key: 2 },
            { selectedBasesheet: '(S/A) Tile Capsheet adhered to a mechanically fastened UDL/Anchor Sheet, per the NOA System E', key: 3 }
        ]);
        const slope = ref();
        const area = ref();
        const height = ref();
        const perimeter = ref();
        const underlaymentNOA = ref('');
        const saNOA = ref('');
        const isUDLValid = ref('');
        const isUDLNOAValid = ref('');
        const isSAValid = ref('');
        watch(selectedUnderlayment, () => {
            save.value = selectedUnderlayment.value.key;
            console.log(save.value);
            if (save.value === 1) {
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
            }
        });

        return { onMounted, underlaymentNOA, exposure, saNOA, isUDLNOAValid, isUDLValid, isSAValid, save, selectedUnderlayment, underlaymentType, selectedDeck, perimeter, type, slope, height, area };
    }
};
</script>
<template>
    <!-- <div class="flex flex-col md:flex-row gap-2" style="margin-left: 320px"> -->
    <AgreementsDialog v-show="isDialog === true"></AgreementsDialog>
    <div class="md:w-2/3" style="margin-left: 320px">
        <div class="card flex flex-col gap-5">
            <div class="container">
                <div class="w-64 mt-6 ..." style="margin-left: 20px">
                    <label for="slope">Slope</label><label class="px-2" style="color: red">*</label>
                    <InputText id="slope" v-model="slope" type="text" placeholder="slope" :invalid="slope === null" />
                </div>
                <div class="w-64 mt-6 ..." style="margin-left: 20px">
                    <label for="height">Height</label><label class="px-2" style="color: red">*</label>
                    <InputText id="height" v-model="height" type="text" placeholder="height" />
                </div>
                <div class="w-64 mt-6 ..." style="margin-left: 20px">
                    <label for="area">Area</label>
                    <InputText id="area" v-model="area" type="text" placeholder="area" />
                </div>
                <div class="w-64 mt-6 ..." style="margin-left: 20px">
                    <label for="perimeter">Roof Permeter(a) = 4h</label>
                    <InputText id="perimeter" v-model="perimeter" type="text" placeholder="perimeter" />
                </div>
                <div v-if="isUDLValid" class="w-64" style="margin-left: 20px">
                    <label for="underlaymentNOA">UDL Anchor Sheer NOA Number</label><label class="px-1" style="color: red">*</label>
                    <InputText id="underlaymentNOA" v-model="underlaymentNOA" type="text" placeholder=" " />
                </div>

                <div v-if="isSAValid" class="w-64" style="margin-left: 20px">
                    <label for="saNOA">S/A Tile Capsheet NOA Number</label><label class="px-1" style="color: red">*</label>
                    <InputText id="saNOA" v-model="saNOA" type="text" placeholder=" " />
                </div>

                <div class="card grid gap-4 grid-cols-1">
                    <label for="decktype">Select a Deck Type</label>
                    <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="make selection" />
                    <label for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
                    <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" />
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
    <Divider />
    <div class="card md:w-3/4 ql-container" style="margin-left: 200px">
        <div class="flex space-x-6 md:w-1/2">
            <div class="flex flex-col gap-2">
                <label for="tilenoa">Tile Noa</label>
                <InputText id="tilenoa" v-model="tilenoa" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="manufacturer">Tile Manufacturer</label>
                <InputText id="manufacturer" v-model="manufacturer" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="material">Tile Material</label>
                <InputText id="material" v-model="material" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="description">Description</label>
                <InputText id="description" v-model="description" aria-describedby="username-help" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="systemnumber">System Number</label>
                <InputText id="systemnumber" v-model="systemnumber" aria-describedby="username-help" />
            </div>
        </div>
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
            <div class="flex flex-col gap-2">
                <label for="designpressure">Design psf:</label>
                <InputText id="designpressure" v-model="designpressure" aria-describedby="username-help" />
            </div>

            <div class="flex flex-col gap-2">
                <label for="expiredate_sa">Expiration Date:</label>
                <InputText id="expiredate_sa" v-model="expiredate_sa" aria-describedby="username-help" />
            </div>
        </div>
        <Divider />
        <div class="flex flex-wrap gap-4" style="margin-left: 390px">
            <label>Select Exposure</label>
            <div class="flex items-center">
                <RadioButton v-model="exposure" inputId="C" name="exposureC" value="C" />
                <label for="exposureC" class="ml-2">C</label>
            </div>
            <div class="flex items-center">
                <RadioButton v-model="exposure" inputId="D" name="exposureD" value="D" />
                <label for="exposureD" class="ml-2">D</label>
            </div>
            <div class="container flex flex-wrap gap-1">
                <TileTable1 style="margin-left: 40px" />
                <TileTable2 style="margin-left: 40px" />
                <TileTable3 style="margin-left: 40px" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 3px;
    padding-top: 1px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 200px;
    min-width: 150px;
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
