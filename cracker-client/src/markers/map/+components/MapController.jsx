import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

const KRAKOW_JORDAN_PARK_COORDS = [50.061252, 19.915738];

export const MapController = ({
  onContextMenu,
  selectedMarker,
  markersList,
}) => {
  const map = useMapEvents({
    contextmenu: onContextMenu,
    locationfound: (location) => map.setView(getLocationArray(location)),
  });

  useEffect(() => {
    if (map) {
      let centerPoint = tryToCenterToFirst(selectedMarker, markersList);

      if (centerPoint === null) {
        centerPoint = KRAKOW_JORDAN_PARK_COORDS;
        map.locate();
      }

      map.setView(centerPoint);
    }
  }, [map, selectedMarker, markersList]);

  return null;
};

const tryToCenterToFirst = (selectedMarker, markersList) => {
  if (selectedMarker) {
    return [selectedMarker.latitude, selectedMarker.longitude];
  }

  if (markersList && markersList.markers.length > 0) {
    return [markersList.markers[0].latitude, markersList.markers[0].longitude];
  }

  return null;
};

const getLocationArray = (location) => [
  location.latlng.lat,
  location.latlng.lng,
];
