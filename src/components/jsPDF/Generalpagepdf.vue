<template>
    <div></div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { useGeneralpdfStore } from '@/stores/generalpageStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';
const { getUser } = useGlobalState();

let isGenaralPageValid = ref(false);
const permitStore = usePermitappStore();
const roofStore = useRoofListStore();
const generalpageStore = useGeneralpdfStore();
const address = ref(permitStore.$state.permitapp[0].formdt.address);
const masterPermit = ref(permitStore.$state.permitapp[0].formdt.permit);
const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);

const dba = ref(getUser.value[0].dba);

const generalType = ref(generalpageStore.$state.generalpdfinput);

function testGeneralType() {
    if (generalType.value.length !== 1) {
        isGenaralPageValid.value = true;
    }
}
tryOnMounted(() => {
    testGeneralType();
    generatePDF();
});

invoke(async () => {
    await until(isGenaralPageValid).toBe(true);
    generatePDF();
    // alert('Generated, PDF!');
});
const generatePDF = () => {
    // const { burpdfinput } = storeToRefs(burpdfStore);
    // Initialize jsPDF instance
    if (generalpageStore.$state.generalpdfinput.length === 0) {
        console.log('lenghth is   zero');
    } else {
        // Initialize jsPDF instance
        console.log(generalpageStore.$state.generalpdfinput);
        const doc = new jsPDF();
        // Load an image (example with Base64)
        doc.setGState(new doc.GState({ opacity: 0.9 })); // Adjust opacity
        const approved = 'Approved';
        // Set font size, alignment, and rotation for the watermark
        doc.setFontSize(24);
        doc.setTextColor(150, 150, 150);
        // doc.setFont('Courier', 'bolditalic');
        // Light gray color for watermark
        // doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2
        doc.text('mEPermits', 25, 250, {
            angle: 45, // Rotate watermark text
            align: 'left',
            baseline: 'bottom',
            renderingMode: 'fill'
        });
        const image = new Image();
        const logoImage = new Image();
        image.src = '/demo/images/paperbackground.jpeg';
        logoImage.src = '/demo/images/logo.jpeg';

        const max_width = 179;
        const thirdYCoordinate = 725;
        const page = doc.getPageInfo(1);
        // console.log(page);
        const topRightx = page.pageContext.mediaBox.topRightX;
        const topRighty = page.pageContext.mediaBox.topRightY;
        console.log(topRightx);
        const currentX = ref(0);
        const currentY = ref(0);
        var LeftStart = 595.28 - 585.28;
        var current_y = topRighty - thirdYCoordinate;
        currentX.value = LeftStart;
        currentY.value = current_y;
        console.log(currentX.value, currentY.value);

        doc.addImage(logoImage, 'JPEG', 10, 10, 50, 30);

        // Set background image for the entire PDF
        doc.addImage(image, 'JPEG', 0, 0, 210, 297); // full A4 size (210mm x 297mm)
        doc.setFontSize(14);
        doc.setTextColor(190, 190, 190);
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString();
        doc.text(approved, 10, 270, { align: 'left' });
        const approvedWidth = doc.getTextWidth(approved);
        doc.text('on: ' + formattedDate, approvedWidth + 15, 270);
        doc.text(`${processNumber.value}`, 10, 280, { align: 'left' });
        const procWidth = doc.getTextWidth(`${processNumber.value}`);

        console.log(address, masterPermit, processNumber, dba);

        // Add a paragraph of text
        // const paragraphText = "This PDF contains a watermark that says 'CONFIDENTIAL' across the center of the page. You can adjust the size, rotation, and opacity of the watermark.";
        // const wrappedText = doc.splitTextToSize(paragraphText, 200);
        // doc.text(wrappedText, 10, 60);
        doc.setFontSize(12);
        // doc.text(wrappedText, 10, 60);
        // Function to add header
        const addHeader = () => {
            doc.setFontSize(10);
            doc.setTextColor(0);
            doc.text('2023 HVHZ  mEPermit General Information Page', 100, 20, { maxWidth: '170' }); // Position at (x, y)
            doc.line(10, 41, 195, 41); // Draw a line below the header
        };
        doc.setTextColor(0);
        // Add a circle to simulate a radio button
        doc.circle(185, 38, 2, 'FD'); // Circle as radio button (x, y, radius)

        // Add the "I agree" text next to the circle
        doc.text('I agree', 165, 39);
        // Add header to the first page
        addHeader();

        // Add content below the header
        doc.setFontSize(12);

        // Add a title
        doc.setFontSize(10);

        // doc.text('Tile Output', 10, 50);
        // Example data for categories and values
        const data = [
            { category: 'DBA', value: `${dba.value}` },

            { category: 'Job Address', value: `${address.value}` },
            { category: 'meProcess Number', value: `${processNumber.value}` },
            { category: 'Master Permit', value: `${masterPermit.value}` }
        ];

        // Set starting position
        let startXCategory = 10; // X position for category column
        let startXValue = 60; // X position for value column
        let startY = 50; // Y position

        // Set starting position second data

        // Set font size
        doc.setFontSize(10);

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
            const valueTextWidth = doc.getTextWidth(item.value) * 2; // Get text width
            doc.line(startXValue, currentY + 2, startXValue + valueTextWidth, currentY + 2);
        });

        doc.setFontSize(10);
        const factor = 2;
        const initialYValue = 100;
        const param_y = initialYValue;

        console.log(generalpageStore.$state.generalpdfinput[0].generalpdfData);

        // if (generalpageStore.$state.generalpdfinput[0].generalpdfData.slopeChk) {
        currentX.value = LeftStart + 70;
        current_y = param_y - 15;
        console.log(current_y);
        const checkBox6 = new jsPDF.API.AcroFormCheckBox();
        doc.text('New Roof: ', currentX.value, current_y);
        const alignCheckbox6 = current_y - 3;
        checkBox6.fieldName = 'CheckBox6';
        checkBox6.Rect = [currentX.value + 20, alignCheckbox6, 4, 4, 'FD'];
        currentX.value = currentX.value + 20;
        doc.addField(checkBox6);

        currentX.value = LeftStart + 120;
        current_y = param_y - 15;
        console.log(current_y);
        const checkBox7 = new jsPDF.API.AcroFormCheckBox();
        doc.text('Re-Roof: ', currentX.value, current_y);
        const alignCheckbox7 = current_y - 3;
        checkBox7.fieldName = 'CheckBox7';
        checkBox7.Rect = [currentX.value + 20, alignCheckbox7, 4, 4, 'FD'];
        currentX.value = currentX.value + 20;
        doc.addField(checkBox7);

        const tTotal = 'Total: ';

        const tSlope = 'Low Slope: ';
        const tSteep = 'Steep Slope: ';

        const total = ref(generalpageStore.$state.generalpdfinput[0].generalpdfData.totalData);
        const slope = ref(generalpageStore.$state.generalpdfinput[0].generalpdfData.slopeData);
        const steep = ref(generalpageStore.$state.generalpdfinput[0].generalpdfData.steepData);
        console.log(generalpageStore.$state.generalpdfinput[0].generalpdfData);
        currentX.value = LeftStart;

        const SlopesTextWidth = doc.getTextWidth(tSlope);
        const slopeValueTextWidth = doc.getTextWidth(`${slope.value}`);
        const slopevalueStartXValue = currentX.value + 2;

        doc.text(tSlope, slopevalueStartXValue, param_y);
        const slopesValue = SlopesTextWidth + slopevalueStartXValue;

        doc.text(`${slope.value}`, slopesValue, param_y);
        doc.line(slopesValue, param_y, slopesValue + slopeValueTextWidth, param_y); // Get text width
        currentX.value = slopesValue + slopeValueTextWidth;

        const tSteepTextWidth = doc.getTextWidth(tSteep);
        const SteepTextWidth = doc.getTextWidth(`${steep.value}`);
        const steepStartXValue = currentX.value + 2;

        doc.text(tSteep, steepStartXValue, param_y);
        const steepValue = tSteepTextWidth + steepStartXValue;
        doc.text(`${steep.value}`, steepValue, param_y);
        doc.line(steepValue, param_y, steepValue + SteepTextWidth, param_y);
        console.log(param_y, current_y);
        current_y = param_y + 10;

        currentX.value = steepValue + SteepTextWidth;
        console.log(currentX.value);
        const tTotalTextWidth = doc.getTextWidth(tTotal);
        const TotalTextWidth = doc.getTextWidth(`${total.value}`);
        const totalStartXValue = currentX.value + 2;
        doc.text(tTotal, totalStartXValue, param_y);
        const totalValue = tTotalTextWidth + totalStartXValue;
        doc.text(`${total.value}`, totalValue, param_y);

        doc.line(totalValue, param_y, totalValue + TotalTextWidth, param_y);
        currentX.value = totalValue + TotalTextWidth;

        console.log(generalpageStore.$state.generalpdfinput[0].generalpdfData);

        if (generalpageStore.$state.generalpdfinput[0].generalpdfData.slopeChk) {
            currentX.value = LeftStart;
            current_y = current_y + 10;
            console.log(current_y);
            const checkBox = new jsPDF.API.AcroFormCheckBox();
            doc.text('Low Slope: ', LeftStart, current_y);
            const alignCheckbox = current_y - 3;
            checkBox.fieldName = 'CheckBox1';
            checkBox.Rect = [LeftStart + 20, alignCheckbox, 4, 4, 'FD'];
            currentX.value = LeftStart + 20;
            doc.addField(checkBox);
        }

        // mtileChk
        if (generalpageStore.$state.generalpdfinput[0].generalpdfData.mtileChk) {
            const checkBox2TextWidth = currentX.value + 5;
            const checkBox2 = new jsPDF.API.AcroFormCheckBox();
            doc.text('Mechanical Fastened Tile: ', checkBox2TextWidth, current_y);
            const alignCheckbox2 = current_y - 3;
            checkBox2.fieldName = 'CheckBox2';
            checkBox2.Rect = [checkBox2TextWidth + 20, alignCheckbox2, 4, 4, 'FD'];
            currentX.value = checkBox2TextWidth + 20;
            doc.addField(checkBox2);
        }
        // adtileChk
        if (generalpageStore.$state.generalpdfinput[0].generalpdfData.adtileChk) {
            const checkBox3TextWidth = currentX.value + 5;
            const checkBox3 = new jsPDF.API.AcroFormCheckBox();
            doc.text('Adhesive Set Tile: ', checkBox3TextWidth, current_y);
            const alignCheckbox3 = current_y - 3;
            checkBox3.fieldName = 'CheckBox3';
            checkBox3.Rect = [checkBox3TextWidth + 20, alignCheckbox3, 4, 4, 'FD'];
            currentX.value = checkBox3TextWidth + 20;
            doc.addField(checkBox3);
        }

        // shingleChk

        if (generalpageStore.$state.generalpdfinput[0].generalpdfData.shingleChk) {
            const checkBox4TextWidth = currentX.value + 5;
            const checkBox4 = new jsPDF.API.AcroFormCheckBox();
            doc.text('Shingle: ', checkBox4TextWidth, current_y);
            const alignCheckbox4 = current_y - 3;
            checkBox4.fieldName = 'CheckBox4';
            checkBox4.Rect = [checkBox4TextWidth + 20, alignCheckbox4, 4, 4, 'FD'];
            currentX.value = checkBox4TextWidth + 20;
            doc.addField(checkBox4);
        }

        // metalChk
        if (generalpageStore.$state.generalpdfinput[0].generalpdfData.metalChk) {
            const checkBox5TextWidth = currentX.value + 5;
            const checkBox5 = new jsPDF.API.AcroFormCheckBox();
            doc.text('Metal Panel: ', checkBox5TextWidth, current_y);
            const alignCheckbox5 = current_y - 3;
            checkBox5.fieldName = 'CheckBox5';
            checkBox5.Rect = [checkBox5TextWidth + 20, alignCheckbox5, 4, 4, 'FD'];
            currentX.value = checkBox5TextWidth + 20;
            doc.addField(checkBox5);

            // Save the PDF
        }
        doc.save('GeneralPage.pdf');
    }
};
</script>
