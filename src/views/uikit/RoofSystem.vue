<script setup>
import FileSaver from '@/components/DropZone/upload/FileSaver.vue';
import RoofSystemApp from '../../components/RoofSystemApp.vue';
</script>

<template>
    <div class="grid grid-cols-2 gap-0">
        <!-- <div class="card flex flex-col gap-4">  row-->

        <roof-system-app></roof-system-app>
        <!-- </div> -->
        <div data-aos="fade-up-right" data-aos-delay="500" style="margin-top: 90px">
            <file-saver></file-saver>
        </div>
    </div>
</template>
<style scoped></style>
