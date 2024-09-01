<template>
    <div ref="content">
        <button @click="generatePDF">Generate PDF</button>
    </div>
</template>

<script setup>
import jsPDF from 'jspdf';
import { arrayBuffer } from 'stream/consumers';

const generatePDF = () => {
    const doc = new jsPDF();
    const html = content.value.innerHTML;
    doc.fromHTML(html, 15, 15, {
        width: 120
    });
    doc.text('Hello world!', 10, 10);
    doc.output(arrayBuffer, 'sample.pdf');
    console.log(doc.getPageInfo);
};
</script>
