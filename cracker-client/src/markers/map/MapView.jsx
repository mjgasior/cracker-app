import React, { useCallback } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { MapContainer } from "./+components/MapContainer";
import { useMarkers } from "./+hooks/useMarkers";
import { useMarkerContext } from "../+hooks/useMarkerContext";

const icon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [25, 25],
});

const centerToFirstOrDefault = (data) => {
  return data && data.markers.length > 0
    ? data.markers[0].position
    : [50.061252, 19.915738];
};

export const MapView = ({ isAllowed }) => {
  const { data } = useMarkers();

  const { currentMarker, setCurrentMarker } = useMarkerContext();

  const handleOnContextMenu = useCallback(
    (event) => {
      setCurrentMarker({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
    [setCurrentMarker]
  );

  const handleOnClick = useCallback(() => {
    if (currentMarker) {
      setCurrentMarker(null);
    }
  }, [currentMarker, setCurrentMarker]);

  const canMark = isAllowed && currentMarker;

  return (
    <MapContainer>
      <Map
        center={centerToFirstOrDefault(data)}
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
            icon={icon}
          />
        )}

        {data &&
          data.markers.map((marker) => (
            <Marker
              key={`${marker.position[0]}${marker.position[1]}`}
              position={marker.position}
              icon={icon}
              onClick={() => setCurrentMarker(marker)}
            />
          ))}
      </Map>
    </MapContainer>
  );
};
