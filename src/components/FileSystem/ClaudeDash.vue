<template>
    <div class="max-w-4xl mx-auto p-6">
        <div v-if="results" class="grid gap-6 md:grid-cols-3">
            <div :class="cardStyle(results.owner_check.passed)">
                <h3 class="font-bold">Property Owner</h3>
                <p class="text-sm mt-2">{{ results.owner_check.details }}</p>
                <div class="mt-4 text-xs font-mono bg-white/50 p-2 rounded">Extracted: {{ results.owner_check.found_data.name }}</div>
            </div>

            <div :class="cardStyle(results.contractor_check.passed)">
                <h3 class="font-bold">Contractor License</h3>
                <p class="text-sm mt-2">{{ results.contractor_check.details }}</p>
                <div class="mt-4 text-xs font-mono bg-white/50 p-2 rounded">Status: {{ results.contractor_check.found_data.status }}</div>
            </div>

            <div :class="cardStyle(results.notary_check.passed)">
                <h3 class="font-bold">Notarization</h3>
                <p class="text-sm mt-2">{{ results.notary_check.details }}</p>
                <span v-if="results.notary_check.passed" class="text-xs uppercase font-bold tracking-widest">Seal Detected</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['results']);

const cardStyle = (passed) => {
    return ['p-5 rounded-xl border-t-4 shadow-sm transition-all', passed ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'];
};
</script>
