import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

export const MapController = ({
  onContextMenu,
  selectedMarker,
  markersList,
}) => {
  const map = useMapEvents({
    contextmenu: onContextMenu,
  });

  useEffect(() => {
    if (map) {
      map.setView(centerToFirstOrDefault(selectedMarker, markersList));
    }
  }, [map, selectedMarker, markersList]);

  return null;
};

const centerToFirstOrDefault = (selectedMarker, markersList) => {
  if (selectedMarker) {
    return [selectedMarker.latitude, selectedMarker.longitude];
  }

  if (markersList && markersList.markers.length > 0) {
    return [markersList.markers[0].latitude, markersList.markers[0].longitude];
  }

  const KRAKOW_JORDAN_PARK_COORDS = [50.061252, 19.915738];
  return KRAKOW_JORDAN_PARK_COORDS;
};
