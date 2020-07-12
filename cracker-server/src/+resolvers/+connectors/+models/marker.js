import mongoose from "mongoose";

const { Schema } = mongoose;

const markerSchema = new Schema({
  latitude: Number,
  longitude: Number,
  english: { name: String, description: String },
  polish: { name: String, description: String },
});

export const Marker = mongoose.model("marker", markerSchema);
