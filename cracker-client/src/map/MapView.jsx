import React, { useCallback, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { Button } from "antd";
import { ContextMenu } from "./+components/ContextMenu";
import { MapContainer } from "./+components/MapContainer";

const icon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [25, 25],
});

export const MapView = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState(null);

  const handleOnContextMenu = useCallback(
    (event) => {
      setPosition([event.latlng.lat, event.latlng.lng]);
    },
    [setPosition]
  );

  const handleAddMarker = useCallback(
    (position) => {
      setMarkers((prev) => [...prev, position]);
      setPosition(null);
    },
    [setMarkers, setPosition]
  );

  const handleDeleteMarker = useCallback(
    (position) => {
      setMarkers((prev) => prev.filter((x) => x != position));
      setSelectedMarker(null);
    },
    [setMarkers, setSelectedMarker]
  );

  const showAddMarker = position !== null && selectedMarker === null;
  const showDeleteMarker = position === null && selectedMarker !== null;

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
            position={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          >
            <div>
              <Button
                type="primary"
                onClick={() => handleDeleteMarker(selectedMarker)}
              >
                Delete marker
              </Button>
            </div>
          </ContextMenu>
        )}

        {position && <Marker position={position} icon={icon} />}

        {markers.map((marker) => (
          <Marker
            key={`${marker[0]}${marker[1]}`}
            position={marker}
            icon={icon}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </Map>
    </MapContainer>
  );
};
