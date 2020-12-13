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

  return (
    <StyledMapContainer>
      <MapContainer>
        <MapController
          onContextMenu={handleOnContextMenu}
          selectedMarker={selectedMarker}
          markersList={selectedMarker}
        />

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
