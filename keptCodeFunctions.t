
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
