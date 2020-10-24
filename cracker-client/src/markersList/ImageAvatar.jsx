import React from "react";
import { Avatar } from "antd";
import { useImage } from "../+hooks/useImage";

const AVATAR_SIZE = 32;

export const ImageAvatar = ({ imageFilename }) => {
  const image = useImage(imageFilename, AVATAR_SIZE, AVATAR_SIZE);
  if (image) {
    return <Avatar src={image} />;
  }
  return <Avatar>?</Avatar>;
};
