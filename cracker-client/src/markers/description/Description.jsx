import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { UploadImage } from "./+components/UploadImage";
import { Image } from "./+components/Image";

export const Description = ({
  selectedMarker,
  onDeletedMarker,
  onCreatedMarker,
}) => {
  if (selectedMarker) {
    const { imageFilename } = selectedMarker;
    return (
      <>
        <MarkerForm
          marker={selectedMarker}
          onDeletedMarker={onDeletedMarker}
          onCreatedMarker={onCreatedMarker}
        />
        <UploadImage marker={selectedMarker} />
        {imageFilename && (
          <Image marker={selectedMarker} width={300} height={200} />
        )}
      </>
    );
  }
  return null;
};
