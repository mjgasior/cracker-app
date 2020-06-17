import React from "react";
import { MarkerForm } from "./+components/MarkerForm";
import { useMarkerContext } from "../+hooks/useMarkerContext";

export const Description = () => {
  const { currentMarker, setCurrentMarker } = useMarkerContext();
  const reset = () => setCurrentMarker(null);
  if (currentMarker) {
    return <MarkerForm marker={currentMarker} reset={reset} />;
  }
  return null;
};
