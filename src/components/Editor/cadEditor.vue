<template>
    <div class="viewer-container">
        <!-- File Upload for Images -->
        <div class="toolbar">
            <Button class="w-20 h-8 m-6 p-4 rounded-[5px]" severity="contrast" raised @click="resetView">Reset View</Button>
            <Button class="w-20 h-8 m-6 p-4 rounded-[5px]" severity="contrast" raised @click="toggleGrid">Toggle Grid</Button>
            <input class="rounded-[5px]" severity="contrast" raised type="file" accept="image/" @change="onImageUpload" />
        </div>

        <!-- CAD Viewer Container -->
        <div ref="cadViewerContainer" class="cad-viewer-container">
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="uploaded-image" />
        </div>
        <!-- CAD Viewer Container -->
        <!-- <div ref="cadViewerContainer" class="cad-viewer-container"> -->
        <!-- Display Uploaded Image -->
        <!--
        </div> -->
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Viewer } from '../../../node_modules/three-cad-viewer';

const viewer = ref(null); // Reference to CADViewer
const gridVisible = ref(true); // Grid visibility toggle
const cadViewerContainer = ref(null);
const imageUrl = ref(null); // Holds the uploaded image URL

onMounted(() => {
    // Initialize the CAD Viewer
    const viewer = new Viewer({
        domElement: cadViewerContainer.value,
        enableGrid: true, // Enable grid for better CAD visualization
        enableAxesHelper: true,
        enableGrid: gridVisible.value, // Show axis helpers for orientation
        backgroundColor: 0xdddddd,
        AmbientLight: 0.9
        // Background color
    });

    // Load a sample CAD file (for demonstration)
    // Replace this with an actual CAD file if needed
    viewer.loadSTL('/gableroof.jpg').then(() => {
        viewer.render();
    });

    // Resize handling
    window.addEventListener('resize', () => {
        viewer.resize(); // Handle viewer resizing
    });
});

// Handle image upload
function onImageUpload(event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image')) {
        const reader = new FileReader();

        // Read the uploaded file
        reader.onload = (e) => {
            const texture = new THREE.TextureLoader().load(e.target.result);

            // Create a plane and add the uploaded image as a texture
            const geometry = new THREE.PlaneGeometry(5, 5); // Adjust size as needed
            const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);

            // Add the plane with the image texture to the scene
            viewer.value.scene.add(plane);
            viewer.value.render(); // Re-render to display the image
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image.');
    }
}

// Toolbar actions
function resetView() {
    viewer.value.resetCamera(); // Resets the camera view to the default
}

function toggleGrid() {
    gridVisible.value = !gridVisible.value;
    viewer.value.toggleGrid(gridVisible.value); // Toggles grid visibility
}
</script>

<style scoped>
.viewer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.toolbar {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.cad-viewer-container {
    width: 80%;
    height: 300px;
    background-color: #f0f0f0;
    position: relative;
}

.uploaded-image {
    margin-top: 20px;
    max-width: 200px;
    max-height: 300px;
    border: 2px solid #ccc;
}
</style>
