import React from "react";
import { useCurrentLanguage } from "../../+hooks/useCurrentLanguage";

export const Image = ({ marker }) => {
  const currentLanguage = useCurrentLanguage();
  const { name } = marker[currentLanguage];
  const { imageFilename } = marker;
  return imageFilename && <img src={`/images/${imageFilename}`} alt={name} />;
};
