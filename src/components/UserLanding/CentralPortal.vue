<template>
    <section class="connect-panel">
        <!-- central CONNECT button -->
        <button class="connect-btn" :class="{ active: isActive }" @click="toggleActive">
            <!-- animated ring (SVG so it’s resolution‑independent) -->
            <svg class="ring" viewBox="0 0 120 120">
                <circle class="track" cx="60" cy="60" r="54" />
                <circle class="progress" cx="60" cy="60" r="54" />
            </svg>
            <span>CONNECT</span>
        </button>

        <!-- circular icon array -->
        <div v-for="(IconComp, idx) in icons" :key="idx" class="icon-wrapper" :style="getIconStyle(idx)">
            <component :is="IconComp" class="icon" />
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
// Icons from lucide; install with: npm i lucide-vue-next
import { Cloud, Database, Globe, Layers, Package, PieChart, Shuffle, Wifi } from 'lucide-vue-next';

// Array keeps components so we can v-for over them
const icons = [Globe, Wifi, PieChart, Cloud, Layers, Shuffle, Package, Database];

const isActive = ref(false);

function toggleActive() {
    isActive.value = !isActive.value;
}

/**
 * Compute inline CSS so every icon sits on the circumference of
 * an imaginary circle.
 */
function getIconStyle(idx) {
    const total = icons.length;
    const angle = (360 / total) * idx - 90; // start at top (‑90°)
    const radius = 150; // px
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    return {
        // custom props so we can reference them in :hover rule
        '--tx': `${x}px`,
        '--ty': `${y}px`,
        transform: `translate(var(--tx), var(--ty))`
    };
}
</script>

<style scoped>
.connect-panel {
    position: relative;
    width: 500px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    /* subtle radial grid background like the mock‑up */
    background-image: repeating-radial-gradient(circle at center, #f1f5f9 0 3px, transparent 3px 6px);
    overflow: hidden;
}

/* ------------- CONNECT button & ring ------------- */
.connect-btn {
    position: relative;
    width: 240px;
    height: 240px;
    border: none;
    background: transparent;
    cursor: pointer;
    z-index: 5; /* keep it above the background grid */
}
.connect-btn span {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    letter-spacing: 0.15em;
    font-weight: 600;
    color: #1e293b;
    user-select: none;
}

/* SVG circles */
.ring {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg); /* so progress starts at top */
}
.track,
.progress {
    fill: none;
    stroke-width: 12;
    stroke-linecap: round;
}
.track {
    stroke: #d1d5db;
}
/* circumference: 2 * π * r = 339.292 */
.progress {
    stroke: #0ea5e9;
    stroke-dasharray: 339.292;
    stroke-dashoffset: 339.292;
    transition: stroke-dashoffset 0.8s ease;
}
/* when button is toggled, animate the dash offset so the ring fills */
.connect-btn.active .progress {
    stroke-dashoffset: 0;
}

/* ------------- surrounding icons ------------- */
.icon-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition:
        transform 0.35s ease,
        filter 0.35s ease;
}
.icon-wrapper:hover {
    transform: translate(var(--tx), var(--ty)) scale(1.2) rotate(8deg);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.icon {
    width: 34px;
    height: 34px;
}
</style>
