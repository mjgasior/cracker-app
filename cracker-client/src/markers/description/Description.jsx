import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { MarkerImage } from "./+components/MarkerImage";

export const Description = ({
  isAllowed,
  selectedMarker,
  onDeleteMarker,
  onCreateMarker,
}) => {
  if (selectedMarker) {
    return (
      <>
        <MarkerForm
          isAllowed={isAllowed}
          marker={selectedMarker}
          onDeleteMarker={onDeleteMarker}
          onCreateMarker={onCreateMarker}
        />
        <MarkerImage isAllowed={isAllowed} marker={selectedMarker} />
      </>
    );
  }
  return null;
};
