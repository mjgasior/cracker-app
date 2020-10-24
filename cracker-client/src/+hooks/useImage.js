import { useState, useEffect } from "react";
import { useAccessToken } from "./useAccessToken";

export const useImage = (imageFilename, width, height) => {
  const [image, setImage] = useState();
  const accessToken = useAccessToken();

  useEffect(() => {
    const fetchImage = async () => {
      let url = `/images/${imageFilename}`;
      if (width && height) {
        url = `/images/${imageFilename}?w=${width}&h=${height}`;
      }

      fetch(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      })
        .then(validateResponse)
        .then((response) => response.blob())
        .then((blob) => setImage(URL.createObjectURL(blob)))
        .catch((err) => console.error(err));
    };

    if (accessToken && imageFilename) {
      fetchImage();
    }
  }, [accessToken, setImage, imageFilename, width, height]);

  return image;
};

const validateResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};
