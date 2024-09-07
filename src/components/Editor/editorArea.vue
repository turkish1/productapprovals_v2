<template>
    <div style="height: 40vh; width: 40vh">
        <!-- @pintura:load="handleLoad($event)" @pintura:process="handleProcess($event)" -->
        <!-- v-bind="props" :src="src" -->
        <PinturaEditor v-bind="editorDefaults" src="image.jpeg" />
    </div>

    <!-- <p v-if="result">
        <img :src="result" alt="" />
    </p> -->
</template>
<script>
import { getEditorDefaults } from '@pqina/pintura';
import { PinturaEditor } from '@pqina/vue-pintura';

// Import Pintura styles
import '@pqina/pintura/pintura.css';

export default {
    name: 'ExampleDefaults',
    components: {
        PinturaEditor
    },
    methods: {
        // handleLoad: function (event) {
        //     console.log('load', event.detail, src);
        // },
        // handleProcess: function (event) {
        //     console.log('process', event.detail);
        //     this.result = URL.createObjectURL(event.detail.dest);
        // }
    },
    data() {
        return {
            // props: getEditorDefaults(),
            // src: '/gableroof.jpg',
            // result: undefined,
            editorDefaults: getEditorDefaults({
                imageWriter: {
                    // We instruct the editor to post the file object to the server
                    store: '../../../public'
                }
            })
        };
    }
};
</script>

<style>
/* bright / dark mode */
.pintura-editor {
    --color-background: 255, 255, 255;
    --color-foreground: 0, 0, 0;
    /* --color-background: 255, 255, 255;
    --color-foreground: 10, 10, 10; */
    --editor-max-width: 50em;
    --editor-max-height: 40em;
    --color-preview-outline: 255, 0, 0;
    --color-primary: #2990ff;
    --color-primary-dark: #1a80ec;
    --color-primary-text: #fff;
    --color-secondary: #03a9f4;
    --color-secondary-dark: #046bbf;
    --color-focus: 255, 0, 0;
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
        box-shadow: 0 0 0 1px rgba(238, 233, 233, 0.1);
    }
}
</style>
