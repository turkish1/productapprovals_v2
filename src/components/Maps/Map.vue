<script setup>
import { useprocStore } from '@/stores/processStore'; // import { usePermitappStore } from '@/stores/permitapp';
import { onMounted, ref, watchEffect } from 'vue';
import '../../../node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from '../../../node_modules/mapbox-gl';

// const { coords } = useGeolocation();
const bounds = [
    [-126.39176, 5.24738],
    [-40.00412, 36.83473]
];
const MAPBOX_ACCESS_TOKEN = process.env.VITE_MAPBOX_ACCESS_TOKEN || import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const mapContainer = ref(null);
let map = ref(null);

const procStore = useprocStore();
const address = ref(procStore.$state.processinput[0].procData.address);

const marker = ref(null);
const floridaBounds = [-87.634938, 24.396308, -79.974307, 31.000968];
const getCoordinates = async () => {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address.value)}.json?bbox=${floridaBounds.join(',')}&access_token=${MAPBOX_ACCESS_TOKEN}`);
    const data = await response.json();

    if (data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
        animateCameraTo([lng, lat]);
    } else {
        alert('Address not found!');
    }
};

onMounted(() => {
    map = new mapboxgl.Map({
        container: mapContainer.value, // The reference to the map container
        style: 'mapbox://styles/mapbox/satellite-v9', // Style for satellite imagery
        center: [-73.85951, 40.7549], // Initial center coordinates [lng, lat]
        zoom: 10.5,
        bearing: 0
        // maxBounds: bounds
        // Initial zoom level
    });

    getCoordinates();
});

// Animate
const animateCameraTo = (coordinates) => {
    if (map.transform._center) {
        map.flyTo({
            center: coordinates,
            zoom: 18.5, // Zoom level for the new location
            speed: 1.2, // Animation speed (default is 1.2)
            curve: 1.5, // Controls the smoothness of the animation
            pitch: 26,
            bearing: -45.2,
            easing: (t) => t // essential: true // Ensures animation works even when user prefers reduced motion
        });
        map.setPaintProperty('satellite', 'raster-saturation', -1);
        // Remove the previous marker if it exists
        if (marker.value) {
            marker.value.remove();
        }

        marker.value = new mapboxgl.Marker().setLngLat(coordinates).addTo(map.value);
    }
};
watchEffect(map, getCoordinates, () => {});
</script>

<template>
    <div class="military-folder">
        <div class="folder-content">
            <div ref="mapContainer" class="map-container"></div>
        </div>
    </div>
</template>
<style scoped>
.map-container {
    height: 400px;
    width: 400px;
    margin-left: 50px;
}
.military-folder {
    width: 380px;
    padding: 10px;
    background-color: darkgreen; /* Dark military green/grey color */
    border: 2px solid #a1ffba;
    border-radius: 6px;
    box-shadow: 0 0 15px greenyellow;
    position: relative;
    overflow: hidden;
    margin-left: 130px;
    margin-bottom: 10px;
}

/* Top Notch Tab Effect */
.military-folder::before {
    content: 'Map';
    position: relative;
    top: -20px;
    left: 90px;
    width: 80px;
    height: 15px;
    background-color: black;
    border: 2px solid darkgreen;
    border-radius: 3px 3px 0 0;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.5);
    margin-left: 130px;
}

/* Additional Styling for Folder Content */
.folder-content {
    color: #d3d3d3;
    font-family: monospace;
    font-size: 14px;
}

.folder-content h1 {
    font-size: 18px;
    color: #a1ffba;
    text-transform: uppercase;
    margin-bottom: 10px;
}

.folder-content p {
    font-size: 13px;
    line-height: 1.4;
    color: #e2e2e2;
}

/* Textured Border Styling */
.military-folder {
    background: linear-gradient(145deg, #2e2e2e, #383838);
}

.military-folder::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px dashed rgba(255, 255, 255, 0.2);
    pointer-events: none;
}
</style>
