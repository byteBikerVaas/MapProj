const mongoose = require("mongoose");
const { TilesSchema } = require("./tilesModel");

const mapsSchema = new mongoose.Schema({
  filename: String,
  uploadedAt: Date,
  tileCount: Number,
  content: Buffer,
  tiles: [TilesSchema],
});

const MapsModel = mongoose.model("Map", mapsSchema);

module.exports = MapsModel;
