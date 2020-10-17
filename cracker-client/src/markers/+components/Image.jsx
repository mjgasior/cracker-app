import React from "react";
import { useCurrentLanguage } from "../../+hooks/useCurrentLanguage";
import { useImage } from "../../+hooks/useImage";

export const Image = ({ marker, width, height }) => {
  const { imageFilename } = marker;

  const currentLanguage = useCurrentLanguage();
  const image = useImage(imageFilename, width, height);

  if (image) {
    const { name } = marker[currentLanguage];
    return <img src={image} alt={name} />;
  }
  return null;
};
