const mapsModel = require("../models/mapsModel");

exports.getAllMaps = async (req, res) => {
  try {
    const maps = await mapsModel.find();
    res.json(maps);
  } catch (error) {
    console.error("Error fetching maps:", error);
    res.status(500).json({ error: "Error fetching maps" });
  }
};

exports.getMapById = async (req, res) => {
  try {
    const map = await mapsModel.findById(req.params.id);
    if (!map) {
      return res.status(404).json({ error: "Map not found" });
    }
    res.json(map);
  } catch (error) {
    console.error("Error fetching map details:", error);
    res.status(500).json({ error: "Error fetching map details" });
  }
};

exports.uploadMapData = async (req, res) => {
  try {
    // Parse the uploaded JSON data
    const jsonData = JSON.parse(req.file.buffer);
    const result = await mapsModel.create({
      filename: req.file.filename,
      uploadedAt: Date.now(),
      tileCount: jsonData.length,
      tiles: jsonData,
      content: req.file.buffer,
    });
    res.status(200).json({ message: "Data uploaded successfully", result });
  } catch (error) {
    console.error("Error uploading map data:", error);
    res.status(500).json({ error: "Error uploading map data" });
  }
};

exports.downloadMapData = async (req, res) => {
  try {
    // Fetch the map data by ID from the database
    const map = await mapsModel.findById(req.params.id);

    // Check if the map exists
    if (!map) {
      return res.status(404).json({ error: "Map not found" });
    }

    // Set the response headers for file download
    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${req.params.id}.json`,
    });

    // Send the content buffer of the map as the response
    res.send(map.content);
  } catch (error) {
    console.error("Error downloading map data:", error);
    res.status(500).json({ error: "Error downloading map data" });
  }
};
