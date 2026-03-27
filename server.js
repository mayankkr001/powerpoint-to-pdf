const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to convert PowerPoint to PDF
app.post('/convert', (req, res) => {
    const { pptPath, pdfPath } = req.body;
    if (!pptPath || !pdfPath) {
        return res.status(400).send('PowerPoint and PDF paths are required.');
    }
    // Command to convert PPT to PDF using LibreOffice
    exec(`libreoffice --headless --convert-to pdf ${pptPath} --outdir ${pdfPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Conversion failed.');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Conversion failed.');
        }
        console.log(`stdout: ${stdout}`);
        return res.status(200).send('Conversion successful.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
