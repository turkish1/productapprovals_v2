<script setup>
import RoofSystemForm from './RoofSystemForm.vue';
import RoofSystemList from './RoofSystemList.vue';
</script>
<template>
    <div class="container">
        <div class="roof-app">
            <roof-system-form></roof-system-form>
            <roof-system-list></roof-system-list>
        </div>
    </div>
</template>

<style scoped>
.h1 {
    margin-left: 500px;
}
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 500px;
    min-width: 200px;
    top: 10vh;
}

.ql-container {
    height: calc(100% - 42px);
}
</style>
