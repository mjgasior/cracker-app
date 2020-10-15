import sharp from "sharp";
import path from "path";

export const resizeImage = async (req, res, next) => {
  const filepath = path.join(__dirname, `../../images${req.path}`);

  const streamImage = await sharp(filepath)
    .resize(parseInt(req.query.w), parseInt(req.query.h))
    .jpeg()
    .toBuffer();

  res.write(streamImage);
  res.end();
  next();
};
