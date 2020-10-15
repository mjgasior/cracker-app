import express from "express";
import sharp from "sharp";
import path from "path";

export const resizeImage = async (req, res, next) => {
  console.log(__dirname);

  const filepath = path.join(__dirname, `../../images${req.path}`);
  console.log(filepath);

  sharp(filepath)
    .resize(parseInt(req.query.w), parseInt(req.query.h))
    .toFile("images/output.webp", (err, info) => {
      console.log("DONE");
    });

  const streamImage = await sharp(filepath)
    .resize(parseInt(req.query.w), parseInt(req.query.h))
    .jpeg()
    .toBuffer();

  res.write(streamImage);
  res.end();
  next();
  // express.static("images")(req, res, next);
};
