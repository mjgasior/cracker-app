import React from "react";
import LogoSvg from "./../+resources/crackerbig.svg";
import styled from "styled-components";

const Img = styled.img`
  height: 200px;
  margin: 10px;
`;

export const BigLogo = () => <Img src={LogoSvg} />;
