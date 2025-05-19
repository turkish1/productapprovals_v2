<!-- FileSaver.vue -->
<!-- I need to add an possibly the functionality to process images -->
<template>
    <div class="dropzone" @dragover.prevent="onDragOver" @drop.prevent="onDrop">
        <div class="flex items-center justify-center flex-col">
            <label for="muni" style="color: #eeebe5">
                <a class="underline decoration-sky-500"><p class="text-2xl ... font-bold ...">For PDF Documents</p></a>
            </label>
            <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
            <p class="mt-6 mb-0" @upload="onTemplatedUpload($event)" style="color: #eeebe5">
                <a class="underline decoration-sky-500"><p class="text-2xl ... font-bold ...">Drag and drop files to here to upload.</p></a>
            </p>
        </div>
        <div class="flex flex-wrap gap-4">
            <div v-for="(file, index) of files" :key="index + file.url + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                <div>
                    <Button @click="uploadEvent()" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>

                    <!-- <img role="presentation" :alt="file.name" :src="file.type" width="200" height="200" /> -->
                </div>

                <span class="font-semibold text-ellipsis max-w-250 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                <div>{{ formatSize(file.size) }}</div>
                <Badge value="Completed" class="mt-4" severity="success" />
                <Button icon="pi pi-times" @click="removeFile(index)" outlined rounded severity="danger" />
            </div>
        </div>
    </div>
</template>

<script setup>
// import useS3upload from '@/composables/fetchTech/use-S3upload';
import { usePermitappStore } from '@/stores/permitapp';
// import { file } from 'jszip';
import { usePrimeVue } from 'primevue/config';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
// const dir = ref('');
const permitStore = usePermitappStore();
const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');
// Reactive reference for dropped files
const files = ref([]);
const $primevue = usePrimeVue();
const toast = useToast();
const totalSize = ref(0);
const totalSizePercent = ref(0);
const fileName = ref([]);
// const { removeBeforeSlash } = useS3upload();
// Handle drag over event
const onDragOver = (event) => {
    event.dataTransfer.dropEffect = 'copy';
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
// Handle drop event
const onDrop = async (event) => {
    // Get the files from the drop event
    files.value = [...event.dataTransfer.files];

    // Save each file locally
    for (const file of files.value) {
        // await saveFileLocally(file);
        console.log(file);
        fileName.value.push(file);
        console.log(fileName.value);
    }
    uploadfiles();
};

const removeFile = (index) => {
    files.value.splice(index, 1);
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 1;
    callback();
};
const tempFile = ref('');
const file = ref('');
const uploadUrl = ref('');
const uploadfiles = async () => {
    // try {

    for (const fileItem of fileName.value) {
        console.log('Uploading file:', fileItem);

        // Build the object key using the file's name (or any naming logic you like)
        const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${muniProcessNumber.value}/${fileItem.name}`;

        // If the File is already a PDF, you can just pass it directly in the body
        // and set the Content-Type header appropriately.
        // If you need to ensure it's recognized as a Blob,
        // you can do: const pdfBlob = new Blob([fileItem], { type: 'application/pdf' });

        const response = await fetch(s3Url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/pdf'
            },
            // Body should be a Blob/File, NOT the filename string
            body: fileItem
        });

        if (!response.ok) {
            console.error(`Failed to upload ${fileItem.name}. Status: ${response.status}`);
            continue;
        }

        console.log(`Successfully uploaded ${fileItem.name} to S3.`);
    }

    // } catch (error) {
    //     console.error('Error uploading to S3:', error);
    //     alert('Failed to upload file.');
    // }
};

// Function to save a file locally
const saveFileLocally = async (file) => {
    // Check if File System Access API is supported
    if (window.showSaveFilePicker) {
        try {
            // Create a file handle

            const handle = await window.showSaveFilePicker({
                suggestedName: file.name,
                types: [
                    {
                        description: file.type,
                        accept: {
                            [file.type]: [`.${file.name.split('.').pop()}`]
                        }
                    }
                ]
            });
            console.log(handle);
            // Create a writable stream
            const writable = await handle.createWritable();

            // Write the file content to the stream
            await writable.write(file);
            await writable.close();

            console.log(`${file.name} saved successfully!`);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    } else {
        // Fallback for browsers that do not support the File System Access API
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log(`${file.name} downloaded!`);
    }
};
</script>

<style>
.dropzone {
    width: 80%;
    height: 300px;
    border: 6px dashed #157fc6;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    margin-top: 25px;
    cursor: pointer;
    background-image: url('/demo/images/blueprnt.jpeg');
    background-size: cover; /* Options: contain, cover, auto */
    background-position: center;
}
</style>
