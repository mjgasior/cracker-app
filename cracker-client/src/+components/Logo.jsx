import React from "react";
import LogoSvg from "./../+resources/logo.svg";
import styled from "styled-components";

const Img = styled.img`
  float: left;
  height: 44px;
  margin: 10px;
`;

export const Logo = () => <Img src={LogoSvg} />;
