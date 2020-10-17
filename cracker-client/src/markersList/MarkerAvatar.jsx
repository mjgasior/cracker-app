import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { ImageAvatar } from "./ImageAvatar";

const StyledAvatar = styled(Avatar)`
  color: #bbb;
  background-color: #ffd42a;
`;

export const MarkerAvatar = ({ name, imageFilename }) => {
  if (imageFilename) {
    return <ImageAvatar imageFilename={imageFilename} />;
  }
  return <StyledAvatar>{name.toUpperCase()}</StyledAvatar>;
};
