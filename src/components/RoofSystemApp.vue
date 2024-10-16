<script setup>
import RoofSystemForm from './RoofSystemForm.vue';
import RoofSystemList from './RoofSystemList.vue';
</script>
<template>
    <div class="container" style="background-color: #eae7e2; margin-left: 500px">
        <div class="roof-app" style="background-color: #eae7e2">
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
    width: 600px;
    top: 10vh;
}

.ql-container {
    height: calc(100% - 42px);
}
</style>
