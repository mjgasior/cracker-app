import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { MarkerImage } from "./+components/MarkerImage";

export const Description = ({
  isAllowed,
  selectedMarker,
  onDeleteMarker,
  onCreateMarker,
  onUpdateMarker,
}) => {
  if (selectedMarker) {
    return (
      <>
        <MarkerForm
          isAllowed={isAllowed}
          marker={selectedMarker}
          onDeleteMarker={onDeleteMarker}
          onCreateMarker={onCreateMarker}
          onUpdateMarker={onUpdateMarker}
        />
        <MarkerImage isAllowed={isAllowed} marker={selectedMarker} />
      </>
    );
  }
  return null;
};
