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
    <div ref="mapContainer" class="map-container">
        <!-- <InputText type="text" v-model="address" @load="getCoordinates" placeholder="Enter address" /> -->
    </div>
    <!-- </div> -->
</template>
<style scoped>
.map-container {
    height: 500px;
    width: 700px;
    margin-left: 150px;
    margin-bottom: 15;
}
/* .search-input {
    position: absolute;
    top: 2px;
    left: 10px;
    padding: 8px;
    font-size: 16px;
    width: 250px;
    z-index: 10;
    border-radius: 4px;
    border: 1px solid #ccc;
} */
</style>
