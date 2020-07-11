import mongoose from "mongoose";

const { Schema } = mongoose;

const markerSchema = new Schema({
  latitude: Number,
  longitude: Number,
  english: { name: String, content: String },
  polish: { name: String, content: String },
});

export const Marker = mongoose.model("marker", markerSchema);
