import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { UploadImage } from "./+components/UploadImage";
import { Image } from "./+components/Image";

export const Description = ({ currentMarker, reset }) => {
  if (currentMarker) {
    return (
      <>
        <MarkerForm marker={currentMarker} reset={reset} />
        <UploadImage marker={currentMarker} />
        <Image marker={currentMarker} width={300} height={200} />
      </>
    );
  }
  return null;
};
