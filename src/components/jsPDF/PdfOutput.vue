<template>
    <div>
        <h1>Generate PDF with Columns and Underlined Text</h1>
        <button @click="generatePDF">Download PDF</button>
    </div>
</template>

<script setup>
import { jsPDF } from 'jspdf';

// Function to generate PDF
const generatePDF = () => {
    // Initialize jsPDF instance

    // Initialize jsPDF instance
    const doc = new jsPDF();
    // Load an image (example with Base64)
    // data:assets/img/paper-texture-top-view.jpg;base64,...
    const image = new Image();
    const logoImage = new Image();
    image.src = '../../../public/demo/images/paperversion.jpeg';
    logoImage.src = '../../../public/demo/images/logo.jpeg';

    doc.addImage(logoImage, 'JPEG', 10, 10, 50, 30);

    // Set background image for the entire PDF
    doc.addImage(image, 'JPEG', 0, 0, 210, 297); // full A4 size (210mm x 297mm)

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
        doc.line(10, 30, 190, 30); // Draw a line below the header
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
        { category: "Contractor's DBA Name", value: 'Roofers R US' },
        { category: 'Job Address', value: '9961 NW 27 ST' },
        { category: 'meProcess Number', value: 'me2024000001' }
    ];

    // Set starting position
    let startXCategory = 10; // X position for category column
    let startXValue = 60; // X position for value column
    let startY = 40; // Y position

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
        const valueTextWidth = doc.getTextWidth(item.value) * 12; // Get text width
        doc.line(startXValue, currentY + 1, startXValue + valueTextWidth, currentY + 1);
    });
    //   { category: 'Master Permit', value: ' ' },
    //     { category: 'Roof Area', value: '500' },
    //     { category: 'Roof Mean Height', value: '15' },
    //
    // { category: 'Roof Slope', value: '4' }
    doc.setFontSize(12);
    doc.text('Prescriptive ASTM # 30 with type IV hot asphalt applied # 90 Tile Capsheet:', 10, 70);
    doc.text('Fastened Underlayment (UDL) with Self Adhered (S/A) Tile Capsheet:', 10, 80);
    // Save the PDF
    doc.save('Shingle.pdf');
};
</script>
