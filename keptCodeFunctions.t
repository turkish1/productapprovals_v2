

// paddyCategory.value == 'single'  :
    // isPaddyvaluesingle.value == false ? suggestions.value.pdInputs?.[0] suggestions.value.pdInput?.[0]; .pdInput[0].pdNumber.noa.value.body
    // const paddyInputSelected = paddyCategory.value === 'double' ? suggestions.value.pdInputs?.[0] : suggestions.value.pdInput?.[0];

    // const noaArray = paddyCategory.value === 'double' ? (paddyInputSelected?.pdNumbers?.noa ?? []) : (paddyInputSelected?.pdNumber?.noa.value.body ?? []);
    // isPaddyvaluesingle.value == false ? (paddyInputSelected?.pdNumbers?.noa ?? []) : (paddyInputSelected?.pdNumber?.noa ?? []);


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
