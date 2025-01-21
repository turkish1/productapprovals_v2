<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const permitstore = usePermitappStore();
const { permitapp } = storeToRefs(permitstore);

const { accountUsers } = useGlobalState();
console.log(accountUsers);
// const accountuser =  ref(accountUsers.value[0]?.formdt?.processNumber || '');
let master = ref();
let process = ref();
let dba = ref();
let jobaddress = ref();
let contractor = ref();
permitapp.value.forEach((item, index) => {
    (master.value = item.formdt.permit), (process.value = item.formdt.processNumber), (jobaddress.value = item.formdt.address), (contractor.value = item.formdt.contractor);
});

const lines = [
    'Initializing system...',
    'Loading modules...',
    'Connecting to server...',
    'Server connection established.',
    // `${accountUsers._value[0].dba}...`,
    // `${accountUsers._value[0].license}...`,
    // `${accountUsers._value[0].expiration_date}...`,
    // `${accountUsers._value[0].secondary_status}...`,
    `${process.value}...`,
    `${jobaddress.value}...`,
    `${contractor.value}...`
];

// Controls the visible lines
const visibleLines = ref([]);

// Number of lines to display at once in the terminal
const maxVisibleLines = 8;

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
    }, 1000); // Adjust speed as desired (1000 ms = 1 second)
}
onMounted(() => {
    scrollTerminal();
});
onMounted(() => {
    // if (accountUsers._value[0].DBA === '') {
    //     console.log(accountUsers._value[0]);
    //     return null;
    // } else {
    //     dba.value = accountUsers._value[0].dba;
    //     console.log(accountUsers._value[0]);
    // }
});
</script>

<template>
    <div class="terminal">
        <div class="terminal-content">
            <div v-for="(line, index) in visibleLines" :key="index" class="terminal-line">
                {{ line }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.terminal {
    width: 100%;
    max-width: 300px;
    height: 400px;
    background-color: black;
    color: #00ff00;
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
    animation: fadeIn 1.5s ease forwards;
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
