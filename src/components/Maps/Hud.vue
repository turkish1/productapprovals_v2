<template>
    <div class="drone-bad-signal">
        <div class="city-overlay"></div>
        <div class="static-overlay"></div>
        <div class="tracking-bars top"></div>
        <div class="tracking-bars bottom"></div>
        <div class="hud-overlay">
            <div class="crosshair"></div>
            <div class="target-lock"></div>
        </div>
        <div class="glitch-overlay"></div>
    </div>
</template>

<script setup></script>

<style scoped>
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
