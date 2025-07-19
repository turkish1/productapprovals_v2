<template>
    <div>
        <button @click="generatePDF">Download PDF</button>
    </div>
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
const address = ref(permitStore.$state.permitapp[0]?.formdt?.address || '');
const masterPermit = ref(permitStore.$state.permitapp[0]?.formdt?.permit || 'N|A');
const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');
const municipality = ref(permitStore.$state.permitapp[0]?.formdt?.muni || '');
// const area = ref(generalpageStore.$state.generalpdfinput[1]?.generalpdfData?.totalData);
// const objName = processNumber.value.length !== 0 ? processNumber.value : 'files';

const dba = ref(getUser.value[0]?.dba || '');

const uploadUrl = ref('');
const generalType = ref(generalpageStore.$state.generalpdfinput);

function testGeneralType() {
    if (generalType.value.length !== 1) {
        isGenaralPageValid.value = true;
    }
}
tryOnMounted(() => {
    testGeneralType();
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

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4', // Smaller page size
            compress: true
        });
        // Load an image (example with Base64)
        doc.setGState(new doc.GState({ opacity: 0.9 })); // Adjust opacity
        const approved = 'Approved';
        // Set font size, alignment, and rotation for the watermark
        doc.setFontSize(24);
        doc.setTextColor('black');
        // doc.setFont('helvetica');
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
        // const drapdropImage = new Image();
        image.src = '/demo/images/officepaper.jpeg';
        logoImage.src = '/demo/images/logo.jpeg';
        // drapdropImage.src = '/demo/images/DragAndDrop.jpeg';

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
        doc.setFontSize(12);
        doc.setTextColor('green');
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString();
        doc.text(approved, 10, 270, { align: 'left' });
        const approvedWidth = doc.getTextWidth(approved);
        doc.text('on: ' + formattedDate, approvedWidth + 15, 270);
        // doc.text(`${processNumber.value}`, 10, 258, { align: 'left' });
        // const procWidth = doc.getTextWidth(`${processNumber.value}`);
        doc.text(`${muniProcessNumber.value}`, 10, 280, { align: 'left' });
        const procWidth = doc.getTextWidth(`${muniProcessNumber.value}`);
        doc.text(`${municipality.value}`, procWidth + 15, 280);
        // const tArea = 'Roof Area: ';
        const adtileChk = ref(false);
        const metalChk = ref(false);
        const mtileChk = ref(false);
        const shingleChk = ref(false);
        const slopeChk = ref(false);
        // Add a paragraph of text
        // const paragraphText = "This PDF contains a watermark that says 'CONFIDENTIAL' across the center of the page. You can adjust the size, rotation, and opacity of the watermark.";
        // const wrappedText = doc.splitTextToSize(paragraphText, 200);
        // doc.text(wrappedText, 10, 60);
        doc.setFontSize(12);
        // doc.text(wrappedText, 10, 60);
        // Function to add header
        const addHeader = () => {
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text('2023 HVHZ  mEPermit General Information Page', 70, 20, { maxWidth: '170' }); // Position at (x, y)
            doc.line(10, 30, 195, 30); // Draw a line below the header
        };
        doc.setTextColor(0);
        // Add a circle to simulate a radio button
        // doc.circle(185, 38, 2, 'FD'); // Circle as radio button (x, y, radius)

        // Add the "I agree" text next to the circle
        // doc.text('I agree', 165, 39);
        // Add header to the first page
        addHeader();

        // Add content below the header
        doc.setFontSize(12);

        const area = ref(generalpageStore.$state.generalpdfinput[1]?.generalpdfData?.totalData);
        // doc.text('Tile Output', 10, 50);
        // Example data for categories and values
        const data = [
            { category: 'DBA', value: `${dba.value}` },
            { category: 'Roof Area', value: `${area.value}` },
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
            const valueTextWidth = doc.getTextWidth(item.value) * 2; // Get text width
            doc.line(startXValue, currentY + 2, startXValue + valueTextWidth, currentY + 2);
        });

        console.log(doc.getFont());
        doc.setTextColor('black');
        doc.setFontSize(12);
        const factor = 2;
        const initialYValue = 100;
        const param_y = initialYValue;
        const isReroof = ref(false);
        const isNewRoof = ref(false);

        currentX.value = LeftStart + 40;

        if (generalpageStore.$state.generalpdfinput[0].generalpdfData.roofCheck[0] === 'reroof') {
            isReroof.value = true;
            console.log(isReroof.value);
        } else {
            isNewRoof.value = true;
        }

        currentX.value = LeftStart + 50;
        current_y = param_y;
        console.log(current_y);

        doc.text('Re-Roof: ', currentX.value, current_y);

        const alignCheckbox0 = current_y - 3;

        const checkedBox0 = isReroof.value === true ? doc.rect(currentX.value + 20, alignCheckbox0, 4, 4, 'FD') : doc.rect(currentX.value + 20, alignCheckbox0, 4, 4);

        currentX.value = LeftStart + 120;
        current_y = param_y;
        console.log(current_y);

        doc.text('New Roof: ', currentX.value, current_y);

        const checkedBox1 = isNewRoof.value === true ? doc.rect(currentX.value + 25, alignCheckbox0, 4, 4, 'FD') : doc.rect(currentX.value + 25, alignCheckbox0, 4, 4);
        console.log(checkedBox0, checkedBox1);
        current_y = current_y + 10;
        const tTotal = 'Total: ';

        const tSlope = 'Low Slope: ';
        const tSteep = 'Steep Slope: ';

        const total = ref(generalpageStore.$state.generalpdfinput[1]?.generalpdfData?.totalData || '');
        const slope = ref(generalpageStore.$state.generalpdfinput[1]?.generalpdfData?.slopeData || '0');
        const steep = ref(generalpageStore.$state.generalpdfinput[1]?.generalpdfData?.steepData || '0');
        console.log(generalpageStore.$state.generalpdfinput[1].generalpdfData);
        currentX.value = LeftStart + 25;
        current_y = param_y + 10;
        const SlopesTextWidth = doc.getTextWidth(tSlope);
        const slopeValueTextWidth = doc.getTextWidth(`${slope.value}`);
        const slopevalueStartXValue = currentX.value + 5;

        doc.text(tSlope, slopevalueStartXValue, current_y);
        const slopesValue = SlopesTextWidth + slopevalueStartXValue;

        doc.text(`${slope.value}`, slopesValue, current_y);
        doc.line(slopesValue, current_y, slopesValue + slopeValueTextWidth, current_y); // Get text width
        currentX.value = slopesValue + slopeValueTextWidth;

        const tSteepTextWidth = doc.getTextWidth(tSteep);
        const SteepTextWidth = doc.getTextWidth(`${steep.value}`);
        const steepStartXValue = currentX.value + 5;

        doc.text(tSteep, steepStartXValue, current_y);
        const steepValue = tSteepTextWidth + steepStartXValue;
        doc.text(`${steep.value}`, steepValue, current_y);
        doc.line(steepValue, current_y, steepValue + SteepTextWidth, current_y);
        console.log(current_y, current_y);
        current_y = param_y + 10;

        currentX.value = steepValue + SteepTextWidth;
        console.log(currentX.value);
        const tTotalTextWidth = doc.getTextWidth(tTotal);
        const TotalTextWidth = doc.getTextWidth(`${total.value}`);
        const totalStartXValue = currentX.value + 5;
        doc.text(tTotal, totalStartXValue, current_y);
        const totalValue = tTotalTextWidth + totalStartXValue;
        doc.text(`${total.value}`, totalValue, current_y);

        doc.line(totalValue, current_y, totalValue + TotalTextWidth, current_y);
        currentX.value = totalValue + TotalTextWidth;
        console.log(generalpageStore.$state.generalpdfinput[1]);
        if (generalpageStore.$state.generalpdfinput[1].generalpdfData.slopeChk === true) {
            slopeChk.value = true;
            console.log('Slope Checked');
        }
        if (generalpageStore.$state.generalpdfinput[1].generalpdfData.adtileChk === true) {
            adtileChk.value = true;
        }

        if (generalpageStore.$state.generalpdfinput[1].generalpdfData.metalChk === true) {
            metalChk.value = true;
        }
        if (generalpageStore.$state.generalpdfinput[1].generalpdfData.mtileChk === true) {
            mtileChk.value = true;
        }
        if (generalpageStore.$state.generalpdfinput[1].generalpdfData.shingleChk === true) {
            shingleChk.value = true;
            console.log('Shingle Checked');
        }
        currentX.value = LeftStart - 4;

        current_y = current_y + 10;
        doc.text('Low Slope: ', LeftStart, current_y);
        const alignCheckbox2 = current_y - 3;
        const checkedBox2 = slopeChk.value === true ? doc.rect(currentX.value + 27, alignCheckbox2, 4, 4, 'FD') : doc.rect(currentX.value + 27, alignCheckbox2, 4, 4);
        console.log(checkedBox0, checkedBox1, checkedBox2);
        // mtileChk
        currentX.value = currentX.value + 4;
        const checkBox2TextWidth = currentX.value + 32;
        console.log(currentX.value);
        const checkBox3TextWidth = checkBox2TextWidth;
        console.log(currentX.value);
        doc.text('Adhesive Set Tile: ', checkBox3TextWidth, current_y);
        const checkedBox3 = adtileChk.value === true ? doc.rect(checkBox3TextWidth + 36, alignCheckbox2, 4, 4, 'FD') : doc.rect(checkBox3TextWidth + 36, alignCheckbox2, 4, 4);
        console.log(checkedBox0, checkedBox1, checkedBox3);
        console.log(currentX.value);
        const checkBox4TextWidth = checkBox3TextWidth + 43;
        console.log(currentX.value);
        doc.text('Metal Panel: ', checkBox4TextWidth, current_y);
        const checkBox4 = metalChk.value === true ? doc.rect(checkBox4TextWidth + 25, alignCheckbox2, 4, 4, 'FD') : doc.rect(checkBox4TextWidth + 25, alignCheckbox2, 4, 4);

        const checkBox5TextWidth = checkBox4TextWidth + 35;
        console.log(currentX.value);
        doc.text('Shingle: ', checkBox5TextWidth, current_y);
        const checkBox5 = shingleChk.value === true ? doc.rect(checkBox5TextWidth + 17, alignCheckbox2, 4, 4, 'FD') : doc.rect(checkBox5TextWidth + 17, alignCheckbox2, 4, 4);
        currentX.value = checkBox5TextWidth;
        const checkBox6TextWidth = checkBox5TextWidth + 28;
        console.log(currentX.value);
        doc.text('Mechanical Fastened Tile: ', checkBox6TextWidth, current_y);
        const checkBox6 = mtileChk.value === true ? doc.rect(checkBox6TextWidth + 51, alignCheckbox2, 4, 4, 'FD') : doc.rect(checkBox6TextWidth + 51, alignCheckbox2, 4, 4);
        console.log(checkBox6, checkBox5);

        current_y = current_y + 10;
        // Save the PDF
        // doc.addImage(drapdropImage, 'JPEG', LeftStart + 40, current_y, 100, 100);

        const fName = 'GeneralPage.pdf';
        const pdfBlob = doc.output('blob');
        const uploadFile = async (fName, pdfBlob) => {
            const file = fName;

            if (!file) {
                alert('Please select a file to upload.');
                return;
            }

            const fileName = file; // Keep original name or generate a new one
            console.log(fileName);
            const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${muniProcessNumber.value}/${fileName}`;

            try {
                const response = await fetch(s3Url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': file.type
                    },
                    body: pdfBlob
                });

                if (response.ok) {
                    uploadUrl.value = s3Url;

                    alert('GeneralPage File uploaded successfully!');
                } else {
                    alert(`Failed to upload file. Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('An error occurred while uploading the file.');
            }
        };

        uploadFile(fName, pdfBlob);
    }
};
</script>
