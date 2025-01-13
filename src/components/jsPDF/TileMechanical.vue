<template>
    <div>
        <!-- <h1>Generate PDF with Columns and Underlined Text</h1>
        <button @click="generatePDF">Download PDF</button> -->
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { usetilesysEStore } from '@/stores/tilesysEStore';
import { usetilesysfStore } from '@/stores/tilesysfStore';
import { invoke, tryOnMounted, until } from '@vueuse/core';

import useMech from '@/composables/InputLogic/use-tileMechanical';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

const { getUser } = useGlobalState();
let isRoofTileMechanicalValid = ref(false);
const permitStore = usePermitappStore();
const roofStore = useRoofListStore();
const roofType = ref(roofStore.$state.roofList);
const { mechStore } = useMech();
const saStore = usetilesysfStore();
const etileStore = usetilesysEStore();
const usedripStore = usedripedgeStore();
// const folio = ref(permitStore.$state.permitapp[0].formdt.folio);

const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    } else if (roofType.value[0].item === 'Mechanical Fastened Tile') {
        isRoofTileMechanicalValid.value = true;
        generatePDF();
    }

    // if (roofType.value[0].item === 'Mechanical Fastened Tile') {
    //     isRoofTileMechanicalValid.value = true;
    //     generatePDF();
    // }
});

invoke(async () => {
    await until(callState).toBe(true);

    console.log(callState);
});
const generatePDF = () => {
    // Initialize jsPDF instance
    if (mechStore.tilemech.value.length === 0) {
        console.log('lenghth is   zero');
    } else {
        // console.log(sbsStore, polypropolyneStore);
        let isUDLValidPresc = ref(false);
        let isSAValidPresc = ref(false);
        if (etileStore.$state.tilesysEinput.length !== 0) {
            isUDLValidPresc = true;
            console.log(isUDLValidPresc);
        }
        if (saStore.$state.tilefinput.length !== 0) {
            isSAValidPresc = true;
            console.log(isSAValidPresc);
        }
        // Initialize jsPDF instance
        console.log(mechStore.tilemech.value[0]);
        const height = ref(mechStore.tilemech.value[0].height);
        const slope = ref(mechStore.tilemech.value[0].slope);
        const deckType = ref(mechStore.tilemech.value[0].deckType);
        // const perimeter = ref(mechStore.tilemech.value[0].perimeter);
        // const prescriptive = ref(mechStore.tilemech.value[0].prescriptiveSelection);
        const area = ref(roofStore.$state.roofList[0].dim3);
        const address = ref(permitStore.$state.permitapp[0].formdt.address);
        const municipality = ref(permitStore.$state.permitapp[0].formdt.muni);
        const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
        const dripedgeMaterials = ref(usedripStore.$state.dripinput[0].dripData);
        const dripedgeSize = ref(usedripStore.$state.dripinput[3].dripData);
        const objName = processNumber.value.length !== 0 ? processNumber.value : 'files';
        const uploadUrl = ref('');
        const dba = ref(getUser.value[0].dba);
        const doc = new jsPDF();
        // Load an image (example with Base64)
        doc.setGState(new doc.GState({ opacity: 0.8 })); // Adjust opacity
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
        image.src = '/demo/images/officepaper.jpeg';
        logoImage.src = '/demo/images/logo.jpeg';

        doc.addImage(logoImage, 'JPEG', 10, 10, 50, 30);

        // Set background image for the entire PDF
        doc.addImage(image, 'JPEG', 0, 0, 210, 297); // full A4 size (210mm x 297mm)
        doc.setFontSize(20);
        doc.setTextColor(190, 190, 190);
        var currentDate = new Date();
        var formattedDate = currentDate.toLocaleDateString();
        doc.text(approved, 10, 270, { align: 'left' });
        const approvedWidth = doc.getTextWidth(approved);
        doc.text('on: ' + formattedDate, approvedWidth + 15, 270);
        doc.text(`${processNumber.value}`, 10, 280, { align: 'left' });
        const procWidth = doc.getTextWidth(`${processNumber.value}`);
        doc.text(`${municipality.value}`, procWidth + 15, 280);

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
            doc.text(
                'The tile roof system and its components shall be installed in strict compliance with the FBC 2023 HVHZ portions of Chapter 15, the HVHZ Tile Application Standards: RAS-119, RAS-120 & RAS-127 and the submitted MDC Notice of Acceptance(s).',
                10,
                20,
                { maxWidth: '200' }
            ); // Position at (x, y)
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
        doc.setFontSize(14);
        // doc.text('Tile Output', 10, 50);
        // Example data for categories and values
        const data = [
            { category: 'DBA', value: `${dba.value}` },
            { category: 'Municipality', value: `${municipality.value}` },
            { category: 'Job Address', value: `${address.value}` },
            { category: 'meProcess Number', value: `${processNumber.value}` }
            // { category: 'Folio', value: `${folio.value}` }
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

        doc.setFontSize(12);
        const factor = 2;
        const initialYValue = 100;
        doc.text('Roof Area:', 10, initialYValue);

        doc.text(`${area.value}`, 35, initialYValue);

        doc.line(35, initialYValue + factor, 45, initialYValue + factor);
        doc.text('Mean Roof Height:', 50, initialYValue);

        const valueTextWidth1 = doc.getTextWidth('Mean Roof Height:');
        doc.text(`${height.value}`, initialYValue, initialYValue);
        doc.line(90, initialYValue + factor, 70 + valueTextWidth1, initialYValue + factor); // Get text width

        doc.text('Roof Slope:', 80 + valueTextWidth1, initialYValue);
        const slopeStartXValue = 105 + valueTextWidth1;
        doc.text(`${slope.value}`, slopeStartXValue, initialYValue);
        const valueTextWidth2 = doc.getTextWidth(`${slope.value}`) * 2;
        doc.line(slopeStartXValue, initialYValue + factor, slopeStartXValue + valueTextWidth2, initialYValue + factor); // Get text width

        const secondYCoordinate = 108;
        doc.text('Decktype:', 10, secondYCoordinate);
        const decktypeStartXValue = 30 + valueTextWidth2;
        doc.text(`${deckType.value}`, decktypeStartXValue, secondYCoordinate);
        const valueTextWidth5 = doc.getTextWidth(`${deckType.value}`) * 2;
        doc.line(decktypeStartXValue, secondYCoordinate, decktypeStartXValue + valueTextWidth5, secondYCoordinate); // Get text width

        // doc.text('Prescriptive ASTM # 30 with type IV hot asphalt applied # 90 Tile Capsheet:', 10, 70);
        // doc.text('Fastened Underlayment (UDL) with Self Adhered (S/A) Tile Capsheet:', 10, 80);
        const noaText = 'Tile NOA Number: ';
        const applicantText = 'Tile Applicant: ';
        const materialText = 'Tile Material: ';
        const descriptionText = 'Tile Description: ';

        const polynoaText = 'Fastened (UDL) NOA: ';
        const polyapplicantText = '(UDL) NOA Applicant: ';
        const polymaterialText = 'Fastened (UDL) Material: ';
        const systemEselectionText = 'Select System E: ';
        const designPSFText = 'Design psf: ';
        const anchordescriptionText = 'Anchor Base Sheet: ';
        const udldescriptionText = '(UDL) Description: ';
        const Prescriptive = 'Prescriptive: ';

        const dripEdgeMaterial = 'DripEdge Matetiral: ';

        const dripEdgeSize = 'DripEdge Size: ';

        const max_width = 179;
        const thirdYCoordinate = 725;
        const page = doc.getPageInfo(1);
        console.log(page);
        const topRightx = page.pageContext.mediaBox.topRightX;
        const topRighty = page.pageContext.mediaBox.topRightY;

        const currentX = ref(0);
        const currentY = ref(0);
        var LeftStart = 595.28 - 585.28;
        var current_y = topRighty - thirdYCoordinate;
        currentX.value = LeftStart;
        currentY.value = current_y;
        console.log(currentX.value, currentY.value);
        const noa = ref(mechStore.tilemech.value[0].noa);
        const applicant = ref(mechStore.tilemech.value[0].manufacturer);
        const material = ref(mechStore.tilemech.value[0].material);
        const description = ref(mechStore.tilemech.value[0].description);

        const valueTextWidth_0 = doc.getTextWidth(Prescriptive);
        const perspectiveStartXValue = LeftStart;
        doc.text(Prescriptive, perspectiveStartXValue, current_y);
        const perscriptiveValue = LeftStart;
        current_y = current_y + 10;
        // doc.text(`${prescriptive.value.selectedBasesheet}`, perscriptiveValue, current_y);
        //  doc.line(perscriptiveValue, current_y, perscriptiveValue + valueTextWidthTile, current_y);
        current_y = current_y + 10;

        const dripMaterialTextWidth = doc.getTextWidth(dripEdgeMaterial);
        const materialTextWidth = doc.getTextWidth(`${dripedgeMaterials.value}`);
        const dMaterialStartXValue = LeftStart;
        doc.text(dripEdgeMaterial, dMaterialStartXValue, current_y);
        const dripMaterialStartValue = dripMaterialTextWidth + dMaterialStartXValue;
        doc.text(`${dripedgeMaterials.value}`, dripMaterialStartValue, current_y);

        doc.line(dripMaterialStartValue, current_y, dripMaterialStartValue + materialTextWidth, current_y);

        current_y = current_y + 10;

        const dripEdgeSizeTextWidth = doc.getTextWidth(dripEdgeSize);
        const dripEdgeTextWidth = doc.getTextWidth(`${dripedgeSize.value}`);
        const dSizeStartXValue = LeftStart;
        doc.text(dripEdgeSize, dSizeStartXValue, current_y);
        const dripSizeStartValue = dripEdgeSizeTextWidth + dSizeStartXValue;
        doc.text(`${dripedgeSize.value}`, dripSizeStartValue, current_y);

        doc.line(dripSizeStartValue, current_y, dripSizeStartValue + dripEdgeTextWidth, current_y);
        current_y = current_y + 10;

        const valueTextWidth0 = doc.getTextWidth(`${applicant.value}`);
        const valueTextWidthApp = doc.getTextWidth(applicantText);
        const applicantStartXValue = LeftStart;
        doc.text(applicantText, applicantStartXValue, current_y);
        const applicantValue = applicantStartXValue + valueTextWidthApp;
        doc.text(`${applicant.value}`, applicantValue, current_y);
        doc.line(applicantValue, current_y, applicantValue + valueTextWidth0, current_y);

        currentX.value = applicantValue + valueTextWidth0;

        const noaValueTextWidth = doc.getTextWidth(noaText);
        const valueTextWidth3 = doc.getTextWidth(`${noa.value}`);
        const noaStartXValue = currentX.value + noaValueTextWidth;
        doc.text(noaText, currentX.value + 2, current_y);
        doc.text(`${noa.value}`, noaStartXValue + 2, current_y);
        doc.line(noaStartXValue, current_y, noaStartXValue + valueTextWidth3, current_y);
        currentX.value = noaStartXValue + valueTextWidth3;

        // if (currentX.value < max_width)

        // currentX provides the update of the x coordinate
        const fourthYCoordinate = current_y;

        const valueTextWidthMaterialDesc = doc.getTextWidth(materialText);
        const valueTextWidthMaterial = doc.getTextWidth(`${material.value}`);
        const materialStartXValue = currentX.value + 5;
        doc.text(materialText, materialStartXValue, fourthYCoordinate);
        const materialValue = materialStartXValue + valueTextWidthMaterialDesc;
        doc.text(`${material.value}`, materialValue, fourthYCoordinate);
        doc.line(materialValue, fourthYCoordinate, materialValue + valueTextWidthMaterial, fourthYCoordinate);
        currentX.value = materialValue + valueTextWidthMaterial;

        current_y = current_y + 10;

        const valueTextWidth4 = doc.getTextWidth(`${description.value}`);
        const valueTextWidthDesc = doc.getTextWidth(descriptionText);

        const descStartXValue = LeftStart;
        doc.text(descriptionText, descStartXValue, current_y);
        // this is the text we want to underline
        const descriptionValue = descStartXValue + valueTextWidthDesc;
        doc.text(`${description.value}`, descriptionValue, current_y);
        doc.line(descriptionValue, current_y, descriptionValue + valueTextWidth4, current_y);
        currentX.value = descriptionValue + valueTextWidth4;

        current_y = current_y + 10;

        if (etileStore.$state.tilesysEinput.length === 0) {
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
            doc.line(udlNoaValue, current_y, udlNoaValue + valueTextWidth_1, current_y);
            currentX.value = udlNoaValue + valueTextWidth_1;

            console.log(currentX.value);
            const valueTextWidthApplicant = doc.getTextWidth(polyapplicantText);
            const valueTextWidth_ = doc.getTextWidth(udlApplicant);
            const udlApplicantStartXValue = currentX.value + 2;
            doc.text(polyapplicantText, udlApplicantStartXValue, current_y);
            const udlApplicantValue = udlApplicantStartXValue + valueTextWidthApplicant;
            doc.text(udlApplicant, udlApplicantValue, current_y);
            doc.line(udlApplicantValue, current_y, udlApplicantValue + valueTextWidth_, current_y);
            currentX.value = udlApplicantValue + valueTextWidth_;

            console.log(currentX.value);
            if (currentX.value > max_width) current_y = current_y + 10;
            const udlmatStartXValue = currentX.value + 2;
            const valueTextWidthpolyMat = doc.getTextWidth(polymaterialText);
            const valueTextWidth_2 = doc.getTextWidth(udlMaterial);
            doc.text(polymaterialText, udlmatStartXValue, current_y);
            const udlmaterialValue = udlmatStartXValue + valueTextWidthpolyMat;
            doc.text(udlMaterial, udlmaterialValue, current_y);
            doc.line(udlmaterialValue, current_y, udlmaterialValue + valueTextWidth_2, current_y);
            currentX.value = udlmaterialValue + valueTextWidth_2;
            console.log(currentX.value);
            if (currentX.value > max_width) current_y = current_y + 10;

            console.log(currentX.value);

            const valueTextWidthpolyDesc = doc.getTextWidth(udldescriptionText);
            const valueTextWidth_3 = doc.getTextWidth(udlDescription);
            const udldescStartXValue = LeftStart;
            const checkDescription = udldescStartXValue + valueTextWidth_3;
            console.log(checkDescription);
            doc.text(udldescriptionText, udldescStartXValue, current_y);
            if (checkDescription > max_width) print(checkDescription);
            const udldescriptionValue = udldescStartXValue + valueTextWidthpolyDesc;
            // current_y = current_y + 10;
            doc.text(udlDescription, udldescriptionValue, current_y);
            doc.line(udldescriptionValue, current_y, udldescriptionValue + valueTextWidth_3, current_y);
            currentX.value = udldescriptionValue + valueTextWidth_3;

            current_y = current_y + 10;
        } else {
            const udlNoa = ref(etileStore.$state.tilesysEinput[0].systemDataE.noa);
            const udlApplicant = ref(etileStore.$state.tilesysEinput[0].systemDataE.manufacturer);
            const udlMaterial = ref(etileStore.$state.tilesysEinput[0].systemDataE.material);
            const udlSystemE = ref(etileStore.$state.tilesysEinput[0].systemDataE.systemSelected);
            const designPressure = ref(etileStore.$state.tilesysEinput[0].systemDataE.dP);
            const anchorDescription = ref(etileStore.$state.tilesysEinput[0].systemDataE.Anchor_Base);
            const udlDescription = ref(etileStore.$state.tilesysEinput[0].systemDataE.tileCap);

            const valueTextWidthNOA = doc.getTextWidth(polynoaText);
            const valueTextWidth_1 = doc.getTextWidth(`${udlNoa.value}`);

            const udlNoaStartXValue = LeftStart;
            doc.text(polynoaText, udlNoaStartXValue, current_y);
            const udlNoaValue = descStartXValue + valueTextWidthNOA;
            doc.text(`${udlNoa.value}`, udlNoaValue, current_y);
            doc.line(udlNoaValue, current_y, udlNoaValue + valueTextWidth_1, current_y);
            currentX.value = udlNoaValue + valueTextWidth_1;

            const valueTextWidthApplicant = doc.getTextWidth(polyapplicantText);
            const valueTextWidth_ = doc.getTextWidth(`${udlApplicant.value}`);
            const udlApplicantStartXValue = currentX.value + 2;
            doc.text(polyapplicantText, udlApplicantStartXValue, current_y);
            const udlApplicantValue = udlApplicantStartXValue + valueTextWidthApplicant;
            doc.text(`${udlApplicant.value}`, udlApplicantValue, current_y);
            doc.line(udlApplicantValue, current_y, udlApplicantValue + valueTextWidth_, current_y);
            const matWidth = doc.getTextWidth(`${udlMaterial.value}`);
            currentX.value = udlApplicantValue + matWidth;

            current_y = current_y + 10;
            const udlmatStartXValue = LeftStart;
            const valueTextWidthpolyMat = doc.getTextWidth(polymaterialText);
            const valueTextWidth_2 = doc.getTextWidth(`${udlMaterial.value}`);
            doc.text(polymaterialText, udlmatStartXValue, current_y);
            const udlmaterialValue = udlmatStartXValue + valueTextWidthpolyMat;
            doc.text(`${udlMaterial.value}`, udlmaterialValue, current_y);
            doc.line(udlmaterialValue, current_y, udlmaterialValue + valueTextWidth_2, current_y);

            currentX.value = udlmaterialValue + valueTextWidth_2;
            if (currentX.value > max_width) current_y = current_y + 10;
            //     console.log(currentX.value);

            const systemEStartXValue = currentX.value + 5;
            const valueTextWidthSystemE = doc.getTextWidth(systemEselectionText);
            const valueTextWidthE = doc.getTextWidth(`${udlSystemE.value}`);
            doc.text(systemEselectionText, systemEStartXValue, current_y);
            const udlsystemEValue = systemEStartXValue + valueTextWidthSystemE;
            doc.text(`${udlSystemE.value}`, udlsystemEValue, current_y);
            doc.line(udlsystemEValue, current_y, udlsystemEValue + valueTextWidthE, current_y);
            currentX.value = udlsystemEValue + valueTextWidthE;
            if (currentX.value > max_width) current_y = current_y + 10;

            const valueTextWidthpolyDesignP = doc.getTextWidth(designPSFText);
            const valueTextWidthDP = doc.getTextWidth(`${designPressure.value}`);
            const udldesignStartXValue = currentX.value + 3;
            doc.text(designPSFText, udldesignStartXValue, current_y);
            const udldesignValue = udldesignStartXValue + valueTextWidthpolyDesignP;

            doc.text(`${designPressure.value}`, udldesignValue, current_y);
            doc.line(udldesignValue, current_y, udldesignValue + valueTextWidthDP, current_y);
            currentX.value = udldesignValue + valueTextWidthDP;
            console.log(currentX.value);
            current_y = current_y + 10;

            const valueTextWidthanchorDesc = doc.getTextWidth(anchordescriptionText);
            const valueTextWidthAnchor = doc.getTextWidth(`${anchorDescription.value}`);
            const udlanchorStartXValue = LeftStart;
            doc.text(anchordescriptionText, udlanchorStartXValue, current_y);
            current_y = current_y + 10;
            const udlanchorValue = LeftStart;

            doc.text(`${anchorDescription.value}`, udlanchorValue, current_y);
            doc.line(udlanchorValue, current_y, udlanchorValue + valueTextWidthAnchor, current_y);
            currentX.value = udlanchorValue + valueTextWidthAnchor;
            current_y = current_y + 10;
            //     console.log(currentX.value);

            const valueTextWidthpolyDesc = doc.getTextWidth(udldescriptionText);
            const valueTextWidth_3 = doc.getTextWidth(`${udlDescription.value}`);
            const udldescStartXValue = LeftStart;

            doc.text(udldescriptionText, udldescStartXValue, current_y);

            const udldescriptionValue = udldescStartXValue + valueTextWidthpolyDesc;

            doc.text(`${udlDescription.value}`, udldescriptionValue, current_y);
            doc.line(udldescriptionValue, current_y, udldescriptionValue + valueTextWidth_3, current_y);
            currentX.value = udldescriptionValue + valueTextWidth_3;
            console.log(currentX.value);
            current_y = current_y + 10;
        }
        const sbsnoaText = 'Self Adhered NOA: ';
        const sbsapplicantText = 'S/A NOA Applicant: ';
        const sbsSystemFText = 'S/A System F: ';
        const sbsmaterialText = 'S/A Material: ';
        const sbsdescriptionText = 'S/A Description: ';
        if (saStore.$state.tilefinput.length === 0) {
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
            doc.line(sbsapplicantValue, current_y, sbsapplicantValue + valueTextWidthApp, current_y);
            currentX.value = sbsapplicantValue + valueTextWidthApp;
            console.log(currentX.value);

            const valueTextWidthSystem = doc.getTextWidth(sbsSystemFText);
            const saSystemFStartXValue = currentX.value + 3;
            doc.text(sbsSystemFText, saSystemFStartXValue, current_y);
            const sbsSystemFValue = saSystemFStartXValue + valueTextWidthSystem;
            doc.text(saSystemF, sbsSystemFValue, current_y);
            doc.line(sbsSystemFValue, current_y, sbsSystemFValue + valueTextWidthSystem, current_y);
            currentX.value = sbsSystemFValue + valueTextWidthSystem;
            console.log(currentX.value);
            current_y = current_y + 10;

            const valueTextWidthsbsMaterial = doc.getTextWidth(sbsmaterialText);
            const valueTextWidthMat = doc.getTextWidth(saMaterial);
            const saMaterialStartXValue = LeftStart;
            doc.text(sbsmaterialText, saMaterialStartXValue, current_y);
            const sbsmaterialValue = saMaterialStartXValue + valueTextWidthsbsMaterial;
            doc.text(saMaterial, sbsmaterialValue, current_y);
            doc.line(sbsmaterialValue, current_y, sbsmaterialValue + valueTextWidthMat, current_y);
            currentX.value = sbsmaterialValue + valueTextWidthMat;
            console.log(currentX.value);

            const valueTextWidthsbsDescription = doc.getTextWidth(sbsdescriptionText);
            const valueTextWidthDesc = doc.getTextWidth(saDescription);
            const saDescriptionStartXValue = currentX.value + 3;
            doc.text(sbsdescriptionText, saDescriptionStartXValue, current_y);
            const sbsdescriptionValue = saDescriptionStartXValue + valueTextWidthsbsDescription;
            doc.text(saDescription, sbsdescriptionValue, current_y);
            doc.line(sbsdescriptionValue, current_y, sbsdescriptionValue + valueTextWidthDesc, current_y);
            currentX.value = sbsdescriptionValue + valueTextWidthDesc;
            console.log(currentX.value);
        } else {
            console.log('Entered sbs line 455', saStore.$state);
            const saNoa = ref(saStore.$state.tilefinput[0].systemData.noa);
            const saApplicant = ref(saStore.$state.tilefinput[0].systemData.manufacturer);
            const saSystemF = ref(saStore.$state.tilefinput[0].systemData.pressure);
            const saMaterial = ref(saStore.$state.tilefinput[0].systemData.material);
            const saDescription = ref(saStore.$state.tilefinput[0].systemData.description);

            const valueTextWidthsbsNOA = doc.getTextWidth(sbsnoaText);
            const valueTextWidth_4 = doc.getTextWidth(`${saNoa.value}`);
            const saNoaStartXValue = LeftStart;
            doc.text(sbsnoaText, saNoaStartXValue, current_y);
            const sbsnoaValue = saNoaStartXValue + valueTextWidthsbsNOA;
            doc.text(`${saNoa.value}`, sbsnoaValue, current_y);
            doc.line(sbsnoaValue, current_y, sbsnoaValue + valueTextWidth_4, current_y);
            currentX.value = sbsnoaValue + valueTextWidth_4;

            const valueTextWidthsbsApplicant = doc.getTextWidth(sbsapplicantText);
            const valueTextWidthApp = doc.getTextWidth(`${saApplicant.value}`);
            const saApplicantStartXValue = currentX.value + 3;
            doc.text(sbsapplicantText, saApplicantStartXValue, current_y);
            const sbsapplicantValue = saApplicantStartXValue + valueTextWidthsbsApplicant;
            doc.text(`${saApplicant.value}`, sbsapplicantValue, current_y);
            doc.line(sbsapplicantValue, current_y, sbsapplicantValue + valueTextWidthApp, current_y);
            currentX.value = sbsapplicantValue + valueTextWidthApp;
            console.log(currentX.value);

            const valueTextWidthSystem = doc.getTextWidth(sbsSystemFText);
            const valueTextWidthSys = doc.getTextWidth(`${saSystemF.value}`);
            const saSystemFStartXValue = currentX.value + 3;
            doc.text(sbsSystemFText, saSystemFStartXValue, current_y);
            const sbsSystemFValue = saSystemFStartXValue + valueTextWidthSystem;
            doc.text(`${saSystemF.value}`, sbsSystemFValue, current_y);
            doc.line(sbsSystemFValue, current_y, sbsSystemFValue + valueTextWidthSys, current_y);
            currentX.value = sbsSystemFValue + valueTextWidthSys;

            current_y = current_y + 10;
            //     console.log(currentX.value);

            const valueTextWidthsbsMaterial = doc.getTextWidth(sbsmaterialText);
            const valueTextWidthMat = doc.getTextWidth(`${saMaterial.value}`);
            const saMaterialStartXValue = LeftStart;
            doc.text(sbsmaterialText, saMaterialStartXValue, current_y);
            const sbsmaterialValue = saMaterialStartXValue + valueTextWidthsbsMaterial;
            doc.text(`${saMaterial.value}`, sbsmaterialValue, current_y);
            doc.line(sbsmaterialValue, current_y, sbsmaterialValue + valueTextWidthMat, current_y);
            currentX.value = sbsmaterialValue + valueTextWidthMat;

            if (currentX.value > max_width) current_y = current_y + 10;
            //     console.log(currentX.value);

            const valueTextWidthsbsDescription = doc.getTextWidth(sbsdescriptionText);
            const valueTextWidthDesc = doc.getTextWidth(`${saDescription.value}`);
            const saDescriptionStartXValue = currentX.value + 3;
            doc.text(sbsdescriptionText, saDescriptionStartXValue, current_y);
            const sbsdescriptionValue = saDescriptionStartXValue + valueTextWidthsbsDescription;
            doc.text(`${saDescription.value}`, sbsdescriptionValue, current_y);
            doc.line(sbsdescriptionValue, current_y, sbsdescriptionValue + valueTextWidthDesc, current_y);
            currentX.value = sbsdescriptionValue + valueTextWidthDesc;
            if (currentX.value >= max_width) current_y = current_y + 10;
            console.log(currentX.value);
        }

        // Save the PDF
        // doc.save('Mechanical.pdf');
        const fName = 'MechanicalTile.pdf';
        const pdfBlob = doc.output('blob');

        const uploadFile = async (fName, pdfBlob) => {
            const file = fName;

            if (!file) {
                alert('Please select a file to upload.');
                return;
            }

            const fileName = file; // Keep original name or generate a new one
            console.log(fileName);
            const s3Url = `https://dsr-pdfupload.s3.us-east-1.amazonaws.com/${objName}/${fileName}`;

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

                    alert('File uploaded successfully!');
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
