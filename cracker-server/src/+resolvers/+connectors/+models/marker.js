import mongoose from "mongoose";

const { Schema } = mongoose;

const markerSchema = new Schema({
  position: [Number],
});

export const Marker = mongoose.model("marker", markerSchema);
