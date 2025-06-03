<template>
    <div>
        <!-- <h1>Generate PDF Mechanical Tile </h1>
        <button @click="generatePDF">Download PDF</button> -->
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
// import { usedripedgeStore } from '@/stores/dripEdgeStore';
import useMech from '@/composables/InputLogic/use-tileMechanical';
import { usedripMStore } from '@/stores/dripEdgeMechTileStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { usetilesysEStore } from '@/stores/tilesysEStore';
import { usetilesysfStore } from '@/stores/tilesysfStore';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

const { getUser } = useGlobalState();
const isRoofTileMechanicalValid = ref(false);
const permitStore = usePermitappStore();
const roofStore = useRoofListStore();
const roofType = ref(roofStore.$state.roofList);
const { mechStore } = useMech();
const saStore = usetilesysfStore();
const etileStore = usetilesysEStore();
// const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

// const usedripStore = usedripedgeStore();
const dripmechTileStore = usedripMStore();
// const folio = ref(permitStore.$state.permitapp[0].formdt.folio);

const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    } else {
        for (let i = 0; i < roofType.value.length; i++) {
            if (roofType.value[i].item === 'Mechanical Fastened Tile') {
                console.log(roofType.value[i].item);
                isRoofTileMechanicalValid.value = true;
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
    if (mechStore.tilemech.value.length === 0) {
        console.log('lenghth is   zero');
    } else {
        // console.log(sbsStore, polypropolyneStore);
        let isUDLValidPresc = ref(false);
        let isSAValidPresc = ref(false);
        let multiContent = ref(false);
        if (mechStore.tilemech.value[0]?.Table2?.content === 'multiple') {
            multiContent = true;
        }
        if (etileStore.$state.tilesysEinput.length !== 0) {
            isUDLValidPresc = true;

            console.log(isUDLValidPresc, etileStore);
        }
        if (saStore.$state.tilefinput.length !== 0) {
            isSAValidPresc = true;
            console.log(isSAValidPresc);
        }
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4', // Smaller page size
            compress: true
        });

        const factor = 1;
        const initialYValue = 90;
        const max_width = 179;
        const thirdYCoordinate = 725;
        const page = doc.getPageInfo(1);
        console.log(page);
        const topRightx = page.pageContext.mediaBox.topRightX;
        const topRighty = page.pageContext.mediaBox.topRightY;

        const currentX = ref(0);
        const currentY = ref(0);
        var current_y = topRighty - thirdYCoordinate;

        var LeftStart = 595.28 - 585.28;
        currentX.value = LeftStart;
        currentY.value = current_y;
        // Initialize jsPDF instance
        console.log(permitStore.$state.permitapp);
        console.log(mechStore.tilemech.value[0]);
        const height = ref(mechStore.tilemech.value[0]?.height || 'N/A');
        const slope = ref(mechStore.tilemech.value[0]?.slope || 'N/A');
        const deckType = ref(mechStore.tilemech.value[0]?.decktype || 'N/A');
        const perimeter = ref(mechStore.tilemech.value[0]?.perimeter || 'N/A');
        const udlPrescriptive = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.prescriptiveSelection);
        console.log(mechStore.tilemech.value[0].prescriptiveSelection);
        const prescriptive = isUDLValidPresc === true ? udlPrescriptive : ref(mechStore.tilemech.value[0]?.prescriptiveSelection || 'N/A');

        const area = ref(mechStore.tilemech.value[0]?.area || '');
        const address = ref(permitStore.$state.permitapp[0]?.formdt?.address || '');
        const municipality = ref(permitStore.$state.permitapp[0]?.formdt?.muni || '');
        const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');
        const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.formdt?.muniProc || '');

        // const muniNum = ref(permitStore.$state.permitapp[0]?.muniNum || '');
        // console.log(dripmechTileStore.$state, muniNum.value);
        const dripedgeMaterials = ref(dripmechTileStore.$state.dripinputmecht[5]?.dripMTileMaterial || '');
        const dripedgeSize = ref(dripmechTileStore.$state.dripinputmecht[7]?.dripMTileMaterial || '');
        console.log(mechStore.tilemech.value[0]);
        current_y = current_y + 10;
        const mf1 = ref(mechStore.tilemech.value[0].mf1 || '');
        const lambda1 = ref(mechStore.tilemech.value[0].lambda1 || '');
        const mg1 = ref(mechStore.tilemech.value[0].mg1 || '');
        const mr1 = ref(mechStore.tilemech.value[0].mr1 || '');
        const zoneone = ref(mechStore.tilemech.value[0].zoneone || '');
        const mf2 = ref(mechStore.tilemech.value[0].mf2 || '');
        const lambda2 = ref(mechStore.tilemech.value[0].lambda2 || '');
        const mg2 = ref(mechStore.tilemech.value[0].mg2 || '');
        const mr2 = ref(mechStore.tilemech.value[0].mr2 || '');
        const zonetwo = ref(mechStore.tilemech.value[0].zonetwo || '');
        const mf3 = ref(mechStore.tilemech.value[0].mf3 || '');
        const lambda3 = ref(mechStore.tilemech.value[0].lambda3 || '');
        const mg3 = ref(mechStore.tilemech.value[0].mg3 || '');
        const mr3 = ref(mechStore.tilemech.value[0].mr3);
        const zonethree = ref(mechStore.tilemech.value[0].zonethree || '');

        const uploadUrl = ref('');
        const dba = ref(getUser.value[0].dba);

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
        const lambdaImage = new Image();
        image.src = '/demo/images/officepaper.jpeg';
        logoImage.src = '/demo/images/logo.jpeg';
        lambdaImage.src = '/demo/images/lambda.jpeg';
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
        // const paragraphText = "This PDF contains a watermark that says 'CONFIDENTIAL' across the center of the page. You can adjust the size, rotation, and opacity of the watermark.";
        // const wrappedText = doc.splitTextToSize(paragraphText, 200);
        // doc.text(wrappedText, 10, 60);

        // doc.text(wrappedText, 10, 60);
        // Function to add header
        const addHeader = () => {
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text(
                'The tile roof system and its components shall be installed in strict compliance with the FBC 2023 HVHZ portions of Chapter 15, the HVHZ Tile Application Standards: RAS-119, RAS-120 & RAS-127 and the submitted MDC Notice of Acceptance(s).',
                10,
                29,
                { maxWidth: '200' }
            ); // Position at (x, y)
            doc.line(10, 41, 195, 41); // Draw a line below the header
        };
        doc.setTextColor(0);
        // Add a circle to simulate a radio button
        doc.circle(189, 38, 2, 'FD'); // Circle as radio button (x, y, radius)

        // Add the "I agree" text next to the circle
        doc.text('I agree', 165, 39);
        // Add header to the first page
        addHeader();

        // Add content below the header
        doc.setFontSize(12);

        // Add a title

        // doc.text('Tile Output', 10, 50);
        // Example data for categories and values
        const data = [
            { category: 'DBA', value: `${dba.value}` },
            { category: 'Municipality', value: `${municipality.value}` },
            { category: 'Job Address', value: `${address.value}` },
            { category: 'Process Number', value: `${muniProcessNumber.value}` }
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

        console.log(current_y);
        const tPerimeter = 'Roof Perimeter: ';
        const areaLabelWidth = doc.getTextWidth('Roof Area: ');
        const areaValueWidth = doc.getTextWidth(`${area.value}`);
        doc.text('Roof Area:', LeftStart, initialYValue);
        const systemAreaValueWidth = areaLabelWidth + 10;
        doc.text(`${area.value}`, systemAreaValueWidth, initialYValue);
        doc.line(systemAreaValueWidth, initialYValue + factor, systemAreaValueWidth + areaValueWidth, initialYValue + factor);
        currentX.value = areaLabelWidth + areaValueWidth;
        console.log(currentX.value);

        const valueTextWidth1 = doc.getTextWidth('Mean Roof Height:');
        const heightValueText = doc.getTextWidth(`${height.value}`);
        const heightStartXValue = currentX.value + 15;
        doc.text('Mean Roof Height:', heightStartXValue, initialYValue);
        const roofHeightWidthValue = valueTextWidth1 + 45;
        doc.text(`${height.value}`, roofHeightWidthValue, initialYValue);
        doc.line(roofHeightWidthValue, initialYValue + factor, roofHeightWidthValue + heightValueText, initialYValue + factor); // Get text width
        currentX.value = valueTextWidth1 + heightValueText;
        console.log(currentX.value);

        const slopeTextWidth1 = doc.getTextWidth('Roof Slope: ');
        const valueTextWidth2 = doc.getTextWidth(`${slope.value}`);
        const slopeStartX = currentX.value + 50;
        doc.text('Roof Slope:', slopeStartX, initialYValue);
        // Get the currentX value and add the text width
        const slopeStartXValue = slopeStartX + 25;
        doc.text(`${slope.value}`, slopeStartXValue, initialYValue);

        doc.line(slopeStartXValue, initialYValue + factor, slopeStartXValue + valueTextWidth2, initialYValue + factor); // Get text width
        currentX.value = currentX.value + slopeStartXValue;
        // console.log(current_y);
        // doc.setFontSize(12);
        // currentX.value = currentX.value + 5;

        const tPermTextWidth = doc.getTextWidth(tPerimeter);
        const PermTextWidth = doc.getTextWidth(`${perimeter.value}`);
        const permStartXValue = currentX.value - 30;
        doc.text(tPerimeter, permStartXValue, initialYValue);
        const perimeterValue = tPermTextWidth + permStartXValue + 2;
        doc.text(`${perimeter.value}`, perimeterValue, initialYValue);
        doc.line(perimeterValue, initialYValue + factor, perimeterValue + PermTextWidth, initialYValue + factor);

        current_y = initialYValue + 30;
        const valueTextWidthDeck = doc.getTextWidth('Deck Type');
        const valueTextWidth5 = doc.getTextWidth(`${deckType.value}`);
        currentX.value = currentX.value + valueTextWidthDeck - 30;
        doc.text('Decktype:', currentX.value, current_y);
        const decktypeStartXValue = currentX.value + 20;

        doc.text(`${deckType.value}`, decktypeStartXValue, current_y);
        doc.line(decktypeStartXValue, current_y + factor, decktypeStartXValue + valueTextWidth5, current_y + factor); // Get text width
        currentX.value = decktypeStartXValue + valueTextWidth5;

        const noaText = 'Tile NOA Number: ';
        const applicantText = 'Tile Applicant: ';
        const materialText = 'Tile Material: ';
        const TileTypeText = 'Tile Type: ';
        const descriptionText = 'Tile Description: ';
        const fastenerText = 'Select Mechanical Tile Fastener: ';
        const polynoaText = 'Fastened (UDL) NOA: ';
        const polyapplicantText = '(UDL) NOA Applicant: ';
        const polymaterialText = 'Fastened (UDL) Material: ';
        const systemEselectionText = 'Select System E: ';
        const designPSFText = 'Design psf: ';
        const anchordescriptionText = 'Anchor Base Sheet: ';
        const udldescriptionText = '(UDL) Description: ';
        const Prescriptive = 'Prescriptive: ';

        const dripEdgeMaterial = 'DripEdge Material: ';

        const dripEdgeSize = 'DripEdge Size: ';

        console.log(mechStore.tilemech.value[0]);

        console.log(mechStore.tilemech.value[0]);
        const noa = ref(mechStore.tilemech.value[0]?.noa);
        const applicant = ref(mechStore.tilemech.value[0]?.manufacturer);
        const material = ref(mechStore.tilemech.value[0]?.material);
        const tileType = multiContent === true ? ref(mechStore.tilemech.value[0]?.tiletype) : ref(mechStore.tilemech.value[0]?.material);
        const description = multiContent !== true ? ref(mechStore.tilemech.value[0]?.savedfastener) : ref(mechStore.tilemech.value[0]?.description);
        const tileFastener = multiContent === true ? ref(mechStore.tilemech.value[0]?.savedfastener) : ref(mechStore.tilemech.value[0]?.description);
        console.log(current_y);
        const valueTextWidth_0 = doc.getTextWidth(Prescriptive);
        const prescriptiveTextWidth = doc.getTextWidth(`${prescriptive.value}`);
        const prescriptiveStartXValue = LeftStart;
        doc.text(Prescriptive, prescriptiveStartXValue, current_y - 15);
        const prescriptiveStartValue = valueTextWidth_0 + prescriptiveStartXValue;
        const perscriptiveValue = LeftStart;
        current_y = current_y - 9;
        doc.text(`${prescriptive.value}`, perscriptiveValue, current_y);
        doc.line(perscriptiveValue, current_y + factor, perscriptiveValue + prescriptiveTextWidth, current_y + factor);
        current_y = current_y + 10;

        const dripMaterialTextWidth = doc.getTextWidth(dripEdgeMaterial);
        const materialTextWidth = doc.getTextWidth(`${dripedgeMaterials.value}`);
        const dMaterialStartXValue = LeftStart;
        doc.text(dripEdgeMaterial, dMaterialStartXValue, current_y);
        const dripMaterialStartValue = dripMaterialTextWidth + dMaterialStartXValue;
        doc.text(`${dripedgeMaterials.value}`, dripMaterialStartValue, current_y);

        doc.line(dripMaterialStartValue, current_y + factor, dripMaterialStartValue + materialTextWidth, current_y + factor);

        current_y = current_y + 8;

        const dripEdgeSizeTextWidth = doc.getTextWidth(dripEdgeSize);
        const dripEdgeTextWidth = doc.getTextWidth(`${dripedgeSize.value}`);
        const dSizeStartXValue = LeftStart;
        doc.text(dripEdgeSize, dSizeStartXValue, current_y);
        const dripSizeStartValue = dripEdgeSizeTextWidth + dSizeStartXValue;
        doc.text(`${dripedgeSize.value}`, dripSizeStartValue, current_y);

        doc.line(dripSizeStartValue, current_y + factor, dripSizeStartValue + dripEdgeTextWidth, current_y + factor);
        current_y = current_y + 10;
        doc.setFontSize(12);

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
            if (currentX.value > max_width) current_y = current_y + 10;

            // console.log(currentX.value);
            current_y = current_y + 10;
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
            doc.line(udldescriptionValue, current_y + factor, udldescriptionValue + valueTextWidth_3, current_y + factor);
            currentX.value = udldescriptionValue + valueTextWidth_3;

            current_y = current_y + 10;
        } else {
            console.log(etileStore.$state.tilesysEinput);

            const udlNoa = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.noa || 'N/A');
            const udlApplicant = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.manufacturer || 'N/A');
            const udlMaterial = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.material || 'N/A');
            const udlSystemE = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.systemSelected || 'N/A');
            const designPressure = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.dP || 'N/A');
            const anchorDescription = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.Anchor_Base || 'N/A');
            const udlDescription = ref(etileStore.$state.tilesysEinput[0]?.systemDataE?.tileCap || 'N/A');

            const valueTextWidthNOA = doc.getTextWidth(polynoaText);
            const valueTextWidth_1 = doc.getTextWidth(`${udlNoa.value}`);

            const udlNoaStartXValue = LeftStart;
            doc.text(polynoaText, udlNoaStartXValue, current_y);
            const udlNoaValue = udlNoaStartXValue + valueTextWidthNOA;
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
            const matWidth = doc.getTextWidth(`${udlMaterial.value}`);
            currentX.value = udlApplicantValue + matWidth;
            // if (`${udlApplicant.value}` !== 'N/A') current_y = current_y + 10;
            //  `${udlApplicant.value}` !== 'N/A' ? currentX.value : LeftStart;
            current_y = current_y + 10;
            const udlmatStartXValue = LeftStart;
            const valueTextWidthpolyMat = doc.getTextWidth(polymaterialText);
            const valueTextWidth_2 = doc.getTextWidth(`${udlMaterial.value}`);
            doc.text(polymaterialText, udlmatStartXValue, current_y);
            const udlmaterialValue = udlmatStartXValue + valueTextWidthpolyMat;
            doc.text(`${udlMaterial.value}`, udlmaterialValue, current_y);
            doc.line(udlmaterialValue, current_y + factor, udlmaterialValue + valueTextWidth_2, current_y + factor);

            currentX.value = udlmaterialValue + valueTextWidth_2;
            if (currentX.value > max_width) current_y = current_y + 10;
            //     console.log(currentX.value);

            const systemEStartXValue = currentX.value + 5;
            const valueTextWidthSystemE = doc.getTextWidth(systemEselectionText);
            const valueTextWidthE = doc.getTextWidth(`${udlSystemE.value}`);
            doc.text(systemEselectionText, systemEStartXValue, current_y);
            const udlsystemEValue = systemEStartXValue + valueTextWidthSystemE;
            doc.text(`${udlSystemE.value}`, udlsystemEValue, current_y);
            doc.line(udlsystemEValue, current_y + factor, udlsystemEValue + valueTextWidthE, current_y + factor);
            currentX.value = udlsystemEValue + valueTextWidthE;
            if (currentX.value > max_width) current_y = current_y + 10;

            const valueTextWidthpolyDesignP = doc.getTextWidth(designPSFText);
            const valueTextWidthDP = doc.getTextWidth(`${designPressure.value}`);
            const udldesignStartXValue = currentX.value + 3;
            doc.text(designPSFText, udldesignStartXValue, current_y);
            const udldesignValue = udldesignStartXValue + valueTextWidthpolyDesignP;

            doc.text(`${designPressure.value}`, udldesignValue, current_y);
            doc.line(udldesignValue, current_y + factor, udldesignValue + valueTextWidthDP, current_y + factor);
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
            doc.line(udlanchorValue, current_y + factor, udlanchorValue + valueTextWidthAnchor, current_y + factor);
            currentX.value = udlanchorValue + valueTextWidthAnchor;
            current_y = current_y + 10;
            //     console.log(currentX.value);

            const valueTextWidthpolyDesc = doc.getTextWidth(udldescriptionText);
            const valueTextWidth_3 = doc.getTextWidth(`${udlDescription.value}`);
            const udldescStartXValue = LeftStart;

            doc.text(udldescriptionText, udldescStartXValue, current_y);

            const udldescriptionValue = udldescStartXValue + valueTextWidthpolyDesc;

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
            doc.line(sbsnoaValue, current_y + factor, sbsnoaValue + valueTextWidth_4, current_y + factor);
            currentX.value = sbsnoaValue + valueTextWidth_4;
            console.log(currentX.value);

            const valueTextWidthsbsApplicant = doc.getTextWidth(sbsapplicantText);
            const valueTextWidthApp = doc.getTextWidth(saApplicant);
            const saApplicantStartXValue = currentX.value + 3;
            const valueTextAppWidth = doc.getTextWidth(saSystemF);
            doc.text(sbsapplicantText, saApplicantStartXValue, current_y);
            const sbsapplicantValue = saApplicantStartXValue + valueTextWidthsbsApplicant;
            doc.text(saApplicant, sbsapplicantValue, current_y);
            doc.line(sbsapplicantValue, current_y + factor, sbsapplicantValue + valueTextAppWidth, current_y + factor);
            currentX.value = sbsapplicantValue + valueTextAppWidth;
            console.log(currentX.value);

            const valueTextWidthSystem = doc.getTextWidth(sbsSystemFText);
            const valueTextSystemFWidth = doc.getTextWidth(saSystemF);
            const saSystemFStartXValue = currentX.value + 3;
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
            //     console.log(currentX.value);

            const valueTextWidthsbsMaterial = doc.getTextWidth(sbsmaterialText);
            const valueTextWidthMat = doc.getTextWidth(`${saMaterial.value}`);
            const saMaterialStartXValue = LeftStart;
            doc.text(sbsmaterialText, saMaterialStartXValue, current_y);
            const sbsmaterialValue = saMaterialStartXValue + valueTextWidthsbsMaterial;
            doc.text(`${saMaterial.value}`, sbsmaterialValue, current_y);
            doc.line(sbsmaterialValue, current_y + factor, sbsmaterialValue + valueTextWidthMat, current_y + factor);
            currentX.value = sbsmaterialValue + valueTextWidthMat;

            if (currentX.value > max_width) current_y = current_y + 10;
            //     console.log(currentX.value);

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
        current_y = current_y + 10;

        const valueTextWidth0 = doc.getTextWidth(`${applicant.value}`);
        const valueTextWidthApp = doc.getTextWidth(applicantText);
        const applicantStartXValue = LeftStart;
        doc.text(applicantText, applicantStartXValue, current_y);
        const applicantValue = applicantStartXValue + valueTextWidthApp;
        doc.text(`${applicant.value}`, applicantValue, current_y);
        doc.line(applicantValue, current_y + factor, applicantValue + valueTextWidth0, current_y + factor);

        currentX.value = applicantValue + valueTextWidthApp + 10;

        const noaValueTextWidth = doc.getTextWidth(noaText);
        const valueTextWidth3 = doc.getTextWidth(`${noa.value}`);
        const noaStartXValue = currentX.value + noaValueTextWidth;
        doc.text(noaText, noaStartXValue, current_y);
        const noaXValue = noaStartXValue + 38;
        doc.text(`${noa.value}`, noaXValue, current_y);
        doc.line(noaXValue, current_y + factor, noaXValue + valueTextWidth3, current_y + factor);
        currentX.value = noaXValue + valueTextWidth3;
        current_y = current_y + 10;
        // if (currentX.value < max_width)

        // currentX provides the update of the x coordinate
        const fourthYCoordinate = current_y;
        if (multiContent === true) {
            const valueTextWidthTileType = doc.getTextWidth(TileTypeText);
            const valueTextWidthMaterial = doc.getTextWidth(`${tileType.value}`);
            const TileTypeStartXValue = LeftStart;
            doc.text(TileTypeText, TileTypeStartXValue, fourthYCoordinate);
            const tileTypeValue = TileTypeStartXValue + valueTextWidthTileType;
            currentX.value = valueTextWidthTileType + valueTextWidthMaterial;

            doc.text(`${tileType.value}`, tileTypeValue, fourthYCoordinate);
            doc.line(tileTypeValue, fourthYCoordinate + factor, tileTypeValue + valueTextWidthMaterial, fourthYCoordinate + factor);
            current_y = current_y + 10;
            const valueTextWidthFastener = doc.getTextWidth(fastenerText);
            const valueWidthFastener = doc.getTextWidth(`${tileFastener.value}`);
            currentX.value = LeftStart;
            // if (currentX.value > max_width) current_y = current_y + 10;
            // this is the text we want to underline
            const FastenerStartXValue = currentX.value;
            doc.text(fastenerText, FastenerStartXValue, current_y);
            console.log(currentX.value);
            const fastenerValue = FastenerStartXValue + valueTextWidthFastener;
            doc.text(`${tileFastener.value}`, fastenerValue, current_y);
            doc.line(fastenerValue, current_y + factor, fastenerValue + valueWidthFastener, current_y + factor);
            currentX.value = fastenerValue + valueWidthFastener;
            current_y = current_y + 10;
        } else {
            const valueTextWidthMaterialDesc = doc.getTextWidth(materialText);
            const valueTextWidthMaterial = doc.getTextWidth(`${material.value}`);
            const materialStartXValue = currentX.value + 5;
            doc.text(materialText, materialStartXValue, fourthYCoordinate);
            const materialValue = materialStartXValue + valueTextWidthMaterialDesc;
            currentX.value = currentX.value + valueTextWidthMaterial + valueTextWidthMaterialDesc + valueTextWidthApp + valueTextWidth0;

            current_y = current_y + 10;
            doc.text(`${material.value}`, materialValue, fourthYCoordinate);
            doc.line(materialValue, fourthYCoordinate + factor, materialValue + valueTextWidthMaterial, fourthYCoordinate + factor);

            // current_y = current_y + 10;
            const valueTextWidthDesc = doc.getTextWidth(descriptionText);
            const valueTextWidthDescription = doc.getTextWidth(`${description.value}`);
            currentX.value = materialValue + valueTextWidthDesc;
            current_y = current_y + 10;
            const descStartXValue = LeftStart;
            doc.text(descriptionText, descStartXValue, current_y);
            console.log(currentX.value);
            // if (currentX.value > max_width) current_y = current_y + 10;
            // this is the text we want to underline
            const descriptionValue = descStartXValue + valueTextWidthDesc;
            doc.text(`${description.value}`, descriptionValue, current_y);
            doc.line(descriptionValue, current_y + factor, descriptionValue + valueTextWidthDescription, current_y + factor);
            currentX.value = descriptionValue + valueTextWidthDescription;
        }

        const lambdaSymbol = new Image();
        lambdaSymbol.src = '/demo/images/lambda.png';
        const tableData = [
            // Zone 1
            ['Zone 1:', `${zoneone.value}`, 'x', `${lambda1.value}`, '- Mg:', `${mg1.value}`, '= Mr1:', `${mr1.value}`, 'NOA Mf:', `${mf1.value}`],
            ['Zone 2:', `${zonetwo.value}`, 'x', `${lambda2.value}`, '- Mg:', `${mg2.value}`, '= Mr2:', `${mr2.value}`, 'NOA Mf:', `${mf2.value}`],
            ['Zone 3:', `${zonethree.value}`, 'x', `${lambda3.value}`, '- Mg:', `${mg3.value}`, '= Mr2:', `${mr3.value}`, 'NOA Mf:', `${mf3.value}`]
        ];
        console.log(tableData);
        // doc.setFont('times', 'normal');
        // Top-left corner where we start drawing the table
        let startX = LeftStart - 1;
        let startYY = current_y;

        tableData.forEach((row) => {
            let x = startX; // Starting x-coordinate for each row

            row.forEach((cell) => {
                // if (typeof cell === 'number' || String(cell).match(/^[-+]?\d*\.?\d+$/)) {
                //     // Draw rectangle around numerical value
                //     doc.rect(x - 2, startYY - 2, 20, 12); // Adjust the rectangle size and position
                // }
                doc.text(String(cell), x, startYY);
                x += 18; // Space between columns
            });
            doc.addImage(lambdaSymbol, 'png', 50, startYY - 4, 5, 5);
            doc.addImage(lambdaSymbol, 'png', 50, startYY - 4, 5, 5);
            doc.addImage(lambdaSymbol, 'png', 50, startYY - 4, 5, 5);
            startYY += 5; // Move to next row
            startYY += 5; // Move to next row
        });
        current_y = current_y + 20;
        // console.log(doc.getFontList());
        // doc.setFont('GreekSymbol');
        // doc.text('αβγδεζηθλ   - Greek sample', 10, current_y);
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

                    alert('Mechanical File uploaded successfully!');
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
