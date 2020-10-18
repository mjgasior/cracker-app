import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { UploadImage } from "./+components/UploadImage";
import { Image } from "./+components/Image";

export const Description = ({ currentMarker, reset }) => {
  if (currentMarker) {
    const { imageFilename } = currentMarker;
    return (
      <>
        <MarkerForm marker={currentMarker} reset={reset} />
        <UploadImage marker={currentMarker} />
        {imageFilename && (
          <Image marker={currentMarker} width={300} height={200} />
        )}
      </>
    );
  }
  return null;
};
