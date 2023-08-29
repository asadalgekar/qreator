import express from "express";
import QRCode from "qrcode";
import path from "path";
import fs from "fs";
import { image } from "qr-image";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("index.ejs")
})
app.post('/scan', (req, res) => {
    const url = req.body.url;
    const pngFile = "QR" + '.png';
    const svgFile = "QR1" + '.svg';
    const imagePath = './public/images/';
    const finalImagePng = imagePath + pngFile;
    const finalImageSvg = imagePath + svgFile;
    const pixels = req.body.pixels || 300; // Default to 300 if not provided

    // Delete all files in the folder except "qrcode.svg"
    fs.readdir(imagePath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error clearing folder.');
        }
        files.forEach(file => {
            if (file !== 'qrcode.svg') {
                fs.unlinkSync(imagePath + file);
            }
        });

        // Generate and save PNG QR code image
        QRCode.toFile(finalImagePng, url, { width: pixels, height: pixels }, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error generating QR code.');
            }
            console.log('PNG QR code image generated and saved.');

            // Generate and save SVG QR code image
            QRCode.toFile(finalImageSvg, url, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error generating QR code.');
                }
                console.log('SVG QR code image generated and saved.');

                // Redirect back to the main page after generating both versions
                const relativeImagePath = path.relative('./public', finalImagePng);
                res.render('index.ejs', { image: relativeImagePath });

            });
        });
    });
});



app.post('/actions', (req, res) => {
    const clickedButton = req.body.button

    if (clickedButton === "clear") {
        res.redirect('/')
    } else if (clickedButton === "png") {
        res.download("./public/images/QR.png")
    } else res.download("./public/images/QR1.svg")

});
app.post("/clear", (req, res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});