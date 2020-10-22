import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { UploadImage } from "./+components/UploadImage";
import { Image } from "./+components/Image";

export const Description = ({ currentMarker, reset, onNewMarker }) => {
  if (currentMarker) {
    const { imageFilename } = currentMarker;
    return (
      <>
        <MarkerForm
          marker={currentMarker}
          reset={reset}
          onNewMarker={onNewMarker}
        />
        <UploadImage marker={currentMarker} />
        {imageFilename && (
          <Image marker={currentMarker} width={300} height={200} />
        )}
      </>
    );
  }
  return null;
};
