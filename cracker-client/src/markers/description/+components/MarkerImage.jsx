import React from "react";
import { UploadImage } from "./UploadImage";
import { Image } from "./Image";

export const MarkerImage = ({ isAllowed, marker }) => {
  const { imageFilename } = marker;
  if (isAllowed) {
    return (
      <>
        {imageFilename && <Image marker={marker} width={300} height={200} />}
        <UploadImage marker={marker} />
      </>
    );
  }
  return null;
};
