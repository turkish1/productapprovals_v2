<template>
    <div class="drone-bad-signal">
        <div class="city-overlay"></div>
        <div class="static-overlay"></div>
        <div class="tracking-bars top"></div>
        <div class="tracking-bars bottom"></div>
        <div class="drone-list">
            <h1 class="hud-title">Target Acquisitions</h1>
            <ul class="target-list">
                <li v-for="(target, index) in targets" :key="index" class="target-item">
                    <div class="target-info">
                        <div class="target-id">
                            <span class="label">ID: </span>
                            <span class="typing" :style="{ animationDelay: `${index * 0.5}s` }">{{ target.id }}</span>
                        </div>
                        <div class="target-name">
                            <span class="label">Name: </span>
                            <span class="typing" :style="{ animationDelay: `${index * 0.7}s` }">{{ target.name }}</span>
                        </div>
                        <div class="target-status">
                            <span class="label">Status: </span>
                            <span class="typing" :style="{ animationDelay: `${index * 0.9}s` }">{{ target.status }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="hud-overlay">
            <div class="crosshair"></div>
            <div class="target-lock"></div>
        </div>
        <div class="glitch-overlay"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Define targets with mock data
const targets = ref([
    { id: 'TGT-01', name: 'Alpha', status: 'Locked' },
    { id: 'TGT-02', name: 'Bravo', status: 'Tracking' },
    { id: 'TGT-03', name: 'Charlie', status: 'Engaged' },
    { id: 'TGT-04', name: 'Delta', status: 'Lost' }
]);
</script>

<style scoped>
.drone-list {
    position: relative;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    color: #00ff00;
    font-family: 'Courier New', Courier, monospace;
    background: #001f3f;
    border: 2px solid #00ff00;
    border-radius: 10px;
    box-shadow: 0 0 15px #00ff0050;
    overflow: hidden;
}

/* Title styling */
.hud-title {
    text-align: center;
    font-size: 1.5rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #00ff00;
    margin-bottom: 10px;
}

/* Target list styling */
.target-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.target-item {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px dashed #00ff00;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
    animation: item-entry 0.5s ease-in-out forwards;
    opacity: 0;
    transform: translateY(20px);
    display: flex;
    flex-direction: column;
    gap: 5px;
}

@keyframes item-entry {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
/* Typing effect */
.typing {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid #00ff00;
    animation:
        typing 1.5s steps(15) forwards,
        blink-caret 0.75s step-end infinite;
}

@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

@keyframes blink-caret {
    50% {
        border-color: transparent;
    }
}
/* Target item detail styling */
.target-info {
    display: flex;
    flex-direction: column;
}

.target-id,
.target-name,
.target-status {
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
}

/* Target lock animation for locked status */
.target-status[data-status='Locked'] {
    color: #ff0000;
    animation: target-lock 1s infinite alternate;
}

@keyframes target-lock {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
/* Main drone view */
.drone-bad-signal {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: grayscale(100%) contrast(1.5);
    color: #00ff00; /* Military green */
}

/* Simulated low-quality drone feed background */
.city-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/src/assets/img/TopView.jpg'); /* Replace with a city aerial view */
    background-size: cover;
    background-position: center;
    filter: brightness(0.7) contrast(0.8) blur(2px);
    opacity: 0.9;
    animation: glitch 3s infinite alternate;
}

/* Tracking bars for top and bottom edges */
.tracking-bars {
    position: absolute;
    width: 100%;
    height: 20px;
    background: linear-gradient(to right, transparent 20%, #14c71420 50%, transparent 80%);
    opacity: 0.9;
    animation: tracking-bars-move 0.5s infinite;
}

.tracking-bars.top {
    top: 20px;
}

.tracking-bars.bottom {
    bottom: 0;
}

@keyframes tracking-bars-move {
    0% {
        transform: translateX(-9%);
    }
    50% {
        transform: translateX(5%);
    }
    100% {
        transform: translateX(-5%);
    }
}
/* Typing effect */
.typing {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid #00ff00;
    animation:
        typing 1.5s steps(15) forwards,
        blink-caret 0.75s step-end infinite;
}
/* Static effect overlay */
.static-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/src/assets/img/hudgrid.png'); /* Use a static texture */
    opacity: 0.2;
    mix-blend-mode: screen;
    animation: static-flicker 0.1s infinite;
}

/* HUD overlay for targeting elements */
.hud-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

/* Crosshair */
.crosshair {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 2px;
    border: 2px solid #00ff00;
    border-radius: 50%;
    box-shadow: 0 0 5px #00ff00;
    transform: translate(-50%, -50%);
}

/* Target lock indicator */
.target-lock {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    border: 2px solid #ff0000;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    animation: target-pulse 1s ease-in-out infinite;
}

@keyframes target-pulse {
    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.5;
    }
}

/* Glitch effect overlay */
.glitch-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(rgba(0, 255, 0, 0.2) 1px, transparent 2px, transparent 5px, rgba(0, 255, 0, 0.2) 5px);
    mix-blend-mode: overlay;
    opacity: 0.15;
    animation: glitch-lines 0.15s infinite;
}

/* Animations */
@keyframes glitch {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }
    50% {
        transform: translate(5px, -5px) scale(1.02);
    }
}

@keyframes static-flicker {
    0%,
    100% {
        opacity: 0.2;
    }
    50% {
        opacity: 0.35;
    }
}

@keyframes glitch-lines {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(10px);
    }
}
</style>
