<template>
    <div>
        <!-- <h1>Generate PDF with Columns and Underlined Text</h1>
        <button @click="generatePDF">Download PDF</button> -->
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { useBurpdfStore } from '@/stores/burpdfStore';
import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { usePermitappStore } from '@/stores/permitapp';

import { useRoofListStore } from '@/stores/roofList';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { jsPDF } from 'jspdf';
// import 'jspdf-acroform';
// import { PDFDocument } from 'pdf-lib'
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
const { getUser } = useGlobalState();

const permitStore = usePermitappStore();
const burpdfStore = useBurpdfStore();

const address = ref(permitStore.$state.permitapp[0]?.formdt?.address || '');
const municipality = ref(permitStore.$state.permitapp[0]?.formdt?.muni || '');
const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
const dripStore = usedripedgeStore();
const { dripedgeStore, dripinput } = storeToRefs(dripStore);
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

const dba = ref(getUser.value[0]?.dba || '');
const burType = ref(burpdfStore.$state.burpdfinput);
let isBurValid = ref(false);

// const brightenImage = (img, brightnessFactor = 1.2) => {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     canvas.width = img.width;
//     canvas.height = img.height;
//     ctx.drawImage(img, 0, 0);

//     const imageData = ctx.getImageData(0, 0, img.width, img.height);
//     const data = imageData.data;

//     for (let i = 0; i < data.length; i += 4) {
//         data[i] = Math.min(data[i] * brightnessFactor, 255); // R
//         data[i + 1] = Math.min(data[i + 1] * brightnessFactor, 255); // G
//         data[i + 2] = Math.min(data[i + 2] * brightnessFactor, 255); // B
//         // data[i + 3] is alpha
//     }

//     ctx.putImageData(imageData, 0, 0);
//     return canvas.toDataURL('image/jpeg', 1.0); // you can use 'image/png' too
// };

const uploadUrl = ref('');
function testBurType() {
    if (burType.value.length !== 1) {
        isBurValid.value = true;

        generatePDF();
    }
}
tryOnMounted(() => {
    testBurType();
});

invoke(async () => {
    await until(isBurValid).toBe(true);

    // alert('Generated, PDF!');
});
const generatePDF = () => {
    const burpdfStore = useBurpdfStore();
    const roofStore = useRoofListStore();

    if (burpdfStore.$state.burpdfinput.length === 0) {
        console.log('lenghth is zero');
    } else {
        // Initialize jsPDF instance
        const height = ref(burpdfStore.$state.burpdfinput[0]?.burpdfData?.height);
        const slope = ref(burpdfStore.$state.burpdfinput[0]?.burpdfData?.slope);
        const perimeter = ref(burpdfStore.$state.burpdfinput[0]?.burpdfData?.per);
        const deckType = ref(burpdfStore.$state.burpdfinput[0]?.burpdfData?.deckType);
        // const doc = new jsPDF();
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4', // Smaller page size
            compress: true
        });
        doc.setGState(new doc.GState({ opacity: 0.9 })); // Adjust opacity
        const approved = 'Approved';
        // Set font size, alignment, and rotation for the watermark
        doc.setFontSize(24);
        doc.setTextColor('black');
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
        // logoImage.crossOrigin = 'Anonymous';
        image.src = '/demo/images/officepaper.jpeg';
        logoImage.src = '/demo/images/logo.jpeg';
        // const brightImgData = brightenImage(logoImage);

        const max_width = 179;
        const thirdYCoordinate = 725;
        const page = doc.getPageInfo(1);
        // console.log(page);
        const topRightx = page.pageContext.mediaBox.topRightX;
        const topRighty = page.pageContext.mediaBox.topRightY;

        const currentX = ref(0);
        const currentY = ref(0);
        var LeftStart = 595.28 - 585.28;
        var current_y = topRighty - thirdYCoordinate;
        currentX.value = LeftStart;
        currentY.value = current_y;
        console.log(currentX.value, currentY.value);

        doc.addImage(logoImage, 'JPEG', 10, 2, 50, 30);

        // Set background image for the entire PDF
        doc.addImage(image, 'JPEG', 0, 0, 210, 297); // full A4 size (210mm x 297mm)
        doc.setFontSize(12);
        // doc.setTextColor(190, 190, 190);
        doc.setTextColor('green');
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString();
        doc.text(approved, 10, 270, { align: 'left' });
        const approvedWidth = doc.getTextWidth(approved);
        doc.text('on: ' + formattedDate, approvedWidth + 15, 270);
        doc.text(`${muniProcessNumber.value}`, 10, 280, { align: 'left' });
        const procWidth = doc.getTextWidth(`${muniProcessNumber.value}`);
        doc.text(`${municipality.value}`, procWidth + 15, 280);

        // Add a paragraph of text

        doc.setFontSize(12);
        // doc.text(wrappedText, 10, 60);
        // Function to add header
        const addHeader = () => {
            doc.setFontSize(10);
            doc.setTextColor(0);
            doc.text(
                'The low slope Built Up Roof (BUR) Assembly shall be installed in compliance with the HVHZ portions of Chapter 15 found in the 2023 Florida Building Code and the HVHZ Roofing Application Standards (RAS), RAS-111, RAS-117 and RAS-128. This roof assembly shall also comply with the listed requirements for a Class "A" fire rating including roof slope (incline), components and a fire barrier when required. The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.',
                10,
                25,
                { maxWidth: '170' }
            ); // Position at (x, y)
            doc.line(10, 50, 195, 50); // Draw a line below the header
        };
        doc.setTextColor('black');
        // Add a circle to simulate a radio button
        doc.circle(185, 45, 2, 'FD'); // Circle as radio button (x, y, radius)

        // Add the "I agree" text next to the circle
        doc.text('I agree', 165, 45);
        // Add header to the first page
        addHeader();

        // Add content below the header
        doc.setFontSize(12);

        // Add a title
        // doc.setFontSize(12);

        // doc.text('Tile Output', 10, 50);
        // Example data for categories and values
        const data = [
            { category: 'DBA', value: `${dba.value}` },
            { category: 'Municipality', value: `${municipality.value}` },
            { category: 'Job Address', value: `${address.value}` },
            { category: 'meProcess Number', value: `${processNumber.value}` }
        ];

        // Set starting position
        let startXCategory = 10; // X position for category column
        let startXValue = 60; // X position for value column
        let startY = 72; // Y position

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

        doc.setFontSize(12);
        const factor = 2;
        const initialYValue = current_y;
        const param_y = initialYValue;

        console.log(roofStore.$state.roofList);
        const lowSlopArea = ref('');
        for (let i = 0; i < roofStore.$state.roofList.length; i++) {
            if (roofStore.$state.roofList[i].item === 'Low Slope') {
                lowSlopArea.value = roofStore.$state.roofList[i].dim2;
            }
        }

        const area = lowSlopArea.value;
        console.log(`${area}`, lowSlopArea.value);
        const tArea = 'Roof Area: ';
        const tDeck = 'Deck Type: ';
        const tHeight = 'Mean Roof Height: ';
        const tSlope = 'Roof Slope: ';
        const tPerimeter = 'Roof Perimeter: ';

        const burMaterialText = 'Type of Low Slope BUR Material: ';
        const burSystemText = 'Type of Low Slope BUR System: ';
        const primeOneText = "Attach P(1') Prime using P(1) Field Prescriptive Basesheet: ";
        const primeThreeText = 'Attach P(2) Perimeter using P(3) Corner Prescriptive: ';

        const material = ref(burpdfStore.$state.burpdfinput[1]?.burpdfData?.burMaterial || '');
        const system = ref(burpdfStore.$state.burpdfinput[1]?.burpdfData?.burSystem || '');
        const primeone = ref(burpdfStore.$state.burpdfinput[1]?.burpdfData?.p1 || '');
        const primethree = ref(burpdfStore.$state.burpdfinput[1]?.burpdfData?.p3 || '');
        const [bursystemTitle, bursystemDescription] = (() => {
            const parts = system.value.split(/:(.+)/); // split only on first colon
            console.log(parts);
            return [parts[0].trim(), parts[1]?.trim() ?? ''];
        })();

        currentX.value = LeftStart;

        const tAreaTextWidth = doc.getTextWidth(tArea);
        const AreaTextWidth = doc.getTextWidth(`${area}`);
        const areaStartXValue = currentX.value;
        doc.text(tArea, areaStartXValue, current_y);
        const areaValue = tAreaTextWidth + areaStartXValue;
        doc.text(`${area}`, areaValue, current_y);

        doc.line(areaValue, current_y + 2, areaValue + AreaTextWidth, current_y + 2);
        currentX.value = areaValue + AreaTextWidth;

        const tHeightTextWidth = doc.getTextWidth(tHeight);
        const HeightTextWidth = doc.getTextWidth(`${height.value}`);
        const heightStartXValue = currentX.value + 18;

        doc.text(tHeight, heightStartXValue, current_y);
        const heightValue = tHeightTextWidth + heightStartXValue;

        doc.text(`${height.value}`, heightValue, current_y);

        doc.line(heightValue, current_y + 2, heightValue + HeightTextWidth, current_y + 2); // Get text width
        currentX.value = heightValue + HeightTextWidth;

        const tSlopeTextWidth = doc.getTextWidth(tSlope);
        const SlopeTextWidth = doc.getTextWidth(`${slope.value}`);
        const slopeStartXValue = currentX.value + 18;

        doc.text(tSlope, slopeStartXValue, current_y);
        const slopeValue = tSlopeTextWidth + slopeStartXValue;

        doc.text(`${slope.value}`, slopeValue, current_y);

        doc.line(slopeValue, current_y + 2, slopeValue + SlopeTextWidth, current_y + 2); // Get text width
        currentX.value = slopeValue + SlopeTextWidth;

        const tPermTextWidth = doc.getTextWidth(tPerimeter);
        const PermTextWidth = doc.getTextWidth(`${perimeter.value}`);
        const permStartXValue = currentX.value + 18;

        doc.text(tPerimeter, permStartXValue, current_y);
        const perimeterValue = tPermTextWidth + permStartXValue;
        doc.text(`${perimeter.value}`, perimeterValue, current_y);

        doc.line(perimeterValue, current_y + 2, perimeterValue + PermTextWidth, current_y + 2);
        console.log(current_y, current_y);
        current_y = current_y + 10;

        currentX.value = perimeterValue + PermTextWidth;

        const tDeckTextWidth = doc.getTextWidth(tDeck);
        const DeckTextWidth = doc.getTextWidth(`${deckType.value}`);
        const deckStartXValue = LeftStart;
        doc.text(tDeck, deckStartXValue, current_y);
        const decktypeStartValue = tDeckTextWidth + deckStartXValue;
        doc.text(`${deckType.value}`, decktypeStartValue, current_y);

        doc.line(decktypeStartValue, current_y + 2, decktypeStartValue + DeckTextWidth, current_y + 2); // Get text width
        current_y = current_y + 10;

        currentX.value = LeftStart;

        const dripEdgeMaterial = 'Drip Edge Material: ';

        const dripEdgeSize = 'Drip Edge Size: ';
        const dripedgeMaterials = ref(dripStore.$state.dripinput[0]?.dripMaterial || '');
        const dripedgeSize = ref(dripStore.$state.dripinput[2]?.dripMaterial || '');
        console.log(dripedgeMaterials, dripedgeSize);
        const dripMaterialTextWidth = doc.getTextWidth(dripEdgeMaterial);
        const materialTextWidth = doc.getTextWidth(`${dripedgeMaterials.value}`);
        const dMaterialStartXValue = LeftStart;
        doc.text(dripEdgeMaterial, dMaterialStartXValue, current_y);
        const dripMaterialStartValue = dripMaterialTextWidth + dMaterialStartXValue;
        doc.text(`${dripedgeMaterials.value}`, dripMaterialStartValue, current_y);

        doc.line(dripMaterialStartValue, current_y + 2, dripMaterialStartValue + materialTextWidth, current_y + 2);

        current_y = current_y + 10;

        const dripEdgeSizeTextWidth = doc.getTextWidth(dripEdgeSize);
        const dripEdgeTextWidth = doc.getTextWidth(`${dripedgeSize.value}`);
        const dSizeStartXValue = LeftStart;
        doc.text(dripEdgeSize, dSizeStartXValue, current_y);
        const dripSizeStartValue = dripEdgeSizeTextWidth + dSizeStartXValue;
        doc.text(`${dripedgeSize.value}`, dripSizeStartValue, current_y);

        doc.line(dripSizeStartValue, current_y + 2, dripSizeStartValue + dripEdgeTextWidth, current_y + 2);
        current_y = current_y + 10;

        const tburMaterialTextWidth = doc.getTextWidth(burMaterialText);
        const MaterialTextWidth = doc.getTextWidth(`${material.value}`);
        const materialStartXValue = currentX.value;
        doc.text(burMaterialText, materialStartXValue, current_y);
        const materialValue = tburMaterialTextWidth + 12;
        doc.text(`${material.value}`, materialValue, current_y);

        doc.line(materialValue, current_y + 2, materialValue + MaterialTextWidth, current_y + 2);
        currentX.value = materialValue + MaterialTextWidth;
        // if (currentX.value > max_width) current_y = current_y + 10;
        current_y = current_y + 10;

        currentX.value = LeftStart;

        doc.setFontSize(12);
        const tburSystemTextWidth = doc.getTextWidth(burSystemText);
        const SystemTextWidth = doc.getTextWidth(bursystemTitle);
        const bursystemDescriptionTextWidth = doc.getTextWidth(bursystemDescription);
        const systemStartXValue = currentX.value;

        doc.text(burSystemText, systemStartXValue, current_y);

        currentX.value = tburSystemTextWidth + 15;
        doc.text(bursystemTitle, currentX.value, current_y);

        doc.line(currentX.value, current_y + factor, currentX.value + SystemTextWidth, current_y + factor);
        current_y = current_y + 10;

        doc.text(bursystemDescription, LeftStart, current_y);

        doc.line(LeftStart, current_y + factor, LeftStart + bursystemDescriptionTextWidth, current_y + factor);

        current_y = current_y + 10;
        const tprimeoneTextWidth = doc.getTextWidth(primeOneText);

        const PrimeoneTextWidth = doc.getTextWidth(`${primeone.value}`);
        const primeoneStartXValue = LeftStart;

        doc.text(primeOneText, primeoneStartXValue, current_y);
        current_y = current_y + 10;

        const primeoneValue = LeftStart;

        doc.text(primeone.value, primeoneValue, current_y);
        doc.line(primeoneValue, current_y + factor, primeoneValue + PrimeoneTextWidth, current_y + factor);
        current_y = current_y + 10;

        currentX.value = LeftStart;

        // const tprimethreeTextWidth = doc.getTextWidth(primeThreeText);
        const PrimethreeTextWidth = doc.getTextWidth(`${primethree.value}`);
        const primethreeStartXValue = currentX.value;

        doc.text(primeThreeText, primethreeStartXValue, current_y);
        current_y = current_y + 7;

        currentX.value = LeftStart;
        const primethreeValue = currentX.value;

        doc.text(primethree.value, primethreeValue, current_y);

        doc.line(primethreeValue, current_y + factor, primethreeValue + PrimethreeTextWidth, current_y + factor);
        current_y = current_y + 10;

        const fName = 'LowSlope.pdf';
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

                    alert('LowSlope File uploaded successfully!');
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
