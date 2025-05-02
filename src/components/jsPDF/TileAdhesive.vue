<template>
    <div>
        <h1>Generate PDF with Columns and Underlined Text</h1>
        <button @click="generatePDF">Download PDF</button>
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
// import { usedripedgeStore } from '@/stores/dripEdgeStore';
import { usedripADStore } from '@/stores/dripEdgeADTileStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { useSavedStore } from '@/stores/savedTiledataStore';
import { useGlobalStates } from '@/stores/tilenoaStore';
import { usetilesysEStore } from '@/stores/tilesysEStore';
import { usetilesysfStore } from '@/stores/tilesysfStore';
import { usevalueStore } from '@/stores/tilevalueStore';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

const saStore = usetilesysfStore();
const etileStore = usetilesysEStore();
const { getUser } = useGlobalState();
const { tileInputvalues } = usevalueStore();
// const tileStores = usePaddyStore();
// const { inputdata, addtileData, tileData } = usePaddyStore();
const { savedTileinput } = useSavedStore();
const permitStore = usePermitappStore();
// const roofStore = useRoofListStore();
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const tileStore = useGlobalStates();

const dripadTileStore = usedripADStore();
let isRoofTileADValid = ref(false);

const callState = tryOnMounted(() => {
    if (roofType.value.length === 0) {
        return '';
    } else {
        for (let i = 0; i < roofType.value.length; i++) {
            if (roofType.value[i].item === 'Adhesive Set Tile') {
                console.log(roofType.value[i].item);
                isRoofTileADValid.value = true;
                generatePDF();
            }
        }
    }
});

invoke(async () => {
    await until(callState).toBe(true);
});

const generatePDF = () => {
    // Initialize   jsPDF instance
    // tileInputvalues[0]?.tileValues[0]
    console.log(tileInputvalues, savedTileinput[0]?.savedValues?.paddySelection);
    const paddyCheck = ref(savedTileinput[0]?.savedValues?.paddySelection || '');
    const singlePaddy = ref(false);
    const doublePaddy = ref(false);
    console.log(paddyCheck.value);
    if (paddyCheck.value === 'single') {
        singlePaddy.value = true;
        console.log(singlePaddy.value);
    } else {
        doublePaddy.value = true;
        console.log(doublePaddy.value);
    }

    if (tileInputvalues[0].length === 0) {
        console.log('lenghth is zero');
    } else {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4', // Smaller page size
            compress: true
        });
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
        // Initialize jsPDF instance------active

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

        const Inputvalue = singlePaddy.value === true ? ref(tileInputvalues[0]?.tileValues[0].singlepaddyData || '') : ref(tileInputvalues[0]?.tileValues[0].doublepaddyData || '');
        console.log(Inputvalue.value);
        const height = ref(savedTileinput[0]?.savedValues?.height || '');
        // RFR2502803
        const slope = ref(savedTileinput[0]?.savedValues?.slope || '');
        console.log(permitStore.$state.permitapp[0].muniNum);
        const area = ref(savedTileinput[0]?.savedValues?.area || '');
        const deckType = ref(savedTileinput[0]?.savedValues?.Decktype || '');
        const perimeter = ref(savedTileinput[0]?.savedValues?.perimeter || '');
        const address = ref(permitStore.$state.permitapp[0]?.formdt?.address || '');
        const municipality = ref(permitStore.$state.permitapp[0]?.formdt?.muni || '');
        const muniProcessNumber = ref(permitStore.$state.permitapp[0]?.muniNum || '');
        const processNumber = ref(permitStore.$state.permitapp[0]?.formdt?.processNumber || '');

        const uploadUrl = ref('');
        const dba = ref(getUser.value[0]?.dba || '');
        // Load an image (example with Base64)
        doc.setGState(new doc.GState({ opacity: 0.8 })); // Adjust opacity
        const approved = 'Approved';
        // // Set font size, alignment, and rotation for the watermark
        doc.setFontSize(24);
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
        doc.addImage(logoImage, 'JPEG', 5, 0, 50, 30);
        // Set background image for the entire PDF
        doc.addImage(image, 'JPEG', 0, 0, 210, 297); // full A4 size (210mm x 297mm)
        doc.setFontSize(18);
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
        // Function to add header
        const addHeader = () => {
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text(
                'The tile roof system and its components shall be installed in strict compliance with the FBC 2023 HVHZ portions of Chapter 15, the HVHZ Tile Application Standards: RAS-119, RAS-120 & RAS-127 and the submitted MDC Notice of Acceptance(s). The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.',
                10,
                25,
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
        const initialYValue = 90;
        const param_y = initialYValue;
        const tArea = 'Roof Area: ';
        const tDeck = 'DeckType: ';
        const tHeight = 'Mean Roof Height: ';
        const tSlope = 'Roof Slope: ';
        const tPerimeter = 'Roof Perimeter: ';
        currentX.value = LeftStart;
        const tAreaTextWidth = doc.getTextWidth(tArea);
        const AreaTextWidth = doc.getTextWidth(`${area.value}`);
        const areaStartXValue = currentX.value;

        doc.text(tArea, areaStartXValue, param_y);
        const areaValue = tAreaTextWidth + areaStartXValue;
        doc.text(`${area.value}`, areaValue, param_y);
        doc.line(areaValue, param_y + factor, areaValue + AreaTextWidth, param_y + factor);
        currentX.value = areaValue + AreaTextWidth;
        console.log(current_y, param_y);
        const tHeightTextWidth = doc.getTextWidth(tHeight);
        const HeightTextWidth = doc.getTextWidth(`${height.value}`);
        const heightStartXValue = currentX.value + 2;
        doc.text(tHeight, heightStartXValue, param_y);
        const heightValue = tHeightTextWidth + heightStartXValue;
        doc.text(`${height.value}`, heightValue, param_y);
        doc.line(heightValue, param_y + factor, heightValue + HeightTextWidth, param_y + factor); // Get text width
        currentX.value = heightValue + HeightTextWidth;
        const tSlopeTextWidth = doc.getTextWidth(tSlope);
        const SlopeTextWidth = doc.getTextWidth(`${slope.value}`);
        const slopeStartXValue = currentX.value + 2;
        doc.text(tSlope, slopeStartXValue, param_y);
        const slopeValue = tSlopeTextWidth + slopeStartXValue;
        doc.text(`${slope.value}`, slopeValue, param_y);
        doc.line(slopeValue, param_y + factor, slopeValue + SlopeTextWidth, param_y + factor); // Get text width
        currentX.value = slopeValue + SlopeTextWidth;
        const tPermTextWidth = doc.getTextWidth(tPerimeter);
        const PermTextWidth = doc.getTextWidth(`${perimeter.value}`);
        const permStartXValue = currentX.value + 2;
        doc.text(tPerimeter, permStartXValue, param_y);
        const perimeterValue = tPermTextWidth + permStartXValue;
        doc.text(`${perimeter.value}`, perimeterValue, param_y);
        doc.line(perimeterValue, param_y + factor, perimeterValue + PermTextWidth, param_y + factor);
        console.log(param_y, current_y);
        current_y = param_y + 10;
        const tDeckTextWidth = doc.getTextWidth(tDeck);
        const DeckTextWidth = doc.getTextWidth(`${deckType.value}`);
        const deckStartXValue = LeftStart;
        doc.text(tDeck, deckStartXValue, current_y);
        const decktypeStartValue = tDeckTextWidth + deckStartXValue;
        doc.text(`${deckType.value}`, decktypeStartValue, current_y);
        doc.line(decktypeStartValue, current_y + factor, decktypeStartValue + DeckTextWidth, current_y + factor); // Get text width

        current_y = current_y + 10;
        const noaText = 'Tile NOA Number: ';
        const applicantText = 'Tile Applicant: ';
        const materialText = 'Tile Material: ';
        const descriptionText = 'Tile Description: ';
        const polynoaText = 'Fastened Underlayment(UDL)NOA: ';
        const polyapplicantText = 'UDL NOA Applicant: ';
        const polymaterialText = 'Fastened UDL Material: ';
        const systemEselectionText = 'Select System E: ';
        const designPSFText = 'Design psf: ';
        const anchordescriptionText = 'Anchor Base Sheet: ';
        const udldescriptionText = 'UDL Description: ';
        const Underlayment = 'Select Underlayment: ';
        const dripEdgeMaterial = 'DripEdge Material: ';
        const dripEdgeSize = 'DripEdge Size: ';
        const dripedgeMaterials = ref(dripadTileStore.$state.dripinputadt[4]?.dripTileMaterial || '');
        const dripedgeSize = ref(dripadTileStore.$state.dripinputadt[6]?.dripTileMaterial || '');
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

        console.log(savedTileinput);
        const mf1 = ref(savedTileinput[0]?.savedValues?.zoneone.mf1 || '');
        const lambda1 = ref(savedTileinput[0]?.savedValues?.zoneone.lambda1 || '');
        const mg1 = ref(savedTileinput[0]?.savedValues?.zoneone.mg1 || '');
        const mr1 = ref(savedTileinput[0]?.savedValues?.zoneone.mr1 || '');
        const zoneone = ref(savedTileinput[0]?.savedValues?.zoneone.zone1 || '');
        const mf2 = ref(savedTileinput[0]?.savedValues?.zonetwo.mf2 || '');
        const lambda2 = ref(savedTileinput[0]?.savedValues?.zonetwo.lambda2 || '');
        const mg2 = ref(savedTileinput[0]?.savedValues?.zonetwo.mg2 || '');
        const mr2 = ref(savedTileinput[0]?.savedValues?.zonetwo.mr2 || '');
        const zonetwo = ref(savedTileinput[0]?.savedValues?.zonetwo.zone2 || '');
        const mf3 = ref(savedTileinput[0]?.savedValues?.zonethree.mf3 || '');
        const lambda3 = ref(savedTileinput[0]?.savedValues?.zonethree.lambda3 || '');
        const mg3 = ref(savedTileinput[0]?.savedValues?.zonethree.mg3 || '');
        const mr3 = ref(savedTileinput[0]?.savedValues?.zonethree.mr3);
        const zonethree = ref(savedTileinput[0]?.savedValues?.zonethree.zone3 || '');
        const prescriptive = ref(savedTileinput[0]?.savedValues?.prescriptiveSelection.selectedBasesheet);
        const persValueTextWidth = doc.getTextWidth(prescriptive.value);
        console.log(prescriptive, persValueTextWidth);
        const prescriptiveStartXValue = LeftStart;
        doc.text(Underlayment, prescriptiveStartXValue, current_y + factor);
        const prescriptiveValue = LeftStart;
        current_y = current_y + 10;
        doc.text(`${prescriptive.value}`, prescriptiveValue, current_y);
        doc.line(prescriptiveValue, current_y + factor, prescriptiveValue + persValueTextWidth, current_y + factor);
        current_y = current_y + 10;
        console.log(tileInputvalues);
        const noa = ref(Inputvalue.value.noa);
        const applicant = ref(savedTileinput[0]?.savedValues?.applicant);
        const material = ref(savedTileinput[0]?.savedValues?.material);
        const description = ref(Inputvalue.value.description);
        const valueTextWidthTileCategory = doc.getTextWidth(applicantText);
        const valueTextWidthTile = doc.getTextWidth(`${applicant.value}`);
        const tileApplicantStartXValue = LeftStart;
        doc.text(applicantText, tileApplicantStartXValue, current_y);
        const tileApplicantValue = tileApplicantStartXValue + valueTextWidthTileCategory;
        doc.text(`${applicant.value}`, tileApplicantValue, current_y);
        doc.line(tileApplicantValue, current_y + factor, tileApplicantValue + valueTextWidthTile, current_y + factor);
        currentX.value = tileApplicantValue + valueTextWidthTile;
        const valueTextWidthNoa = doc.getTextWidth(noaText);
        const valueTextWidth3 = doc.getTextWidth(`${noa.value}`);
        const tileStartXValue = currentX.value + 3;
        doc.text(noaText, tileStartXValue, current_y);
        const noaValue = valueTextWidthNoa + tileStartXValue;
        doc.text(`${noa.value}`, noaValue, current_y);
        doc.line(noaValue, current_y + factor, noaValue + valueTextWidth3, current_y + factor);
        current_y = current_y + 10;
        const nextWidthMaterial = doc.getTextWidth(`${material.value}`);
        if (currentX.value > max_width) current_y = current_y + 10;

        currentX.value = noaValue + nextWidthMaterial;

        // currentX provides the update of the x coordinate
        const materialStartXValue = LeftStart;
        const valueTextWidthMaterialDesc = doc.getTextWidth(materialText);
        const valueTextWidthMaterial = doc.getTextWidth(`${material.value}`);
        doc.text(materialText, materialStartXValue, current_y);
        const materialValue = materialStartXValue + valueTextWidthMaterialDesc;
        doc.text(`${material.value}`, materialValue, current_y);
        doc.line(materialValue, current_y + factor, materialValue + valueTextWidthMaterial, current_y + factor);
        const descriptionWidth = doc.getTextWidth(`${description.value}`);
        currentX.value = materialValue + descriptionWidth;
        // add an update boolean so to choose between leftStart or currenX.value
        if (currentX.value > max_width) current_y = current_y + 10;
        console.log(currentX.value, max_width);
        current_y = current_y + 10;
        const valueTextWidth4 = doc.getTextWidth(`${description.value}`);
        const valueTextWidthDesc = doc.getTextWidth(descriptionText);
        const descStartXValue = LeftStart;
        doc.text(descriptionText, descStartXValue, current_y);
        // this is the text we want to underline
        const descriptionValue = descStartXValue + valueTextWidthDesc;
        doc.text(`${description.value}`, descriptionValue, current_y);
        doc.line(descriptionValue, current_y + factor, descriptionValue + valueTextWidth4, current_y + factor);
        currentX.value = descriptionValue + valueTextWidth4;
        console.log(etileStore);
        current_y = current_y + 10;
        // console.log(polypropolyneStore.$state.polyinput.length);
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
            const udlApplicantStartXValue = currentX.value + 0;
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
            doc.line(udldescriptionValue, current_y + factor, udldescriptionValue + valueTextWidth_3, current_y + factor);
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
            doc.text(sbsapplicantText, saApplicantStartXValue, current_y);
            const sbsapplicantValue = saApplicantStartXValue + valueTextWidthsbsApplicant;
            doc.text(saApplicant, sbsapplicantValue, current_y);
            doc.line(sbsapplicantValue, current_y + factor, sbsapplicantValue + valueTextWidthApp, current_y + factor);
            currentX.value = sbsapplicantValue + valueTextWidthApp;
            console.log(currentX.value);
            const valueTextWidthSystem = doc.getTextWidth(sbsSystemFText);
            const saSystemFStartXValue = currentX.value + 3;
            doc.text(sbsSystemFText, saSystemFStartXValue, current_y);
            const sbsSystemFValue = saSystemFStartXValue + valueTextWidthSystem;
            doc.text(saSystemF, sbsSystemFValue, current_y);
            doc.line(sbsSystemFValue, current_y + factor, sbsSystemFValue + valueTextWidthSystem, current_y + factor);
            currentX.value = sbsSystemFValue + valueTextWidthSystem;
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
            current_y = current_y + 10;
        }
        //     // Save the PDF
        //     // doc.save('AdhesiveTile.pdf');
        //     // Table configuration
        current_y = current_y + 10;
        // Data for each row
        doc.setFont('times', 'normal');
        // Using doc.text()
        // console.log('\u03BB'); // outputs λ
        // const lambdaSymbol = ref('\u03BB');

        const tableData = [
            ['Zone 1:', `${zoneone.value}`, 'xλ', `${lambda1.value}`, '- Mg:', `${mg1.value}`, '= Mr1:', `${mr1.value}`, 'NOA Mf:', `${mf1.value}`],
            ['Zone 2:', `${zonetwo.value}`, 'xλ', `${lambda2.value}`, '- Mg:', `${mg2.value}`, '= Mr2:', `${mr2.value}`, 'NOA Mf:', `${mf2.value}`],
            ['Zone 3:', `${zonethree.value}`, 'xλ', `${lambda3.value}`, '- Mg:', `${mg3.value}`, '= Mr2:', `${mr3.value}`, 'NOA Mf:', `${mf3.value}`]
        ];
        console.log(tableData);
        // const colWidths = [
        //     22, // "Zone 1:" label cell
        //     14, // numeric field (e.g., "82", "108", "142")
        //     15, // "x λ"
        //     18, // numeric field (e.g., "0.23")
        //     19, // label (e.g., "- Mg:")
        //     21, // numeric field (e.g., "2.473")
        //     23, // label (e.g., "= Mr1:")
        //     18, // numeric field (e.g., "16.39")
        //     23, // label (e.g., "NOA Mf:")
        //     21 // numeric field (e.g., "31.3°")
        // ];
        // Top-left corner where we start drawing the table
        let startX = LeftStart - 1;
        let startYY = current_y;
        // doc.setFillColor(15, 20, 30); // some dark color
        // doc.rect(0, 0, doc.internal.pageSize.getWidth(), 100, 'F');
        // White text color for the "Zone X" labels placed over dark background:
        // doc.setTextColor(0, 0, 0);
        // Render the table manually
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
            startYY += 5; // Move to next row
        });
        const fName = 'TileAdhesive.pdf';
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
