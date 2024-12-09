const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require("fs")

const URL_BASE = "/api/media/";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("public")); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Đặt tên file
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.json({ filename: URL_BASE + req.file.filename });
});

router.get("/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.resolve("./public", filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("File not found:", err);
                res.status(404).json({ message: "Image not found" });
            }
        });
    } else {
        res.status(404).json({ message: "Image not found" });
    }
});

module.exports = router;
