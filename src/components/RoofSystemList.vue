<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
const store = useRoofListStore();

const { roofList } = storeToRefs(store);

const { toggleCompleted } = storeToRefs(store);

const lines = [
    'Initializing system...',
    'Loading modules...',
    'Connecting to server...',
    'Server connection established.',
    'Fetching data...',
    'Data received successfully.',
    'Processing information...',
    'System ready.',
    'Awaiting Roof System Selection...'
];

// Controls the visible lines
const visibleLines = ref([]);

// Number of lines to display at once in the terminal
const maxVisibleLines = 5;

function scrollTerminal() {
    let index = 0;

    const interval = setInterval(() => {
        if (index < lines.length) {
            if (visibleLines.value.length >= maxVisibleLines) {
                // Remove the first line to scroll up
                visibleLines.value.shift();
            }
            // Add the next line to the terminal
            visibleLines.value.push(lines[index]);
            index++;
        } else {
            clearInterval(interval); // Stop scrolling when all lines are displayed
        }
    }, 500); // Adjust speed as desired (1000 ms = 1 second)
}
onMounted(() => {
    scrollTerminal();
});
</script>
<template>
    <div class="terminal">
        <div class="terminal-content">
            <div v-for="(line, index) in visibleLines" :key="index" class="terminal-line">
                {{ line }}
            </div>
            <div v-for="roof in roofList" :key="roof.id" class="item">
                <div class="content">
                    <span :class="{ completed: roof.completed }" :style="{ color: 'green' }">{{ roof.item }} {{ roof.dim1 }} {{ roof.dim2 }} {{ roof.dim3 }} {{ roof.dim4 }} {{ roof.dim5 }}</span>
                    <span @click.stop="toggleCompleted(roof.id)">&#10004;</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.completed {
    text-decoration: line-through;
}
.terminal {
    width: 100%;
    max-width: 500px;
    height: 200px;
    background-color: transparent;
    color: black;
    font-family: monospace;
    overflow: hidden;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 255, 0, 0.5);
}
.terminal-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.terminal-line {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
