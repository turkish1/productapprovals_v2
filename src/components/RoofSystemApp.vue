<script setup>
import AOS from 'aos';
import { onMounted } from 'vue';
import RoofSystemForm from './RoofSystemForm.vue';
import RoofSystemList from './RoofSystemList.vue';
onMounted(() => {
    AOS.init({
        duration: 800, // Animation duration in ms
        easing: 'ease-in-out', // Easing for animations
        once: true // Whether animation happens only once
    });
});
</script>
<template>
    <!-- <div data-aos="zoom-in-bottom" style="margin-left: 850px; margin-top: 10px">
        <Map></Map>
    </div> -->
    <div class="roof-app" style="margin-left: 300px; border: none; border-radius: 12px; box-shadow: 4px 4px 16px rgb(22, 183, 183); padding-bottom: 40px; padding-top: 12px; border: none; position: center; min-height: 200px; width: 600px; top: 10vh">
        <roof-system-form></roof-system-form>
        <roof-system-list></roof-system-list>
        <div data-aos="zoom-in-bottom" style="margin-left: 850px; margin-top: 10px">
            <Map></Map>
        </div>
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
    min-height: 200px;
    width: 600px;
    top: 10vh;
}
</style>
