import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { UploadImage } from "./+components/UploadImage";
import { Image } from "./+components/Image";

export const Description = ({
  isAllowed,
  selectedMarker,
  onDeletedMarker,
  onCreatedMarker,
}) => {
  if (selectedMarker) {
    const { imageFilename } = selectedMarker;
    return (
      <>
        <MarkerForm
          isAllowed={isAllowed}
          marker={selectedMarker}
          onDeletedMarker={onDeletedMarker}
          onCreatedMarker={onCreatedMarker}
        />
        {isAllowed && <UploadImage marker={selectedMarker} />}
        {imageFilename && (
          <Image marker={selectedMarker} width={300} height={200} />
        )}
      </>
    );
  }
  return null;
};
