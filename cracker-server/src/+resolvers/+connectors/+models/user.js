import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
});

export const User = mongoose.model("user", userSchema);
