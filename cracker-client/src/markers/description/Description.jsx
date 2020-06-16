import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { useMarkerContext } from "../+hooks/useMarkerContext";

export const Description = () => {
  const { currentMarker } = useMarkerContext();
  if (currentMarker) {
    return <MarkerForm marker={currentMarker} />;
  }
  return null;
};
