import styled from "styled-components";
import { Popup } from "react-leaflet";

export const ContextMenu = styled(Popup)`
  border-radius: 0;

  .leaflet-popup-content-wrapper {
    border-radius: 0;
  }

  .leaflet-popup-tip-container {
    visibility: hidden;
  }
`;
