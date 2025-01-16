// composables/usePdfWatermark.js
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

/**
 * Composable that provides a function to add a text watermark
 * to the bottom-left corner (or any specified coordinates) of each page.
 */
export default function usePdfWatermark() {
    async function addWatermarkToPdf(pdfBytes, watermarkText = 'mEPermits', { x = 20, y = 20, fontSize = 16, opacity = 0.3 } = {}) {
        // 1. Load the existing PDF
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // 2. Embed a built-in font (Helvetica in this example)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // 3. Loop over each page and draw the watermark
        const pages = pdfDoc.getPages();
        for (const page of pages) {
            page.drawText(watermarkText, {
                x,
                y,
                size: fontSize,
                font: helveticaFont,
                color: rgb(0.75, 0.75, 0.75), // light gray
                opacity // semi-transparent by default
            });
        }

        // 4. Save and return the updated PDF as bytes
        const modifiedPdfBytes = await pdfDoc.save();
        return modifiedPdfBytes;
    }

    return {
        addWatermarkToPdf
    };
}
