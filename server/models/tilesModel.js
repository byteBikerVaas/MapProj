const mongoose = require("mongoose");

const TilesSchema = new mongoose.Schema({
  store_status: Number,
  zone: String,
  sector: String,
  barcode: String,
  botid: String,
  neighbours: [[Number]],
  blocked: Boolean,
  size_info: [Number],
  msu_dimensions: String,
  world_coordinate: String,
  world_coordinate_reference_neighbour: String,
  adjacency: [[Number]],
  coordinate: String,
});

const TilesModel = mongoose.model("tile", TilesSchema);

module.exports = { TilesModel, TilesSchema };
