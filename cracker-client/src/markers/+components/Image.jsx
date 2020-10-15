import React from "react";
import { useCurrentLanguage } from "../../+hooks/useCurrentLanguage";

export const Image = ({ marker }) => {
  const currentLanguage = useCurrentLanguage();
  const { imageFilename } = marker;
  if (imageFilename) {
    const { name } = marker[currentLanguage];
    const { imageFilename } = marker;
    return <img src={`/images/${imageFilename}?w=300&h=200`} alt={name} />;
  }
  return null;
};
