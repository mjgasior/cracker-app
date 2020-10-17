import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { useImage } from "../+hooks/useImage";

const StyledAvatar = styled(Avatar)`
  color: #bbb;
  background-color: #ffd42a;
`;

export const ImageAvatar = ({ imageFilename }) => {
  const image = useImage(imageFilename, 32, 32);
  return <Avatar src={image} />;
};
