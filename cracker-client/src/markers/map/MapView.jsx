import React, { useCallback } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { StyledMapContainer } from "./+components/StyledMapContainer";
import { MarkerIcon } from "./+components/MarkerIcon";
import { MapController } from "./+components/MapController";

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

  const center = centerToFirstOrDefault(selectedMarker, markersList);
  console.log(center);

  return (
    <StyledMapContainer>
      <MapContainer center={center} zoom={15}>
        <MapController onContextMenu={handleOnContextMenu} />
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
                eventHandlers={{
                  click: () => onSelectedMarker(_id),
                }}
                title={name}
              />
            );
          })}
      </MapContainer>
    </StyledMapContainer>
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
