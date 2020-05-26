import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import * as parkData from "./skateparks.json";
import styled from "styled-components";

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
  const [activePark, setActivePark] = React.useState(null);

  return (
    <Container>
      <Map center={[50.061252, 19.915738]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {parkData.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            position={park.geometry.coordinates}
            onClick={() => setActivePark(park)}
            icon={icon}
          />
        ))}

        {activePark && (
          <Popup
            position={activePark.geometry.coordinates}
            onClose={() => setActivePark(null)}
          >
            <div>
              <h2>{activePark.properties.NAME}</h2>
              <p>{activePark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )}
      </Map>
    </Container>
  );
};
