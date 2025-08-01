<template>
    <div id="tile" class="flex flex-col w-full gap-2 shadow-lg shadow-cyan-800" style="margin-left: 10px">
        <h2 class="text-xl font-bold mb-4">mEPermit Metal Roof Panels</h2>

        <div class="mb-4">
            <label class="block font-semibold">Job Address</label>
            <input v-model="form.jobAddress" readonly class="input" />
        </div>

        <div class="mb-4">
            <label class="block font-semibold">Roof Area (ft²)</label>
            <input v-model="form.roofwidth" class="input" type="number" />
        </div>

        <div class="mb-4">
            <label class="block font-semibold">Roof Mean Height (ft)</label>
            <input v-model="form.roofMeanHeight" class="input" type="number" />
        </div>

        <div class="mb-4">
            <label class="block font-semibold">Roof Slope</label>
            <input v-model="form.roofSlope" class="input" placeholder="e.g. 2" />
        </div>

        <div class="mb-4">
            <label class="block font-semibold">NOA Number</label>
            <div class="flex gap-2">
                <input v-for="(segment, i) in form.noa" :key="i" v-model="form.noa[i]" @input="autoTab(i)" maxlength="1" class="input w-12 text-center" />
            </div>
        </div>

        <div class="mb-4">
            <label class="inline-flex items-center">
                <input type="checkbox" v-model="form.panelTerm" />
                <span class="ml-2">I agree to the panel terms</span>
            </label>
        </div>

        <div class="mt-6">
            <button class="btn-primary" type="submit">Submit</button>
        </div>
        <DripEdMechTile />
        <div v-show="isUDLNOAValid" class="w-96" style="margin-left: 2px">
            <systemENumber @keydown.tab.exact.stop="sysEcheckInput" />
        </div>
        <div v-show="isSAValid" class="w-96" style="margin-left: 2px">
            <systemFNumber @keydown.tab.exact.stop="checkInputSA" />
        </div>
        <div v-show="isTileValid" class="w-128" style="margin-left: 3px">
            <div v-animateonscroll="{ enterClass: 'animate-flipup', leaveClass: 'animate-fadeout' }" class="flex animate-duration-2000 animate-ease-in-out">
                <div class="autocomplete">
                    <div class="w-128 gap-2 mt-3 space-y-2 mb-4" style="margin-left: 20px">
                        <FloatLabel>
                            <InputText
                                id="tilenoa"
                                v-tooltip.bottom="'Press Tab after value'"
                                v-model="query"
                                inputId="ac"
                                @focus="showSuggestions = true"
                                @blur="hideSuggestions"
                                @input="onInput"
                                @click="grabInput"
                                @keydown.tab.exact.stop="checkInput"
                            />
                            <label for="ac">Tile NOA: 00000000</label>
                        </FloatLabel>
                    </div>
                    <!-- Suggestions list -->
                    <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
                        <li v-for="(suggestion, index) in filteredSuggestions" :key="index" @mousedown="selectSuggestion(suggestion)">
                            {{ suggestion }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
    jobAddress: '5680 sw 87 ave',
    roofwidth: '',
    roofMeanHeight: '',
    roofSlope: '',
    noa: ['', '', '', '', '', '', '', ''],
    panelTerm: false
});

function autoTab(index) {
    return (event) => {
        if (event.target.value.length === 1 && index < form.noa.length - 1) {
            const next = document.querySelectorAll('input')[index + 1];
            if (next) next.focus();
        }
    };
}

function submitForm() {
    if (form.noa.some((n) => n === '')) {
        alert('Please complete the NOA number.');
        return;
    }

    if (!form.panelTerm) {
        alert('You must agree to the panel terms to proceed.');
        return;
    }

    // Final data structure (you can adjust as needed)
    const payload = {
        noa: form.noa.join(''),
        jobAddress: form.jobAddress,
        roofwidth: form.roofwidth,
        roofMeanHeight: form.roofMeanHeight,
        roofSlope: form.roofSlope,
        panelTerm: form.panelTerm
    };

    console.log('Submitting...', payload);
    // You can use `fetch` or `axios` to send this to your backend
}
</script>

<style scoped>
.input {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 4px;
}
.btn-primary {
    background-color: #004d99;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}
</style>
