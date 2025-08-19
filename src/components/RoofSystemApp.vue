<script setup>
import AOS from 'aos';
import { onMounted } from 'vue';
import RoofSystemForm from './RoofSystemForm.vue';

onMounted(() => {
    AOS.init({
        duration: 4500, // Animation duration in ms
        easing: 'ease-in-out', // Easing for animations
        once: false // Whether animation happens only once
    });
});
</script>
<template>
    <div id="id" class="grid grid-cols-3 gap-6">
        <div
            class="roof-app"
            style="margin-left: 250px; margin-top: 20px; border: none; border-radius: 12px; box-shadow: 4px 4px 16px rgb(22, 183, 183); padding-bottom: 10px; border: none; position: center; max-height: 600px; width: 600px; top: 10vh"
        >
            <roof-system-form></roof-system-form>
        </div>

        <!-- <div><Map></Map></div> -->
    </div>
</template>

<style scoped>
.h1 {
    margin-left: 300px;
}
#id {
    height: 1200px;
    width: 800px;
}
</style>
