const express = require("express");
const router = express.Router();

const mapsRoutes = require("./mapsRoutes");

router.use("/maps", mapsRoutes);

module.exports = router;
