<template>
    <!-- <quill-editor v-model:value="state.content" :options="state.editorOption" :disabled="state.disabled" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)" /> -->
    <QuillEditor v-model:content="form.content" contentType="html" theme="snow" />
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
</script>
