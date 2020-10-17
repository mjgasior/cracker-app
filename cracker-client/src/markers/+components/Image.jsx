import React, { useEffect, useState } from "react";
import { useAccessToken } from "../../+components/+hooks/useAccessToken";
import { useCurrentLanguage } from "../../+hooks/useCurrentLanguage";

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const Image = ({ marker }) => {
  const [image, setImage] = useState();
  const currentLanguage = useCurrentLanguage();
  const accessToken = useAccessToken();

  const { imageFilename } = marker;

  useEffect(() => {
    const fetchImage = async () => {
      fetch(`/images/${imageFilename}?w=300&h=200`, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
        .then(validateResponse)
        .then((response) => response.blob())
        .then((blob) => {
          setImage(URL.createObjectURL(blob));
        });
    };

    if (accessToken && imageFilename) {
      fetchImage();
    }
  }, [accessToken, setImage, imageFilename]);

  if (image) {
    const { name } = marker[currentLanguage];
    return <img src={image} alt={name} />;
  }
  return null;
};
