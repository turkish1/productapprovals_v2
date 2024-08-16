<script>
// import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor';

// import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
// import vueFilePond from 'vue-filepond';
import { getEditorDefaults } from '@pqina/pintura';
import { PinturaEditor } from '@pqina/vue-pintura';
// Import Pintura styles
import '@pqina/pintura/pintura.css';
import { ref } from 'vue';
// Import Pintura
// import {
//     createDefaultImageOrienter,
//     // editor
//     createDefaultImageReader,
//     createDefaultImageWriter,
//     legacyDataToImageState,
//     locale_en_gb,
//     markup_editor_defaults,
//     markup_editor_locale_en_gb,

//     // filepond
//     openEditor,
//     plugin_annotate,
//     plugin_annotate_locale_en_gb,
//     plugin_crop,
//     plugin_crop_locale_en_gb,
//     plugin_filter,
//     plugin_filter_defaults,
//     plugin_filter_locale_en_gb,
//     plugin_finetune,
//     plugin_finetune_defaults,
//     plugin_finetune_locale_en_gb,
//     processImage,
//     // plugins
//     setPlugins
// } from '@pqina/pintura';

// setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

// Create FilePond component
// const FilePond = vueFilePond(FilePondPluginImageEditor, FilePondPluginFilePoster);
export default {
    name: 'ExampleDefaults',
    components: {
        PinturaEditor
    },
    props: getEditorDefaults(),
    setup(props) {
        // const myFiles = ref([]);
        // const myEditor = reactive({
        //     legacyDataToImageState: legacyDataToImageState,

        //     // used to create the editor, receives editor configuration, should return an editor instance
        //     createEditor: openEditor,

        //     // Required, used for reading the image data
        //     imageReader: [createDefaultImageReader],

        //     // optionally. can leave out when not generating a preview thumbnail and/or output image
        //     imageWriter: [createDefaultImageWriter],

        //     // used to generate poster images, runs an editor in the background
        //     imageProcessor: processImage,
        //     // editor options
        //     editorOptions: {
        //         utils: ['crop', 'finetune', 'filter', 'annotate'],
        //         imageOrienter: createDefaultImageOrienter(),
        //         ...plugin_finetune_defaults,
        //         ...plugin_filter_defaults,
        //         ...markup_editor_defaults,
        //         locale: {
        //             ...locale_en_gb,
        //             ...plugin_crop_locale_en_gb,
        //             ...plugin_finetune_locale_en_gb,
        //             ...plugin_filter_locale_en_gb,
        //             ...plugin_annotate_locale_en_gb,
        //             ...markup_editor_locale_en_gb
        //         }
        //     }
        // });
        const src = ref(image.jpeg);
        const result = ref('');
        function handleLoad(event) {
            console.log('load', event.details);
        }
        function handleProcess(event) {
            console.log('load', event.details);
            result.value = URL.createObjectURL(event.detail.dest);
        }
        //  myEditor, myFiles,
        return { handleLoad, handleProcess };
    }
};
</script>
<template>
    <div style="height: 80vh">
        <PinturaEditor v-bind="props" :src="src" @pintura:load="handleLoad($event)" @pintura:process="handleProcess($event)" />
    </div>
    <p v-if="inlineResult">
        <img :src="inlineResult" alt="" />
    </p>
    <!-- <file-pond ref="pond" server="/api" accepted-file-types="image/jpeg, image/png" allow-multiple="true" :imageEditor="myEditor" :files="myFiles" @:init="handleFilePondInit" /> -->
</template>
<style>
.pintura-editor {
    --color-background: 255, 255, 255;
    --color-foreground: 10, 10, 10;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
    html {
        color: #fff;
        background: #fff;
    }

    .pintura-editor {
        --color-background: 10, 10, 10;
        --color-foreground: 255, 255, 255;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
}
</style>
