import sharp from "sharp";
import path from "path";

const MIN_SIZE_OF_IMAGE = 10;
const MAX_SIZE_OF_IMAGE = 1000;

export const resizeImage = async (req, res, next) => {
  let width = getShapedNumber(req.query.w);
  let height = getShapedNumber(req.query.h);

  const filepath = path.join(__dirname, `../../images${req.path}`);
  const streamImage = await sharp(filepath)
    .resize(width, height)
    .jpeg()
    .toBuffer();

  res.write(streamImage);
  res.end();
  next();
};

const getShapedNumber = (stringNumber) => {
  let parsedNumber = parseInt(stringNumber);
  if (parsedNumber > MAX_SIZE_OF_IMAGE) {
    return MAX_SIZE_OF_IMAGE;
  }

  if (parsedNumber < MIN_SIZE_OF_IMAGE) {
    return MIN_SIZE_OF_IMAGE;
  }

  return parsedNumber;
};
