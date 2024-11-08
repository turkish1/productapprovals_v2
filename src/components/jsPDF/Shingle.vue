<template>
    <div>
        <h1>Generate PDF with Columns and Underlined Text</h1>
        <button @click="generatePDF">Download PDF</button>
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { usePolyStore } from '@/stores/polyStore';
import { useRoofListStore } from '@/stores/roofList';
import { useShingleStore } from '@/stores/shingleStore';
import { usesystemfStore } from '@/stores/systemfStore';
import { invoke, tryOnMounted, until } from '@vueuse/core';
import { jsPDF } from 'jspdf';
import { ref } from 'vue';

const { getUser } = useGlobalState();
const sbsStore = usesystemfStore();
const permitStore = usePermitappStore();
const roofStore = useRoofListStore();
const shingleStore = useShingleStore();
const polypropolyneStore = usePolyStore();
const store = useRoofListStore();

// const systemAreaImport =  ref(roofStore.$state.roofList[0].dim1);
const roofType = ref(store.$state.roofList);

// const area = ref(roofStore.$state.roofList[0].dim1);
// const address = ref(permitStore.$state.permitapp[0].formdt.address);
// const municipality = ref(permitStore.$state.permitapp[0].formdt.muni);
// const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
// const dba = ref(getUser.value[0].dba);
let isRoofShingleValid = ref(false);
const callState = tryOnMounted(() => {
    console.log(roofType);
    if (roofType.value.length === 0) {
        return '';
    } else if (roofType.value[0].item === 'Asphalt Shingle') {
        isRoofShingleValid.value = true;
        generatePDF();
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
        // Initialize jsPDF instance
        const address = ref(permitStore.$state.permitapp[0].formdt.address);
        const municipality = ref(permitStore.$state.permitapp[0].formdt.muni);
        const processNumber = ref(permitStore.$state.permitapp[0].formdt.processNumber);
        const dba = ref(getUser.value[0].dba);
        const height = ref(shingleStore.$state.inputshingle[0].shingleData.height);
        const slope = ref(shingleStore.$state.inputshingle[0].shingleData.slope);
        const deckType = ref(shingleStore.$state.inputshingle[0].shingleData.deckType);
        // console.log(shingleStore.$state.inputshingle[0].shingleData.height, height.value);
        const area = ref(roofStore.$state.roofList[0].dim1);
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
        image.src = ' /demo/images/paperversion.jpeg';
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

        doc.setFontSize(12);
        // doc.text(wrappedText, 10, 60);
        // Function to add header
        const addHeader = () => {
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text(
                'The Shingle roof system and its components shall be installed in strict compliance  with the HVHZportions of Chapter 15 FBC, the HVHZ Roof Application Standards(RAS) 111 & 115, and the submitted MDC(NOA) Notice of Acceptance(s).The mePermit applicant agrees to comply with these installation requirements when obtaining this permit.',
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
        const noaText = 'Shingle NOA Number: ';
        const applicantText = 'Shingle Applicant: ';
        const materialText = 'Shingle Material: ';
        const descriptionText = 'Shingle Description: ';

        const polynoaText = 'Fastened Underlayment(UDL)NOA: ';
        const polyapplicantText = 'UDL NOA Applicant: ';
        const polymaterialText = 'Fastened UDL Material: ';
        const polydescriptionText = 'UDL Description: ';
        const Perscriptive = 'Perscriptive: ';
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
        const noa = ref(shingleStore.$state.inputshingle[0].shingleData.noa);
        const applicant = ref(shingleStore.$state.inputshingle[0].shingleData.applicant);
        const material = ref(shingleStore.$state.inputshingle[0].shingleData.material);
        const description = ref(shingleStore.$state.inputshingle[0].shingleData.description);
        const prescriptive = ref(shingleStore.$state.inputshingle[0].shingleData.prescriptiveSelection);

        const valueTextWidth_0 = doc.getTextWidth(Perscriptive);
        const perscriptiveTextValue = doc.getTextWidth(`${prescriptive.value}`);
        const perspectiveStartXValue = LeftStart;
        doc.text(Perscriptive, perspectiveStartXValue, current_y);
        const perscriptiveValue = valueTextWidth_0 + 10;
        doc.text(`${prescriptive.value}`, perscriptiveValue, current_y);
        doc.line(perscriptiveValue, current_y, perscriptiveValue + perscriptiveTextValue, current_y);

        current_y = current_y + 10;

        const valueTextWidthShingleCategory = doc.getTextWidth(applicantText);
        const valueTextWidthShingle = doc.getTextWidth(`${applicant.value}`);
        const shingleApplicantStartXValue = LeftStart;
        doc.text(applicantText, shingleApplicantStartXValue, current_y);
        const shingleApplicantValue = shingleApplicantStartXValue + valueTextWidthShingleCategory;
        doc.text(`${applicant.value}`, shingleApplicantValue, current_y);
        doc.line(shingleApplicantValue, current_y, shingleApplicantValue + valueTextWidthShingle, current_y);
        currentX.value = shingleApplicantValue + valueTextWidthShingle;

        const valueTextWidthNoa = doc.getTextWidth(noaText);
        const valueTextWidth3 = doc.getTextWidth(`${noa.value}`);
        const shingleStartXValue = currentX.value + 3;
        doc.text(noaText, shingleStartXValue, current_y);
        const noaValue = valueTextWidthNoa + shingleStartXValue;
        doc.text(`${noa.value}`, noaValue, current_y);
        doc.line(noaValue, current_y, noaValue + valueTextWidth3, current_y);
        currentX.value = noaValue + valueTextWidth3;

        if (currentX.value > max_width) current_y = current_y + 10;
        console.log(currentX.value, max_width);
        // currentX provides the update of the x coordinate

        const materialStartXValue = currentX.value + 2;
        const valueTextWidthMaterialDesc = doc.getTextWidth(materialText);
        const valueTextWidthMaterial = doc.getTextWidth(`${material.value}`);
        doc.text(materialText, materialStartXValue, current_y);
        const materialValue = materialStartXValue + valueTextWidthMaterialDesc;
        doc.text(`${material.value}`, materialValue, current_y);
        doc.line(materialValue, current_y, materialValue + valueTextWidthMaterial, current_y);
        currentX.value = materialValue + valueTextWidthMaterial;

        if (currentX.value > max_width) current_y = current_y + 10;
        console.log(currentX.value, max_width);

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
            doc.line(udldescriptionValue, current_y, udldescriptionValue + valueTextWidth_3, current_y);
            currentX.value = udldescriptionValue + valueTextWidth_3;

            current_y = current_y + 10;
        } else {
            const udlNoa = ref(polypropolyneStore.$state.polyinput[0].polyData.noa);
            const udlApplicant = ref(polypropolyneStore.$state.polyinput[0].polyData.applicant);
            const udlMaterial = ref(polypropolyneStore.$state.polyinput[0].polyData.material);
            const udlDescription = ref(polypropolyneStore.$state.polyinput[0].polyData.description);

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
            currentX.value = udlApplicantValue + valueTextWidth_;

            if (currentX.value > max_width) current_y = current_y + 10;
            const udlmatStartXValue = LeftStart;
            const valueTextWidthpolyMat = doc.getTextWidth(polymaterialText);
            const valueTextWidth_2 = doc.getTextWidth(`${udlMaterial.value}`);
            doc.text(polymaterialText, udlmatStartXValue, current_y);
            const udlmaterialValue = udlmatStartXValue + valueTextWidthpolyMat;
            doc.text(`${udlMaterial.value}`, udlmaterialValue, current_y);
            doc.line(udlmaterialValue, current_y, udlmaterialValue + valueTextWidth_2, current_y);

            currentX.value = udlmaterialValue + valueTextWidth_2;
            if (currentX.value > max_width) current_y = current_y + 10;
            console.log(currentX.value);

            const valueTextWidthpolyDesc = doc.getTextWidth(polydescriptionText);
            const valueTextWidth_3 = doc.getTextWidth(`${udlDescription.value}`);
            const udldescStartXValue = currentX.value + 2;
            const checkDescription = udldescStartXValue + valueTextWidth_3;
            console.log(checkDescription);
            doc.text('UDL Description:', udldescStartXValue, current_y);
            if (checkDescription > max_width) print(checkDescription);
            const udldescriptionValue = udldescStartXValue + valueTextWidthpolyDesc;
            // current_y = current_y + 10;
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
            console.log('Entered sbs line 455', sbsStore.$state);
            const saNoa = ref(sbsStore.$state.systeminput[0].systemData.noa);
            const saApplicant = ref(sbsStore.$state.systeminput[0].systemData.manufacturer);
            const saSystemF = ref(sbsStore.$state.systeminput.pdfSystemValue);
            const saMaterial = ref(sbsStore.$state.systeminput[0].systemData.material);
            const saDescription = ref(sbsStore.$state.systeminput[0].systemData.description);

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
            console.log(currentX.value);

            const valueTextWidthsbsMaterial = doc.getTextWidth(sbsmaterialText);
            const valueTextWidthMat = doc.getTextWidth(`${saMaterial.value}`);
            const saMaterialStartXValue = LeftStart;
            doc.text(sbsmaterialText, saMaterialStartXValue, current_y);
            const sbsmaterialValue = saMaterialStartXValue + valueTextWidthsbsMaterial;
            doc.text(`${saMaterial.value}`, sbsmaterialValue, current_y);
            doc.line(sbsmaterialValue, current_y, sbsmaterialValue + valueTextWidthMat, current_y);
            currentX.value = sbsmaterialValue + valueTextWidthMat;

            if (currentX.value > max_width) current_y = current_y + 10;
            console.log(currentX.value);

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
        doc.save('Shingle.pdf');
    }
};
</script>
