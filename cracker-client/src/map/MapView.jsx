import React, { useCallback, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { Button } from "antd";
import { ContextMenu } from "./+components/ContextMenu";
import { MapContainer } from "./+components/MapContainer";
import { useMarkers } from "./+hooks/useMarkers";
import { useAddMarker } from "./+hooks/useAddMarker";
import { useRemoveMarker } from "./+hooks/useRemoveMarker";
import auth from "../+utils/Auth";

const icon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [25, 25],
});

export const MapView = () => {
  const { data } = useMarkers();
  const [addMarker] = useAddMarker();
  const [removeMarker] = useRemoveMarker();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [position, setPosition] = useState(null);

  const isAllowed = auth.isAuthenticated() && auth.isUserAdmin();

  const handleOnContextMenu = useCallback(
    (event) => {
      setPosition([event.latlng.lat, event.latlng.lng]);
    },
    [setPosition]
  );

  const handleAddMarker = useCallback(
    (position) => {
      addMarker({ variables: { position } });
      setPosition(null);
    },
    [addMarker, setPosition]
  );

  const handleDeleteMarker = useCallback(
    (markerId) => {
      removeMarker({ variables: { id: markerId } });
      setSelectedMarker(null);
    },
    [setSelectedMarker, removeMarker]
  );

  const showAddMarker =
    isAllowed && position !== null && selectedMarker === null;

  const showDeleteMarker =
    isAllowed && position === null && selectedMarker !== null;

  const canMark = isAllowed && position;

  return (
    <MapContainer>
      <Map
        center={[50.061252, 19.915738]}
        zoom={15}
        oncontextmenu={handleOnContextMenu}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {showAddMarker && (
          <ContextMenu position={position} onClose={() => setPosition(null)}>
            <div>
              <Button type="primary" onClick={() => handleAddMarker(position)}>
                Add marker
              </Button>
            </div>
          </ContextMenu>
        )}

        {showDeleteMarker && (
          <ContextMenu
            position={selectedMarker.position}
            onClose={() => setSelectedMarker(null)}
          >
            <div>
              <Button
                type="primary"
                onClick={() => handleDeleteMarker(selectedMarker._id)}
              >
                Delete marker
              </Button>
            </div>
          </ContextMenu>
        )}

        {canMark && <Marker position={position} icon={icon} />}

        {data &&
          data.markers.map((marker) => (
            <Marker
              key={`${marker.position[0]}${marker.position[1]}`}
              position={marker.position}
              icon={icon}
              onClick={() => setSelectedMarker(marker)}
            />
          ))}
      </Map>
    </MapContainer>
  );
};
