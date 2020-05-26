import React from "react";
import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import { useLeaflet } from "react-leaflet";

export const ContextMenu = () => {
  const { map } = useLeaflet();
  console.log(map);

  return <div>a</div>;
};
