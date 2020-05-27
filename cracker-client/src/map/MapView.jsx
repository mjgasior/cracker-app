import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

const Container = styled.div`
  width: 600px;
  height: 300px;
  & .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

const icon = new Icon({
  iconUrl: "/marker.svg",
  iconSize: [25, 25],
});

export const MapView = () => {
  const [position, setPosition] = useState(null);

  const handleOnContextMenu = useCallback(
    (event) => {
      setPosition([event.latlng.lat, event.latlng.lng]);
    },
    [setPosition]
  );

  return (
    <Container>
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
          <Popup position={position} onClose={() => setPosition(null)}>
            <div>
              <h2>menu</h2>
            </div>
          </Popup>
        )}

        {position && <Marker position={position} icon={icon} />}
      </Map>
    </Container>
  );
};
