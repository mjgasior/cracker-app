import React from "react";
import { useCurrentLanguage } from "../../+hooks/useCurrentLanguage";
import { useImage } from "./useImage";

export const Image = ({ marker }) => {
  const { imageFilename } = marker;

  const currentLanguage = useCurrentLanguage();
  const image = useImage(imageFilename, 300, 200);

  if (image) {
    const { name } = marker[currentLanguage];
    return <img src={image} alt={name} />;
  }
  return null;
};
