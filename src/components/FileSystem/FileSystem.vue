<script setup>
import { useFileSystem } from '@/composables/Filestructure/use-FileSystem';
import { usePermitappStore } from '@/stores/permitapp';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const permitstore = usePermitappStore();
const { permitapp } = storeToRefs(permitstore);
const { createFolder, saveFile } = useFileSystem();
const folderHandle = ref(null);

let processNumber = ref();

onMounted(() => {
    permitapp.value.forEach((item) => {
        processNumber.value = item.formdt.processNumber;
    });
    folderHandle.value = processNumber.value;
});

function sentInfo() {
    handleCreateFolder();
}

const handleCreateFolder = async () => {
    // folderHandle.value = await createFolder();
    folderHandle.value = processNumber.value;
    handleSaveFile();
};

const handleSaveFile = async () => {
    if (folderHandle.value) {
        await saveFile(folderHandle.value, 'example.txt', 'Hello, world!');
        alert('File saved successfully!');
    } else {
        alert('No folder selected!');
    }
};

watch(sentInfo, () => {});
</script>

<template>
    <div>
        <!-- <button @click="handleCreateFolder">Select Folder</button>
        <button @click="handleSaveFile">Save File</button> -->
    </div>
</template>
