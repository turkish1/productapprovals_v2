// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

let browserWSEndpoint; // To store the WebSocket endpoint of the Puppeteer browser

(async () => {
    // Launch Puppeteer and store the WebSocket endpoint
    const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        headless: true
    });
    browserWSEndpoint = browser.wsEndpoint();

    // Set up WebSocket server
    const wss = new WebSocket.Server({ port: 8081 });

    wss.on('connection', (ws) => {
        console.log('WebSocket connection established.');

        ws.on('message', async (message) => {
            const { htmlContent } = JSON.parse(message);
            const page = await browser.newPage();
            await page.setContent(htmlContent);
            const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
            await page.close();

            ws.send(pdfBuffer.toString('base64')); // Send PDF back as base64 string
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed.');
        });
    });

    console.log(`Puppeteer WebSocket server running at ws://localhost:8081`);
})();

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
