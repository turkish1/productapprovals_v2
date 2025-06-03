<template>
    <div>
        <!-- <h1>Generate PDF with Columns and Underlined Text</h1>
        <button @click="generatePDF">Download PDF</button> -->
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
// import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { usedripedgeshingleStore } from '@/stores/dripEdgeShingleStore';
import { usePermitappStore } from '@/stores/permitapp';
import { usePolyStore } from '@/stores/polyStore';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { usesystemfStore } from '@/stores/systemfStore';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

// const usedripStore = usedripedgeStore();

const { getUser } = useGlobalState();
const sbsStore = usesystemfStore();
const permitStore = usePermitappStore();
const roofStore = useRoofListStore();
const shingleStore = useShingleStore();
const polypropolyneStore = usePolyStore();
const store = useRoofListStore();
const dripShingleStore = usedripedgeshingleStore();
const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

// const systemAreaImport =  ref(roofStore.$state.roofList[0].dim1);
const roofType = ref(store.$state.roofList);

let isRoofShingleValid = ref(false);
const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    } else {
        for (let i = 0; i < roofType.value.length; i++) {
            if (roofType.value[i].item === 'Asphalt Shingle') {
                console.log(roofType.value[i].item);
                isRoofShingleValid.value = true;
                generatePDF();
            }
        }
    }
});

invoke(async () => {
    await until(callState).toBe(true);

    console.log(callState);
});
const generatePDF = () => {
    // Initialize jsPDF instance
    if (shingleStore.$state.inputshingle.length === 0) {
        console.log('lenghth is zero');
    } else {
        console.log(sbsStore, polypropolyneStore);
        let isPOLYValid = ref(false);
        let isSBSValid = ref(false);
        if (sbsStore.$state.systeminput.length !== 0) {
            isSBSValid = true;
            console.log(isSBSValid);
        }
        if (polypropolyneStore.$state.polyinput.length !== 0) {
            isPOLYValid = true;
            console.log(isPOLYValid);
        }
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4', // Smaller page size
            compress: true
        });
        const max_width = 179;
        const thirdYCoordinate = 725;
        const page = doc.getPageInfo(1);
        const topRightx = page.pageContext.mediaBox.topRightX;
        const topRighty = page.pageContext.mediaBox.topRightY;
        const currentX = ref(0);
        const currentY = ref(0);
        var LeftStart = 595.28 - 585.28;
        var current_y = topRighty - thirdYCoordinate;
        currentX.value = LeftStart;
        currentY.value = current_y;
        // Initialize jsPDF instance
        const address = ref(permitStore.$state.permitapp[0]?.formdt?.address);
        const municipality = ref(permitStore.$state.permitapp[0]?.formdt?.muni);
        const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
        const dba = ref(getUser.value[0].dba);
        const height = ref(shingleStore.$state.inputshingle[0]?.shingleData?.height || '');
        const slope = ref(shingleStore.$state.inputshingle[0]?.shingleData?.slope || '');
        const deckType = ref(shingleStore.$state.inputshingle[0]?.shingleData?.deckType || '');
        // console.log(shingleStore.$state.inputshingle[0].shingleData.height, height.value);
        const area = ref(roofStore.$state.roofList[0].dim1);
        // const objName = processNumber.value.length !== 0 ? processNumber.value : 'files';
        const uploadUrl = ref('');

        // const doc = new jsPDF({
        //     orientation: 'portrait',
        //     unit: 'mm',
        //     format: 'a4', // Smaller page size
        //     compress: true
        // });

        // Load an image (example with Base64)
        doc.setGState(new doc.GState({ opacity: 0.8 })); // Adjust opacity
        const approved = 'Approved';
        // Set font size, alignment, and rotation for the watermark
        doc.setFontSize(18);
        doc.setTextColor(150, 150, 150);

        doc.text('mEPermits', 25, 250, {
            angle: 45, // Rotate watermark text
            align: 'left',
            baseline: 'bottom',
            renderingMode: 'fill'
        });
        const image = new Image();
        const logoImage = new Image();
        image.src = '/demo/images/officepaper.jpeg';
        logoImage.src = '/demo/images/logo.jpeg';

        doc.addImage(logoImage, 'JPEG', 10, 0, 50, 30);

        // Set background image for the entire PDF
        doc.addImage(image, 'JPEG', 0, 0, 210, 297); // full A4 size (210mm x 297mm)
        doc.setFontSize(15);
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

        // doc.text(wrappedText, 10, 60);
        // Function to add header
        const addHeader = () => {
            doc.setFontSize(10);
            doc.setTextColor(0);
            doc.text(
                'The Shingle roof system and its components shall be installed in strict compliance  with the HVHZportions of Chapter 15 FBC, the HVHZ Roof Application Standards(RAS) 111 & 115, and the submitted MDC(NOA) Notice of Acceptance(s).The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.',
                10,
                25,
                { maxWidth: '200' }
            ); // Position at (x, y)
            doc.line(10, 43, 195, 43); // Draw a line below the header
        };
        doc.setTextColor(0);
        // Add a circle to simulate a radio button
        doc.circle(185, 39, 2, 'FD'); // Circle as radio button (x, y, radius)

        // Add the "I agree" text next to the circle
        doc.text('I agree', 165, 40);
        // Add header to the first page
        addHeader();

        // Add content below the header

        // Add a title
        doc.setFontSize(12);
        // doc.text('Tile Output', 10, 50);
        // Example data for categories and values
        const data = [
            { category: 'DBA', value: `${dba.value}` },
            { category: 'Municipality', value: `${municipality.value}` },
            { category: 'Job Address', value: `${address.value}` },
            { category: 'meProcess Number', value: `${processNumber.value}` }
        ];

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

        doc.setFontSize(12);
        const tArea = 'Roof Area: ';
        const tDeck = 'Decktype: ';
        const tHeight = 'Mean Roof Height: ';
        const tSlope = 'Roof Slope: ';

        const factor = 1;
        current_y = current_y + 5;

        const tAreaTextWidth = doc.getTextWidth(tArea);
        const AreaTextWidth = doc.getTextWidth(`${area.value}`);
        const areaStartXValue = currentX.value;
        doc.text(tArea, areaStartXValue, current_y);
        const areaValue = tAreaTextWidth + areaStartXValue;
        doc.text(`${area.value}`, areaValue, current_y);

        doc.line(areaValue, current_y + 2, areaValue + AreaTextWidth, current_y + 2);
        currentX.value = areaValue + AreaTextWidth;

        const tHeightTextWidth = doc.getTextWidth(tHeight);
        const HeightTextWidth = doc.getTextWidth(`${height.value}`);
        const heightStartXValue = currentX.value + 10;
        doc.text(tHeight, heightStartXValue, current_y);
        const heightValue = tHeightTextWidth + heightStartXValue;
        doc.text(`${height.value}`, heightValue, current_y);
        doc.line(heightValue, current_y + 2, heightValue + HeightTextWidth, current_y + 2); // Get text width
        currentX.value = heightValue + HeightTextWidth;

        const tSlopeTextWidth = doc.getTextWidth(tSlope);
        const SlopeTextWidth = doc.getTextWidth(`${slope.value}`);
        const slopeStartXValue = currentX.value + 10;

        doc.text(tSlope, slopeStartXValue, current_y);
        const slopeValue = tSlopeTextWidth + slopeStartXValue;

        doc.text(`${slope.value}`, slopeValue, current_y);

        doc.line(slopeValue, current_y + 2, slopeValue + SlopeTextWidth, current_y + 2); // Get text width
        currentX.value = slopeValue + SlopeTextWidth;
        current_y = current_y + 10;

        const tDeckTextWidth = doc.getTextWidth(tDeck);
        const DeckTextWidth = doc.getTextWidth(`${deckType.value}`);
        const deckStartXValue = LeftStart;
        doc.text(tDeck, deckStartXValue, current_y);
        const decktypeStartValue = tDeckTextWidth + deckStartXValue;
        doc.text(`${deckType.value}`, decktypeStartValue, current_y);

        doc.line(decktypeStartValue, current_y + 2, decktypeStartValue + DeckTextWidth, current_y + 2); // Get text width
        current_y = current_y + 10;

        const noaText = 'Shingle NOA Number: ';
        const applicantText = 'Shingle Applicant: ';
        const materialText = 'Shingle Material: ';
        const descriptionText = 'Shingle Description: ';

        const polynoaText = 'Fastened (UDL)NOA: ';
        const polyapplicantText = 'UDL NOA Applicant: ';
        const polymaterialText = 'Fastened UDL Material: ';
        const polydescriptionText = 'UDL Description: ';
        const Perscriptive = 'Perscriptive: ';

        console.log(shingleStore.$state.inputshingle[0]);
        const noa = ref(shingleStore.$state.inputshingle[0]?.shingleData?.noa || '');
        const applicant = ref(shingleStore.$state.inputshingle[0]?.shingleData?.applicant) || '';
        const material = ref(shingleStore.$state.inputshingle[0]?.shingleData?.material || '');
        const description = ref(shingleStore.$state.inputshingle[0]?.shingleData?.description || '');
        const prescriptive = ref(shingleStore.$state.inputshingle[0]?.shingleData?.prescriptiveSelection || '');

        const valueTextWidth_0 = doc.getTextWidth(Perscriptive);
        const perscriptiveTextValue = doc.getTextWidth(`${prescriptive.value}`);
        const perspectiveStartXValue = LeftStart;
        doc.text(Perscriptive, perspectiveStartXValue, current_y);
        const perscriptiveValue = valueTextWidth_0 + 10;
        doc.text(`${prescriptive.value}`, perscriptiveValue, current_y);
        doc.line(perscriptiveValue, current_y + factor, perscriptiveValue + perscriptiveTextValue, current_y + factor);

        current_y = current_y + 8;

        const dripEdgeMaterial = 'DripEdge Material: ';

        const dripEdgeSize = 'DripEdge Size: ';
        console.log(dripShingleStore);
        const dripedgeMaterials = ref(dripShingleStore.$state.dripinputshin[1]?.dripShinMaterial || '');
        const dripedgeSize = ref(dripShingleStore.$state.dripinputshin[3]?.dripShinMaterial || '');
        console.log(dripedgeMaterials, dripedgeSize);
        const dripMaterialTextWidth = doc.getTextWidth(dripEdgeMaterial);
        const materialTextWidth = doc.getTextWidth(`${dripedgeMaterials.value}`);
        const dMaterialStartXValue = LeftStart;
        doc.text(dripEdgeMaterial, dMaterialStartXValue, current_y);
        const dripMaterialStartValue = dripMaterialTextWidth + dMaterialStartXValue;
        doc.text(`${dripedgeMaterials.value}`, dripMaterialStartValue, current_y);

        doc.line(dripMaterialStartValue, current_y + factor, dripMaterialStartValue + materialTextWidth, current_y + factor);

        current_y = current_y + 10;

        const dripEdgeSizeTextWidth = doc.getTextWidth(dripEdgeSize);
        const dripEdgeTextWidth = doc.getTextWidth(`${dripedgeSize.value}`);
        const dSizeStartXValue = LeftStart;
        doc.text(dripEdgeSize, dSizeStartXValue, current_y);
        const dripSizeStartValue = dripEdgeSizeTextWidth + dSizeStartXValue;
        doc.text(`${dripedgeSize.value}`, dripSizeStartValue, current_y);

        doc.line(dripSizeStartValue, current_y + factor, dripSizeStartValue + dripEdgeTextWidth, current_y + factor);
        current_y = current_y + 10;

        const valueTextWidthShingleCategory = doc.getTextWidth(applicantText);
        const valueTextWidthShingle = doc.getTextWidth(`${applicant.value}`);
        const shingleApplicantStartXValue = LeftStart;
        doc.text(applicantText, shingleApplicantStartXValue, current_y);
        const shingleApplicantValue = shingleApplicantStartXValue + valueTextWidthShingleCategory;
        doc.text(`${applicant.value}`, shingleApplicantValue, current_y);
        doc.line(shingleApplicantValue, current_y + factor, shingleApplicantValue + valueTextWidthShingle, current_y + factor);
        currentX.value = shingleApplicantValue + valueTextWidthShingle;

        const valueTextWidthNoa = doc.getTextWidth(noaText);
        const valueTextWidth3 = doc.getTextWidth(`${noa.value}`);
        const shingleStartXValue = currentX.value + 3;
        doc.text(noaText, shingleStartXValue, current_y);
        const noaValue = valueTextWidthNoa + shingleStartXValue;
        doc.text(`${noa.value}`, noaValue, current_y);
        doc.line(noaValue, current_y + factor, noaValue + valueTextWidth3, current_y + factor);
        currentX.value = noaValue + valueTextWidth3;

        current_y = current_y + 10;

        // currentX provides the update of the x coordinate

        const materialStartXValue = LeftStart;
        const valueTextWidthMaterialDesc = doc.getTextWidth(materialText);
        const valueTextWidthMaterial = doc.getTextWidth(`${material.value}`);
        doc.text(materialText, materialStartXValue, current_y);
        const materialValue = materialStartXValue + valueTextWidthMaterialDesc;
        doc.text(`${material.value}`, materialValue, current_y);
        doc.line(materialValue, current_y + factor, materialValue + valueTextWidthMaterial, current_y + factor);
        currentX.value = materialValue + valueTextWidthMaterial;
        current_y = current_y + 10;

        console.log(currentX.value, max_width);

        const valueTextWidth4 = doc.getTextWidth(`${description.value}`);
        const valueTextWidthDesc = doc.getTextWidth(descriptionText);
        currentX.value = materialValue + valueTextWidthMaterial + valueTextWidth4 + valueTextWidthDesc + 25;
        console.log(valueTextWidth4, valueTextWidthDesc);
        const descStartXValue = LeftStart;
        doc.text(descriptionText, descStartXValue, current_y);

        if (valueTextWidth4 > 170) {
            current_y = current_y + 4;
            const descStartXValue = LeftStart;
            const descriptionValue = descStartXValue;
            doc.text(`${description.value}`, descriptionValue, current_y);
            doc.line(descriptionValue, current_y + factor, descriptionValue + valueTextWidth4, current_y + factor);
            current_y = current_y + 8;
        } else {
            // const descStartXValue = LeftStart + valueTextWidthDesc;
            // doc.text(descriptionText, descStartXValue, current_y);
            // this is the text we want to underline
            const descriptionValue = descStartXValue + valueTextWidthDesc;
            doc.text(`${description.value}`, descriptionValue, current_y);
            doc.line(descriptionValue, current_y + factor, descriptionValue + valueTextWidth4, current_y + factor);
            currentX.value = descriptionValue + valueTextWidth4;
        }

        current_y = current_y + 10;
        console.log(polypropolyneStore.$state.polyinput.length);
        if (polypropolyneStore.$state.polyinput.length === 0) {
            const udlNoa = 'n/a';
            const udlApplicant = 'n/a';

            const udlMaterial = 'n/a';
            const udlDescription = 'n/a';

            const valueTextWidthNOA = doc.getTextWidth(polynoaText);
            const valueTextWidth_1 = doc.getTextWidth(udlNoa);
            const udlNoaStartXValue = LeftStart;
            doc.text(polynoaText, udlNoaStartXValue, current_y);
            const udlNoaValue = udlNoaStartXValue + valueTextWidthNOA;

            doc.text(udlNoa, udlNoaValue, current_y);
            doc.line(udlNoaValue, current_y + factor, udlNoaValue + valueTextWidth_1, current_y + factor);
            currentX.value = udlNoaValue + valueTextWidth_1;

            console.log(currentX.value);
            const valueTextWidthApplicant = doc.getTextWidth(polyapplicantText);
            const valueTextWidth_ = doc.getTextWidth(udlApplicant);
            const udlApplicantStartXValue = currentX.value + 2;
            doc.text(polyapplicantText, udlApplicantStartXValue, current_y);
            const udlApplicantValue = udlApplicantStartXValue + valueTextWidthApplicant;
            doc.text(udlApplicant, udlApplicantValue, current_y);
            doc.line(udlApplicantValue, current_y + factor, udlApplicantValue + valueTextWidth_, current_y + factor);
            currentX.value = udlApplicantValue + valueTextWidth_;

            console.log(currentX.value);
            if (currentX.value > max_width) current_y = current_y + 10;
            const udlmatStartXValue = currentX.value + 2;
            const valueTextWidthpolyMat = doc.getTextWidth(polymaterialText);
            const valueTextWidth_2 = doc.getTextWidth(udlMaterial);
            doc.text(polymaterialText, udlmatStartXValue, current_y);
            const udlmaterialValue = udlmatStartXValue + valueTextWidthpolyMat;
            doc.text(udlMaterial, udlmaterialValue, current_y);
            doc.line(udlmaterialValue, current_y + factor, udlmaterialValue + valueTextWidth_2, current_y + factor);
            currentX.value = udlmaterialValue + valueTextWidth_2;
            console.log(currentX.value);
            current_y = current_y + 10;

            console.log(currentX.value);

            const valueTextWidthpolyDesc = doc.getTextWidth(polydescriptionText);
            const valueTextWidth_3 = doc.getTextWidth(udlDescription);
            const udldescStartXValue = LeftStart;
            const checkDescription = udldescStartXValue + valueTextWidth_3;
            console.log(checkDescription);
            doc.text(polydescriptionText, udldescStartXValue, current_y);
            if (checkDescription > max_width) print(checkDescription);
            const udldescriptionValue = udldescStartXValue + valueTextWidthpolyDesc;
            // current_y = current_y + 10;
            doc.text(udlDescription, udldescriptionValue, current_y);
            doc.line(udldescriptionValue, current_y + factor, udldescriptionValue + valueTextWidth_3, current_y + factor);
            currentX.value = udldescriptionValue + valueTextWidth_3;

            current_y = current_y + 8;
        } else {
            const udlNoa = ref(polypropolyneStore.$state.polyinput[0].polyData.noa);
            const udlApplicant = ref(polypropolyneStore.$state.polyinput[0].polyData.applicant);
            const udlMaterial = ref(polypropolyneStore.$state.polyinput[0].polyData.material);
            const udlDescription = ref(polypropolyneStore.$state.polyinput[0].polyData.description);

            const valueTextWidthNOA = doc.getTextWidth(polynoaText);
            const valueTextWidth_1 = doc.getTextWidth(`${udlNoa.value}`);
            const udlNoaStartXValue = LeftStart;
            doc.text(polynoaText, udlNoaStartXValue, current_y);
            const udlNoaValue = valueTextWidthNOA + 10;
            doc.text(`${udlNoa.value}`, udlNoaValue, current_y);
            doc.line(udlNoaValue, current_y + factor, udlNoaValue + valueTextWidth_1, current_y + factor);
            currentX.value = udlNoaValue + valueTextWidth_1;

            const valueTextWidthApplicant = doc.getTextWidth(polyapplicantText);
            const valueTextWidth_ = doc.getTextWidth(`${udlApplicant.value}`);
            const udlApplicantStartXValue = currentX.value + 2;
            doc.text(polyapplicantText, udlApplicantStartXValue, current_y);
            const udlApplicantValue = udlApplicantStartXValue + valueTextWidthApplicant;
            doc.text(`${udlApplicant.value}`, udlApplicantValue, current_y);
            doc.line(udlApplicantValue, current_y + factor, udlApplicantValue + valueTextWidth_, current_y + factor);
            currentX.value = udlApplicantValue + valueTextWidth_;
            //  if (currentX.value > max_width)
            current_y = current_y + 10;
            const udlmatStartXValue = LeftStart;
            const valueTextWidthpolyMat = doc.getTextWidth(polymaterialText);
            const valueTextWidth_2 = doc.getTextWidth(`${udlMaterial.value}`);
            doc.text(polymaterialText, udlmatStartXValue, current_y);
            const udlmaterialValue = udlmatStartXValue + valueTextWidthpolyMat;
            doc.text(`${udlMaterial.value}`, udlmaterialValue, current_y);
            doc.line(udlmaterialValue, current_y + factor, udlmaterialValue + valueTextWidth_2, current_y + factor);

            currentX.value = udlmaterialValue + valueTextWidth_2;

            current_y = current_y + 10;
            console.log(currentX.value);

            const valueTextWidthpolyDesc = doc.getTextWidth(polydescriptionText);
            const valueTextWidth_3 = doc.getTextWidth(`${udlDescription.value}`);
            const udldescStartXValue = LeftStart;
            const checkDescription = udldescStartXValue + valueTextWidth_3;
            console.log(checkDescription);
            doc.text('UDL Description:', udldescStartXValue, current_y);
            if (checkDescription > max_width) print(checkDescription);
            const udldescriptionValue = udldescStartXValue + valueTextWidthpolyDesc;
            // current_y = current_y + 10;
            doc.text(`${udlDescription.value}`, udldescriptionValue, current_y);
            doc.line(udldescriptionValue, current_y + factor, udldescriptionValue + valueTextWidth_3, current_y + factor);
            currentX.value = udldescriptionValue + valueTextWidth_3;
            console.log(currentX.value);
            current_y = current_y + 10;
        }
        const sbsnoaText = 'Self Adhered NOA: ';
        const sbsapplicantText = 'S/A NOA Applicant: ';
        const sbsSystemFText = 'S/A System F: ';
        const sbsmaterialText = 'S/A Material: ';
        const sbsdescriptionText = 'S/A Description: ';
        console.log(sbsStore.$state.systeminput.length);
        if (sbsStore.$state.systeminput.length === 0) {
            const saNoa = 'n/a';
            const saApplicant = 'n/a';
            const saSystemF = 'n/a';
            const saMaterial = 'n/a';
            const saDescription = 'n/a';

            const valueTextWidthsbsNOA = doc.getTextWidth(sbsnoaText);
            const valueTextWidth_4 = doc.getTextWidth(saNoa);
            const saNoaStartXValue = LeftStart;
            doc.text(sbsnoaText, saNoaStartXValue, current_y);
            const sbsnoaValue = saNoaStartXValue + valueTextWidthsbsNOA;
            doc.text(saNoa, sbsnoaValue, current_y);
            doc.line(sbsnoaValue, current_y, sbsnoaValue + valueTextWidth_4, current_y);
            currentX.value = sbsnoaValue + valueTextWidth_4;
            console.log(currentX.value);

            const valueTextWidthsbsApplicant = doc.getTextWidth(sbsapplicantText);
            const valueTextWidthApp = doc.getTextWidth(saApplicant);
            const saApplicantStartXValue = currentX.value + 3;
            doc.text(sbsapplicantText, saApplicantStartXValue, current_y);
            const sbsapplicantValue = saApplicantStartXValue + valueTextWidthsbsApplicant;
            doc.text(saApplicant, sbsapplicantValue, current_y);
            doc.line(sbsapplicantValue, current_y + factor, sbsapplicantValue + valueTextWidthApp, current_y + factor);
            currentX.value = sbsapplicantValue + valueTextWidthApp;
            console.log(currentX.value);

            const valueTextWidthSystem = doc.getTextWidth(sbsSystemFText);
            const saSystemFStartXValue = currentX.value + 3;
            const valueTextSystemFWidth = doc.getTextWidth(saSystemF);
            doc.text(sbsSystemFText, saSystemFStartXValue, current_y);
            const sbsSystemFValue = saSystemFStartXValue + valueTextWidthSystem;
            doc.text(saSystemF, sbsSystemFValue, current_y);
            doc.line(sbsSystemFValue, current_y + factor, sbsSystemFValue + valueTextSystemFWidth, current_y + factor);
            currentX.value = sbsSystemFValue + valueTextSystemFWidth;
            console.log(currentX.value);
            current_y = current_y + 10;

            const valueTextWidthsbsMaterial = doc.getTextWidth(sbsmaterialText);
            const valueTextWidthMat = doc.getTextWidth(saMaterial);
            const saMaterialStartXValue = LeftStart;
            doc.text(sbsmaterialText, saMaterialStartXValue, current_y);
            const sbsmaterialValue = saMaterialStartXValue + valueTextWidthsbsMaterial;
            doc.text(saMaterial, sbsmaterialValue, current_y);
            doc.line(sbsmaterialValue, current_y + factor, sbsmaterialValue + valueTextWidthMat, current_y + factor);
            currentX.value = sbsmaterialValue + valueTextWidthMat;
            console.log(currentX.value);

            const valueTextWidthsbsDescription = doc.getTextWidth(sbsdescriptionText);
            const valueTextWidthDesc = doc.getTextWidth(saDescription);
            const saDescriptionStartXValue = currentX.value + 3;
            doc.text(sbsdescriptionText, saDescriptionStartXValue, current_y);
            const sbsdescriptionValue = saDescriptionStartXValue + valueTextWidthsbsDescription;
            doc.text(saDescription, sbsdescriptionValue, current_y);
            doc.line(sbsdescriptionValue, current_y + factor, sbsdescriptionValue + valueTextWidthDesc, current_y + factor);
            currentX.value = sbsdescriptionValue + valueTextWidthDesc;
            console.log(currentX.value);
        } else {
            console.log('Entered sbs line 509', sbsStore.$state);
            const saNoa = ref(sbsStore.$state.systeminput[0]?.systemData?.noa);
            const saApplicant = ref(sbsStore.$state.systeminput[0]?.systemData?.manufacturer);
            const saSystemF = ref(sbsStore.$state.systeminput.pdfSystemValue);
            const saMaterial = ref(sbsStore.$state.systeminput[0]?.systemData?.material);
            const saDescription = ref(sbsStore.$state.systeminput[0]?.systemData?.description);
            // [0]?.systemData?.
            const valueTextWidthsbsNOA = doc.getTextWidth(sbsnoaText);
            const valueTextWidth_4 = doc.getTextWidth(`${saNoa.value}`);
            const saNoaStartXValue = LeftStart;
            doc.text(sbsnoaText, saNoaStartXValue, current_y);
            const sbsnoaValue = saNoaStartXValue + valueTextWidthsbsNOA;
            doc.text(`${saNoa.value}`, sbsnoaValue, current_y);
            doc.line(sbsnoaValue, current_y + factor, sbsnoaValue + valueTextWidth_4, current_y + factor);
            currentX.value = sbsnoaValue + valueTextWidth_4;

            const valueTextWidthsbsApplicant = doc.getTextWidth(sbsapplicantText);
            const valueTextWidthApp = doc.getTextWidth(`${saApplicant.value}`);
            const saApplicantStartXValue = currentX.value + 3;
            doc.text(sbsapplicantText, saApplicantStartXValue, current_y);
            const sbsapplicantValue = saApplicantStartXValue + valueTextWidthsbsApplicant;
            doc.text(`${saApplicant.value}`, sbsapplicantValue, current_y);
            doc.line(sbsapplicantValue, current_y + factor, sbsapplicantValue + valueTextWidthApp, current_y + factor);
            currentX.value = sbsapplicantValue + valueTextWidthApp;
            console.log(currentX.value);

            const valueTextWidthSystem = doc.getTextWidth(sbsSystemFText);
            const valueTextWidthSys = doc.getTextWidth(`${saSystemF.value}`);
            const saSystemFStartXValue = currentX.value + 3;
            doc.text(sbsSystemFText, saSystemFStartXValue, current_y);
            const sbsSystemFValue = saSystemFStartXValue + valueTextWidthSystem;
            doc.text(`${saSystemF.value}`, sbsSystemFValue, current_y);
            doc.line(sbsSystemFValue, current_y + factor, sbsSystemFValue + valueTextWidthSys, current_y + factor);
            currentX.value = sbsSystemFValue + valueTextWidthSys;

            current_y = current_y + 10;
            console.log(currentX.value);

            const valueTextWidthsbsMaterial = doc.getTextWidth(sbsmaterialText);
            const valueTextWidthMat = doc.getTextWidth(`${saMaterial.value}`);
            const saMaterialStartXValue = LeftStart;
            doc.text(sbsmaterialText, saMaterialStartXValue, current_y);
            const sbsmaterialValue = saMaterialStartXValue + valueTextWidthsbsMaterial;
            doc.text(`${saMaterial.value}`, sbsmaterialValue, current_y);
            doc.line(sbsmaterialValue, current_y + factor, sbsmaterialValue + valueTextWidthMat, current_y + factor);
            currentX.value = sbsmaterialValue + valueTextWidthMat;

            if (currentX.value > max_width) current_y = current_y + 10;
            console.log(currentX.value);

            const valueTextWidthsbsDescription = doc.getTextWidth(sbsdescriptionText);
            const valueTextWidthDesc = doc.getTextWidth(`${saDescription.value}`);
            const saDescriptionStartXValue = currentX.value + 3;
            doc.text(sbsdescriptionText, saDescriptionStartXValue, current_y);
            const sbsdescriptionValue = saDescriptionStartXValue + valueTextWidthsbsDescription;
            doc.text(`${saDescription.value}`, sbsdescriptionValue, current_y);
            doc.line(sbsdescriptionValue, current_y + factor, sbsdescriptionValue + valueTextWidthDesc, current_y + factor);
            currentX.value = sbsdescriptionValue + valueTextWidthDesc;
            if (currentX.value >= max_width) current_y = current_y + 10;
            console.log(currentX.value);
        }
        // Save the PDF
        // doc.save('Shingle.pdf');
        const fName = 'Shingle.pdf';
        const pdfBlob = doc.output('blob');

        const uploadFile = async (fName, pdfBlob) => {
            const file = fName;
            console.log(file);
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

                    alert('Shingle File uploaded successfully!');
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
