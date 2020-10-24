import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { MarkerImage } from "./+components/MarkerImage";

export const Description = ({
  isAllowed,
  selectedMarker,
  onDeletedMarker,
  onCreatedMarker,
}) => {
  if (selectedMarker) {
    return (
      <>
        <MarkerForm
          isAllowed={isAllowed}
          marker={selectedMarker}
          onDeletedMarker={onDeletedMarker}
          onCreatedMarker={onCreatedMarker}
        />
        <MarkerImage isAllowed={isAllowed} marker={selectedMarker} />
      </>
    );
  }
  return null;
};
