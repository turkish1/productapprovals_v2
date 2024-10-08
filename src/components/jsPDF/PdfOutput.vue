<template>
    <div>
        <h1>Generate PDF with Columns and Underlined Text</h1>
        <button @click="generatePDF">Download PDF</button>
    </div>
</template>

<script setup>
import useSlope from '@/composables/use-updateSlope';
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';
const { getUser } = useGlobalState();
const { slopeNumber } = useSlope();
const permitStore = usePermitappStore();
const roofStore = useRoofListStore();
const shingleStore = useShingleStore();
console.log(roofStore, shingleStore);
console.log(getUser);
// const pdfcleared = ref(false);
// Function to generate PDF
console.log(permitStore.$state.permitapp[0].formdt.address);
const pdfShingle = ref(roofStore.$state.roofList[0].item);
const area = ref(roofStore.$state.roofList[0].dim1);
const address = ref(permitStore.$state.permitapp[0].formdt.address);
const municipality = ref(permitStore.$state.permitapp[0].formdt.muni);
const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
const folio = ref(permitStore.$state.permitapp[0].formdt.folio);
const dba = ref(getUser.value[0].dba);
const applicant = ref(shingleStore.$state.inputshingle[0].shingleData.applicant);
const material = ref(shingleStore.$state.inputshingle[0].shingleData.material);
const description = ref(shingleStore.$state.inputshingle[0].shingleData.description);
// invoke(async () => {
// await until(pdfcleared).changed();
// generatePdf();
// alert('Generated, PDF!');
// });
const generatePDF = () => {
    // Initialize jsPDF instance

    // Initialize jsPDF instance
    const doc = new jsPDF();
    // Load an image (example with Base64)
    doc.setGState(new doc.GState({ opacity: 0.8 })); // Adjust opacity

    // Set font size, alignment, and rotation for the watermark
    doc.setFontSize(24);
    doc.setTextColor(150, 150, 150); // Light gray color for watermark
    doc.text('DigitalSolutions', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2, {
        angle: 0, // Rotate watermark text
        align: 'left',
        baseline: 'bottom',
        renderingMode: 'fill'
    });
    const image = new Image();
    const logoImage = new Image();
    image.src = ' /demo/images/paperversion.jpeg';
    logoImage.src = '/demo/images/logo.jpeg';

    doc.addImage(logoImage, 'JPEG', 10, 10, 50, 30);

    // Set background image for the entire PDF
    doc.addImage(image, 'JPEG', 0, 0, 210, 297); // full A4 size (210mm x 297mm)
    doc.setFontSize(20);
    doc.setTextColor(190, 190, 190);
    doc.text('Approved', 10, 270, { align: 'left' });
    doc.text(`${processNumber.value}`, 10, 280, { align: 'left' });

    // Add a paragraph of text
    // const paragraphText = "This PDF contains a watermark that says 'CONFIDENTIAL' across the center of the page. You can adjust the size, rotation, and opacity of the watermark.";
    // const wrappedText = doc.splitTextToSize(paragraphText, 200);
    doc.setFontSize(12);
    doc.text(wrappedText, 10, 60);
    // Function to add header
    const addHeader = () => {
        doc.setFontSize(12);
        doc.setTextColor(300);
        doc.text(
            'The Shingle roof system and its components shall be installed in strict compliance  with the HVHZportions of Chapter 15 FBC, the HVHZ Roof Application Standards(RAS) 111 & 115, and the submitted MDC(NOA) Notice of Acceptance(s).The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.',
            10,
            15,
            { maxWidth: '200' }
        ); // Position at (x, y)
        doc.line(10, 33, 190, 33); // Draw a line below the header
    };

    // Add header to the first page
    addHeader();

    // Add content below the header
    doc.setFontSize(12);

    // Add a title
    doc.setFontSize(14);
    // doc.text('Tile Output', 10, 50);
    // Example data for categories and values
    const data = [
        { category: 'DBA', value: `${dba.value}` },
        { category: 'Municipality', value: `${municipality.value}` },
        { category: 'Job Address', value: `${address.value}` },
        { category: 'meProcess Number', value: `${processNumber.value}` },
        { category: 'Folio', value: `${folio.value}` }
    ];

    // Set starting position
    let startXCategory = 10; // X position for category column
    let startXValue = 60; // X position for value column
    let startY = 40; // Y position

    // Set starting position second data

    // Set font size
    doc.setFontSize(12);

    // Loop through data and add category and value in two columns
    data.forEach((item, index) => {
        const currentY = startY + index * 10; // Increment Y position for each row

        // Add category text
        doc.text(item.category, startXCategory, currentY);

        // Add value text
        doc.text(item.value, startXValue, currentY);

        // Underline the category
        const categoryTextWidth = doc.getTextWidth(item.category); // Get text width
        // doc.line(startXCategory, currentY + 1, startXCategory + categoryTextWidth, currentY + 1);

        // Underline the value, the * 12 extends the line
        const valueTextWidth = doc.getTextWidth(item.value) * 10; // Get text width
        doc.line(startXValue, currentY + 1, startXValue + valueTextWidth, currentY + 1);
    });

    doc.setFontSize(12);
    doc.text('Roof Area:', 10, 90);

    doc.text(`${area.value}`, 35, 90);

    doc.line(35, 90, 45, 90);
    doc.text('Mean Roof Height:', 50, 90);

    const valueTextWidth1 = doc.getTextWidth('Mean Roof Height:');
    doc.text('15', 90, 90);
    doc.line(90, 90, 70 + valueTextWidth1, 90); // Get text width
    console.log(valueTextWidth1);

    doc.text('Roof Slope:', 80 + valueTextWidth1, 90);
    const slopeStartXValue = 105 + valueTextWidth1;
    doc.text('4', slopeStartXValue, 90);
    const valueTextWidth2 = doc.getTextWidth('4') * 2;
    doc.line(slopeStartXValue, 90, slopeStartXValue + valueTextWidth2, 90); // Get text width

    const valueTextWidth0 = doc.getTextWidth('Atlas Roofing Corporation');
    const applicantStartXValue = 10 + valueTextWidth0;
    doc.text('Shingle Applicant:', 10, 100);
    const applicantValue = applicantStartXValue - 5;
    doc.text(`${applicant.value}`, applicantValue, 100);
    doc.line(applicantValue, 100, applicantValue + valueTextWidth0, 100);

    const valueTextWidth3 = doc.getTextWidth('21022402');
    const shingleStartXValue = 53 + valueTextWidth3;
    doc.text('Shingle NOA Number:', 10, 110);
    doc.text('21022402', 53, 110);
    doc.line(53, 110, shingleStartXValue, 110);

    const materialStartXValue = 55 + valueTextWidth3;
    doc.text('Shingle Material:', materialStartXValue, 110);
    const materialValue = materialStartXValue + 35;
    doc.text(`${material.value}`, materialValue, 110);
    doc.line(materialValue, 110, materialValue + valueTextWidth3, 110);

    const valueTextWidth4 = doc.getTextWidth('GlassMaster 30  Tough-Glass 20  Legend Shingles  Pro-Cut Starter Strip and Pro-Cut Hip & Ridge Shingle');
    const descStartXValue = 35 + valueTextWidth4;
    doc.text('Shingle Description:', 10, 116);
    // const descValue = descStartXValue + 35;
    doc.text(`${description.value}`, 10, 122);
    doc.line(10, 124, descStartXValue + valueTextWidth3, 124);
    // doc.text('Prescriptive ASTM # 30 with type IV hot asphalt applied # 90 Tile Capsheet:', 10, 70);
    // doc.text('Fastened Underlayment (UDL) with Self Adhered (S/A) Tile Capsheet:', 10, 80);
    // Save the PDF

    doc.save('Shingle.pdf');
};
</script>
