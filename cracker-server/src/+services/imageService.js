import express from "express";
// import sharp from "sharp";
import path from "path";

export const resizeImage = (req, res, next) => {
  console.log(__dirname);

  const filepath = path.join(__dirname, `../../images${req.path}`);
  console.log(filepath);

  /*
  sharp(inputBuffer)
    .resize(320, 240)
    .toFile("output.webp", (err, info) => {
      console.log("DONE");
    });
    */

  express.static("images")(req, res, next);
};
