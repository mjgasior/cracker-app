import { useMapEvents } from "react-leaflet";

export const MapController = ({ onContextMenu }) => {
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
    contextmenu: onContextMenu,
  });
  return null;
};
