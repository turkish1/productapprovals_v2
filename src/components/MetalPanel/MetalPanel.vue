<template>
    <div id="tile" class="flex flex-col md:w-1/2 gap-2 shadow-lg shadow-cyan-800" style="margin-left: 500px; margin-top: 250px">
        <form @submit.prevent="submitPage">
            <section class="space-y-4">
                <h2 class="text-xl font-semibold">Metal Roof Panels Application</h2>

                <div class="w-64 gap-2 mt-3 space-y-2" style="margin-left: 20px; margin-top: 30px">
                    <Select v-model="selectedDeck" :options="type" optionLabel="name" placeholder="Select a Deck Type" class="w-full md:w-56" @change="getdeckType" />
                </div>
                <!-- v-model.number="dims.slope" v-model="dims.area" v-model="dims.per"-->
                <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
                    <label for="slope">Roof Slope</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
                    <InputText id="slope" v-tooltip.bottom="'Press Tab after value'" placeholder="slope" :disabled="isDisabledslope" @change="validateRoofSlope" />
                    <Message v-if="errorMessage" class="w-96 mt-1 ..." severity="error" :life="6000" style="margin-left: 2px">{{ errorMessage }}</Message>
                </div>

                <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
                    <label style="color: #122620" for="area">Area of Tile</label>
                    <InputText id="area" type="text" placeholder="area" />
                </div>

                <div class="w-64 mt-6 space-y-2" style="margin-left: 20px">
                    <label for="height">Height</label><label class="px-2" style="color: red">*</label> <i class="pi pi-check" v-show="isvalueValid" style="color: green; font-size: 1.2rem" @change="addCheckmarks"></i>&nbsp;
                    <InputText id="height" v-tooltip.bottom="'Press Tab after value'" v-model.number="heightModel" type="text" placeholder="height" @input="setRoofInputs" :disabled="isDisabled" @change="validateHeight" />
                    <Message v-if="errorHeightMessage" class="w-96 mt-1" severity="error" :life="6000" style="margin-left: 2px">{{ errorHeightMessage }}</Message>
                </div>
                <div class="w-64 mt-3 ..." style="margin-left: 20px">
                    <label for="perimeter">Roof Permeter(a) = 4h</label>
                    <InputText id="perimeter" type="text" placeholder=" " @change="setRoofInputs" />
                </div>
                <div></div>
                <div class="md:w-1/2 flex flex-col w-96 mb-4 gap-2 border-2 border-gray-700 focus:border-orange-600" style="margin-left: 20px">
                    <label style="color: #122620" for="underlaymentType">Select Underlayment (UDL) and/or Tile Capsheet</label>
                    <Select v-model="selectedUnderlayment" :options="underlaymentType" optionLabel="selectedBasesheet" placeholder="make selection" @change="checkInputSystem" />
                </div>
                <div class="flex justify-center mt-6 gap-4">
                    <button type="reset" class="btn">Reset</button>
                    <button type="submit" class="btn btn-primary">Confirm</button>
                </div>
            </section>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
    processNumber: 'me2024000123',
    jobAddress: '5680 SW 87 Ave',
    roofArea: '',
    meanHeight: '',
    slope: '',
    deckType: '',
    noa: Array(8).fill(''),
    agreePanelTerms: false
});

const deckOptions = {
    deck58: '5/8" Plywood',
    deck1932: '19/32" Plywood',
    deck34: '3/4" Plywood',
    DECK_TYPE4: '1" x 6" T&G',
    DECK_TYPE5: '1" x 8" T&G',
    DECK_TYPE6: 'Existing 1/2" Plywood'
};

function autoTab(index) {
    const next = document.querySelectorAll('input')[index + 1];
    if (next) next.focus();
}

function submitPage() {
    if (!form.agreePanelTerms) {
        alert('You must agree to the PANEL terms in order to proceed.');
        return;
    }

    if (form.noa.some((val) => val.trim() === '')) {
        alert('Please enter a complete NOA number.');
        return;
    }

    // Submit logic goes here...
    console.log('Form submitted', JSON.stringify(form));
}
</script>

<style scoped>
.input {
    border: 1px solid #ccc;
    padding: 0.4rem;
    font-size: 1rem;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
}
.btn {
    background-color: #ccc;
    padding: 0.5rem 1.2rem;
    border-radius: 4px;
}
.btn-primary {
    background-color: #4caf50;
    color: white;
}
</style>
