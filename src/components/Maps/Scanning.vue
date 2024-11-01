<template>
    <div class="scanner">
        <!-- Main circular scanner effect -->
        <div class="scanner-circle">
            <div class="scanner-line"></div>
            <!-- Add radar blips -->
            <div class="radar-blip" v-for="(blip, index) in blips" :key="index" :style="blip.style"></div>
            <!-- HUD overlay -->
            <div class="hud-overlay">
                <span>Altitude: 1200m</span>
                <span>Speed: 75 km/h</span>
            </div>
        </div>
        <!-- Moving horizontal and vertical lines to simulate grid -->
        <div class="grid-line horizontal"></div>
        <div class="grid-line vertical"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const blips = ref([]);

// Generate random radar blips for the scanner
function generateBlips() {
    blips.value = Array.from({ length: 5 }, () => {
        const angle = Math.random() * 360;
        const distance = Math.random() * 100;
        return {
            style: {
                transform: `rotate(${angle}deg) translate(${distance}%)`
            }
        };
    });
}

onMounted(() => {
    generateBlips();
});
</script>

<style scoped>
/* Main Scanner Container */
.scanner {
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #111;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

/* Scanner Circle with Radial Gradient */
.scanner-circle {
    width: 100%;
    height: 100%;
    position: relative;
    border: 2px solid rgba(0, 255, 0, 0.2);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 0, 0.1) 20%, transparent 70%);
    overflow: hidden;
}

/* Rotating Scanner Line */
.scanner-line {
    width: 2px;
    height: 100%;
    background: linear-gradient(to top, transparent, rgba(0, 255, 0, 1));
    position: absolute;
    top: 0;
    left: 50%;
    transform-origin: center bottom;
    animation: scan 3s linear infinite;
}

/* Radar Blips */
.radar-blip {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: transparent;
    border-radius: 50%;
    animation: blip 1s ease-in-out infinite alternate;
}

/* Blip animation to make blips pulsate */
@keyframes blip {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(1.5);
    }
}

/* HUD Overlay */
.hud-overlay {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: transparent;
    font-size: 12px;
    font-family: monospace;
}

/* Horizontal and Vertical Grid Lines */
.grid-line {
    position: absolute;
    background-color: transparent;
}

.grid-line.horizontal {
    width: 100%;
    height: 1px;
    top: 50%;
    animation: grid-move 2s linear infinite;
}

.grid-line.vertical {
    width: 1px;
    height: 100%;
    left: 50%;
    animation: grid-move 2s linear infinite;
}

/* Animation to move grid lines slightly back and forth */
@keyframes grid-move {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-2px);
    }
}

/* Rotating scanner line animation */
@keyframes scan {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
