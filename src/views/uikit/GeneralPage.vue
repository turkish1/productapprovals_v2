<script setup>
import CadViewer from '@/components/Editor/CadViewer.vue';
import { useGlobalState } from '@/stores/accountsStore';
import { usePermitappStore } from '@/stores/permitapp';
import { useRoofListStore } from '@/stores/roofList';
import { invoke, until } from '@vueuse/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { storeToRefs } from 'pinia';
import Checkbox from 'primevue/checkbox';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const permitstore = usePermitappStore();
const { permitapp } = storeToRefs(permitstore);
const store = useRoofListStore();
const { roofList } = storeToRefs(store);
const router = useRouter();

const { accountUsers } = useGlobalState();
let total = ref('');
let low1 = ref('');
let steep1 = ref('');
const steep = ref('');
let lowslope = ref('');
let steep2 = ref('');
let steep3 = ref('');
let steep4 = ref('');
let checkedmtile = ref(false);
let checkedadtile = ref(false);
let checkedshingle = ref(false);
let checkedmetal = ref(false);
// let checkedslope = ref();
let master = ref();
let process = ref();
let dba = ref();
let jobaddress = ref();
let contractor = ref();

const checkedslp = ref(false);

console.log(roofList, permitapp);

onMounted(() => {
    roofList.value.forEach((item, index) => {
        console.log(item.item, index);
        if (item.item === 'Asphalt Shingle') {
            console.log(item.dim1);
            steep1.value = item.dim1;
            checkedshingle.value = true;
        }

        if (item.item === 'Low Slope') {
            console.log(item.dim2);
            low1.value = item.dim2;
            console.log(low1.value);
            checkedslp.value = true;
        }

        if (item.item === 'Mechanical Fastened Tile') {
            steep1.value = item.dim3;
            checkedmtile.value = true;
        }

        if (item.item === 'Adhesive Set Tile') {
            steep2.value = item.dim4;
            checkedadtile.value = true;
        }
        if (item.item === 'Metal Panel') {
            steep3.value = item.dim5;
            checkedmetal.value = true;
        }
        if (accountUsers._value[0].DBA === '') {
            console.log(accountUsers._value[0]);
            return null;
        } else {
            dba.value = accountUsers._value[0].dba;
        }
        // (slope.value = item.formdt.permit), (mtile.value = item.formdt.processNumber), (adtile.value = item.formdt.phone), (mtile.value = item.formdt.email), (shingle.value = item.formdt.contractor);
    });

    permitapp.value.forEach((item, index) => {
        (master.value = item.formdt.permit), (process.value = item.formdt.processNumber), (jobaddress.value = item.formdt.address), (contractor.value = item.formdt.contractor);
    });

    roofArea();
});
const checked = ref(false);
function roofArea() {
    let l1 = Number(low1.value);

    let st1 = Number(steep1.value);
    let st2 = Number(steep2.value);
    let st3 = Number(steep3.value);
    let st4 = Number(steep4.value);
    steep.value = st1 + st2 + st3 + st4;

    // + st2 + st3 + st4;

    lowslope.value = l1;
    console.log(steep1.value);
    total.value = lowslope.value + steep.value;
}
const pdfcleared = ref(false);
const generatePdf = () => {
    const element = document.getElementById('generalpg');
    console.log(element);
    // Use html2canvas to capture the element as a canvas
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF();
        pdf.text(`${process.value}`, 20, 30);

        // Set the opacity for the watermark text
        pdf.setGState(new pdf.GState({ opacity: 0.4 })); // Adjust opacity

        // Set font size, alignment, and rotation for the watermark
        pdf.setFontSize(24);
        pdf.setTextColor(150, 150, 150); // Light gray color for watermark
        pdf.text('DigitalSolutions', pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() / 2, {
            angle: 0, // Rotate watermark text
            align: 'left',
            baseline: 'bottom',
            renderingMode: 'fill'
        });
        console.log(pdf.text);
        // Add the captured image data to the PDF
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        // Reset the opacity for the rest of the content
        pdf.setGState(new pdf.GState({ opacity: 1 }));

        // Add the captured image data to the PDF

        const pdfBlob = pdf.output('blob');

        // Save the PDF Blob using the File System Access API
        savePdfBlobSilently(pdfBlob);
    });

    const savePdfBlobSilently = async (blob) => {
        try {
            // Use the File System Access API to request a file handle
            const fileContents = blob;
            const blobs = new Blob([fileContents], { type: 'application/pdf' });

            // Step 2: Create a temporary link element
            const link = document.createElement('a');

            // Step 3: Create a URL for the blob and set it as the link href
            link.href = URL.createObjectURL(blobs);
            link.download = `${process.value}-general-page.pdf`; // Specify the filename

            // Step 4: Programmatically click the link to trigger the download
            link.click();

            // Step 5: Clean up the URL object
            URL.revokeObjectURL(link.href);

            console.log('PDF saved successfully without popping download dialog!');
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };
};

const navigateNext = () => {
    pdfcleared.value = true;
    router.push('/roofinputsection');
};
invoke(async () => {
    await until(pdfcleared).changed();
    generatePdf();
});
</script>

<template>
    <div id="generalpg" class="flex flex-col md:flex-row gap-6" style="margin-left: 320px">
        <div class="md:w-full">
            <!-- style="background-color: #eae7e2" -->
            <div class="md:w-3/4 card flex flex-col gap-4">
                <!-- style="background-color: #eae7e2" -->
                <div class="container">
                    <!-- style="background-color: #eae7e2" -->
                    <div class="row">
                        <!-- style="background-color: #eae7e2" -->
                        <div class="card flex flex-col gap-4">
                            <!-- <div class="font-semibold text-xl">2023 HVHZ</div> -->
                            <div class="grid grid-cols-1 gap-1 place-content-center h-6 ...">
                                <p class="text-center font-semibold text-xl">2023 HVHZ</p>
                            </div>
                            <div class="grid grid-cols-1 gap-1 place-content-center h-5 ...">
                                <p class="text-center italic font-semibold text-xl">mEPermit</p>
                            </div>
                            <div class="grid grid-cols-1 gap-1 place-content-center h-4 ...">
                                <p class="text-center font-semibold text-xl">General Information Page</p>
                            </div>
                            <!-- style="background-color: #eae7e2" -->
                            <div class="flex flex-wrap gap-5 columns-3">
                                <div class="flex flex-col grow basis-0 gap-3">
                                    <label for="master">Master Permit</label>
                                    <InputText id="master" v-model="master" type="text" planceholder="permit number" />
                                </div>

                                <div class="flex flex-col grow basis-0 gap-3">
                                    <label for="process">mEProcess Number</label>
                                    <InputText id="process" v-model="process" type="text" planceholder="mEProcess" />
                                </div>

                                <div class="flex flex-col grow basis-0 gap-2">
                                    <label for="email1">Job Address</label>
                                    <InputText id="jobaddress" v-model="jobaddress" type="text" planceholder="" />
                                </div>
                            </div>
                            <div class="flex flex-col md:w-1/2 gap-2">
                                <label for="dba">Licensed DBA Name </label>
                                <InputText id="dba" v-model="dba" type="text" />
                            </div>
                        </div>
                        <!-- </div>style="background-color: #eae7e2" -->
                        <div class="card flex flex-wrap justify-center gap-6">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" :invalid="!checked" inputId="newroof" name="checked" value="newroof" />
                                <label for="newroof" class="ml-2"> New Roof</label>
                            </div>
                            <div class="flex items-center">
                                <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
                                <label for="reroof" class="ml-2"> Re-Roof</label>
                            </div>
                        </div>
                        <!-- style="background-color: #eae7e2" -->
                        <div class="card flex flex-wrap justify-center gap-4">
                            <div class="flex items-center">
                                <Checkbox v-model="checkedslp" inputId="slope1" name="lowslope" value="Low Slope" severity="contrast" :binary="true" />
                                <label for="slope1" class="ml-2"> Low Slope </label>
                            </div>
                            <div class="flex items-center">
                                <Checkbox v-model="checkedmtile" inputId="mtile1" name="mtile" value="Mechanical Fastened Tile" severity="contrast" :binary="true" />
                                <label for="mtile1" class="ml-2"> Mechanical Fastened Tile </label>
                            </div>
                            <div class="flex items-center">
                                <Checkbox v-model="checkedadtile" inputId="adtile1" name="adtile" value="Mortar/Adhesive Set Tile" severity="contrast" :binary="true" />
                                <label for="adtile1" class="ml-2"> Adhesive Set Tile </label>
                            </div>
                            <br />
                            <label></label>

                            <div class="flex items-center">
                                <Checkbox v-model="checkedshingle" inputId="shingle1" name="shingle" value="Asphalt Shingle" severity="contrast" :binary="true" />
                                <label for="shingle1" class="ml-2"> Asphalt Shingle </label>
                            </div>
                            <div class="flex items-center">
                                <Checkbox v-model="checkedmetal" inputId="metal1" name="metal1" value="metal panel" severity="contrast" :binary="true" />
                                <label for="metal" class="ml-2"> Metal Panel </label>
                            </div>
                        </div>
                        <label style="margin-left: 350px">Roof Area </label>
                        <!-- style="background-color: #eae7e2" -->
                        <div class="card flex flex-col md:flex-row gap-8">
                            <div><label for="lowslope" class="ml-1 text-left">Low Slope </label></div>

                            <InputGroup>
                                <InputText v-model="lowslope" placeholder="Low Slope" @change="roofArea" />
                                <InputGroupAddon> </InputGroupAddon>
                            </InputGroup>
                            <div class="ml-1 text-left"><label for="">Steep Slope </label></div>
                            <InputGroup>
                                <InputNumber v-model="steep" placeholder="Steep Sloped" @change="roofArea" />

                                <InputGroupAddon></InputGroupAddon>
                            </InputGroup>
                            <label for="" class="ml-1">Total </label>
                            <InputGroup>
                                <InputGroupAddon>Total</InputGroupAddon>
                                <InputText v-model="total" placeholder="Total" />
                            </InputGroup>
                        </div>
                        <div class="card md:w-1/2 flex flex-col bg-local hover:bg-fixed gap-4" style="margin-left: 10px; background-color: #eae7e2">
                            <CadViewer />
                        </div>
                        <!-- style="background-color: #eae7e2" -->
                        <div class="card md:w-1/3 flex flex-col gap-4">
                            <Button class="w-1/3" type="submit" label="Submit" style="background-color: #a4b5b9" raised @click="navigateNext" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 30px;
    padding-top: 12px;
    border: none;
    border-radius: 12px;
    box-shadow: 4px 4px 16px rgb(22, 183, 183);
    position: center;
    min-height: 500px;
    min-width: 700px;
    top: 10vh;
}

.ql-container {
    height: calc(100% - 52px);
}

.editor-layout {
    width: 85%;
    height: 600px;
    border-style: solid;
    border-width: 2px;
    border-color: blue;
    margin-left: 20px;
    padding-bottom: 30px;
}

.pintura-editor {
    --color-background: 255, 255, 255;
    --color-foreground: 0, 0, 0;
    /* --color-background: 255, 255, 255;
    --color-foreground: 10, 10, 10; */
    --editor-max-width: 50em;
    --editor-max-height: 40em;
    --color-preview-outline: 255, 0, 0;
    --color-primary: #2990ff;
    --color-primary-dark: #1a80ec;
    --color-primary-text: #fff;
    --color-secondary: #03a9f4;
    --color-secondary-dark: #046bbf;
    --color-focus: 255, 0, 0;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
    html {
        color: #fff;
        background: #fff;
    }

    .pintura-editor {
        --color-background: 10, 10, 10;
        --color-foreground: 255, 255, 255;
        box-shadow: 0 0 0 1px rgba(238, 233, 233, 0.1);
    }
}
</style>
