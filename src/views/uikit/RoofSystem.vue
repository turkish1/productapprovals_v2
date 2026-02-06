<script setup>
import FileSaver from '@/components/DropZone/upload/FileSaver.vue';
// import CadViewer from '@/components/Editor/CadViewer.vue';
import MCPFileUpload from '@/components/FileSystem/MCPFileUpload.vue';
import RoofSystemApp from '../../components/RoofSystemApp.vue';
</script>

<template>
    <div class="grid grid-cols-2 gap-0">
        <roof-system-app></roof-system-app>

        <div data-aos="fade-up-right" data-aos-delay="500" style="margin-top: 90px">
            <file-saver></file-saver>
            <!-- <CadViewer /> -->
            <MCPFileUpload />
        </div>
    </div>
</template>
<style scoped></style>
