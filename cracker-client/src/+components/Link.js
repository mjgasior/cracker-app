import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(RouterLink)`
  color: ${(props) => props.theme.link};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.linkHover};
  }
`;
