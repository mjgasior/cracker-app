import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { useMarkerContext } from "../+hooks/useMarkerContext";
import { UploadImage } from "./UploadImage";

export const Description = () => {
  const { currentMarker, setCurrentMarker } = useMarkerContext();
  const reset = () => setCurrentMarker(null);
  if (currentMarker) {
    return (
      <>
        <MarkerForm marker={currentMarker} reset={reset} />
        <UploadImage />
      </>
    );
  }
  return null;
};
