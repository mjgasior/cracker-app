import mongoose from "mongoose";

const { Schema } = mongoose;

const markerSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  description: { english: String, polish: String },
});

export const Marker = mongoose.model("marker", markerSchema);
