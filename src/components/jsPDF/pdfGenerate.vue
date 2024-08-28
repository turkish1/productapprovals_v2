<template>
    <div>
        <button @click="generatePDF">Generate PDF</button>
    </div>
</template>

<script setup>
import jsPDF from 'jspdf';

const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.save('sample.pdf');
};
</script>
