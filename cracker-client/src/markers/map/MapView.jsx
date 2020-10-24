import React, { useCallback } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { MapContainer } from "./+components/MapContainer";
import { MarkerIcon } from "./+components/MarkerIcon";

export const MapView = ({
  markersList,
  selectedMarker,
  onAddNewMarker,
  onSelectedMarker,
}) => {
  const handleOnContextMenu = useCallback(
    (event) => {
      onAddNewMarker({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
    [onAddNewMarker]
  );

  return (
    <MapContainer>
      <Map
        center={centerToFirstOrDefault(selectedMarker, markersList)}
        zoom={15}
        oncontextmenu={handleOnContextMenu}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {selectedMarker && (
          <Marker
            position={[selectedMarker.latitude, selectedMarker.longitude]}
            icon={MarkerIcon}
          />
        )}

        {markersList &&
          markersList.markers.map((marker) => {
            const { name, latitude, longitude, _id } = marker;
            return (
              <Marker
                key={_id}
                position={[latitude, longitude]}
                icon={MarkerIcon}
                onClick={() => onSelectedMarker(_id)}
                title={name}
              />
            );
          })}
      </Map>
    </MapContainer>
  );
};

const centerToFirstOrDefault = (selectedMarker, markersList) => {
  if (selectedMarker) {
    return [selectedMarker.latitude, selectedMarker.longitude];
  }

  const KRAKOW_JORDAN_PARK_COORDS = [50.061252, 19.915738];
  return markersList && markersList.markers.length > 0
    ? [markersList.markers[0].latitude, markersList.markers[0].longitude]
    : KRAKOW_JORDAN_PARK_COORDS;
};
