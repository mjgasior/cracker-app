import React, { useCallback } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { MapContainer } from "./+components/MapContainer";
import { MarkerIcon } from "./+components/MarkerIcon";

export const MapView = ({
  isAllowed,
  data,
  currentMarker,
  setCurrentMarker,
  onSelectedMarker,
}) => {
  const canMark = isAllowed && currentMarker;

  const handleOnContextMenu = useCallback(
    (event) => {
      if (isAllowed) {
        setCurrentMarker({
          latitude: event.latlng.lat,
          longitude: event.latlng.lng,
        });
      }
    },
    [isAllowed, setCurrentMarker]
  );

  const handleOnClick = useCallback(() => {
    if (canMark) {
      setCurrentMarker(null);
    }
  }, [canMark, setCurrentMarker]);

  const handleMarkerClick = useCallback(
    (selectedMarker) => {
      if (isAllowed) {
        setCurrentMarker(selectedMarker);
        onSelectedMarker(selectedMarker._id);
      }
    },
    [isAllowed, setCurrentMarker, onSelectedMarker]
  );

  return (
    <MapContainer>
      <Map
        center={centerToFirstOrDefault(currentMarker, data)}
        zoom={15}
        oncontextmenu={handleOnContextMenu}
        onclick={handleOnClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {canMark && (
          <Marker
            position={[currentMarker.latitude, currentMarker.longitude]}
            icon={MarkerIcon}
          />
        )}

        {data &&
          data.markers.map((marker) => {
            const { name, latitude, longitude, _id } = marker;
            return (
              <Marker
                key={_id}
                position={[latitude, longitude]}
                icon={MarkerIcon}
                onClick={() => handleMarkerClick(marker)}
                title={name}
              />
            );
          })}
      </Map>
    </MapContainer>
  );
};

const centerToFirstOrDefault = (selectedMarker, data) => {
  if (selectedMarker) {
    return [selectedMarker.latitude, selectedMarker.longitude];
  }

  const KRAKOW_JORDAN_PARK_COORDS = [50.061252, 19.915738];
  return data && data.markers.length > 0
    ? [data.markers[0].latitude, data.markers[0].longitude]
    : KRAKOW_JORDAN_PARK_COORDS;
};
