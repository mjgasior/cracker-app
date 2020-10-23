import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { UploadImage } from "./+components/UploadImage";
import { Image } from "./+components/Image";

export const Description = ({
  currentMarker,
  onDeletedMarker,
  onCreatedMarker,
}) => {
  if (currentMarker) {
    const { imageFilename } = currentMarker;
    return (
      <>
        <MarkerForm
          marker={currentMarker}
          onDeletedMarker={onDeletedMarker}
          onCreatedMarker={onCreatedMarker}
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
