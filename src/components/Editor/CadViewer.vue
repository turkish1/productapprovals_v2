<template>
    <div class="viewer-container">
        <!-- File Upload for Images -->
        <input type="file" accept="image/*" @change="onImageUpload" />

        <!-- CAD Viewer Canvas -->
        <div ref="canvasContainer" class="canvas-container"></div>

        <!-- Display Uploaded Image -->
        <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="uploaded-image" />
    </div>
</template>

<script setup>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
use;

const canvasContainer = ref(null);
const imageUrl = ref(null); // Holds the URL of the uploaded image

onMounted(() => {
    // Set up three.js scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // const container = document.getElementById('viewer-container');

    // const display = new Display(container, options);
    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight);
    canvasContainer.value.appendChild(renderer.domElement);

    // Add 3D object (cube)
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);

    // Animation loop
    // function animate() {
    //     requestAnimationFrame(animate);

    //     // Rotate the cube
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;

    //     renderer.render(scene, camera);
    // }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = canvasContainer.value.clientWidth;
        const height = canvasContainer.value.clientHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});

// Handle image upload
function onImageUpload(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        // Read the uploaded file
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image.');
    }
}
</script>

<style scoped>
.viewer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.canvas-container {
    width: 100%;
    height: 500px;
    background-color: #f0f0f0;
    margin-top: 10px;
}

.uploaded-image {
    margin-top: 20px;
    max-width: 100%;
    max-height: 300px;
    border: 2px solid #ccc;
}
</style>
