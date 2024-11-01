<script setup>
import AOS from 'aos';
import { onMounted } from 'vue';
import RoofSystemForm from './RoofSystemForm.vue';
import RoofSystemList from './RoofSystemList.vue';
onMounted(() => {
    AOS.init({
        duration: 3500, // Animation duration in ms
        easing: 'ease-in-out', // Easing for animations
        once: false // Whether animation happens only once
    });
});
</script>
<template>
    <div class="roof-app" style="margin-left: 300px; border: none; border-radius: 12px; box-shadow: 4px 4px 16px rgb(22, 183, 183); padding-bottom: 10px; border: none; position: center; min-height: 100px; width: 500px; top: 8vh">
        <roof-system-form></roof-system-form>
        <roof-system-list></roof-system-list>
    </div>
    <div data-aos="fade-down" style="margin-left: 850px">
        <Map></Map>
    </div>
</template>

<style scoped>
.h1 {
    margin-left: 300px;
}
.container {
    padding-bottom: 40px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 100px;
    width: 500px;
    top: 10vh;
}
</style>
