<template>
    <div style="height: 50vh">
        <PinturaEditor v-bind="props" :src="src" @pintura:load="handleLoad($event)" @pintura:process="handleProcess($event)" />
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
        handleLoad: function (event) {
            console.log('load', event.detail, src);
        },
        handleProcess: function (event) {
            console.log('process', event.detail);
            this.result = URL.createObjectURL(event.detail.dest);
        }
    },
    data() {
        return {
            props: getEditorDefaults(),
            src: '/gableroof.jpg',
            result: undefined
        };
    }
};
</script>

<style>
/* bright / dark mode */
.pintura-editor {
    --color-background: 255, 255, 255;
    --color-foreground: 10, 10, 10;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
    html {
        color: #fff;
        background: #111;
    }

    .pintura-editor {
        --color-background: 10, 10, 10;
        --color-foreground: 255, 255, 255;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
}
</style>
