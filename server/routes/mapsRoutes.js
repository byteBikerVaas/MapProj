const express = require("express");
const router = express.Router();
const mapsController = require("../controllers/mapsController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", mapsController.getAllMaps);
router.get("/:id", mapsController.getMapById);
router.post("/upload", upload.single("data"), mapsController.uploadMapData);
router.get("/download/:id", mapsController.downloadMapData);
module.exports = router;
