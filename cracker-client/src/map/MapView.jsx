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

        {position && (
          <ContextMenu position={position} onClose={() => setPosition(null)}>
            <div>
              <Button type="primary" onClick={() => handleAddMarker(position)}>
                Add marker
              </Button>
            </div>
          </ContextMenu>
        )}

        {position && <Marker position={position} icon={icon} />}

        {markers.map((marker) => (
          <Marker position={marker} icon={icon} />
        ))}
      </Map>
    </MapContainer>
  );
};
