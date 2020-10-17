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
        .then((blob) => setImage(URL.createObjectURL(blob)));
    };

    if (accessToken && imageFilename) {
      fetchImage();
    }
  }, [accessToken, setImage, imageFilename]);

  return image;
};

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
