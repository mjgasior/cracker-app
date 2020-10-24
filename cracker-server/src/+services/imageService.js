import sharp from "sharp";
import path from "path";

const MIN_SIZE_OF_IMAGE = 10;
const MAX_SIZE_OF_IMAGE = 1000;
const SIZE_OF_UNAUTHORIZED_IMAGE = 30;

export const resizeImage = async (req, res, next) => {
  const width = getShapedNumber(req.query.w);
  const height = getShapedNumber(req.query.h);
  await respondWithImage(width, height, req.path, res, next);
};

export const forcedResizeImage = async (req, res, next) => {
  const width = SIZE_OF_UNAUTHORIZED_IMAGE;
  const height = SIZE_OF_UNAUTHORIZED_IMAGE;
  await respondWithImage(width, height, req.path, res, next);
};

const respondWithImage = async (width, height, requestPath, res, next) => {
  const filepath = path.join(__dirname, `../../images${requestPath}`);
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
