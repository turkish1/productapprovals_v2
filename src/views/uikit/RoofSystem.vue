<script setup>
import RoofSystemApp from '../../components/RoofSystemApp.vue';
</script>

<template>
    <div class="row">
        <!-- style="background-color: #eae7e2" -->
        <div class="card flex flex-col gap-4">
            <roof-system-app></roof-system-app>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 500px;
    top: 10vh;
}

.ql-container {
    height: calc(100% - 42px);
}
</style>
