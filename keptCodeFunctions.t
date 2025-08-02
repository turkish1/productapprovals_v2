

// paddyCategory.value == 'single'  :
    // isPaddyvaluesingle.value == false ? suggestions.value.pdInputs?.[0] suggestions.value.pdInput?.[0]; .pdInput[0].pdNumber.noa.value.body
    // const paddyInputSelected = paddyCategory.value === 'double' ? suggestions.value.pdInputs?.[0] : suggestions.value.pdInput?.[0];

    // const noaArray = paddyCategory.value === 'double' ? (paddyInputSelected?.pdNumbers?.noa ?? []) : (paddyInputSelected?.pdNumber?.noa.value.body ?? []);
    // isPaddyvaluesingle.value == false ? (paddyInputSelected?.pdNumbers?.noa ?? []) : (paddyInputSelected?.pdNumber?.noa ?? []);

// composables/usePermitData.ts
// import { usePermitappStore } from '@/stores/permitapp';
// import { computed } from 'vue';

// import { useAxios } from '@vueuse/integrations/useAxios';
// import axios from 'axios';
// import { onMounted, reactive, ref } from 'vue';

// const lambdaUrl = 'https://mg7y3qizyjvkkwd7ynpoc2r2yi0gerzh.lambda-url.us-east-1.on.aws/';

// export default function usePermitData() {
//     const errors = ref(null);
//     const loading = ref(false);
//     var dimpayload = ref(null);
//     const permitStore = usePermitappStore();

//     const formdt = computed(() => permitStore.$state.permitapp[0]?.formdt || {});

//     console.log('formdt data: ', formdt);
//     const permitData = computed(() => ({
//         address: formdt.value.address || '',
//         masterPermit: formdt.value.permit || 'N|A',
//         processNumber: formdt.value.processNumber || '',
//         muniProcessNumber: formdt.value.muniProc || '',
//         municipality: formdt.value.muni || '',
//         dba: formdt.value.contractor || '',
//         license: formdt.value.license || '',
//         permitappIdentifier: 'Permitapp'
//     }));
//     onMounted(async () => {
//         const checkContent = permitData.value;
//         console.log(checkContent);
//         if (!checkContent) return; // guard
//         prepData();
//     });
//     const permitDatapost = reactive({
//         address: '',
//         masterpermit: '',
//         processnumber: '',
//         muniprocessnumber: '',
//         municipality: '',
//         dba: '',
//         license: '',
//         permitappIdentifier: ''
//     });

//     const { data, error, isFetching, execute } = useAxios(
//         // ① give the URL up front
//         lambdaUrl,
//         // ② options object
//         {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' }
//             // you can omit `data` here
//         },
//         // ③ axios instance
//         axios,
//         // ④ don't fire immediately
//         { immediate: false }
//     );

//     /**
//      * post an object to the Lambda
//      * @param {Object} obj — any JSON‐serializable object
//      */
//     async function prepData() {
//         try {
//             permitDatapost.address = permitData.value.address || '';
//             permitDatapost.masterpermit = permitData.value.masterPermit || '';
//             permitDatapost.processnumber = permitData.value.processNumber || '';
//             permitDatapost.muniprocessnumber = permitData.value.muniProcessNumber || '';
//             permitDatapost.municipality = permitData.value.municipality || '';
//             permitDatapost.dba = permitData.value.dba || '';
//             permitDatapost.license = permitData.value.license || '';
//             permitDatapost.permitappIdentifier = permitData.value.permitappIdentifier || '';

//             genData(permitDatapost);
//         } catch (e) {
//             // prevents uncaught promise — you can also forward this to your UI
//             console.error('Lambda post failed:', e);
//         }
//     }

//     async function genData(dim) {
//         try {
//             dimpayload.value = dim;
//             // testOptionsPreflight();
//             console.log('Payload:', dimpayload.value);

//             await execute({ data: dimpayload.value });
//         } catch (e) {
//             // prevents uncaught promise — you can also forward this to your UI
//             console.error('Lambda post failed:', e);
//         }
//     }

//     return { data, errors, isFetching, loading, prepData, genData };
// }

 for (const [key, value] of Object.entries(selfadhered.maps)) {
                console.log(`${key}: ${value}`);
            }

   const generatePdf = () => {
            const element = document.getElementById('permitapp');
            console.log(element);
            // Use html2canvas to capture the element as a canvas
            html2canvas(element).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');

                // Create a new jsPDF instance
                const pdf = new jsPDF();

                // Add some content
                pdf.text(`${formData.processNumber}`, 20, 30);

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

                const pdfBlob = pdf.output('blob');
                console.log(pdfBlob);
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
                    link.download = `${formData.processNumber}-permitapp.pdf`; // Specify the filename

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
//   noa.filter((item) => item.toString().includes(query.value));
    // } else return suggestions.value.doublepdInput[0].doublepdNumber.noa.filter((item) => item.toString().includes(query.value));
    // [0].doublepdNumber.noa.filter((item) => item.toString().includes(query.value));
// function grabInput() {
//     data.value = noaInput.value;

//     if (noaInput.value !== null) {
//         takeValue(data.value);
//         checkInput();
//     }
//     // console.log(useInputwFetch());
// }


// Print each text at a different X, same Y
            // rows.forEach((item, index) => {
            //     // Calculate the X position for this text
            //     const xPos = startX + index * colWidth;
            //     doc.text(item, xPos, startY);
            // });

            // (Optional) Draw boundary lines to illustrate columns
            // This is purely visual; you can remove or customize as needed.
            // const rowHeight = 10; // Height of the row
            // // Left boundary
            // doc.setLineWidth(0.5);
            // doc.line(startX, startY - 5, startX, startY + rowHeight - 5);
            // // Vertical lines & text boundary
            // rows.forEach((_, index) => {
            //     const xPos = startX + (index + 1) * colWidth;
            //     doc.line(xPos, startY - 5, xPos, startY + rowHeight - 5);
            // });
            // // Top boundary line
            // doc.line(startX, startY - 5, startX + colWidth * rows.length, startY - 5);
            // // Bottom boundary line
            // doc.line(startX, startY + rowHeight - 5, startX + colWidth * rows.length, startY + rowHeight - 5);
    // const sessionId = sessStore.$state.sessioninput[0]?.sessionData;
    // console.log(sessionId);
    // navigateNext();
    // if (!sessionId) return; // landed here directly

    // optional: show a loading spinner while you verify
    // const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);
    // console.log(stripe);
    // const paymentIntent = await stripe

    // console.log(paymentIntent.value);
    // http://127.0.0.1:5173/dynamicstepper/?session_id={CHECKOUT_SESSION_ID}"
    // 🔒 call your backend → /api/verify?session_id=...
    // const res = await fetch(`/v1/checkout/sessions/:id=${sessionId}`);
    // console.log(res);
    // const { status, amount_total } = await res.json();
    // console.log(stripe, paid, sessionId);
// Submitting the payment form
// const handleSubmit = async (event) => {
//     console.log(event);
//     // $refs.checkoutRef.redirectToCheckout();
//     // Quick validation

//     console.log(sessStore.$state);
//     submitted.value = true;
//     isloading.value = true;
//     const url = new URL(window.location.href);
//     console.log(url);
//     const sessionId = url.searchParams.get('session_id');
//     if (!sessionId) return; // landed here directly

//     // optional: show a loading spinner while you verify
//     const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);

//     // 🔒 call your backend → /api/verify?session_id=...
//     const res = await fetch(`/api/verify?session_id=${sessionId}`);
//     const { status, amount_total } = await res.json();
//     console.log(stripe, paid, sessionId);
//     if (status === 'paid') {
//         // render your custom thank‑you
//     } else {
//         // handle expired / unpaid etc.
//     }
// };
// Submitting the payment form
// const handleSubmit = async (event) => {
//     console.log(event);
//     // $refs.checkoutRef.redirectToCheckout();
//     // Quick validation

//     console.log(sessStore.$state);
//     submitted.value = true;
//     isloading.value = true;
//     const url = new URL(window.location.href);
//     console.log(url);
//     const sessionId = url.searchParams.get('session_id');
//     if (!sessionId) return; // landed here directly

//     // optional: show a loading spinner while you verify
//     const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);

//     // 🔒 call your backend → /api/verify?session_id=...
//     const res = await fetch(`/api/verify?session_id=${sessionId}`);
//     const { status, amount_total } = await res.json();
//     console.log(stripe, paid, sessionId);
//     if (status === 'paid') {
//         // render your custom thank‑you
//     } else {
//         // handle expired / unpaid etc.
//     }
// };



     // const noa = ref(Inputvalue.value.noa);
        // const applicant = ref(savedTileinput[0]?.savedValues?.applicant);
        // const material = ref(savedTileinput[0]?.savedValues?.material);
        // const description = ref(savedTileinput[0]?.savedValues?.description);
        // const valueTextWidthTileCategory = doc.getTextWidth(applicantText);
        // const valueTextWidthTile = doc.getTextWidth(`${applicant.value}`);
        // const tileApplicantStartXValue = LeftStart;
        // doc.text(applicantText, tileApplicantStartXValue, current_y);
        // const tileApplicantValue = tileApplicantStartXValue + valueTextWidthTileCategory;
        // doc.text(`${applicant.value}`, tileApplicantValue, current_y);
        // doc.line(tileApplicantValue, current_y + factor, tileApplicantValue + valueTextWidthTile, current_y + factor);
        // currentX.value = tileApplicantValue + valueTextWidthTile;
        // const valueTextWidthNoa = doc.getTextWidth(noaText);
        // const valueTextWidth3 = doc.getTextWidth(`${noa.value}`);
        // const tileStartXValue = currentX.value + 3;
        // doc.text(noaText, tileStartXValue, current_y);
        // const noaValue = valueTextWidthNoa + tileStartXValue;
        // doc.text(`${noa.value}`, noaValue, current_y);
        // doc.line(noaValue, current_y + factor, noaValue + valueTextWidth3, current_y + factor);
        // current_y = current_y + 10;
        // const nextWidthMaterial = doc.getTextWidth(`${material.value}`);
        // if (currentX.value > max_width) current_y = current_y + 10;

        // currentX.value = noaValue + nextWidthMaterial;

        // // currentX provides the update of the x coordinate
        // const materialStartXValue = LeftStart;
        // const valueTextWidthMaterialDesc = doc.getTextWidth(materialText);
        // const valueTextWidthMaterial = doc.getTextWidth(`${material.value}`);
        // doc.text(materialText, materialStartXValue, current_y);
        // const materialValue = materialStartXValue + valueTextWidthMaterialDesc;
        // doc.text(`${material.value}`, materialValue, current_y);
        // doc.line(materialValue, current_y + factor, materialValue + valueTextWidthMaterial, current_y + factor);
        // current_y = current_y + 5;
        // const descriptionWidth = doc.getTextWidth(`${description.value}`);
        // currentX.value = materialValue + descriptionWidth;
        // // add an update boolean so to choose between leftStart or currenX.value
        // if (currentX.value > max_width) current_y = current_y + 5;
        // console.log(currentX.value, max_width);
        // current_y = current_y + 5;
        // const valueTextWidth4 = doc.getTextWidth(`${description.value}`);
        // const valueTextWidthDesc = doc.getTextWidth(descriptionText);
        // console.log(valueTextWidth4, valueTextWidthDesc);

        // const descStartXValue = LeftStart;
        // doc.text(descriptionText, descStartXValue, current_y);

        // // this is the text we want to underline
        // if (valueTextWidth4 > 220) {
        //     current_y = current_y + 4;
        //     const descriptionValue = LeftStart;

        //     doc.text(`${description.value}`, descriptionValue, current_y);
        //     doc.line(descriptionValue, current_y + factor, descriptionValue + valueTextWidth4, current_y + factor);
        //     currentX.value = descriptionValue + valueTextWidth4;
        //     current_y = current_y + 8;
        // } else {
        //     const descriptionValue = descStartXValue + valueTextWidthDesc;
        //     doc.text(`${description.value}`, descriptionValue, current_y);
        //     doc.line(descriptionValue, current_y + factor, descriptionValue + valueTextWidth4, current_y + factor);
        //     currentX.value = descriptionValue + valueTextWidth4;
        //     current_y = current_y + 5;
        // }


// import * as Sentry from '@sentry/vue';
// import { BrowserTracing } from '@sentry/tracing';
// Sentry.init({
//     app,
//     dsn: process.env.VITE_SENTRY_DS,
//     // Setting this option to true will send default PII data to Sentry.
//     // For example, automatic IP address collection on events
//     sendDefaultPii: true,
//     integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
//     // Tracing
//     tracesSampleRate: 1.0, // Capture 100% of the transactions
//     // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//     tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
//     // Session Replay
//     replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//     replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

https://app.studyraid.com/en/read/14996/518149/handling-line-breaks-and-text-positioning
const longText = "A lengthy text string that needs automatic wrapping based on specified width.";
const lines = doc.splitTextToSize(longText, 150);
let yPosition = 70;

lines.forEach(line => {
  doc.text(line, 10, yPosition);
  yPosition += 10; // Adjust line height
});



  // const systemSplit = doc.splitTextToSize(`${system.value}`, 108);
        // const SystemTextWidth2 = doc.getTextWidth(systemSplit);
        // console.log(SystemTextWidth2);
        // doc.text(systemSplit, systemValue, current_y);
        // systemSplit.forEach((line) => {
        //     doc.text(line, systemValue, current_y);
        //     current_y += 10; // Adjust line height
        // });
        // let count = 3;
        // for (let i = 0; i < systemSplit.length; i++) {
        //     if (count <= 3) {
        //         doc.text(systemSplit[i], currentX.value, current_y);
        //         current_y = current_y + 10;
        //         currentX.value += 5;
        //         count += 1;
        //     }
        // }
        // doc.setFontSize(12);
        // doc.text(systemSplit, systemValue, current_y);


// const startProgress = () => {
//     interval.value = setInterval(() => {
//         let newValue = value1.value + Math.floor(Math.random() * 10) + 1;
//         if (newValue >= 100) {
//             newValue = 100;
//             toast.add({ severity: 'contrast', summary: 'Success', detail: 'Process Completed', life: 1000 });
//         }
//         value1.value = newValue;
//     }, 1000);
// };
// const endProgress = () => {
//     clearInterval(interval.value);
//     interval.value = null;
// };
    // count.value = 1;
    // cntStore.addCount(count);
    // console.log(cntStore);
    // Example: call your logic if the response is valid


    <stripe-buy-button buy-button-id="buy_btn_1RVdS4E9FsYF7D6YupNeXupi" publishable-key="pk_test_51PDPFeE9FsYF7D6YfBrV7kYvnDYIAR5QQfaR8ba5TGnoQAbEQgSeY7DLwhOZafrl8ZXJOPsbZN9tYl5HMLlhkxB100cmCtoWo7" @update="captureSession">Pay</stripe-buy-button>
 // margin: 0;
    // padding: 0;
    // min-height: 100%;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    // -webkit-transform: scale(0.999);
    // transform: scale(0.999);


/* .layout-main-container-frontpages {
    background: var(--shared-background);

    background-repeat: no-repeat;
    background-size: cover;

    width: 100%;
    padding: 3.5rem;
} */


<!-- <template>
    <div id="roofselect" class="flex card justify-center">
        <div class="refresh">
            <Button plain text>
                <i class="pi pi-refresh" style="font-size: 1.5rem; color: grey; margin-left: 50px; margin-top: 90px" @click="clearSelected"></i>
            </Button>
        </div>
        <div class="flex justify-center">
            <form>

                <div v-show="!isMiamiBeachValid" class="flex flex-col gap-4">
                    <label>Enter Square Footage</label>
                    <InputText type="text" v-model="area" />
                    <label>Select System</label>
                    <Select v-model="selectedItem" :options="type" optionLabel="name" placeholder="Select roof system" class="w-full md:w-72" @change="addItemAndClear" />
                </div>

                <div v-show="isMiamiBeachValid" class="card flex flex-col gap-4">
                    <label>Enter Square Footage</label>
                    <InputText type="text" v-model="area" />
                    <label>Select System</label>
                    <Select v-model="selectedItem" :options="types" optionLabel="name" placeholder="Select roof system" class="w-full md:w-56" @change="addItemAndClear" />
                </div>

                <div class="flex flex-wrap mt-4 space-y-6 justify-center gap-6">
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="newroof" name="checked" value="newroof" />
                        <label for="newroof" class="ml-2" style="color: #122620">New Roof </label>
                    </div>
                    <div class="flex items-center mt-4 space-y-6">
                        <Checkbox v-model="checked" :invalid="!checked" inputId="reroof" name="checked" value="reroof" />
                        <label for="reroof" class="ml-2" style="color: #122620">Re-Roof </label>
                    </div>
                </div>
            </form>
        </div>

        <div class="flex flex-col gap-4">
            <div>

                <Button class="button" label="Submit" raised style="margin-right: 90px; margin-top: 230px; background-color: #a4b5b9" as="router-link" to="/generalpage"></Button>
            </div>
        </div>
    </div>
</template> -->

  // current_y = param_y - 10;
        // const tAreaTextWidth = doc.getTextWidth(tArea);
        // const AreaTextWidth = doc.getTextWidth(`${area.value}`);
        // const areaStartXValue = currentX.value;
        // doc.text(tArea, areaStartXValue, current_y);
        // const areaValue = tAreaTextWidth + areaStartXValue;
        // doc.text(`${area.value}`, areaValue, current_y);
        // doc.line(areaValue, current_y + 2, areaValue + AreaTextWidth, current_y + 2);
        // .$state.generalpdfinput[1]?.generalpdfData?.roofCheck[0]
                        <!-- <StackCard v-for="(card, idx) in cards" :key="idx" :icon="card.icon" :title="card.title" :items="card.items" :animation="card.animation" /> -->


    <!-- <div class="flex flex-col border border-surface shadow-lg justify-left items-center max-w-80 rounded-2xl p-8 gap-4" data-aos="fade-right" data-aos-duration="1000">
                    <div class="rounded-full bg-secondary text-secondary-contrast w-48 h-24 flex items-center justify-center">
                        <i class="pi pi-align-justify !text-2xl"></i>
                    </div>
                    <span class="text-2xl font-bold">More Information</span>
                    <span v-for="(item, i) in infoItemShingle" :key="i" class="text-muted-color text-center"> {{ item.label }}{{ item.value }} </span>
                </div> -->
// const infoItemShingle = computed(() => [
//     { label: '', value: shinglePick('burMaterial') },
//     { label: '', value: shinglePick('burSystem') },
//     { label: '', value: shinglePick('p1') },
//     { label: '', value: shinglePick('p3') }
// ]);
// const infoItems = computed(() => [
//     { label: 'Noa: ', value: pick('noa') },
//     { label: '', value: pick('applicant') },
//     { label: '', value: pick('description') },
//     { label: 'Expiration Date: ', value: pick('expiration_date') }
// ]);

// const infoItemsbur = computed(() => [
//     { label: '', value: burpick('burMaterial') },
//     { label: '', value: burpick('burSystem') },
//     { label: '', value: burpick('p1') },
//     { label: '', value: burpick('p3') }
// ]);
   // [
        //     { label: 'Noa: ', value: pick('noa') },
        //     { label: 'Applicant: ', value: pick('applicant') },
        //     { label: 'Description: ', value: pick('description') },
        //     { label: 'Expiration Date: ', value: pick('expiration_date') }
        // ],
        // animation: 'fade-left'

        // [
        //     { label: 'Material: ', value: burpick('burMaterial') },
        //     { label: 'System: ', value: burpick('burSystem') },
        //     { label: 'P1: ', value: burpick('p1') },
        //     { label: 'P3: ', value: burpick('p3') }
        // ],
// function saDescPressure() {
//     if (selectedsystemf.value === 'F1') {
//         saTiles.description = saTiles.Description_F1[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F1;
//     }
//     if (selectedsystemf.value === 'F2') {
//         saTiles.description = saTiles.Description_F2[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F2[0];
//     }
//     if (selectedsystemf.value === 'F3') {
//         saTiles.description = saTiles.Description_F3[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F3[0];
//         console.log(saTiles.arrDesignPressure);
//     }
//     if (selectedsystemf.value === 'F4') {
//         saTiles.description = saTiles.Description_F4[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F4[0];
//         console.log(saTiles);
//     }
//     if (selectedsystemf.value === 'F5') {
//         saTiles.description = saTiles.Description_F5[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F5[0];
//     }
//     if (selectedsystemf.value === 'F6') {
//         saTiles.description = saTiles.Description_F6[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F6[0];
//     }

//     if (selectedsystemf.value === 'F7') {
//         saTiles.description = saTiles.Description_F7[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F7[0];
//     }
//     if (selectedsystemf.value === 'F8') {
//         saTiles.description = saTiles.Description_F8[0];

//         saTiles.designpressure = keyValueSystemFPairsValues.value.F8[0];
//     }
//     if (selectedsystemf.value === 'F9') {
//         saTiles.description = saTiles.Description_F9[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F9[0];
//     }

//     if (selectedsystemf.value === 'F10') {
//         saTiles.description = saTiles.Description_F10[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F10[0];
//     }
//     if (selectedsystemf.value === 'F11') {
//         saTiles.description = saTiles.Description_F11[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F11[0];
//     }
//     if (selectedsystemf.value === 'F12') {
//         saTiles.description = saTiles.Description_F12[0];
//         saTiles.designpressure = keyValueSystemFPairsValues.value.F12[0];
//     }

//     if (ftileStore.$state.tilefinput.length !== 0) {
//         ftileStore.$state.tilefinput[0].systemData.description = saTiles.description;
//         ftileStore.$state.tilefinput[0].systemData.pressure = saTiles.designpressure;
//         ftileStore.$state.tilefinput[0].systemData.prescriptiveSelection = selectedUnderlayment.value.selectedBasesheet;
//     }
// }

// function updateselectSystem(selectedsystemf) {
//     console.log(selectedsystemf.value);
//     console.log(usesystemfStore.store.$state.systeminput);
//     if (selectedsystemf.value === 'F1') {
//         selfadhered.sadescription = selfadhered.Description_F1[0];
//     }
//     if (selectedsystemf.value === 'F2') {
//         selfadhered.sadescription = selfadhered.Description_F2;
//     }

//     if (selectedsystemf.value === 'F3') {
//         selfadhered.sadescription = selfadhered.Description_F3;
//     }
//     if (selectedsystemf.value === 'F4' || selectedsystemf.value === 'E4') {
//         selfadhered.sadescription = selfadhered.Description_F4;
//     }
//     if (selectedsystemf.value === 'F5' || selectedsystemf.value === 'E5') {
//         selfadhered.sadescription = selfadhered.Description_F5;
//     }
//     if (selectedsystemf.value === 'F6' || selectedsystemf.value === 'E6') {
//         selfadhered.sadescription = selfadhered.Description_F6;
//     }
//     if (selectedsystemf.value === 'F7') {
//         selfadhered.sadescription = selfadhered.Description_F7;
//     }
//     if (selectedsystemf.value === 'F8') {
//         selfadhered.sadescription = selfadhered.Description_F8;
//     }
//     if (selectedsystemf.value === 'F9') {
//         selfadhered.sadescription = selfadhered.Description_F9;
//     }
//     if (selectedsystemf.value === 'F10') {
//         selfadhered.sadescription = selfadhered.Description_F10;
//     }
//     if (selectedsystemf.value === 'F11') {
//         selfadhered.sadescription = selfadhered.Description_F11;
//     }

//     console.log(usesystemfStore.store.$state.systeminput.pdfSystemValue, selectedsystemf.value);
//     usesystemfStore.store.$state.systeminput.pdfSystemValue = selectedsystemf.value;
//     usesystemfStore.store.$state.systeminput.description = selfadhered.sadescription;
//     console.log(usesystemfStore.store.$state.systeminput.systemData);

// }
// shingleSAStaging();
